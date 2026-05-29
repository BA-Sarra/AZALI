import Image from 'next/image';
import type { Locale } from '@/lib/i18n';

const content = {
  fr: {
    place: 'Tunis, Tunisie',
    title: 'Les Mains\nDerrière Le Geste.',
    quote: '“Je ne suis pas faite pour entrer dans un monde pressé, superficiel et sans couleur.”',
    story: [
      'J’ai découvert le travail du cuir à 19 ans. Je préparais un cadeau pour une amie, un livre de poèmes cousu, et j’avais besoin de cuir parmi d’autres matières. Ce moment a changé quelque chose. Avant cela, je ne savais pas encore ce que je voulais vraiment faire.',
      'J’ai toujours eu un penchant pour créer avec mes mains: dessiner, écrire, peindre, construire des jouets, composer de la musique, bricoler des objets utiles. En grandissant, j’ai découvert une autre source de joie: aider les gens.',
      'Jusqu’à mes 25 ans, j’avais tous les points, mais pas encore le lien. J’ai suivi le conseil de mon cousin: disparaître une semaine, réfléchir à ce qui me rend heureuse et à ce que je sais faire, puis chercher leur intersection.'
    ],
    likes: 'Ce que j’aime',
    likesDisplay: ['Créer', 'de la beauté', 'Aider', 'les gens'],
    center: 'AZALI',
    skills: 'Ce que je sais faire',
    skillsDisplay: ['Voir', 'le potentiel', 'Créer avec', 'mes mains'],
    second: 'Me voilà après des années d’études en informatique, un diplôme d’ingénieure, quelques mois de recherche et deux papiers publiés, profondément revenue à ma passion et à mon vrai appel: créer de la beauté avec le cuir et partager mon savoir en grandissant.',
    commitmentTitle: 'Mon engagement',
    commitment: 'Ma promesse à vous, chère propriétaire ou cher propriétaire, est de faire chaque pièce comme si elle m’était destinée. Je prends le temps pour chaque coupe et chaque point, et une part de mon âme finit toujours par s’y glisser.\n\nAvec intention et dévotion, je transmets aussi à chaque personne qui reçoit une pièce l’envie de la traiter avec soin et attention.'
  },
  en: {
    place: 'Tunis, Tunisia',
    title: 'The Hands\n\nBehind The Craft.',
    quote: '“I am not made to fit into a rushed, shallow and colorless world.”',
    story: [
      'I discovered leather crafting when I was 19 years old. I was making a gift for a friend, a sewn poem book, and I needed leather among other things. That was a turning point in my life. Before then I did not know what I truly wanted to do.',
      'I’ve always had a keen for using my hands to create; draw, write, paint, build toys, create music, diy utilities,.. And as I grew, I discovered another source of pleasure; helping people out.',
      'Up until 25 years old, I was still lost, I had all the dots, but the connection was missing. I took the advice of my cousin; dissociate for a week and brainstorm all the ways that make you happy and all the things you’re good at, then find the intersection between them.'
    ],
    likes: 'What I like',
    likesDisplay: ['Creating', 'Beauty', 'Helping', 'People'],
    center: 'AZALI',
    skills: 'What I’m good at',
    skillsDisplay: ['Seeing', 'Potential', 'Creating With', 'My Hands'],
    second: 'Here I am after years of computer science engineering studies and a diploma, a few months of research and two published papers, deep into my passion and my true calling; Creating beauty with leather and sharing my knowledge as I grow.',
    commitmentTitle: 'My commitment',
    commitment: 'My promise to you dear owner, is that I make every piece as if I will own it. As I take my time with every cut and every stitch, part of my soul seeps into it.\n\nWith intention and full devotion to each piece, I pass on my commitment to each owner to treat these beautiful creations with care and attention.'
  }
};

export function MeetArtistPage({ locale }: { locale: Locale }) {
  const page = content[locale];
  return (
    <main className="page-wrap py-20 md:py-24">
      <section>
        <p className="origin-label">{page.place}</p>
        <h1 className="mt-5 whitespace-pre-line font-display text-[3rem] leading-[0.96] tracking-[-0.02em] text-espresso md:text-[5.2rem]">
          {page.title}
        </h1>
        <div className="mt-12 grid gap-12 md:grid-cols-[0.82fr_1fr] md:items-start md:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-sand/40">
            <Image src="/placeholders/artist.svg" alt={locale === 'fr' ? 'Les mains derrière AZALI' : 'The hands behind AZALI'} fill className="object-cover" />
          </div>
          <div>
            <blockquote className="max-w-[560px] font-display text-3xl italic leading-tight text-garnet md:text-[2.65rem]">
              {page.quote}
            </blockquote>
            <div className="mt-8 space-y-5 text-sm leading-7 text-umber/75 md:text-base md:leading-8">
              {page.story.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
        </div>
      </section>

      <section className="my-20 border-y border-sand/80 py-16 md:my-24 md:py-20">
        <div className="grid gap-10 text-center md:grid-cols-[1fr_0.7fr_1fr] md:items-center">
          <div className="md:text-left">
            <p className="origin-label">{page.likes}</p>
            <div className="mt-7 space-y-3 font-display text-[2.55rem] uppercase leading-[1.05] tracking-[0.18em] text-espresso md:text-[3.45rem]">
              {page.likesDisplay.map((item) => <p key={item}>{item}</p>)}
            </div>
          </div>
          <div className="mx-auto grid h-48 w-48 place-items-center rounded-full border border-garnet/35 text-[0.78rem] font-semibold uppercase tracking-[0.42em] text-garnet md:h-56 md:w-56">
            {page.center}
          </div>
          <div className="md:text-right">
            <p className="origin-label">{page.skills}</p>
            <div className="mt-7 space-y-3 font-display text-[2.55rem] uppercase leading-[1.05] tracking-[0.18em] text-espresso md:text-[3.45rem]">
              {page.skillsDisplay.map((item) => <p key={item}>{item}</p>)}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-12 md:grid-cols-[1fr_0.82fr] md:items-start md:gap-16">
        <div>
          <p className="text-sm leading-7 text-umber/75 md:text-base md:leading-8">{page.second}</p>
          <div className="mt-12">
            <h2 className="font-display text-3xl leading-tight text-espresso md:text-4xl">{page.commitmentTitle}</h2>
            <p className="mt-6 whitespace-pre-line text-sm leading-7 text-umber/75 md:text-base md:leading-8">{page.commitment}</p>
          </div>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-sand/40">
          <Image src="/placeholders/workshop.svg" alt={locale === 'fr' ? 'Atelier AZALI' : 'AZALI workshop'} fill className="object-cover" />
        </div>
      </section>
    </main>
  );
}
