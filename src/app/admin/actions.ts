'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { sendOrderConfirmedEmails } from '@/lib/email';

function bool(value: FormDataEntryValue | null) { return value === 'on' || value === 'true'; }
function num(value: FormDataEntryValue | null, fallback = 0) { return Number(value || fallback); }

export async function saveCategory(formData: FormData) {
  const id = String(formData.get('id') || '');
  const data = { slug: String(formData.get('slug')), nameFr: String(formData.get('nameFr')), nameEn: String(formData.get('nameEn')), descriptorFr: String(formData.get('descriptorFr') || ''), descriptorEn: String(formData.get('descriptorEn') || ''), coverImageUrl: String(formData.get('coverImageUrl') || ''), sortOrder: num(formData.get('sortOrder')), isFeatured: bool(formData.get('isFeatured')), isActive: bool(formData.get('isActive')) };
  if (id) await prisma.category.update({ where: { id }, data }); else await prisma.category.create({ data });
  revalidatePath('/admin/categories'); redirect('/admin/categories');
}

export async function saveProduct(formData: FormData) {
  const id = String(formData.get('id') || '');
  const data = {
    slug: String(formData.get('slug')), categoryId: String(formData.get('categoryId')), nameFr: String(formData.get('nameFr')), nameEn: String(formData.get('nameEn')),
    shortDescriptionFr: String(formData.get('shortDescriptionFr') || ''), shortDescriptionEn: String(formData.get('shortDescriptionEn') || ''), descriptionFr: String(formData.get('descriptionFr') || ''), descriptionEn: String(formData.get('descriptionEn') || ''),
    basePrice: num(formData.get('basePrice')), dimensions: String(formData.get('dimensions') || ''), materialFr: String(formData.get('materialFr') || ''), materialEn: String(formData.get('materialEn') || ''), availabilityType: String(formData.get('availabilityType')) as any,
    stockQuantity: formData.get('stockQuantity') ? num(formData.get('stockQuantity')) : null, leadTimeMinDays: num(formData.get('leadTimeMinDays'), 7), leadTimeMaxDays: num(formData.get('leadTimeMaxDays'), 14), leadTimeTextFr: String(formData.get('leadTimeTextFr') || ''), leadTimeTextEn: String(formData.get('leadTimeTextEn') || ''), isFeatured: bool(formData.get('isFeatured')), isActive: bool(formData.get('isActive'))
  };
  const imageUrl = String(formData.get('imageUrl') || '');
  if (id) await prisma.product.update({ where: { id }, data }); else {
    const product = await prisma.product.create({ data });
    if (imageUrl) await prisma.productImage.create({ data: { productId: product.id, url: imageUrl, isPrimary: true } });
  }
  revalidatePath('/admin/products'); redirect('/admin/products');
}

export async function saveSettings(formData: FormData) {
  await prisma.siteSetting.upsert({ where: { key: 'shippingFee' }, update: { value: { amount: num(formData.get('shippingFee'), 8) } }, create: { key: 'shippingFee', value: { amount: num(formData.get('shippingFee'), 8) } } });
  await prisma.siteSetting.upsert({ where: { key: 'contactInfo' }, update: { value: { email: String(formData.get('email')), phone: String(formData.get('phone')), addressFr: String(formData.get('addressFr')), addressEn: String(formData.get('addressEn')), instagram: String(formData.get('instagram') || ''), facebook: String(formData.get('facebook') || '') } }, create: { key: 'contactInfo', value: { email: String(formData.get('email')), phone: String(formData.get('phone')), addressFr: String(formData.get('addressFr')), addressEn: String(formData.get('addressEn')), instagram: String(formData.get('instagram') || ''), facebook: String(formData.get('facebook') || '') } } });
  revalidatePath('/admin/settings');
}

export async function updateOrderStatus(formData: FormData) {
  const id = String(formData.get('id'));
  const status = String(formData.get('status')) as any;
  const order = await prisma.order.update({ where: { id }, data: { status, confirmedAt: status === 'CONFIRMED' ? new Date() : undefined, adminNotes: String(formData.get('adminNotes') || '') } });
  if (status === 'CONFIRMED') await sendOrderConfirmedEmails(order.id);
  revalidatePath(`/admin/orders/${id}`);
}

export async function saveFAQ(formData: FormData) {
  await prisma.fAQEntry.create({ data: { questionFr: String(formData.get('questionFr')), questionEn: String(formData.get('questionEn')), answerFr: String(formData.get('answerFr')), answerEn: String(formData.get('answerEn')), sortOrder: num(formData.get('sortOrder')), isVisible: true } });
  revalidatePath('/admin/faq');
}

export async function savePolicy(formData: FormData) {
  const id = String(formData.get('id') || '');
  const data = { titleFr: String(formData.get('titleFr')), titleEn: String(formData.get('titleEn')), bodyFr: String(formData.get('bodyFr')), bodyEn: String(formData.get('bodyEn')) };
  if (id) await prisma.policyPage.update({ where: { id }, data });
  revalidatePath('/admin/policies');
}

export async function createCustomizationGroup(formData: FormData) {
  await prisma.customizationGroup.create({ data: { slug: String(formData.get('slug')), labelFr: String(formData.get('labelFr')), labelEn: String(formData.get('labelEn')), inputType: String(formData.get('inputType')) as any, helpTextFr: String(formData.get('helpTextFr') || ''), helpTextEn: String(formData.get('helpTextEn') || '') } });
  revalidatePath('/admin/customizations');
}

export async function createCustomizationOption(formData: FormData) {
  await prisma.customizationOption.create({ data: { groupId: String(formData.get('groupId')), labelFr: String(formData.get('labelFr')), labelEn: String(formData.get('labelEn')), value: String(formData.get('value')), colorHex: String(formData.get('colorHex') || ''), priceDelta: num(formData.get('priceDelta')) } });
  revalidatePath('/admin/customizations');
}
