import { prisma } from '@/lib/prisma';
import { AdminFrame } from '@/components/admin/AdminFrame';

export default async function PagesAdmin() {
  const pages = await prisma.page.findMany({ include: { sections: { orderBy: { sortOrder: 'asc' } } } });
  return <AdminFrame><h1 className="font-display text-5xl">Pages</h1><p className="mt-4 text-bark/70">The seed includes editable sections. For MVP, edit page text directly in your database tool, such as Neon SQL Editor, or extend this screen with richer section controls.</p><div className="mt-8 space-y-4">{pages.map((page) => <div key={page.id} className="card p-6"><h2 className="font-display text-3xl">{page.titleFr} / {page.titleEn}</h2><p className="text-sm text-bark/60">{page.slug}</p><div className="mt-4 space-y-2">{page.sections.map((section) => <div key={section.id} className="rounded-lg bg-sand/50 p-3 text-sm">{section.type} · {section.titleFr}</div>)}</div></div>)}</div></AdminFrame>;
}
