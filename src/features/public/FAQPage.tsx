import { prisma } from '@/lib/prisma';
import type { Locale } from '@/lib/i18n';
import { pick } from '@/lib/i18n';

export async function FAQPage({ locale }: { locale: Locale }) {
  const entries = await prisma.fAQEntry.findMany({ where: { isVisible: true }, orderBy: { sortOrder: 'asc' } });
  return (
    <section className="mx-auto max-w-[820px] px-6 py-20 md:py-24">
      <p className="origin-label">AZALI</p>
      <h1 className="mt-4 font-display text-3xl md:text-4xl">FAQ</h1>
      <div className="mt-10 space-y-4">
        {entries.map((entry) => (
          <details key={entry.id} className="card p-5">
            <summary className="cursor-pointer font-display text-xl leading-tight text-espresso">{pick(locale, entry.questionFr, entry.questionEn)}</summary>
            <p className="mt-4 text-sm leading-7 text-umber/70">{pick(locale, entry.answerFr, entry.answerEn)}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
