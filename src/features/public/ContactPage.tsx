import Image from 'next/image';
import { Instagram } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { getContactInfo } from '@/lib/settings';
import { NewsletterSignup } from '@/components/site/NewsletterSignup';

function instagramUrl(handle?: string) {
  const clean = (handle || '@azali').replace('@', '').trim();
  return `https://www.instagram.com/${clean}`;
}

const previews = [
  '/placeholders/wallets.svg',
  '/placeholders/notebooks.svg',
  '/placeholders/bags.svg',
  '/placeholders/belts.svg',
  '/placeholders/keychains.svg',
  '/placeholders/glasses.svg'
];

export async function ContactPage({ locale }: { locale: Locale }) {
  const contact = await getContactInfo();
  const instagram = contact.instagram || '@azali';
  return (
    <main className="page-wrap py-20 md:py-24">
      <section>
        <p className="origin-label">{locale === 'fr' ? 'Contact' : 'Contact'}</p>
        <h1 className="mt-5 max-w-[620px] font-display text-4xl leading-tight text-espresso md:text-5xl">
          {locale === 'fr' ? 'Chaque pièce commence par une conversation.' : 'Every piece begins with a conversation.'}
        </h1>
        <p className="mt-6 max-w-[760px] text-sm leading-7 text-umber/70 md:text-base md:leading-8">
          {locale === 'fr'
            ? 'Écrivez avant, pendant ou après votre commande. Pour les pièces personnalisées, les couleurs et les drops de cuir, une courte conversation fait partie du processus.'
            : 'Reach out before, during, or after your order. For custom pieces, colors, and leather drops, a short conversation is part of the process.'}
        </p>
      </section>

      <section className="mt-12 grid gap-5 md:grid-cols-2">
        <a className="card block p-5 transition hover:-translate-y-0.5 hover:border-garnet/30" href={`mailto:${contact.email}`}><p className="label">Email</p><p className="text-sm leading-6 text-umber/80">{contact.email}</p></a>
        <a className="card block p-5 transition hover:-translate-y-0.5 hover:border-garnet/30" href={`tel:${contact.phone}`}><p className="label">{locale === 'fr' ? 'Téléphone' : 'Phone'}</p><p className="text-sm leading-6 text-umber/80">{contact.phone}</p></a>
        <a className="card group block p-5 transition hover:-translate-y-0.5 hover:border-garnet/30" href={instagramUrl(instagram)} target="_blank" rel="noreferrer">
          <p className="label inline-flex items-center gap-2"><Instagram size={14} strokeWidth={1.8} /> Instagram</p>
          <p className="text-sm leading-6 text-umber/80 transition group-hover:text-garnet">↗ {instagram}</p>
        </a>
        <div className="card p-5"><p className="label">{locale === 'fr' ? 'Adresse' : 'Address'}</p><p className="text-sm leading-6 text-umber/80">{locale === 'fr' ? contact.addressFr : contact.addressEn}</p></div>
      </section>

      <section className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-3">
        {previews.map((src, index) => (
          <div key={src} className="relative aspect-square overflow-hidden rounded-md border border-sand/70 bg-sand/30">
            <Image src={src} alt={`AZALI contact preview ${index + 1}`} fill className="object-cover opacity-90 transition duration-300 hover:scale-[1.03]" />
          </div>
        ))}
      </section>

      <section className="mt-16 border-t border-sand/70 pt-12 md:flex md:items-end md:justify-between md:gap-10">
        <h2 className="max-w-xl font-display text-3xl leading-tight text-espresso md:text-4xl">
          {locale === 'fr' ? 'Soyez la première à voir les pièces qui ne reviendront peut-être jamais.' : 'Be first to see the pieces that may never return.'}
        </h2>
        <div className="mt-8 min-w-[320px] md:mt-0">
          <NewsletterSignup locale={locale} source="contact-page" />
        </div>
      </section>
    </main>
  );
}
