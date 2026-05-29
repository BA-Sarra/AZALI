import { render } from '@react-email/render';
import { Resend } from 'resend';
import { prisma } from './prisma';
import { CustomerOrderConfirmed } from '@/emails/CustomerOrderConfirmed';
import { OwnerOrderConfirmed } from '@/emails/OwnerOrderConfirmed';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

async function sendEmail({ to, subject, html, orderId, type }: { to: string; subject: string; html: string; orderId: string; type: any }) {
  if (!resend || !process.env.RESEND_FROM_EMAIL) {
    await prisma.emailLog.create({ data: { orderId, type, recipient: to, subject, status: 'SKIPPED', errorMessage: 'Resend not configured' } });
    return;
  }
  try {
    const response = await resend.emails.send({ from: process.env.RESEND_FROM_EMAIL, to, subject, html });
    await prisma.emailLog.create({ data: { orderId, type, recipient: to, subject, status: 'SENT', providerId: response.data?.id } });
  } catch (error) {
    await prisma.emailLog.create({ data: { orderId, type, recipient: to, subject, status: 'FAILED', errorMessage: error instanceof Error ? error.message : String(error) } });
    throw error;
  }
}

export async function sendOrderConfirmedEmails(orderId: string) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { customer: true, address: true, items: { include: { customizations: true } } }
  });
  if (!order) throw new Error('Order not found');
  const locale = order.locale === 'en' ? 'en' : 'fr';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const customerSubject = locale === 'fr' ? `Commande AZALI confirmée, #${order.orderNumber}` : `AZALI order confirmed, #${order.orderNumber}`;
  const ownerSubject = `AZALI order confirmed, #${order.orderNumber}`;
  const customerHtml = await render(CustomerOrderConfirmed({ order, locale, siteUrl }));
  const ownerHtml = await render(OwnerOrderConfirmed({ order, adminUrl: `${siteUrl}/admin/orders/${order.id}` }));
  await sendEmail({ to: order.customer.email, subject: customerSubject, html: customerHtml, orderId, type: 'CUSTOMER_ORDER_CONFIRMED' });
  if (process.env.OWNER_NOTIFICATION_EMAIL) await sendEmail({ to: process.env.OWNER_NOTIFICATION_EMAIL, subject: ownerSubject, html: ownerHtml, orderId, type: 'OWNER_ORDER_CONFIRMED' });
}
