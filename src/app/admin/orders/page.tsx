import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { AdminFrame } from '@/components/admin/AdminFrame';
import { formatTnd } from '@/lib/currency';

export default async function OrdersAdmin({ searchParams }: { searchParams: { status?: string } }) {
  const where = searchParams.status ? { status: searchParams.status as any } : {};
  const orders = await prisma.order.findMany({ where, orderBy: { createdAt: 'desc' }, include: { customer: true } });
  return <AdminFrame><div className="flex flex-wrap items-center justify-between gap-4"><h1 className="font-display text-5xl">Orders</h1><div className="flex gap-2"><Link className="btn-secondary" href="/admin/orders/export/csv">CSV</Link><Link className="btn-secondary" href="/admin/orders/export/xlsx">XLSX</Link></div></div><div className="mt-6 flex flex-wrap gap-2 text-sm">{['PENDING_CONFIRMATION','CONFIRMED','IN_PRODUCTION','READY_TO_SHIP','SHIPPED','DELIVERED','CANCELLED'].map((s) => <Link className="rounded-md border px-3 py-1" href={`/admin/orders?status=${s}`} key={s}>{s}</Link>)}</div><div className="card mt-8 overflow-hidden"><table className="w-full text-left text-sm"><thead className="bg-sand/50"><tr><th className="p-4">Order</th><th>Customer</th><th>Status</th><th>Total</th><th /></tr></thead><tbody>{orders.map((order) => <tr key={order.id} className="border-t border-espresso/10"><td className="p-4">{order.orderNumber}</td><td>{order.customer.firstName} {order.customer.lastName}<br /><span className="text-xs text-bark/60">{order.customer.phone}</span></td><td>{order.status}</td><td>{formatTnd(order.total)}</td><td><Link className="text-saddle" href={`/admin/orders/${order.id}`}>Open</Link></td></tr>)}</tbody></table></div></AdminFrame>;
}
