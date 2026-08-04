'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CalendarDays } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useLocale } from '@/contexts/LocaleContext';
import { cn } from '@/lib/utils';

const HIDE_SECTION_IDS = ['hero', 'evening'] as const;

export function MobileBottomBar() {
  const { t } = useLocale();
  const pathname = usePathname();
  const [hidden, setHidden] = useState(pathname === '/');

  useEffect(() => {
    const visible = new Map<string, boolean>();

    const sync = () => {
      setHidden([...visible.values()].some(Boolean));
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(
            entry.target.id,
            entry.isIntersecting && entry.intersectionRatio >= 0.12,
          );
        }
        sync();
      },
      {
        threshold: [0, 0.12, 0.25, 0.5, 0.75, 1],
        rootMargin: '0px 0px -8% 0px',
      },
    );

    const observeAvailable = () => {
      for (const id of HIDE_SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el || visible.has(id)) continue;
        visible.set(id, false);
        observer.observe(el);
      }
      if (!visible.size) setHidden(false);
    };

    observeAvailable();
    // Homepage sections may mount slightly after this bar.
    const retry = window.setTimeout(observeAvailable, 120);
    const retryLate = window.setTimeout(observeAvailable, 500);

    return () => {
      window.clearTimeout(retry);
      window.clearTimeout(retryLate);
      observer.disconnect();
    };
  }, [pathname]);

  return (
    <div
      className={cn(
        'safe-area-bottom fixed bottom-4 right-4 z-40 transition-all duration-300 md:hidden',
        hidden
          ? 'pointer-events-none translate-y-3 opacity-0'
          : 'translate-y-0 opacity-100',
      )}
    >
      <Link
        href="/prenota"
        tabIndex={hidden ? -1 : 0}
        aria-hidden={hidden}
        className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-neon-pink/70 bg-navy px-5 text-sm font-semibold uppercase tracking-[0.14em] text-cream shadow-neon-horizon transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-teal focus-visible:ring-offset-2 focus-visible:ring-offset-navy active:scale-95"
      >
        <CalendarDays className="h-4 w-4" aria-hidden />
        <span>{t('mobileBook')}</span>
      </Link>
    </div>
  );
}
