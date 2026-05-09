'use client';

import Link from 'next/link';
import { Phone, CalendarDays, MessageCircle } from 'lucide-react';
import { CONTACT, WHATSAPP_HREF } from '@/lib/site';
import { useLocale } from '@/contexts/LocaleContext';

export function MobileBottomBar() {
  const { t } = useLocale();

  return (
    <div className="safe-area-bottom fixed inset-x-0 bottom-0 z-40 border-t border-navy/20 bg-gold text-navy md:hidden">
      <div className="grid h-14 grid-cols-3 divide-x divide-navy/15">
        <a
          href={CONTACT.phoneHref}
          className="inline-flex min-h-[44px] items-center justify-center gap-1.5 text-xs font-semibold tracking-wide sm:gap-2 sm:text-sm"
        >
          <Phone className="h-4 w-4 shrink-0" aria-hidden />
          {t('mobileCall')}
        </a>
        <a
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center justify-center gap-1.5 text-xs font-semibold tracking-wide sm:gap-2 sm:text-sm"
        >
          <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />
          {t('mobileWhatsApp')}
        </a>
        <Link
          href="/prenota"
          className="inline-flex min-h-[44px] items-center justify-center gap-1.5 text-xs font-semibold tracking-wide sm:gap-2 sm:text-sm"
        >
          <CalendarDays className="h-4 w-4 shrink-0" aria-hidden />
          {t('mobileBook')}
        </Link>
      </div>
    </div>
  );
}
