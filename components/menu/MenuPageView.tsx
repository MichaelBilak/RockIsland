'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ParallaxImage } from '@/components/motion/ParallaxImage';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ImageIcon, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  MENU,
  MENU_TABS,
  type MenuCategoryId,
  type MenuItem,
} from '@/lib/menu-data';
import { IMG, MENU_CATEGORY_PHOTO } from '@/lib/images';
import { useLocale } from '@/contexts/LocaleContext';
import { cn } from '@/lib/utils';
import { FadeUp } from '@/components/motion/FadeUp';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { DishReveal, type DishRevealData } from '@/components/menu/DishReveal';

function sectionId(id: MenuCategoryId) {
  return `menu-${id}`;
}

type DishPreview = {
  id: string;
  src: string;
  left: number;
  top: number;
};

function placePreviewCard(anchor: DOMRect): { left: number; top: number } {
  const margin = 12;
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const cardW = Math.min(280, vw - margin * 2);
  let left = anchor.right + margin;
  if (left + cardW > vw - margin) {
    left = anchor.left - margin - cardW;
  }
  if (left < margin) left = margin;
  const top = anchor.top + anchor.height / 2;
  return { left, top };
}

export function MenuPageView() {
  const { t } = useLocale();
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<MenuCategoryId>('antipasti');
  const [selectedDish, setSelectedDish] = useState<DishRevealData | null>(null);
  const [dishPreview, setDishPreview] = useState<DishPreview | null>(null);
  const hidePreviewTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const obsRef = useRef<IntersectionObserver | null>(null);
  const tabsScrollRef = useRef<HTMLDivElement>(null);
  const dishRevealLockRef = useRef(false);
  const [canScrollTabs, setCanScrollTabs] = useState(false);

  const clearHideTimer = useCallback(() => {
    if (hidePreviewTimer.current) {
      clearTimeout(hidePreviewTimer.current);
      hidePreviewTimer.current = null;
    }
  }, []);

  const showDishPreview = useCallback(
    (item: MenuItem, el: HTMLElement) => {
      clearHideTimer();
      const r = el.getBoundingClientRect();
      const { left, top } = placePreviewCard(r);
      setDishPreview({ id: item.id, src: item.image, left, top });
    },
    [clearHideTimer],
  );

  const hideDishPreviewSoon = useCallback(() => {
    clearHideTimer();
    hidePreviewTimer.current = setTimeout(() => setDishPreview(null), 100);
  }, [clearHideTimer]);

  const openDishReveal = useCallback(
    (item: MenuItem, categoryKey: (typeof MENU_TABS)[number]['labelKey']) => {
      if (dishRevealLockRef.current || !item.image?.trim()) return;
      clearHideTimer();
      setDishPreview(null);
      setSelectedDish({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        image: item.image,
        category: t(categoryKey),
      });
    },
    [clearHideTimer, t],
  );

  const closeDishReveal = useCallback(() => {
    dishRevealLockRef.current = true;
    setSelectedDish(null);
    window.setTimeout(() => {
      dishRevealLockRef.current = false;
    }, 400);
  }, []);

  const scrollTo = useCallback((id: MenuCategoryId) => {
    const el = document.getElementById(sectionId(id));
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActive(id);
  }, []);

  useEffect(() => {
    const opts: IntersectionObserverInit = {
      rootMargin: '-40% 0px -45% 0px',
      threshold: 0,
    };
    obsRef.current = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const id = e.target.id.replace('menu-', '') as MenuCategoryId;
        if (MENU_TABS.some((tab) => tab.id === id)) setActive(id);
      }
    }, opts);

    MENU_TABS.forEach((tab) => {
      const el = document.getElementById(sectionId(tab.id));
      if (el) obsRef.current?.observe(el);
    });

    return () => obsRef.current?.disconnect();
  }, []);

  useEffect(() => () => clearHideTimer(), [clearHideTimer]);

  const updateTabsScrollHint = useCallback(() => {
    const el = tabsScrollRef.current;
    if (!el) return;
    setCanScrollTabs(el.scrollWidth - el.scrollLeft - el.clientWidth > 8);
  }, []);

  useEffect(() => {
    const el = tabsScrollRef.current;
    if (!el) return;

    updateTabsScrollHint();
    el.addEventListener('scroll', updateTabsScrollHint, { passive: true });
    const ro = new ResizeObserver(updateTabsScrollHint);
    ro.observe(el);

    return () => {
      el.removeEventListener('scroll', updateTabsScrollHint);
      ro.disconnect();
    };
  }, [updateTabsScrollHint]);

  const scrollTabsForward = useCallback(() => {
    tabsScrollRef.current?.scrollBy({ left: 140, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (!dishPreview) return;
    const clear = () => setDishPreview(null);
    window.addEventListener('scroll', clear, true);
    window.addEventListener('resize', clear);
    return () => {
      window.removeEventListener('scroll', clear, true);
      window.removeEventListener('resize', clear);
    };
  }, [dishPreview]);

  return (
    <main className="mobile-main-pad">
      <header className="border-b border-white/10 bg-navy px-4 pb-8 pt-6 md:px-8 md:pb-10 md:pt-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-gold">
            {t('menuPageKicker')}
          </p>
          <h1 className="mt-3 font-serif text-3xl font-light text-white sm:text-4xl md:text-5xl">
            {t('menuPageTitle')}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-mist md:text-base">
            {t('menuPageLead')}
          </p>
        </div>

        <nav
          className="nav-offset-top sticky z-30 -mx-4 mt-8 border-y border-white/10 bg-navy/95 px-4 py-2.5 backdrop-blur-md md:-mx-8 md:mt-10 md:px-8 md:py-3"
          aria-label={t('navMenu')}
        >
          <div className="relative mx-auto max-w-5xl">
            <div
              ref={tabsScrollRef}
              className="flex gap-1 overflow-x-auto pb-0.5 pe-12 pt-0.5 [scrollbar-width:none] md:pe-0 [&::-webkit-scrollbar]:hidden"
            >
              {MENU_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => scrollTo(tab.id)}
                  className={cn(
                    'shrink-0 touch-target rounded-[2px] border px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] transition-colors',
                    active === tab.id
                      ? 'border-gold bg-gold/15 text-gold'
                      : 'border-transparent text-cream/80 hover:border-white/20 hover:text-cream',
                  )}
                >
                  {t(tab.labelKey)}
                </button>
              ))}
            </div>

            <div
              className={cn(
                'pointer-events-none absolute inset-y-0 right-0 z-10 w-16 transition-opacity duration-300 md:hidden',
                canScrollTabs ? 'opacity-100' : 'opacity-0',
              )}
              aria-hidden={!canScrollTabs}
            >
              <div className="absolute inset-0 bg-gradient-to-l from-navy from-30% via-navy/95 to-transparent" />
              <button
                type="button"
                tabIndex={canScrollTabs ? 0 : -1}
                onClick={scrollTabsForward}
                aria-label={t('menuTabsScrollHint')}
                className={cn(
                  'pointer-events-auto absolute right-0 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full',
                  'border border-gold/40 bg-navy/90 text-gold shadow-[0_0_16px_rgba(232,168,56,0.25)]',
                  'transition-transform active:scale-95',
                  canScrollTabs ? 'visible' : 'invisible',
                )}
              >
                <motion.span
                  animate={reduceMotion ? undefined : { x: [0, 3, 0] }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="inline-flex"
                >
                  <ChevronRight className="h-4 w-4" strokeWidth={2.25} aria-hidden />
                </motion.span>
              </button>
            </div>
          </div>
        </nav>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-20">
        {MENU_TABS.map((tab, index) => {
          const src = MENU_CATEGORY_PHOTO[tab.id];
          const imageOnLeft = index % 2 === 0;

          return (
            <section
              key={tab.id}
              id={sectionId(tab.id)}
              className="scroll-mt-nav-tabs border-b border-white/10 py-10 last:border-0 sm:py-12 md:py-16"
            >
              <FadeUp delay={index * 0.04}>
                <div className="mx-auto grid items-start gap-8 sm:gap-10 md:grid-cols-12 md:gap-x-10 lg:gap-x-14">
                  <figure
                    aria-hidden
                    className={cn(
                      'relative md:col-span-5',
                      !imageOnLeft && 'md:order-2',
                    )}
                  >
                    <div className="group relative aspect-[16/11] w-full overflow-hidden border border-white/10 bg-[#0a1522] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.45)] sm:aspect-[5/6] md:aspect-[4/5] md:max-h-[min(520px,70vh)]">
                      <ParallaxImage
                        src={src}
                        alt=""
                        className="transition-[filter] duration-700 ease-out group-hover:brightness-[1.05]"
                        sizes="(min-width: 768px) 38vw, 100vw"
                        priority={index === 0}
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/55 via-transparent to-black/15" />
                      <div className="pointer-events-none absolute left-0 top-0 h-px w-16 bg-gold/70" />
                    </div>
                  </figure>

                  <div
                    className={cn(
                      'md:col-span-7 md:pt-1',
                      !imageOnLeft && 'md:order-1',
                    )}
                  >
                    <h2
                      id={`menu-heading-${tab.id}`}
                      className="inline-block border-b border-gold/35 pb-2 font-serif text-2xl font-light tracking-tight text-white sm:pb-3 sm:text-3xl md:text-4xl"
                    >
                      {t(tab.labelKey)}
                    </h2>
                    <p
                      id={`menu-dish-hint-${tab.id}`}
                      className="mt-4 hidden max-w-xl items-start gap-2.5 text-[12px] leading-snug text-mist/80 [@media(hover:hover)]:flex"
                    >
                      <ImageIcon
                        className="mt-0.5 h-4 w-4 shrink-0 text-gold/50"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                      <span className="font-normal tracking-wide">
                        {t('menuDishPreviewHint')}
                      </span>
                    </p>
                    <ul className="mt-8 space-y-0 md:mt-10">
                      {MENU[tab.id].map((item) => (
                        <li
                          key={item.id}
                          data-cursor={item.image?.trim() ? 'view' : undefined}
                          className={cn(
                            'flex flex-col gap-1 border-t border-gold/25 py-4 first:border-t-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6',
                            item.image?.trim() && 'cursor-pointer',
                          )}
                          onClick={() => openDishReveal(item, tab.labelKey)}
                        >
                          <div>
                            <span
                              role="button"
                              tabIndex={0}
                              aria-describedby={`menu-dish-hint-${tab.id}`}
                              className={cn(
                                'inline cursor-pointer rounded-sm border-b border-dashed border-gold/45 pb-px font-medium text-cream',
                                'transition-[color,border-color,box-shadow] duration-200',
                                '[@media(hover:hover)]:hover:border-solid [@media(hover:hover)]:hover:border-gold [@media(hover:hover)]:hover:text-white',
                                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/45 focus-visible:ring-offset-2 focus-visible:ring-offset-navy',
                              )}
                              onMouseEnter={(e) =>
                                showDishPreview(item, e.currentTarget)
                              }
                              onMouseLeave={hideDishPreviewSoon}
                              onFocus={(e) => showDishPreview(item, e.currentTarget)}
                              onBlur={hideDishPreviewSoon}
                            >
                              {item.name}
                            </span>
                            {item.description ? (
                              <p className="mt-1 text-sm text-mist">{item.description}</p>
                            ) : null}
                          </div>
                          <p className="shrink-0 text-right font-serif text-lg text-gold tabular-nums">
                            € {item.price}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeUp>
            </section>
          );
        })}
      </div>

      <section className="border-t border-white/10 bg-[#0a1522] py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 md:gap-0 md:px-0">
          <FadeUp>
            <div className="relative h-[280px] w-full overflow-hidden sm:h-[340px] md:h-[min(480px,55vh)]">
              <ParallaxImage
                src={IMG.featured1}
                alt=""
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
          </FadeUp>
          <FadeUp className="flex flex-col justify-center px-4 md:px-12 lg:px-16">
            <p className="text-xs uppercase tracking-[0.35em] text-gold">
              {t('menuFeat1Overline')}
            </p>
            <h2 className="mt-4 font-serif text-3xl font-light text-white md:text-4xl">
              {t('menuFeat1Title')}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-mist md:text-base">
              {t('menuFeat1Lead')}
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="bg-navy py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 md:gap-0 md:px-0">
          <FadeUp className="order-2 flex flex-col justify-center px-4 md:order-1 md:px-12 lg:px-16">
            <p className="text-xs uppercase tracking-[0.35em] text-gold">
              {t('menuFeat2Overline')}
            </p>
            <h2 className="mt-4 font-serif text-3xl font-light text-white md:text-4xl">
              {t('menuFeat2Title')}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-mist md:text-base">
              {t('menuFeat2Lead')}
            </p>
          </FadeUp>
          <FadeUp className="order-1 md:order-2">
            <div className="relative h-[280px] w-full overflow-hidden sm:h-[340px] md:h-[min(480px,55vh)]">
              <ParallaxImage
                src={IMG.featured2}
                alt=""
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
          </FadeUp>
        </div>
      </section>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="border-t border-white/10 py-12 text-center"
      >
        <Link
          href="/prenota"
          className="inline-block text-sm font-medium uppercase tracking-[0.25em] text-gold underline-offset-4 hover:underline"
        >
          {t('navBookTableFull')}
        </Link>
      </motion.div>

      <DishReveal
        dish={selectedDish}
        onClose={closeDishReveal}
      />

      <AnimatePresence>
        {dishPreview ? (
          <motion.div
            key={dishPreview.id}
            initial={
              reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }
            }
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.97 }}
            transition={{
              duration: reduceMotion ? 0 : 0.14,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="pointer-events-none fixed z-[70] w-[min(280px,calc(100vw-24px))] overflow-hidden border border-white/15 bg-[#0a1522] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.55)]"
            style={{
              left: dishPreview.left,
              top: dishPreview.top,
              transform: 'translateY(-50%)',
            }}
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={dishPreview.src}
                alt=""
                fill
                sizes="280px"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <SiteFooter />
    </main>
  );
}
