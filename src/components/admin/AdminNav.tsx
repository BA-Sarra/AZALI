import Link from 'next/link';
import { logoutAdmin } from '@/app/admin/login/actions';

const links = [
  ['Dashboard', '/admin'], ['Products', '/admin/products'], ['Categories', '/admin/categories'], ['Customizations', '/admin/customizations'], ['Orders', '/admin/orders'], ['Pages', '/admin/pages'], ['FAQ', '/admin/faq'], ['Policies', '/admin/policies'], ['Settings', '/admin/settings'], ['Media', '/admin/media']
];

export function AdminNav() {
  return (
    <aside className="min-h-screen border-r border-espresso/10 bg-espresso p-5 text-ivory">
      <div className="font-display text-2xl tracking-[0.2em]">AZALI</div>
      <nav className="mt-8 space-y-1">
        {links.map(([label, href]) => <Link key={href} href={href} className="block rounded-lg px-4 py-3 text-sm text-ivory/75 hover:bg-white/10 hover:text-white">{label}</Link>)}
      </nav>
      <form action={logoutAdmin} className="mt-8">
        <button className="w-full rounded-lg border border-white/15 px-4 py-3 text-left text-sm text-ivory/75 hover:bg-white/10 hover:text-white">Logout</button>
      </form>
    </aside>
  );
}
