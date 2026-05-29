import { prisma } from './prisma';

export async function getSetting<T>(key: string, fallback: T): Promise<T> {
  const row = await prisma.siteSetting.findUnique({ where: { key } });
  return (row?.value as T) ?? fallback;
}

export async function getShippingFee() {
  const value = await getSetting<{ amount: number }>('shippingFee', { amount: 8 });
  return Number(value.amount || 8);
}

export async function getContactInfo() {
  return getSetting('contactInfo', {
    email: 'contact@azali.tn',
    phone: '+216 00 000 000',
    addressFr: 'Tunis, Tunisie',
    addressEn: 'Tunis, Tunisia',
    instagram: '',
    facebook: ''
  });
}
