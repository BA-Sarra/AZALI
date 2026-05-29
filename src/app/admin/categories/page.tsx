import { prisma } from '@/lib/prisma';
import { AdminFrame } from '@/components/admin/AdminFrame';
import { saveCategory } from '@/app/admin/actions';

export default async function CategoriesAdmin() {
  const categories = await prisma.category.findMany({ orderBy: { sortOrder: 'asc' } });
  return <AdminFrame><h1 className="font-display text-5xl">Categories</h1><form action={saveCategory} className="card mt-8 grid gap-4 p-6 md:grid-cols-2"><input name="slug" className="input" placeholder="wallets" required /><input name="nameFr" className="input" placeholder="Nom FR" required /><input name="nameEn" className="input" placeholder="Name EN" required /><input name="coverImageUrl" className="input" placeholder="Cover image URL" /><textarea name="descriptorFr" className="input" placeholder="Descriptor FR" /><textarea name="descriptorEn" className="input" placeholder="Descriptor EN" /><input name="sortOrder" type="number" className="input" placeholder="Sort" /><label><input name="isFeatured" type="checkbox" defaultChecked /> Featured</label><label><input name="isActive" type="checkbox" defaultChecked /> Active</label><button className="btn-primary md:col-span-2">Create category</button></form><div className="card mt-8 p-6"><div className="divide-y divide-espresso/10">{categories.map((category) => <div key={category.id} className="py-3"><strong>{category.nameFr}</strong> · {category.slug}</div>)}</div></div></AdminFrame>;
}
