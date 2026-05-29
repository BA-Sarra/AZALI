import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import { pick } from '@/lib/i18n';
import { productHref } from '@/lib/routes';
import { formatTnd } from '@/lib/currency';

type Product = {
  slug: string;
  nameFr: string;
  nameEn: string;
  basePrice: any;
  availabilityType: string;
  shortDescriptionFr?: string | null;
  shortDescriptionEn?: string | null;
  leadTimeTextFr?: string | null;
  leadTimeTextEn?: string | null;
  images: { url: string; altFr?: string | null; altEn?: string | null; isPrimary: boolean }[];
  colors: { labelFr: string; labelEn: string; colorHex?: string | null }[];
};

const editorialDescriptions: Record<string, { fr: string; en: string }> = {
  'azali-assassi-notebook': { fr: 'Contient jusqu’à 4 carnets avec charms optionnels.', en: 'Holds up to 4 notebooks with optional charms.' },
  'azali-fannen-notebook': { fr: 'Contient jusqu’à 6 carnets. Plus d’espace pour les fragments.', en: 'Holds up to 6 notebooks. More room for fragments.' },
  'everyday-wallet': { fr: 'Une pièce calme pour ce que vous touchez chaque jour.', en: 'A quiet piece for the things you reach for daily.' },
  'azali-card-wallet': { fr: 'Une pièce calme pour ce que vous touchez chaque jour.', en: 'A quiet piece for the things you reach for daily.' },
  'azali-bifold-wallet': { fr: 'Une pièce quotidienne coupée dans un drop limité.', en: 'A daily piece cut from a limited leather drop.' },
  'azali-classic-belt': { fr: 'Coupée une fois. Portée pendant des décennies.', en: 'Cut once. Worn for decades.' },
  'azali-soft-glasses-pouch': { fr: 'Protection souple pour ce que vous portez chaque jour.', en: 'Soft protection for what you carry every day.' },
  'azali-loop-keychain': { fr: 'Un petit objet né d’un fragment de cuir.', en: 'A small object from a leather fragment.' }
};

export function ProductCard({ product, locale, descriptionOverride }: { product: Product; locale: Locale; descriptionOverride?: string }) {
  const image = product.images.find((img) => img.isPrimary) || product.images[0];
  const madeToOrder = product.availabilityType !== 'IN_STOCK';
  const description = descriptionOverride || editorialDescriptions[product.slug]?.[locale] || pick(locale, product.shortDescriptionFr, product.shortDescriptionEn);
  return (
    <Link href={productHref(locale, product.slug)} className="group hover-card-garnet block overflow-hidden">
      <div className="relative aspect-[5/3] overflow-hidden bg-sand/35">
        <Image src={image?.url || '/placeholders/product.svg'} alt={pick(locale, image?.altFr, image?.altEn) || pick(locale, product.nameFr, product.nameEn)} fill className="card-hover-image object-cover transition duration-700 group-hover:scale-[1.025]" />
      </div>
      <div className="p-4 transition-colors">
        <p className={`${madeToOrder ? 'origin-label' : 'status-label-garnet'} card-hover-muted transition-colors`}>{madeToOrder ? (locale === 'fr' ? 'Sur commande' : 'Made to order') : (locale === 'fr' ? 'En stock' : 'In stock')}</p>
        <h3 className="card-hover-title mt-2 font-display text-[1.12rem] leading-tight text-espresso transition-colors md:text-[1.24rem]">{pick(locale, product.nameFr, product.nameEn)}</h3>
        {description && <p className="card-hover-muted mt-2 line-clamp-2 text-[0.78rem] leading-5 text-umber/60 transition-colors">{description}</p>}
        <p className="card-hover-price mt-2.5 text-[0.78rem] font-semibold text-garnet transition-colors">{locale === 'fr' ? 'À partir de' : 'From'} {formatTnd(product.basePrice)}</p>
        <div className="mt-3 flex flex-wrap gap-1.5" aria-label="Available colors">
          {product.colors.slice(0, 5).map((color) => (
            <span key={color.labelEn} title={pick(locale, color.labelFr, color.labelEn)} className="h-[18px] w-[18px] rounded-full border border-espresso/25 transition-colors group-hover:border-espresso/35" style={{ background: color.colorHex || '#8A4F2A' }} />
          ))}
        </div>
      </div>
    </Link>
  );
}
