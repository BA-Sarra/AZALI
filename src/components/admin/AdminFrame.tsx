import { requireAdmin } from '@/lib/adminAuth';
import { AdminNav } from './AdminNav';

export async function AdminFrame({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return <div className="grid min-h-screen bg-ivory text-espresso md:grid-cols-[260px_1fr]"><AdminNav /><main className="p-6 lg:p-10">{children}</main></div>;
}
