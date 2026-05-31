'use client';

import { useLocale } from '@/contexts/LocaleContext';
import type { Locale } from '@/lib/i18n/locales';
import { LOCALES, LOCALE_LABELS } from '@/lib/i18n/locales';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Props = {
  /** Su hero chiaro: trigger più leggibile */
  variant?: 'onDark' | 'onHero';
  className?: string;
};

export function LanguageSwitcher({ variant = 'onDark', className }: Props) {
  const { locale, setLocale, t } = useLocale();

  const triggerClass =
    variant === 'onHero'
      ? 'h-10 w-[88px] border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/15 sm:h-11 sm:w-[100px]'
      : 'h-10 w-[88px] border-white/20 bg-navy/40 text-cream backdrop-blur-sm hover:bg-white/10 sm:h-11 sm:w-[100px]';

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="sr-only">{t('langLabel')}</span>
      <Select
        value={locale}
        onValueChange={(v) => setLocale(v as Locale)}
      >
        <SelectTrigger
          aria-label={t('langLabel')}
          className={cn(triggerClass, 'rounded-[2px]')}
        >
          <SelectValue placeholder={LOCALE_LABELS[locale]} />
        </SelectTrigger>
        <SelectContent align="end" className="min-w-[100px]">
          {LOCALES.map((code) => (
            <SelectItem key={code} value={code} className="touch-target">
              {LOCALE_LABELS[code]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
