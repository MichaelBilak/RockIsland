'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FadeUp } from '@/components/motion/FadeUp';
import { ParallaxImage } from '@/components/motion/ParallaxImage';
import { Button } from '@/components/ui/button';
import { IMG } from '@/lib/images';
import { useLocale } from '@/contexts/LocaleContext';
import type { MessageKey } from '@/lib/i18n/messages';
import { AmbientGlow } from '@/components/brand/AmbientGlow';

const categoryKeys: { titleKey: MessageKey; image: string }[] = [
  { titleKey: 'menuCatAntipasti', image: IMG.menuAntipasti },
  { titleKey: 'menuCatPesce', image: IMG.menuPesce },
  { titleKey: 'menuCatPizza', image: IMG.menuPizza },
  { titleKey: 'menuCatCocktail', image: IMG.menuCocktail },
];

const neonClasses = [
  'menu-neon-coral',
  'menu-neon-teal',
  'menu-neon-yellow',
  'menu-neon-blue',
] as const;

const tilts = [-3.5, 2.8, 3.2, -2.6] as const;

export function MenuTeaser() {
  const { t } = useLocale();

  return (
    <section className="relative overflow-hidden bg-surface py-14 md:py-28">
      <AmbientGlow />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-gold">
            {t('menuKicker')}
          </p>
          <h2 className="mt-3 font-sans text-3xl font-semibold text-white sm:text-4xl md:text-5xl">
            {t('menuTitle')}
          </h2>
        </FadeUp>

        <div className="mt-8 grid grid-cols-2 gap-5 sm:mt-12 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          {categoryKeys.map((c, i) => (
            <FadeUp key={c.titleKey} delay={i * 0.06} className="pt-2 pb-3 sm:pt-3 sm:pb-4">
              <Link href="/menu" className="group block h-full">
                <motion.div
                  initial={false}
                  whileHover={{ scale: 1.03, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  style={{ rotate: tilts[i] }}
                  className={`wave-photo menu-neon-card ${neonClasses[i]} relative aspect-[3/4] overflow-hidden rounded-sm bg-navy sm:rounded-md lg:aspect-[3/4]`}
                  data-wave-photo
                >
                  <ParallaxImage
                    src={c.image}
                    alt=""
                    className="opacity-35 transition-opacity duration-500 group-hover:opacity-100"
                    sizes="(min-width: 1024px) 25vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent transition-opacity duration-500 group-hover:opacity-70" />
                  <div className="absolute inset-0 flex items-end p-3 sm:p-6">
                    <span className="font-sans text-base leading-tight text-white sm:text-xl md:text-2xl">
                      {t(c.titleKey)}
                    </span>
                  </div>
                </motion.div>
              </Link>
            </FadeUp>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="min-h-[48px] border-neon-pink/60 px-8 shadow-neon-horizon sm:px-10"
          >
            <Link href="/menu">{t('menuSeeFull')}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
