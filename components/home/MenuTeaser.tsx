'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FadeUp } from '@/components/motion/FadeUp';
import { ParallaxImage } from '@/components/motion/ParallaxImage';
import { IMG } from '@/lib/images';
import { useLocale } from '@/contexts/LocaleContext';
import type { MessageKey } from '@/lib/i18n/messages';

const categoryKeys: { titleKey: MessageKey; image: string }[] = [
  { titleKey: 'menuCatAntipasti', image: IMG.menuAntipasti },
  { titleKey: 'menuCatPesce', image: IMG.menuPesce },
  { titleKey: 'menuCatPizza', image: IMG.menuPizza },
  { titleKey: 'menuCatCocktail', image: IMG.menuCocktail },
];

export function MenuTeaser() {
  const { t } = useLocale();

  return (
    <section className="bg-[#0a1522] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-gold">
            {t('menuKicker')}
          </p>
          <h2 className="mt-3 font-serif text-4xl font-light text-white md:text-5xl">
            {t('menuTitle')}
          </h2>
        </FadeUp>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categoryKeys.map((c, i) => (
            <FadeUp key={c.titleKey} delay={i * 0.06}>
              <Link href="/menu" className="group block">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  className="relative aspect-[3/4] overflow-hidden bg-navy"
                >
                  <ParallaxImage
                    src={c.image}
                    alt=""
                    className="opacity-35 transition-opacity duration-500 group-hover:opacity-100"
                    sizes="(min-width: 1024px) 25vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent transition-opacity duration-500 group-hover:opacity-70" />
                  <div className="absolute inset-0 flex items-end p-6">
                    <span className="font-serif text-2xl text-white">
                      {t(c.titleKey)}
                    </span>
                  </div>
                </motion.div>
              </Link>
            </FadeUp>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/menu"
            className="text-sm font-medium uppercase tracking-[0.25em] text-gold underline-offset-4 transition-colors hover:text-cream hover:underline"
          >
            {t('menuSeeFull')}
          </Link>
        </div>
      </div>
    </section>
  );
}
