'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ParallaxImage } from '@/components/motion/ParallaxImage';
import { UPCOMING_EVENTS, PAST_EVENT_TITLE_KEYS } from '@/lib/eventi-data';
import type { EventBadge } from '@/lib/eventi-data';
import { wixFill, WIX } from '@/lib/wix-media';
import { useLocale } from '@/contexts/LocaleContext';
import { Button } from '@/components/ui/button';
import { FadeUp } from '@/components/motion/FadeUp';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { cn } from '@/lib/utils';

function Badge({ badge }: { badge: EventBadge }) {
  const { t } = useLocale();
  const key =
    badge === 'aperitivo'
      ? 'eventiBadgeAperitivo'
      : badge === 'dinner'
        ? 'eventiBadgeDinner'
        : 'eventiBadgeDj';
  return (
    <span className="inline-block border border-gold/40 bg-gold/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-gold">
      {t(key)}
    </span>
  );
}

export function EventiPageView() {
  const { t } = useLocale();

  return (
    <main className="mobile-main-pad">
      <header className="border-b border-white/10 px-4 pb-10 pt-6 md:px-8 md:pb-12 md:pt-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-gold">
            {t('eventiPageKicker')}
          </p>
          <h1 className="mt-3 font-serif text-3xl font-light text-white sm:text-4xl md:text-5xl">
            {t('eventiPageTitle')}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-mist md:text-base">
            {t('eventiPageLead')}
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-20">
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {UPCOMING_EVENTS.map((ev, i) => (
            <FadeUp key={ev.id} delay={i * 0.05}>
              <article className="flex h-full flex-col overflow-hidden border border-white/10 bg-[#0a1522]">
                <div className="relative h-44 w-full overflow-hidden">
                  <ParallaxImage
                    src={ev.image}
                    alt=""
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    yRange={['-6%', '6%']}
                  />
                  <div className="absolute left-3 top-3">
                    <Badge badge={ev.badge} />
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-mist">
                    {t(ev.dateKey)}
                  </p>
                  <h2 className="mt-2 font-serif text-xl text-white">{t(ev.titleKey)}</h2>
                  <p className="mt-1 text-sm text-mist">{t(ev.artistKey)}</p>
                  <div className="mt-auto pt-6">
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <Link href="/prenota">{t('eventiBookTonight')}</Link>
                    </Button>
                  </div>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#08121c] py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <FadeUp>
            <p className="text-xs uppercase tracking-[0.35em] text-gold">
              {t('eventiPastKicker')}
            </p>
            <h2 className="mt-2 font-serif text-3xl text-white">{t('eventiPastTitle')}</h2>
          </FadeUp>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {PAST_EVENT_TITLE_KEYS.map((key, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={cn(
                  'relative overflow-hidden border border-white/10',
                  i === 0 && 'sm:col-span-2 sm:row-span-1',
                )}
              >
                <div className="relative h-48 w-full overflow-hidden md:h-56">
                  <ParallaxImage
                    src={
                      i === 0
                        ? wixFill(WIX.interior, 1200, 800)
                        : i === 1
                          ? wixFill(WIX.pizza, 1200, 800)
                          : wixFill(WIX.pierView, 1200, 800)
                    }
                    alt=""
                    className="opacity-90"
                    sizes="(min-width: 640px) 33vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent" />
                  <p className="absolute bottom-4 left-4 font-serif text-lg text-white md:text-xl">
                    {t(key)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
