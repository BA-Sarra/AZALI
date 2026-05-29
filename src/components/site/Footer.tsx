import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import { careHref, contactHref, deliveryHref, ethicsHref, faqHref, privacyHref, productsHref, returnsHref, termsHref } from '@/lib/routes';
import { Logo } from './Logo';
import { NewsletterSignup } from './NewsletterSignup';

const previewImages = [
  '/placeholders/wallets.svg',
  '/placeholders/notebooks.svg',
  '/placeholders/bags.svg',
  '/placeholders/belts.svg',
  '/placeholders/keychains.svg',
  '/placeholders/glasses.svg'
];

export function Footer({ locale, contact }: { locale: Locale; contact: any }) {
  const instagram = contact?.instagram || '@azali';
  const instagramUrl = `https://www.instagram.com/${String(instagram).replace('@', '').trim()}`;
  return (
    <>
      <section className="border-t border-umber/10 bg-[#F8F6F2] px-6 py-16 md:px-10">
        <div className="mx-auto grid max-w-[1100px] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="origin-label">{locale === 'fr' ? 'Nouveaux drops' : 'New drops'}</p>
            <h2 className="mt-4 max-w-xl font-display text-3xl leading-tight text-espresso md:text-4xl">
              {locale === 'fr' ? 'Soyez la première à voir les pièces qui ne reviendront peut-être pas.' : 'Be first to see the pieces that may never return.'}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-umber/70">
              {locale === 'fr' ? 'Les chutes de cuir changent, les couleurs disparaissent, et les petites séries partent vite.' : 'Leather drops change, colors disappear, and small runs move quickly.'}
            </p>
            <NewsletterSignup locale={locale} source="footer-drop-capture" />
          </div>
          <div>
            <div className="mb-4 flex items-center justify-between gap-4">
              <p className="origin-label">Instagram</p>
              <a href={instagramUrl} target="_blank" rel="noreferrer" className="text-xs font-semibold uppercase tracking-[0.2em] text-garnet transition hover:text-azaliIndigo">{instagram}</a>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {previewImages.map((src, index) => (
                <div key={src} className="relative aspect-square overflow-hidden rounded border border-sand/70 bg-parchment">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={`AZALI studio preview ${index + 1}`} className="h-full w-full object-cover opacity-90 transition duration-300 hover:scale-[1.03] hover:opacity-75" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-espresso/10 bg-espresso text-parchment">
        <div className="mx-auto grid max-w-[1100px] gap-10 px-6 py-14 md:grid-cols-[1.5fr_1fr_1fr] md:px-10">
          <div>
            <Logo locale={locale} dark />
            <p className="mt-6 max-w-sm text-sm leading-7 text-parchment/70">
              {locale === 'fr' ? 'Pièces en cuir faites main, pensées pour traverser le temps.' : 'Handmade leather pieces designed to live beautifully over time.'}
            </p>
          </div>
          <div className="space-y-3 text-sm text-parchment/70">
            <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-sand">Menu</h3>
            <Link className="block transition hover:text-garnet" href={productsHref(locale)}>{locale === 'fr' ? 'Produits' : 'Products'}</Link>
            <Link className="block transition hover:text-garnet" href={faqHref(locale)}>FAQ</Link>
            <Link className="block transition hover:text-garnet" href={ethicsHref(locale)}>{locale === 'fr' ? 'Éthique' : 'Leather Ethics'}</Link>
            <Link className="block transition hover:text-garnet" href={contactHref(locale)}>{locale === 'fr' ? 'Contact' : 'Contact'}</Link>
          </div>
          <div className="space-y-3 text-sm text-parchment/70">
            <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-sand">AZALI</h3>
            <p>{contact?.email}</p>
            <p>{contact?.phone}</p>
            <p>{locale === 'fr' ? contact?.addressFr : contact?.addressEn}</p>
            <a href={instagramUrl} target="_blank" rel="noreferrer" className="block hover:text-garnet">{instagram}</a>
            <div className="pt-4 text-[0.68rem] uppercase tracking-[0.18em] text-parchment/60"><Link className="hover:text-garnet" href={deliveryHref(locale)}>{locale === 'fr' ? 'Livraison & paiement' : 'Delivery & payment'}</Link> · <Link className="hover:text-garnet" href={careHref(locale)}>{locale === 'fr' ? 'Entretien' : 'Care'}</Link></div>
            <div className="text-[0.68rem] uppercase tracking-[0.18em] text-parchment/60"><Link className="hover:text-garnet" href={returnsHref(locale)}>{locale === 'fr' ? 'Retours' : 'Returns'}</Link> · <Link className="hover:text-garnet" href={privacyHref(locale)}>{locale === 'fr' ? 'Confidentialité' : 'Privacy'}</Link> · <Link className="hover:text-garnet" href={termsHref(locale)}>{locale === 'fr' ? 'Conditions' : 'Terms'}</Link></div>
          </div>
        </div>
      </footer>
    </>
  );
}
