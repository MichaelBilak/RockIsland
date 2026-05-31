'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/contexts/LocaleContext';
import type { MessageKey } from '@/lib/i18n/messages';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';

const linkKeys: { href: string; key: MessageKey }[] = [
  { href: '/', key: 'navHome' },
  { href: '/menu', key: 'navMenu' },
  { href: '/eventi', key: 'navEvents' },
  { href: '/convention', key: 'navConvention' },
  { href: '/prenota', key: 'navBook' },
];

export function SiteNav({ variant = 'overlay' }: { variant?: 'overlay' | 'solid' }) {
  const { t } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isSolid = variant === 'solid' || scrolled;
  const navClass = isSolid
    ? 'bg-navy/95 border-b border-white/5 shadow-sm backdrop-blur-md'
    : 'bg-transparent';

  const langVariant = isSolid ? 'onDark' : 'onHero';

  return (
    <>
      <header
        className={cn(
          'safe-area-top fixed inset-x-0 top-0 z-50 transition-colors duration-300',
          navClass,
        )}
      >
        <div className="mx-auto flex h-[var(--nav-height)] max-w-7xl items-center justify-between gap-2 px-4 sm:gap-3 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="font-serif text-lg tracking-[0.18em] text-white sm:text-xl md:text-2xl md:tracking-[0.2em]"
          >
            RockIsland
          </Link>

          <div className="hidden items-center gap-6 md:flex md:gap-8">
            <nav
              className="flex items-center gap-8 lg:gap-10"
              aria-label={t('navMainAria')}
            >
              {linkKeys.map(({ href, key }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'text-sm font-medium tracking-wide transition-colors',
                    isSolid
                      ? 'text-cream/90 hover:text-gold'
                      : 'text-white/90 hover:text-gold',
                  )}
                >
                  {t(key)}
                </Link>
              ))}
            </nav>
            <LanguageSwitcher variant={langVariant} />
            <Button asChild size="sm" className="rounded-full px-5">
              <Link href="/prenota">{t('navBook')}</Link>
            </Button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher variant={langVariant} />
            <button
              type="button"
              className="touch-target inline-flex items-center justify-center rounded-[2px] text-white"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
            >
              <span className="sr-only">{t('navOpenMenu')}</span>
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[60] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-navy/80 backdrop-blur-sm"
              aria-label={t('navCloseMenu')}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              role="dialog"
              aria-modal="true"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 top-0 flex h-full w-[min(100%,420px)] flex-col bg-navy px-6 pb-[calc(2.5rem+env(safe-area-inset-bottom,0px))] pt-[calc(1.5rem+env(safe-area-inset-top,0px))] shadow-2xl"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-serif text-lg tracking-[0.2em] text-white">
                  {t('navMobileDrawerTitle')}
                </span>
                <button
                  type="button"
                  className="touch-target inline-flex items-center justify-center rounded-[2px] text-cream"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">{t('navCloseMenu')}</span>
                  <X className="h-6 w-6" />
                </button>
              </div>
              <nav className="mt-10 flex flex-col gap-2" aria-label={t('navMobileAria')}>
                {linkKeys.map(({ href, key }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className="touch-target flex items-center border-b border-white/10 py-3 text-lg text-cream hover:text-gold"
                  >
                    {t(key)}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto">
                <Button asChild className="w-full rounded-full">
                  <Link href="/prenota" onClick={() => setOpen(false)}>
                    {t('navBookTableFull')}
                  </Link>
                </Button>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
