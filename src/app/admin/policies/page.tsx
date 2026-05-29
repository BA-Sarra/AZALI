import { prisma } from '@/lib/prisma';
import { AdminFrame } from '@/components/admin/AdminFrame';
import { savePolicy } from '@/app/admin/actions';

export default async function PoliciesAdmin() {
  const policies = await prisma.policyPage.findMany({ orderBy: { titleFr: 'asc' } });
  return <AdminFrame><h1 className="font-display text-5xl">Policies</h1><div className="mt-8 space-y-6">{policies.map((p) => <form key={p.id} action={savePolicy} className="card grid gap-4 p-6"><input type="hidden" name="id" value={p.id} /><h2 className="font-display text-3xl">{p.titleFr}</h2><input className="input" name="titleFr" defaultValue={p.titleFr} /><input className="input" name="titleEn" defaultValue={p.titleEn} /><textarea className="input min-h-48" name="bodyFr" defaultValue={p.bodyFr} /><textarea className="input min-h-48" name="bodyEn" defaultValue={p.bodyEn} /><button className="btn-primary">Save</button></form>)}</div></AdminFrame>;
}
