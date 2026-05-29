import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { AdminFrame } from '@/components/admin/AdminFrame';
import { ProductForm } from '@/components/admin/ProductForm';
export default async function EditProduct({ params }: { params: { id: string } }) { const [product, categories] = await Promise.all([prisma.product.findUnique({ where: { id: params.id } }), prisma.category.findMany({ orderBy: { sortOrder: 'asc' } })]); if (!product) notFound(); return <AdminFrame><h1 className="font-display text-5xl">Edit product</h1><ProductForm product={product} categories={categories} /></AdminFrame>; }
