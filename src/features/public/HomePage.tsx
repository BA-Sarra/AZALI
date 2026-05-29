import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import type { Locale } from '@/lib/i18n';
import { dictionary } from '@/lib/i18n';
import { ethicsHref, meetHref, productsHref } from '@/lib/routes';
import { CategoryCard } from '@/components/site/CategoryCard';
import { ProductCard } from '@/components/site/ProductCard';
import { getSetting } from '@/lib/settings';

function bySlug<T extends { slug: string }>(items: T[], slugs: string[]) {
  return slugs.map((slug) => items.find((item) => item.slug === slug)).filter(Boolean) as T[];
}

export async function HomePage({ locale }: { locale: Locale }) {
  const t = dictionary[locale];
  const [categories, products, hero] = await Promise.all([
    prisma.category.findMany({ where: { isActive: true }, orderBy: { sortOrder: 'asc' }, include: { _count: { select: { products: true } } } }),
    prisma.product.findMany({ where: { isActive: true, isFeatured: true }, take: 6, include: { images: { orderBy: { sortOrder: 'asc' } }, colors: { orderBy: { sortOrder: 'asc' } } } }),
    getSetting('hero', { videoUrl: '', posterUrl: '/placeholders/hero-poster.svg' })
  ]);

  const mainCategory = categories.find((category) => category.slug === 'notebooks') || categories[0];
  const sideCategories = bySlug(categories, ['wallets', 'belts']).length ? bySlug(categories, ['wallets', 'belts']) : categories.filter((category) => category.slug !== mainCategory?.slug).slice(0, 2);
  const featuredProducts = bySlug(products, ['azali-assassi-notebook', 'azali-fannen-notebook', 'azali-card-wallet']).slice(0, 3);
  const shownProducts = featuredProducts.length ? featuredProducts : products.slice(0, 3);

  return (
    <div>
      <section className="relative min-h-[64vh] overflow-hidden bg-espresso text-parchment md:min-h-[66vh]">
        {hero.videoUrl ? (
          <video className="absolute inset-0 h-full w-full object-cover opacity-45" src={hero.videoUrl} poster={hero.posterUrl} autoPlay muted loop playsInline />
        ) : (
          <img src={hero.posterUrl} className="absolute inset-0 h-full w-full object-cover opacity-35" alt="AZALI workshop" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-espresso via-espresso/86 to-espresso/68" />
        <div className="pointer-events-none absolute right-[8%] top-[-9%] hidden font-display text-[29rem] leading-none text-parchment/[0.06] md:block">∞</div>
        <div className="relative mx-auto flex min-h-[64vh] max-w-[1120px] items-center px-6 pb-12 pt-20 md:min-h-[66vh] md:px-10">
          <div className="max-w-[1120px]">
            <p className="origin-label text-azaliIndigo">{locale === 'fr' ? 'AZALI MAROQUINERIE · FAIT MAIN EN TUNISIE' : 'AZALI · HANDMADE IN TUNISIA'}</p>
            <h1 className="mt-6 font-display tracking-[-0.02em] text-parchment">
              <span className="md:hidden block text-[2.75rem] leading-[1.02]">{locale === 'fr' ? 'Compagnons de cuir\npour les cycles de la vie.' : 'Leather companions for\nthe cycles of life.'}</span>
              <span className="hidden md:block">
                <span className="block whitespace-nowrap text-[62px] leading-[1.02]">{locale === 'fr' ? 'Compagnons De Cuir' : 'Leather Companions'}</span>
                <span className="mt-4 block whitespace-nowrap text-[38px] leading-[1.08]">{locale === 'fr' ? 'Au Rythme Des Cycles De La Vie.' : 'Through The Cycles Of Life.'}</span>
              </span>
            </h1>
            <p className="mt-6 max-w-[520px] whitespace-pre-line text-[12px] leading-[1.6] text-parchment/76">
              {locale === 'fr' ? 'Façonnés avec patience, précision et âme.\nPensés pour vieillir magnifiquement entre vos mains.' : 'Crafted with patience, precision, and soul. \nMade to age beautifully in your hands.'}
            </p>
            <div className="mt-9 flex flex-wrap gap-3.5">
              <Link href={productsHref(locale)} className="btn-primary">
                <span className="md:hidden">{locale === 'fr' ? 'Boutique' : 'Shop'}</span>
                <span className="hidden md:inline">{locale === 'fr' ? 'Trouver votre compagnon' : 'Find your companion'}</span>
              </Link>
              <Link href={meetHref(locale)} className="btn-secondary border-garnet bg-parchment/95 text-garnet hover:border-garnet hover:bg-garnet hover:text-parchment">
                {locale === 'fr' ? '→ Rencontrer la créatrice' : '→ Meet the maker'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="overflow-hidden border-y border-umber/10 bg-parchment py-3 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-azaliIndigo">
        <div className="marquee whitespace-nowrap">
          <span>AZALI · HANDMADE IN TUNISIA · EXCLUSIVE ONCE IN A LIFETIME PIECES · TIMELESS COMPANIONS · PERSONALIZED ITEMS · </span>
          <span>AZALI · HANDMADE IN TUNISIA · EXCLUSIVE ONCE IN A LIFETIME PIECES · TIMELESS COMPANIONS · PERSONALIZED ITEMS · </span>
        </div>
      </div>

      <section className="page-wrap page-pad">
        <div className="mb-9 flex items-end justify-between gap-8">
          <div className="max-w-xl">
            <p className="origin-label">{t.categories}</p>
            <h2 className="mt-4 font-display text-3xl leading-tight text-espresso md:text-4xl">{locale === 'fr' ? 'Choisir par usage' : 'Choose by use'}</h2>
          </div>
          <Link href={productsHref(locale)} className="hidden text-[0.72rem] font-semibold uppercase tracking-[0.21em] text-azaliIndigo underline-offset-8 transition hover:text-garnet hover:underline md:block">
            {locale === 'fr' ? 'Tout voir' : 'View all'}
          </Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
          {mainCategory && (
            <CategoryCard
              category={mainCategory}
              locale={locale}
              featured
              nameOverride={locale === 'fr' ? 'Porte-carnets' : 'Notebook Holder'}
              descriptorOverride={locale === 'fr' ? 'Garde les carnets qui gardent vos pensées.\nChangez les carnets. Gardez le cuir.' : 'Holds the notebooks that hold your thoughts.\nChange the notebooks. Keep the leather.'}
            />
          )}
          <div className="grid gap-6">{sideCategories.map((category) => <CategoryCard key={category.id} category={category} locale={locale} />)}</div>
        </div>
      </section>

      <section className="bg-[#F8F6F2] py-20 md:py-24">
        <div className="page-wrap">
          <div className="max-w-xl">
            <p className="accent-label">{t.featured}</p>
            <h2 className="mt-4 font-display text-3xl leading-tight text-espresso md:text-4xl">{locale === 'fr' ? 'Fait main, prêt pour vos mains..' : 'Made by hand, ready for yours..'}</h2>
          </div>
          <div className="mt-10 product-grid">{shownProducts.map((product) => {
            const overrides: Record<string, string> = {
              'azali-assassi-notebook': locale === 'fr' ? 'La pièce qui parle de vous avant vous.' : 'The statement piece that speaks about you before you do.',
              'azali-fannen-notebook': locale === 'fr' ? 'Pour les esprits multiples, pour organiser vos pensées.' : 'For the multitalented, to organize your thoughts.',
              'azali-card-wallet': locale === 'fr' ? 'Une pièce calme pour ce que vous touchez chaque jour.' : 'A quiet piece for the things you reach for daily.',
              'everyday-wallet': locale === 'fr' ? 'Une pièce calme pour ce que vous touchez chaque jour.' : 'A quiet piece for the things you reach for daily.'
            };
            return <ProductCard key={product.id} product={product} locale={locale} descriptionOverride={overrides[product.slug]} />;
          })}</div>
        </div>
      </section>

      <section className="bg-espresso py-16 text-parchment md:py-20">
        <div className="mx-auto max-w-[1180px] px-6 md:px-10">
          <p className="text-[0.64rem] font-semibold uppercase tracking-[0.23em] text-sand">{locale === 'fr' ? 'Pourquoi AZALI' : 'Why AZALI'}</p>
          <div className="mt-8 grid gap-12 md:grid-cols-3 md:gap-12">
            {[
              {
                word: locale === 'fr' ? 'FAIT MAIN' : 'HANDMADE',
                body: locale === 'fr' ? 'Chaque pièce porte intention, caractère et trace humaine.' : 'Each piece carries what machines cannot give; intention, character, and a human touch.'
              },
              {
                word: locale === 'fr' ? 'UNIQUE' : 'UNREPEATABLE',
                body: locale === 'fr' ? 'Chaque chute façonne une collection limitée et unique qui ne pourra jamais être répétée.' : 'Each offcut shapes a limited and unique collection that can never be repeated.'
              },
              {
                word: locale === 'fr' ? 'CHUTES' : 'OFFCUTS',
                body: locale === 'fr' ? 'AZALI voit le potentiel dans chaque chute, choisie pour sa qualité, son grain et son caractère.' : 'AZALI sees potential in every offcut, selected \nfor quality, grain, and character.'
              }
            ].map((item) => (
              <div key={item.word} className="min-w-0">
                <h2 className="font-display text-[34px] leading-none text-sand md:text-[42px]">{item.word}</h2>
                <p className="whitespace-pre-line mt-4 max-w-[350px] text-[14px] leading-[25px] text-parchment/72">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-wrap py-24 md:py-28">
        <div className="grid gap-12 md:grid-cols-[0.62fr_1.38fr] md:items-center md:gap-16">
          <div className="relative min-h-[230px] border-l border-garnet/70 pl-8 md:pl-10">
            <span className="pointer-events-none absolute left-2 top-9 font-display text-[86px] leading-none text-sand opacity-[0.18]">أزلي</span>
            <p className="origin-label relative">{locale === 'fr' ? 'Philosophie' : 'Philosophy'}</p>
            <h2 className="relative mt-12 font-display tracking-[-0.02em] text-espresso">
              <span className="block whitespace-nowrap text-[34px] leading-none">{locale === 'fr' ? 'Le cuir garde' : 'Leather keeps'}</span>
              <span className="mt-1 block whitespace-nowrap text-[50px] leading-[0.94]">{locale === 'fr' ? 'la trace de la vie.' : 'the trace of life.'}</span>
            </h2>
          </div>
          <div className="pt-2 md:pt-8">
            <div className="space-y-1 text-[15px] leading-[1.45] text-umber/72">
              <p className="whitespace-nowrap">{locale === 'fr' ? 'Aucun toucher, trait ou pli ne passe inaperçu.' : 'No touch, stroke or squeeze goes unnoticed.'}</p>
              <p className="whitespace-nowrap">{locale === 'fr' ? 'Chaque marque, patine et nuance raconte une histoire de continuité.' : 'Every mark, patina, and shade tells a story of continuity.'}</p>
              <p className="whitespace-nowrap">{locale === 'fr' ? 'AZALI célèbre les objets que l’on garde, répare et transmet.' : 'AZALI celebrates objects you keep, repair, and pass on.'}</p>
            </div>
            <Link href={ethicsHref(locale)} className="mt-9 inline-flex text-sm font-semibold uppercase tracking-[0.2em] text-azaliIndigo underline-offset-8 transition hover:text-garnet hover:underline">
              {locale === 'fr' ? '→ Consommer mieux: choisir le cuir' : '→ Consume better: choose leather'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
