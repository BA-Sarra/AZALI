import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import type { Locale } from '@/lib/i18n';
import { pick } from '@/lib/i18n';

function renderPolicyBody(text: string) {
  return text.split('\n\n').map((block, index) => {
    if (block.startsWith('## ')) {
      return <h2 key={index} className="font-display text-2xl leading-tight text-espresso">{block.replace('## ', '')}</h2>;
    }
    return <p key={index}>{block}</p>;
  });
}

export async function PolicyPage({ locale, slug }: { locale: Locale; slug: string }) {
  const page = await prisma.policyPage.findFirst({ where: locale === 'fr' ? { slugFr: slug } : { slugEn: slug } });
  if (!page) notFound();
  return (
    <section className="mx-auto max-w-[820px] px-6 py-20 md:py-24">
      <p className="origin-label">AZALI</p>
      <h1 className="mt-4 font-display text-3xl text-espresso md:text-4xl">{pick(locale, page.titleFr, page.titleEn)}</h1>
      <article className="prose-azali mt-10 text-sm leading-7 text-bark/80">{renderPolicyBody(pick(locale, page.bodyFr, page.bodyEn))}</article>
    </section>
  );
}
