'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLocale } from '@/contexts/LocaleContext';
import type { Locale } from '@/lib/i18n/locales';
import { LOCALES, LOCALE_LABELS } from '@/lib/i18n/locales';
import { cn } from '@/lib/utils';

type Props = {
  variant?: 'onDark' | 'onHero';
  className?: string;
};

export function LanguageSwitcher({ variant = 'onDark', className }: Props) {
  const { locale, setLocale, t } = useLocale();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const onHero = variant === 'onHero';

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <span className="sr-only">{t('langLabel')}</span>
      <button
        type="button"
        aria-label={t('langLabel')}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'inline-flex h-8 items-center gap-1 rounded-sm border bg-transparent px-2 text-[11px] font-medium uppercase tracking-[0.14em] transition-colors duration-200',
          onHero
            ? 'border-white/25 text-white/90 hover:border-white/45 hover:bg-white/5'
            : 'border-white/20 text-cream/90 hover:border-white/35 hover:bg-white/5',
        )}
      >
        {LOCALE_LABELS[locale]}
        <ChevronDown
          className={cn(
            'h-3 w-3 opacity-50 transition-transform duration-200',
            open && 'rotate-180',
          )}
          aria-hidden
        />
      </button>

      {open ? (
        <ul
          role="listbox"
          aria-label={t('langLabel')}
          className="absolute right-0 top-[calc(100%+6px)] z-[120] min-w-full overflow-hidden rounded-sm border border-white/15 bg-[#0c1218]/95 py-1 shadow-[0_8px_24px_rgba(0,0,0,0.45)] backdrop-blur-md"
        >
          {LOCALES.map((code) => {
            const selected = code === locale;
            return (
              <li key={code} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => {
                    setLocale(code as Locale);
                    setOpen(false);
                  }}
                  className={cn(
                    'flex w-full items-center justify-center px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] transition-colors',
                    selected
                      ? 'text-white'
                      : 'text-white/45 hover:bg-white/[0.06] hover:text-white',
                  )}
                >
                  {LOCALE_LABELS[code]}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
