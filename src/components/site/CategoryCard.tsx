import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import { pick } from '@/lib/i18n';
import { categoryHref } from '@/lib/routes';

type Category = { slug: string; nameFr: string; nameEn: string; descriptorFr?: string | null; descriptorEn?: string | null; coverImageUrl?: string | null; _count?: { products: number } };

const editorialDescriptors: Record<string, { fr: string; en: string }> = {
  wallets: { fr: 'Assez fin pour s’oublier dans la main.', en: 'Slim enough to forget you are carrying it.' },
  notebooks: { fr: 'Le cuir qui garde les carnets qui gardent vos pensées.', en: 'Holds the notebooks that hold your thoughts.' },
  belts: { fr: 'Coupée une fois. Portée pendant des décennies.', en: 'Cut once. Worn for decades.' },
  bags: { fr: 'Pensés pour porter les journées qui demandent plus.', en: 'Built to carry the days that ask for more.' },
  keychains: { fr: 'Un petit objet né d’un fragment de cuir.', en: 'A small object from a leather fragment.' },
  'glasses-pouches': { fr: 'Une protection souple pour ce que vous portez chaque jour.', en: 'Soft protection for what you carry every day.' }
};

function displayName(category: Category, locale: Locale) {
  return pick(locale, category.nameFr, category.nameEn);
}

export function CategoryCard({ category, locale, featured = false, nameOverride, descriptorOverride }: { category: Category; locale: Locale; featured?: boolean; nameOverride?: string; descriptorOverride?: string }) {
  const descriptor = descriptorOverride || editorialDescriptors[category.slug]?.[locale] || pick(locale, category.descriptorFr, category.descriptorEn);
  return (
    <Link href={categoryHref(locale, category.slug)} className={`group hover-card-garnet block overflow-hidden`}>
      <div className={`relative overflow-hidden bg-sand/35 ${featured ? 'aspect-[16/7] md:h-[330px] md:aspect-auto' : 'aspect-[16/7]'}`}>
        <Image src={category.coverImageUrl || '/placeholders/category.svg'} alt={nameOverride || displayName(category, locale)} fill className="card-hover-image object-cover transition duration-700 group-hover:scale-[1.025]" />
      </div>
      <div className={featured ? 'p-4 transition-colors md:p-5' : 'p-4 transition-colors md:p-5'}>
        <p className="card-hover-muted origin-label transition-colors">{locale === 'fr' ? 'Catégorie' : 'Category'}</p>
        <h3 className={`card-hover-title mt-2 font-display leading-tight text-espresso transition-colors ${featured ? 'text-[1.45rem] md:text-[1.72rem]' : 'text-[1.18rem] md:text-[1.35rem]'}`}>{nameOverride || displayName(category, locale)}</h3>
        <p className={`card-hover-muted mt-2 whitespace-pre-line text-[0.8rem] text-umber/60 transition-colors ${featured ? 'leading-[1.45]' : 'leading-5'}`}>{descriptor}</p>
      </div>
    </Link>
  );
}
