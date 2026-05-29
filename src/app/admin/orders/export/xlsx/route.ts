import { NextResponse } from 'next/server';
import XLSX from 'xlsx';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const orders = await prisma.order.findMany({ orderBy: { createdAt: 'desc' }, include: { customer: true, address: true, items: { include: { customizations: true } } } });
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(orders.map((o) => ({ orderNumber: o.orderNumber, status: o.status, customer: `${o.customer.firstName} ${o.customer.lastName}`, phone: o.customer.phone, email: o.customer.email, address: `${o.address.addressLine}, ${o.address.city}, ${o.address.governorate}`, subtotal: Number(o.subtotal), shippingFee: Number(o.shippingFee), total: Number(o.total), createdAt: o.createdAt.toISOString() }))), 'Orders');
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(orders.flatMap((o) => o.items.map((i) => ({ orderNumber: o.orderNumber, product: i.productNameFr, color: i.colorLabelFr, quantity: i.quantity, unitPrice: Number(i.unitPrice), lineTotal: Number(i.lineTotal) })))), 'Order Items');
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(orders.flatMap((o) => o.items.flatMap((i) => i.customizations.map((c) => ({ orderNumber: o.orderNumber, product: i.productNameFr, group: c.groupLabelFr, value: c.textValue || c.optionLabelFr || c.booleanValue }))))), 'Customizations');
  const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
  return new NextResponse(buffer, { headers: { 'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'Content-Disposition': 'attachment; filename="azali-orders.xlsx"' } });
}
