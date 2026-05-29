import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import type { Locale } from '@/lib/i18n';
import { pick } from '@/lib/i18n';
import { ProductCard } from '@/components/site/ProductCard';

const editorialDescriptors: Record<string, { fr: string; en: string }> = {
  wallets: { fr: 'Assez fin pour s’oublier, assez présent pour durer.', en: 'Slim enough to forget you are carrying it.' },
  notebooks: { fr: 'Le cuir qui protège les carnets qui gardent vos pensées.', en: 'Leather that holds the notebooks that hold your thoughts.' },
  belts: { fr: 'Coupée une fois. Portée pendant des années.', en: 'Cut once. Worn for decades.' },
  bags: { fr: 'Une présence calme pour les journées qui bougent.', en: 'A quiet presence for days that move.' },
  keychains: { fr: 'Le détail que vos mains retrouvent chaque jour.', en: 'The detail your hands find every day.' },
  'glasses-pouches': { fr: 'Une peau douce pour ce qui se raye facilement.', en: 'A soft skin for things that scratch easily.' }
};

export async function CategoryPage({ locale, slug }: { locale: Locale; slug: string }) {
  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      products: {
        where: { isActive: true },
        orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
        include: { images: { orderBy: { sortOrder: 'asc' } }, colors: { orderBy: { sortOrder: 'asc' } } }
      }
    }
  });
  if (!category) notFound();
  const descriptor = editorialDescriptors[category.slug]?.[locale] || pick(locale, category.descriptorFr, category.descriptorEn);
  return (
    <section className="page-wrap page-pad">
      <p className="origin-label">{locale === 'fr' ? 'Catégorie' : 'Category'}</p>
      <h1 className="mt-4 font-display text-3xl text-espresso md:text-4xl">{pick(locale, category.nameFr, category.nameEn)}</h1>
      <p className="mt-5 max-w-2xl text-sm leading-7 text-umber/70">{descriptor}</p>
      <div className="mt-10 product-grid">{category.products.map((product) => <ProductCard key={product.id} product={product} locale={locale} />)}</div>
      {category.products.length === 0 && <div className="card mt-10 p-6 text-sm text-bark/70">{locale === 'fr' ? 'Aucune pièce disponible pour le moment.' : 'No pieces available yet.'}</div>}
    </section>
  );
}
