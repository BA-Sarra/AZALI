import { prisma } from '@/lib/prisma';
import { AdminFrame } from '@/components/admin/AdminFrame';
import { formatTnd } from '@/lib/currency';

export default async function AdminDashboard() {
  const [pending, confirmed, recent, revenue] = await Promise.all([
    prisma.order.count({ where: { status: 'PENDING_CONFIRMATION' } }),
    prisma.order.count({ where: { status: 'CONFIRMED' } }),
    prisma.order.findMany({ take: 5, orderBy: { createdAt: 'desc' }, include: { customer: true } }),
    prisma.order.aggregate({ _sum: { total: true }, where: { status: { not: 'CANCELLED' } } })
  ]);
  return <AdminFrame><h1 className="font-display text-5xl">Dashboard</h1><div className="mt-8 grid gap-4 md:grid-cols-3"><div className="card p-6"><p className="label">Pending</p><p className="text-4xl">{pending}</p></div><div className="card p-6"><p className="label">Confirmed</p><p className="text-4xl">{confirmed}</p></div><div className="card p-6"><p className="label">Revenue</p><p className="text-4xl">{formatTnd(revenue._sum.total || 0)}</p></div></div><div className="card mt-8 p-6"><h2 className="font-display text-3xl">Recent orders</h2><div className="mt-4 divide-y divide-espresso/10">{recent.map((order) => <div key={order.id} className="flex justify-between py-3"><span>{order.orderNumber} · {order.customer.firstName} {order.customer.lastName}</span><span>{order.status}</span></div>)}</div></div></AdminFrame>;
}
