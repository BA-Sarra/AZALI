import Image from 'next/image';
import type { Locale } from '@/lib/i18n';

const content = {
  fr: {
    place: 'Tunis, Tunisie',
    titleLine1: 'Les Mains',
    titleLine2: 'Derrière Le Geste.',
    quote:
      '“Je ne suis pas faite pour entrer dans un monde pressé, superficiel et sans couleur.”',
    story: [
      'J’ai découvert le travail du cuir à 19 ans. Je préparais un cadeau pour une amie, un livre de poèmes cousu, et j’avais besoin de cuir parmi d’autres matières. Ce moment a changé quelque chose. Avant cela, je ne savais pas encore ce que je voulais vraiment faire.',
      'J’ai toujours eu un penchant pour créer avec mes mains: dessiner, écrire, peindre, construire des jouets, composer de la musique, bricoler des objets utiles. En grandissant, j’ai découvert une autre source de joie: aider les gens.',
    ],
    advice:
      'Jusqu’à mes 25 ans, j’avais tous les points, mais pas encore le lien. J’ai suivi le conseil de mon cousin: disparaître une semaine, réfléchir à ce qui me rend heureuse et à ce que je sais faire, puis chercher leur intersection.',
    second:
      'Me voilà après des années d’études en informatique, un diplôme d’ingénieure, quelques mois de recherche et deux papiers publiés, profondément revenue à ma passion et à mon vrai appel: créer de la beauté avec le cuir et partager mon savoir en grandissant.',
    commitmentTitle: 'Mon engagement',
    commitment:
      'Ma promesse à vous, chère propriétaire ou cher propriétaire, est de faire chaque pièce comme si elle m’était destinée. Je prends le temps pour chaque coupe et chaque point, et une part de mon âme finit toujours par s’y glisser.\n\nAvec intention et dévotion, je transmets aussi à chaque personne qui reçoit une pièce l’envie de la traiter avec soin et attention.',
  },
  en: {
    place: 'Tunis, Tunisia',
    titleLine1: 'The Hands',
    titleLine2: 'Behind The Craft.',
    quote:
      '“I am not made to fit into a rushed, shallow and colorless world.”',
    story: [
      'I discovered leather crafting when I was 19 years old. I was making a gift for a friend, a sewn poem book, and I needed leather among other things. That was a turning point in my life. Before then I did not know what I truly wanted to do.',
      'I’ve always had a keen for using my hands to create; draw, write, paint, build toys, create music, diy utilities,.. And as I grew, I discovered another source of pleasure; helping people out.',
    ],
    advice:
      'Up until 25 years old, I was still lost, I had all the dots, but the connection was missing. I took the advice of my cousin; dissociate for a week, brainstorm all the ways that make you happy and all the things you’re good at, then find the intersection between them.',
    second:
      'Here I am after years of computer science engineering studies and a diploma, a few months of research and two published papers, deep into my passion and my true calling; Creating beauty with leather and sharing my knowledge as I grow.',
    commitmentTitle: 'My commitment',
    commitment:
      'My promise to you dear owner, is that I make every piece as if I will own it. As I take my time with every cut and every stitch, part of my soul seeps into it.\n\nWith intention and full devotion to each piece, I pass on my commitment to each owner to treat these beautiful creations with care and attention.',
  },
};

export function MeetArtistPage({ locale }: { locale: Locale }) {
  const page = content[locale];

  return (
    <main className="page-wrap py-14 md:py-16">
      <section>
        <h1 className="font-display tracking-[-0.02em] text-espresso">
          <span className="block text-[4.6rem] leading-[0.92] md:text-[4.75rem]">
            {page.titleLine1}
          </span>
          <span className="mt-2 block text-[3.3rem] leading-[0.94] md:text-[2.93rem]">
            {page.titleLine2}
          </span>
        </h1>

        <div className="mt-12 grid gap-12 md:grid-cols-[0.8fr_1fr] md:items-start md:gap-15">
          <div className="relative aspect-[4/4] overflow-hidden rounded-md border border-sand/70 bg-sand/40">
            <Image
              src="/placeholders/maker.png"
              alt={
                locale === 'fr'
                  ? 'Les mains derrière AZALI'
                  : 'The hands behind AZALI'
              }
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="pt-8 md:pt-7">
            <blockquote className="max-w-[700px] font-display text-[1.7rem] italic leading-[1.45] tracking-[0.02em] text-garnet md:text-[1.9rem]">
              {page.quote}
            </blockquote>

            <div className="mt-8 max-w-[660px] space-y-6 text-[16px] text-justify leading-[29px] text-umber/70">
              {page.story.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="my-12 py-16 md:my-5 md:py-10">
        <p className="mx-auto max-w-[1120px] text-[15px] text-justify leading-[30px] text-umber/70 md:text-[16px] md:leading-[32px]">
          {page.advice}
        </p>

        <div className="mx-auto mt-14 grid max-w-[650px] place-items-center">
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-md">
            <Image
              src="/placeholders/schema.png"
              alt={
                locale === 'fr'
                  ? 'Intersection créative AZALI'
                  : 'AZALI creative intersection'
              }
              fill
              className="object-cover opacity-100"
            />
            
          </div>
        </div>

        <p className="mx-auto mt-14 max-w-[1120px] text-[15px] text-justify leading-[30px] text-umber/70 md:text-[16px] md:leading-[32px]">
          {page.second}
        </p>
      </section>

      <section className="mt-10 grid gap-12 md:grid-cols-[1fr_0.7fr] md:items-start md:gap-16">
        <div>
          <h2 className="mt-7 font-display text-3xl leading-tight text-espresso md:text-4xl">
            {page.commitmentTitle}
          </h2>

          <p className="mt-6 whitespace-pre-line text-[15px] text-justify leading-7 text-umber/75 md:text-base md:leading-8">
            {page.commitment}
          </p>
        </div>

        <div className="relative aspect-[1/1] max-w-[350px] overflow-hidden border rounded-lg">
          <Image
            src="/placeholders/commitment.jpeg"
            alt={locale === 'fr' ? 'Atelier AZALI' : 'AZALI workshop'}
            fill
            className="object-cover opacity-100"
          />
        </div>
      </section>
    </main>
  );
}