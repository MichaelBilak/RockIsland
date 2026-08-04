'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/contexts/LocaleContext';
import type { MessageKey } from '@/lib/i18n/messages';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';

const linkKeys: {
  href: string;
  key: MessageKey;
  neon: string;
  glow: string;
}[] = [
  {
    href: '/',
    key: 'navHome',
    neon: 'text-neon-teal',
    glow: 'drop-shadow-[0_0_10px_rgba(92,255,208,0.75)]',
  },
  {
    href: '/menu',
    key: 'navMenu',
    neon: 'text-neon-yellow',
    glow: 'drop-shadow-[0_0_10px_rgba(255,229,102,0.75)]',
  },
  {
    href: '/eventi',
    key: 'navEvents',
    neon: 'text-neon-pink',
    glow: 'drop-shadow-[0_0_10px_rgba(255,46,200,0.75)]',
  },
  {
    href: '/convention',
    key: 'navConvention',
    neon: 'text-neon-blue',
    glow: 'drop-shadow-[0_0_10px_rgba(107,140,255,0.75)]',
  },
  {
    href: '/prenota',
    key: 'navBook',
    neon: 'text-neon-coral',
    glow: 'drop-shadow-[0_0_10px_rgba(255,107,122,0.75)]',
  },
];

function isActivePath(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNav({ variant = 'overlay' }: { variant?: 'overlay' | 'solid' }) {
  const { t } = useLocale();
  const pathname = usePathname() ?? '/';
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const scrollFrame = useRef<number | null>(null);

  useEffect(() => {
    if (variant === 'solid') {
      setScrolled(true);
      return;
    }

    const readScrollY = () =>
      window.scrollY || document.documentElement.scrollTop || 0;

    const update = () => {
      const next = readScrollY() > 8;
      setScrolled((current) => (current === next ? current : next));
    };

    const onScroll = () => {
      if (scrollFrame.current !== null) return;
      scrollFrame.current = window.requestAnimationFrame(() => {
        update();
        scrollFrame.current = null;
      });
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (scrollFrame.current !== null) {
        window.cancelAnimationFrame(scrollFrame.current);
      }
    };
  }, [variant, pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  /** Transparent only at the very top of the homepage; solid everywhere else */
  const isSolid = variant === 'solid' || scrolled;
  const navClass = isSolid ? 'nav-surface' : 'bg-transparent';

  const langVariant = isSolid ? 'onDark' : 'onHero';

  return (
    <>
      <header
        className={cn(
          'safe-area-top fixed inset-x-0 top-0 z-50 transition-[background,box-shadow] duration-500',
          navClass,
        )}
      >
        <div className="relative mx-auto flex h-[var(--nav-height)] max-w-7xl items-center justify-between gap-2 px-4 sm:gap-3 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="font-brand text-neon-brand relative z-10 text-lg sm:text-xl md:text-2xl"
          >
            Rockisland
          </Link>

          <nav
            className="pointer-events-none absolute inset-x-0 hidden items-center justify-center md:flex"
            aria-label={t('navMainAria')}
          >
            <div className="pointer-events-auto flex items-center gap-8 lg:gap-10">
              {linkKeys.map(({ href, key, neon, glow }) => {
                const active = isActivePath(pathname, href);
                return (
                  <Link
                    key={href}
                    href={href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'relative text-sm font-medium tracking-wide transition-colors duration-300',
                      active
                        ? cn(neon, glow)
                        : isSolid
                          ? 'text-cream/90 hover:text-neon-teal'
                          : 'text-white/90 hover:text-neon-yellow',
                    )}
                  >
                    {t(key)}
                    {active ? (
                      <span
                        className={cn(
                          'absolute -bottom-1 left-0 right-0 h-px',
                          href === '/' && 'bg-neon-teal shadow-neon-teal',
                          href === '/menu' && 'bg-neon-yellow shadow-neon-yellow',
                          href === '/eventi' && 'bg-neon-pink shadow-neon-pink',
                          href === '/convention' && 'bg-neon-blue shadow-neon-blue',
                          href === '/prenota' && 'bg-neon-coral shadow-neon-coral',
                        )}
                        aria-hidden
                      />
                    ) : null}
                  </Link>
                );
              })}
            </div>
          </nav>

          <div className="relative z-10 hidden items-center gap-4 md:flex lg:gap-5">
            <LanguageSwitcher variant={langVariant} />
            <Button asChild size="sm" className="rounded-[2px] px-5 shadow-neon-pink">
              <Link href="/prenota">{t('navBook')}</Link>
            </Button>
          </div>

          <div className="relative z-10 flex items-center gap-2 md:hidden">
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
                <span className="font-brand text-neon-brand text-lg">
                  Rockisland
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
                {linkKeys.map(({ href, key, neon, glow }) => {
                  const active = isActivePath(pathname, href);
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'touch-target flex items-center border-b border-white/10 py-3 text-lg transition-colors',
                        active
                          ? cn(neon, glow)
                          : 'text-cream hover:text-neon-yellow',
                      )}
                    >
                      {t(key)}
                    </Link>
                  );
                })}
              </nav>
              <div className="mt-auto">
                <Button asChild className="w-full rounded-[2px]">
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
