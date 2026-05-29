import { prisma } from '@/lib/prisma';
import type { Locale } from '@/lib/i18n';
import { CategoryCard } from '@/components/site/CategoryCard';
import { ProductCard } from '@/components/site/ProductCard';

function bySlug<T extends { slug: string }>(items: T[], slugs: string[]) {
  return slugs.map((slug) => items.find((item) => item.slug === slug)).filter(Boolean) as T[];
}

export async function ProductsPage({ locale }: { locale: Locale }) {
  const [categories, products] = await Promise.all([
    prisma.category.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
      include: { _count: { select: { products: true } } }
    }),
    prisma.product.findMany({
      where: { isActive: true },
      orderBy: [{ isFeatured: 'desc' }, { createdAt: 'desc' }],
      include: { images: { orderBy: { sortOrder: 'asc' } }, colors: { orderBy: { sortOrder: 'asc' } } }
    })
  ]);

  const mainCategory = categories.find((category) => category.slug === 'notebooks') || categories[0];
  const sideCategories = bySlug(categories, ['wallets', 'bags']).length ? bySlug(categories, ['wallets', 'bags']) : categories.filter((category) => category.slug !== mainCategory?.slug).slice(0, 2);
  const rest = categories.filter((category) => category.slug !== mainCategory?.slug && !sideCategories.some((item) => item.slug === category.slug));

  return (
    <main>
      <section className="page-wrap page-pad">
        <p className="origin-label">{locale === 'fr' ? 'Parcourir' : 'Browse'}</p>
        <h1 className="mt-4 max-w-[720px] font-display text-4xl leading-tight text-espresso md:text-5xl">
          {locale === 'fr' ? 'Choisir par catégorie ou voir chaque pièce.' : 'Choose by category or see every piece.'}
        </h1>
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.7fr_1fr]">
          {mainCategory && <CategoryCard category={mainCategory} locale={locale} featured />}
          <div className="grid gap-6">{sideCategories.map((category) => <CategoryCard key={category.id} category={category} locale={locale} />)}</div>
        </div>
        {rest.length > 0 && <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{rest.map((category) => <CategoryCard key={category.id} category={category} locale={locale} />)}</div>}
      </section>

      <section className="pb-24 md:pb-28">
        <div className="page-wrap">
          <p className="origin-label">{locale === 'fr' ? 'Toutes les pièces' : 'All pieces'}</p>
          <h2 className="mt-4 font-display text-3xl leading-tight text-espresso md:text-4xl">{locale === 'fr' ? 'Tout ce qui est disponible.' : 'Everything currently available.'}</h2>
          <div className="mt-10 product-grid">{products.map((product) => <ProductCard key={product.id} product={product} locale={locale} />)}</div>
        </div>
      </section>
    </main>
  );
}
