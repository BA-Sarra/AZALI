import type { Locale } from '@/lib/i18n';
import { getContactInfo } from '@/lib/settings';
import { SiteHeader } from './SiteHeader';
import { Footer } from './Footer';

export async function LocalizedShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const contact = await getContactInfo();
  return (
    <>
      <SiteHeader locale={locale} />
      <main>{children}</main>
      <Footer locale={locale} contact={contact} />
    </>
  );
}
