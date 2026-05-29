import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

function csv(value: unknown) { return `"${String(value ?? '').replaceAll('"', '""')}"`; }

export async function GET() {
  const orders = await prisma.order.findMany({ orderBy: { createdAt: 'desc' }, include: { customer: true, address: true } });
  const rows = [['Order Number','Status','Customer','Phone','Email','Address','Subtotal','Shipping','Total','Created At'], ...orders.map((o) => [o.orderNumber,o.status,`${o.customer.firstName} ${o.customer.lastName}`,o.customer.phone,o.customer.email,`${o.address.addressLine}, ${o.address.city}, ${o.address.governorate}`,o.subtotal,o.shippingFee,o.total,o.createdAt.toISOString()])];
  const body = rows.map((row) => row.map(csv).join(',')).join('\n');
  return new NextResponse(body, { headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="azali-orders.csv"' } });
}
