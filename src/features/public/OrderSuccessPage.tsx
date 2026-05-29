import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import type { Locale } from '@/lib/i18n';
import { dictionary } from '@/lib/i18n';
import { formatTnd } from '@/lib/currency';

export async function OrderSuccessPage({ locale, orderNumber }: { locale: Locale; orderNumber: string }) {
  const order = await prisma.order.findUnique({ where: { orderNumber }, include: { items: true } });
  if (!order) notFound();
  return (
    <section className="mx-auto max-w-[720px] px-6 py-20 md:py-24">
      <div className="card p-6 text-center md:p-8">
        <p className="origin-label">{dictionary[locale].pending}</p>
        <h1 className="mt-4 font-display text-3xl md:text-4xl">{locale === 'fr' ? 'Commande reçue' : 'Order received'}</h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-umber/70">{dictionary[locale].orderRequestReceived}</p>
        <div className="mt-8 rounded bg-sand/35 p-5 text-left text-sm leading-7">
          <p><strong>{locale === 'fr' ? 'Numéro de commande' : 'Order number'}:</strong> {order.orderNumber}</p>
          <p><strong>Total:</strong> {formatTnd(order.total)}</p>
          <p><strong>{locale === 'fr' ? 'Statut' : 'Status'}:</strong> {order.status.replaceAll('_', ' ')}</p>
        </div>
      </div>
    </section>
  );
}
