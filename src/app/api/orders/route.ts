import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createOrderSchema } from '@/lib/validators';
import { calculateOrderTotals } from '@/lib/orderTotals';
import { getShippingFee } from '@/lib/settings';
import { toNumber } from '@/lib/serialization';

function orderNumber() {
  const date = new Date().toISOString().slice(0, 10).replaceAll('-', '');
  const random = Math.random().toString(36).slice(2, 7).toUpperCase();

  return `AZ-${date}-${random}`;
}

type PreparedCustomization = {
  groupId: string;
  optionId: string;
  groupLabelFr: string;
  groupLabelEn: string;
  optionLabelFr: string;
  optionLabelEn: string;
  priceDelta: number;
};

export async function POST(request: Request) {
  try {
    const parsed = createOrderSchema.safeParse(await request.json());

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: parsed.error.issues[0]?.message || 'Invalid order.',
        },
        { status: 400 },
      );
    }

    const payload = parsed.data;
    const shippingFee = await getShippingFee();

    const productIds = payload.items.map((item) => item.productId);

    const products = await prisma.product.findMany({
      where: {
        id: { in: productIds },
        isActive: true,
      },
      include: {
        colors: true,
        customizationGroups: {
          include: {
            group: {
              include: {
                options: true,
              },
            },
          },
        },
      },
    });

    const lines = payload.items.map((item) => {
      const product = products.find(
        (candidate) => candidate.id === item.productId,
      );

      if (!product) {
        throw new Error('Product unavailable.');
      }

      const color = item.colorId
        ? product.colors.find((candidate) => candidate.id === item.colorId)
        : undefined;

      let unitPrice =
        toNumber(product.basePrice) + (color ? toNumber(color.priceDelta) : 0);

      const customizations: PreparedCustomization[] =
        item.customizations.flatMap((customization) => {
          const join = product.customizationGroups.find(
            (entry) => entry.groupId === customization.groupId,
          );

          if (!join) {
            return [];
          }

          const group = join.group;

          if (customization.optionId) {
            const option = group.options.find(
              (candidate) => candidate.id === customization.optionId,
            );

            if (!option) {
              return [];
            }

            const priceDelta = toNumber(option.priceDelta);
            unitPrice += priceDelta;

            return [
              {
                groupId: group.id,
                optionId: option.id,
                groupLabelFr: group.labelFr,
                groupLabelEn: group.labelEn,
                optionLabelFr: option.labelFr,
                optionLabelEn: option.labelEn,
                priceDelta,
              },
            ];
          }

          if (customization.textValue) {
            const textValue = customization.textValue.trim();

            if (!textValue) {
              return [];
            }

            return [
              {
                groupId: group.id,
                optionId: `text-${group.id}`,
                groupLabelFr: group.labelFr,
                groupLabelEn: group.labelEn,
                optionLabelFr: textValue,
                optionLabelEn: textValue,
                priceDelta: 0,
              },
            ];
          }

          if (customization.booleanValue !== undefined) {
            const labelFr = customization.booleanValue ? 'Oui' : 'Non';
            const labelEn = customization.booleanValue ? 'Yes' : 'No';

            return [
              {
                groupId: group.id,
                optionId: `boolean-${group.id}`,
                groupLabelFr: group.labelFr,
                groupLabelEn: group.labelEn,
                optionLabelFr: labelFr,
                optionLabelEn: labelEn,
                priceDelta: 0,
              },
            ];
          }

          return [];
        });

      return {
        product,
        color,
        quantity: item.quantity,
        unitPrice,
        lineTotal: unitPrice * item.quantity,
        customizations,
      };
    });

    const totals = calculateOrderTotals(
      lines.map((line) => ({
        unitPrice: line.unitPrice,
        quantity: line.quantity,
      })),
      shippingFee,
    );

    const order = await prisma.order.create({
      data: {
        orderNumber: orderNumber(),
        locale: payload.locale,
        notes: payload.notes,
        subtotal: totals.subtotal,
        shippingFee: totals.shippingFee,
        total: totals.total,

        customer: {
          create: {
            firstName: payload.customer.firstName,
            lastName: payload.customer.lastName,
            email: payload.customer.email,
            phone: payload.customer.phone,
            secondPhone: payload.customer.secondPhone || null,
          },
        },

        address: {
          create: {
            addressLine: payload.address.addressLine,
            city: payload.address.city,
            governorate: payload.address.governorate,
            postalCode: payload.address.postalCode || null,
          },
        },

        items: {
          create: lines.map((line) => ({
            productId: line.product.id,
            productColorId: line.color?.id ?? null,
            productNameFr: line.product.nameFr,
            productNameEn: line.product.nameEn,
            colorLabelFr: line.color?.labelFr ?? null,
            colorLabelEn: line.color?.labelEn ?? null,
            unitPrice: line.unitPrice,
            quantity: line.quantity,
            lineTotal: line.lineTotal,

            customizations: {
              create: line.customizations.map((customization) => ({
                groupId: customization.groupId,
                optionId: customization.optionId,
                groupLabelFr: customization.groupLabelFr,
                groupLabelEn: customization.groupLabelEn,
                optionLabelFr: customization.optionLabelFr,
                optionLabelEn: customization.optionLabelEn,
                priceDelta: customization.priceDelta,
              })),
            },
          })),
        },
      },
    });

    return NextResponse.json({
      orderNumber: order.orderNumber,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Could not create order.',
      },
      { status: 500 },
    );
  }
}