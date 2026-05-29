import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { AdminFrame } from '@/components/admin/AdminFrame';
import { formatTnd } from '@/lib/currency';

export default async function ProductsAdmin() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' }, include: { category: true } });
  return <AdminFrame><div className="flex items-center justify-between"><h1 className="font-display text-5xl">Products</h1><Link href="/admin/products/new" className="btn-primary">New product</Link></div><div className="card mt-8 overflow-hidden"><table className="w-full text-left text-sm"><thead className="bg-sand/50"><tr><th className="p-4">Product</th><th>Category</th><th>Price</th><th>Status</th><th /></tr></thead><tbody>{products.map((p) => <tr key={p.id} className="border-t border-espresso/10"><td className="p-4 font-semibold">{p.nameFr}<br /><span className="text-xs text-bark/60">{p.slug}</span></td><td>{p.category.nameFr}</td><td>{formatTnd(p.basePrice)}</td><td>{p.isActive ? 'Active' : 'Hidden'}</td><td><Link className="text-saddle" href={`/admin/products/${p.id}`}>Edit</Link></td></tr>)}</tbody></table></div></AdminFrame>;
}
