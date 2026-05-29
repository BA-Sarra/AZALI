import { prisma } from '@/lib/prisma';
import { AdminFrame } from '@/components/admin/AdminFrame';
import { saveFAQ } from '@/app/admin/actions';

export default async function FAQAdmin() {
  const entries = await prisma.fAQEntry.findMany({ orderBy: { sortOrder: 'asc' } });
  return <AdminFrame><h1 className="font-display text-5xl">FAQ</h1><form action={saveFAQ} className="card mt-8 grid gap-4 p-6"><input className="input" name="questionFr" placeholder="Question FR" required /><input className="input" name="questionEn" placeholder="Question EN" required /><textarea className="input" name="answerFr" placeholder="Answer FR" required /><textarea className="input" name="answerEn" placeholder="Answer EN" required /><input className="input" name="sortOrder" type="number" placeholder="Sort order" /><button className="btn-primary">Add FAQ</button></form><div className="mt-8 space-y-3">{entries.map((e) => <div key={e.id} className="card p-5"><strong>{e.questionFr}</strong><p className="text-sm text-bark/70">{e.answerFr}</p></div>)}</div></AdminFrame>;
}
