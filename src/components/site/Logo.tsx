import Link from 'next/link';
import { homeHref } from '@/lib/routes';
import type { Locale } from '@/lib/i18n';

export function Logo({ locale = 'fr' as Locale, dark = false }: { locale?: Locale; dark?: boolean }) {
  return (
    <Link href={homeHref(locale)} className="inline-flex items-center" aria-label="AZALI home">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={dark ? '/brand/logo-light.svg' : '/brand/logo-dark.svg'} alt="AZALI" className="h-9 w-auto max-w-[150px] object-contain md:h-10" />
    </Link>
  );
}
