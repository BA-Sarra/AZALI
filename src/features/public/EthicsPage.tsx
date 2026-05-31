import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import { productsHref } from '@/lib/routes';

type EthicsCard = {
  no: string;
  title: string;
  body: string;
  italic?: string;
};

type EthicsContent = {
  eyebrow: string;
  title: string;
  intro: string;
  imageAlt: string;
  cards: EthicsCard[];
  closingTitle: string;
  closing: string;
  itclosing: string;
  cta: string;
};

const content: Record<Locale, EthicsContent> = {
  fr: {
    eyebrow: 'AZALI',
    title: 'Consommer mieux.\nChoisir le cuir.',
    intro:
      'La majorité du cuir que je travaille vient de chutes. Ces pièces existent déjà: elles ont été coupées, oubliées ou mises de côté par d’autres productions. Mon travail est de leur donner une autre vie, une autre forme et une vraie utilité. Aucun cuir ne mérite d’être jeté.',
    imageAlt: 'Chutes de cuir sur la table de travail',
    cards: [
      {
        no: '01',
        title: 'La valeur de ce qui reste',
        body:
          'Les chutes de cuir ne sont pas des déchets par nature. Elles le deviennent lorsque personne ne prend le temps de les transformer en quelque chose d’utile et de beau.',
        italic:
          'Voyez ce que les autres manquent, et laissez-le vous distinguer.',
      },
      {
        no: '02',
        title: 'Une matière avec une histoire',
        body:
          'Le cuir est un sous-produit de l’industrie alimentaire. Il n’est pas fabriqué à partir de rien. Nous travaillons avec ce qui existe déjà dans le monde plutôt que d’y ajouter plus.',
        italic:
          'Porter nos pièces, c’est porter ce choix.',
      },
      {
        no: '03',
        title: 'Posséder mieux, pas plus.',
        body:
          'Une vraie pièce en cuir peut être réparée, nourrie, patinée et gardée. Après quelques années, elle vous ressemble plus qu’au jour de son achat.',
        italic:
          'Quittez la fast fashion et possédez quelque chose qui dure.',
      },
      {
        no: '04',
        title: 'Le plastique ne se patine pas',
        body:
          'Le similicuir utilise souvent des matières à base de plastique, se fissure plus vite, vieillit mal et devient déchet plus tôt.',
        italic:
          'C’est certainement moins cher, mais à quel coût?',
      },
    ],
    closingTitle: 'Notre position chez AZALI',
    closing:
      'Nous ne surproduisons pas. Nous ne jetons pas ce qui peut encore devenir beau. Nous créons des pièces qui méritent d’être gardées.',
    itclosing:'Choosing AZALI means taking a step towards a more ethical and sustainable consumerism.',
    cta: 'Trouver votre compagnon',
  },

  en: {
    eyebrow: 'AZALI',
    title: 'Consume Better.\nChoose Leather.',
    intro:
      'Most of the leather we work with comes from offcuts. These pieces already exist: they were cut, forgotten, or set aside by other productions. Our work is to give them another life, another form, and a real use. No leather deserves to be thrown away.',
    imageAlt: 'Leather offcuts on the work table',
    cards: [
      {
        no: '01',
        title: 'The value of what remains',
        body:
          'Leather offcuts are not waste by nature. They become waste when nobody takes the time to turn them into something useful and beautiful. Artists can do that.',
        italic:
          'Take what others missed, and let it set you apart.',
      },
      {
        no: '02',
        title: 'A material with history',
        body:
          'Leather is a byproduct of the food industry. It is not manufactured. We work with what was already in the world rather than adding more to it.',
        italic:
          'When you carry our pieces, you are carrying that choice.',
      },
      {
        no: '03',
        title: 'Own better, not more.',
        body:
          'A true leather piece can be repaired, conditioned, patinated, and kept. After a few years, it looks more like you than when you bought it.',
        italic:
          'Drop the fast fashion and own something that lasts.',
      },
      {
        no: '04',
        title: 'Plastic does not patinate',
        body:
          'Faux leather often uses plastic based materials, cracks faster, ages poorly, and becomes waste sooner.',
        italic:
          'It is certainly cheaper, but at what cost?',
      },
    ],
    closingTitle: 'Our Position as AZALI',
    closing:
      'We do not overproduce. We do not discard what can still become beautiful. We create pieces that last and deserve to be kept.',
    itclosing:'Choosing AZALI means taking a step towards a more ethical and sustainable consumerism.',
    cta: 'Find your companion',
  },
};

export function EthicsPage({ locale }: { locale: Locale }) {
  const page = content[locale];

  return (
    <main className="page-wrap py-20 md:py-24">
      <section className="max-w-[1000px]">
        <p className="origin-label">{page.eyebrow}</p>

        <h1 className="mt-5 whitespace-pre-line font-display text-[3.1rem] leading-[0.98] text-espresso md:text-[4.45rem] md:leading-[0.96]">
          {page.title}
        </h1>

        <p className="mt-8 max-w-[1000px] text-[15px] leading-[29px] text-umber/70 md:text-[16px] md:leading-[31px]">
          {page.intro}
        </p>
      </section>

      <div className="relative mt-10 aspect-[6.4/2] overflow-hidden rounded-md border border-sand/70 bg-sand/30 md:mt-12">
        <Image
          src="/placeholders/workshop.svg"
          alt={page.imageAlt}
          fill
          className="object-cover opacity-90"
          priority
        />
      </div>

      <section className="mt-12 grid gap-8 md:grid-cols-2 md:gap-x-8 md:gap-y-10">
        {page.cards.map((card, index) => (
          <article
            key={card.no}
            className={`relative min-h-[174px] overflow-hidden rounded-md border border-sand/70 bg-offWhite/70 px-6 py-6 shadow-none md:px-7 md:py-7 ${
              index % 2 === 0
                ? 'border-l-[4px] border-l-garnet'
                : 'border-l-[4px] border-l-azaliIndigo'
            }`}
          >
            <span className="pointer-events-none absolute right-6 top-3 font-display text-[2.5rem] leading-none text-sand/45 md:text-[3.5rem]">
              {card.no}
            </span>

            <h2 className="relative max-w-[330px] font-display text-[1.45rem] leading-[1.1] text-espresso md:text-[1.7rem]">
              {card.title}
            </h2>

            <p className="relative mt-6 max-w-[410px] whitespace-pre-line text-[14px] leading-[25px] text-umber/62">
              {card.body}
            </p>

            {card.italic ? (
              <p className="relative mt-3 max-w-[410px] text-[14px] leading-[20px] font-semibold italic text-umber/65">
                {card.italic}
              </p>
            ) : null}
          </article>
        ))}
      </section>

      <section className="mx-auto mt-16 max-w-[920px] text-center md:mt-18">
        <h2 className="font-display text-[1.7rem] leading-tight text-espresso md:text-[2rem]">
          {page.closingTitle}
        </h2>

        <p className="mx-auto mt-5 max-w-[900px] text-[13px] leading-[24px] text-umber/62 md:text-[14px]">
          {page.closing}
        </p>
        <p className="mx-auto max-w-[850px] text-[13px] leading-[24px] font-semibold italic text-umber/62 md:text-[14px] opacity-70">
          {page.itclosing}
        </p>

        <Link href={productsHref(locale)} className="btn-primary mt-8 inline-flex">
          {page.cta}
        </Link>
      </section>
    </main>
  );
}