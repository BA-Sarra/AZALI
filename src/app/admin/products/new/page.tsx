import { prisma } from '@/lib/prisma';
import { AdminFrame } from '@/components/admin/AdminFrame';
import { ProductForm } from '@/components/admin/ProductForm';
export default async function NewProduct() { const categories = await prisma.category.findMany({ orderBy: { sortOrder: 'asc' } }); return <AdminFrame><h1 className="font-display text-5xl">New product</h1><ProductForm categories={categories} /></AdminFrame>; }
