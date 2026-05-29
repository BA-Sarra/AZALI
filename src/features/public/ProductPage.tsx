import Image from 'next/image';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import type { Locale } from '@/lib/i18n';
import { pick } from '@/lib/i18n';
import { formatTnd } from '@/lib/currency';
import { toNumber } from '@/lib/serialization';
import { AddToCartPanel } from '@/components/cart/AddToCartPanel';
import { ProductCard } from '@/components/site/ProductCard';

function notebookPricing(productSlug: string, locale: Locale) {
  const isFannen = productSlug.includes('fannen');
  const rows = isFannen
    ? [[0, 80], [1, 90], [2, 100], [3, 105], [4, 110], [5, 115]]
    : [[0, 75], [1, 85], [2, 95], [3, 100], [4, 105], [5, 110]];
  const combos = isFannen ? ['3 M', '2 S + 2 M', '4 S + 1 M', '6 S'] : ['2 M', '2 S + 1 M', '4 S'];
  return {
    type: isFannen ? 'Fannen' : 'Assassi',
    capacity: locale === 'fr'
      ? isFannen ? 'Jusqu’à 6 carnets' : 'Jusqu’à 4 carnets'
      : isFannen ? 'Holds up to 6 notebooks' : 'Holds up to 4 notebooks',
    rows,
    combos
  };
}

export async function ProductPage({ locale, slug }: { locale: Locale; slug: string }) {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      images: { orderBy: { sortOrder: 'asc' } },
      colors: { where: { isAvailable: true }, orderBy: { sortOrder: 'asc' } },
      customizationGroups: { orderBy: { sortOrder: 'asc' }, include: { group: { include: { options: { where: { isAvailable: true }, orderBy: { sortOrder: 'asc' } } } } } }
    }
  });
  if (!product) notFound();
  const related = await prisma.product.findMany({ where: { categoryId: product.categoryId, id: { not: product.id }, isActive: true }, take: 4, include: { images: { orderBy: { sortOrder: 'asc' } }, colors: { orderBy: { sortOrder: 'asc' } } } });
  const primary = product.images.find((img) => img.isPrimary) || product.images[0];
  const notebookInfo = product.category.slug === 'notebooks' ? notebookPricing(product.slug, locale) : null;
  const addProduct = {
    id: product.id,
    slug: product.slug,
    nameFr: product.nameFr,
    nameEn: product.nameEn,
    basePrice: toNumber(product.basePrice),
    imageUrl: primary?.url,
    colors: product.colors.map((color) => ({ ...color, priceDelta: toNumber(color.priceDelta) })),
    customizationGroups: product.customizationGroups.map((join) => ({
      id: join.group.id,
      slug: join.group.slug,
      labelFr: join.group.labelFr,
      labelEn: join.group.labelEn,
      helpTextFr: join.group.helpTextFr,
      helpTextEn: join.group.helpTextEn,
      inputType: join.group.inputType,
      isRequired: join.isRequired,
      options: join.group.options.map((option) => ({ ...option, priceDelta: toNumber(option.priceDelta) }))
    }))
  };
  return (
    <section className="page-wrap py-16 md:py-20">
      <div className="grid gap-12 lg:grid-cols-[0.92fr_1fr] lg:gap-14">
        <div className="lg:sticky lg:top-24 lg:h-fit lg:self-start">
          <div className="relative aspect-[4/4.2] overflow-hidden rounded-md bg-sand/40">
            <Image src={primary?.url || '/placeholders/product.svg'} alt={pick(locale, product.nameFr, product.nameEn)} fill className="object-cover" priority />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {(product.images.length > 1 ? product.images.slice(1, 3) : [null, null]).map((image, index) => (
              <div key={image?.id || `placeholder-${index}`} className="relative aspect-[4/3] overflow-hidden rounded bg-sand/40">
                <Image src={image?.url || '/placeholders/product.svg'} alt={image ? pick(locale, image.altFr, image.altEn) : pick(locale, product.nameFr, product.nameEn)} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="origin-label">{pick(locale, product.category.nameFr, product.category.nameEn)}</p>
          <h1 className="mt-4 font-display text-4xl leading-tight text-espresso md:text-5xl">{pick(locale, product.nameFr, product.nameEn)}</h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-umber/70">{pick(locale, product.shortDescriptionFr, product.shortDescriptionEn)}</p>
          <div className="mt-8">
            <AddToCartPanel product={addProduct} locale={locale} />
          </div>
        </div>
      </div>
      <div className="prose-azali mt-16 max-w-[760px] rounded-md border border-sand/60 bg-[#F8F6F2] p-6 text-sm leading-7 text-bark/80 md:p-8">
        <h2>{locale === 'fr' ? 'Détails' : 'Details'}</h2>
        <p>{pick(locale, product.descriptionFr, product.descriptionEn)}</p>
        {product.dimensions && <p><strong>{locale === 'fr' ? 'Dimensions' : 'Dimensions'}:</strong> {product.dimensions}</p>}
        {(product.materialFr || product.materialEn) && <p><strong>{locale === 'fr' ? 'Matière' : 'Material'}:</strong> {pick(locale, product.materialFr, product.materialEn)}</p>}
        {notebookInfo && (
          <div className="mt-10 rounded-md border border-garnet/15 bg-white/35 p-5 transition-colors hover:border-garnet/30">
            <p className="accent-label">{locale === 'fr' ? 'Logique de prix' : 'Pricing logic'}</p>
            <h3 className="mt-3 font-display text-2xl text-umber">{notebookInfo.type}</h3>
            <p className="mt-3 text-sm leading-7 text-bark/75">{notebookInfo.capacity}. {locale === 'fr' ? 'Le prix dépend du nombre total de charms choisis, jusqu’à 5 charms: un charm frontal et quatre charms latéraux.' : 'The price depends on the total number of charms selected, up to 5 charms: one front charm and four side charms.'}</p>
            <div className="mt-5 grid gap-6 md:grid-cols-2">
              <div>
                <p className="label">{locale === 'fr' ? 'Combinaisons de carnets' : 'Notebook combinations'}</p>
                <ul className="space-y-2 text-sm text-bark/80">{notebookInfo.combos.map((combo) => <li key={combo} className="rounded bg-sand/20 px-3 py-2">{combo}</li>)}</ul>
              </div>
              <div>
                <p className="label">{locale === 'fr' ? 'Prix selon charms' : 'Price by charms'}</p>
                <div className="overflow-hidden rounded border border-umber/10">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-sand/30"><tr><th className="px-3 py-2">{locale === 'fr' ? 'Charms' : 'Charms'}</th><th className="px-3 py-2">{locale === 'fr' ? 'Prix' : 'Price'}</th></tr></thead>
                    <tbody>{notebookInfo.rows.map(([charms, price]) => <tr key={charms} className="border-t border-umber/10"><td className="px-3 py-2">{charms}</td><td className="px-3 py-2">{formatTnd(price)}</td></tr>)}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <section className="mt-16 grid gap-5 md:grid-cols-3">
        <div className="card p-5"><p className="origin-label">{locale === 'fr' ? 'Fait main' : 'Handmade'}</p><p className="mt-3 text-sm leading-7 text-umber/70">{locale === 'fr' ? 'Coupé, assemblé et fini avec patience dans un rythme d’atelier.' : 'Cut, assembled, and finished patiently at workshop pace.'}</p></div>
        <div className="card p-5"><p className="origin-label">{locale === 'fr' ? 'Chutes de cuir' : 'Leather drops'}</p><p className="mt-3 text-sm leading-7 text-umber/70">{locale === 'fr' ? 'Certaines couleurs et textures ne reviennent pas exactement: chaque drop compte.' : 'Some colors and textures may not return exactly: every drop matters.'}</p></div>
        <div className="card p-5"><p className="origin-label">{locale === 'fr' ? 'Tunisie' : 'Tunisia'}</p><p className="mt-3 text-sm leading-7 text-umber/70">{locale === 'fr' ? 'Préparé à Tunis, avec livraison en Tunisie uniquement.' : 'Prepared in Tunis, with Tunisia-only delivery.'}</p></div>
      </section>

      {related.length > 0 && (
        <div className="mt-20">
          <p className="origin-label">{locale === 'fr' ? 'Lié' : 'Related'}</p>
          <h2 className="mt-4 font-display text-2xl md:text-3xl">{locale === 'fr' ? 'Vous aimerez aussi.' : 'You may also like.'}</h2>
          <div className="mt-8 product-grid">{related.map((item) => <ProductCard key={item.id} product={item} locale={locale} />)}</div>
        </div>
      )}
    </section>
  );
}
