'use client';

import { motion } from 'framer-motion';
import { FadeUp } from '@/components/motion/FadeUp';
import { ParallaxImage } from '@/components/motion/ParallaxImage';
import { FixedBackdrop, fixedBgSectionClass } from '@/components/motion/FixedBackdrop';
import { IMG } from '@/lib/images';
import { useLocale } from '@/contexts/LocaleContext';
import { AmbientGlow } from '@/components/brand/AmbientGlow';
import { cn } from '@/lib/utils';

export function ExperienceSection() {
  const { t } = useLocale();

  return (
    <section
      className={cn(
        'relative overflow-hidden bg-navy md:py-28',
        fixedBgSectionClass,
      )}
    >
      <AmbientGlow className="hidden md:block" />

      {/* Mobile: fixed full-bleed photo background */}
      <div className="relative w-full md:hidden">
        <FixedBackdrop src={IMG.experience} alt={t('expImgAlt')} sizes="100vw">
          <div className="absolute inset-0 bg-navy/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-navy/40" />
        </FixedBackdrop>

        <FadeUp className="relative z-10 px-4 py-36 sm:py-40">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-gold">
            {t('expKicker')}
          </p>
          <h2 className="mt-4 font-sans text-[2.15rem] font-semibold leading-tight text-white sm:text-4xl">
            {t('expTitle')}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/90">
            {t('expP1')}
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-mist">
            {t('expP2')}
          </p>
        </FadeUp>
      </div>

      {/* Desktop: side-by-side layout */}
      <div className="relative z-10 mx-auto hidden max-w-7xl items-center gap-8 md:grid md:grid-cols-2 md:gap-0 md:px-0 lg:gap-8">
        <motion.div
          className="wave-photo frame-neon-teal relative aspect-[4/5] w-full overflow-hidden md:min-h-[520px] md:rounded-none"
          data-wave-photo
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <ParallaxImage
            src={IMG.experience}
            alt={t('expImgAlt')}
            sizes="(min-width: 768px) 50vw, 100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-navy/20" />
        </motion.div>

        <FadeUp className="px-0 md:px-10 lg:pr-16">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-gold">
            {t('expKicker')}
          </p>
          <h2 className="mt-3 font-sans text-3xl font-semibold text-white sm:mt-4 sm:text-4xl md:text-5xl">
            {t('expTitle')}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-cream/85 sm:mt-6 sm:text-base">
            {t('expP1')}
          </p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-mist sm:mt-4 sm:text-base">
            {t('expP2')}
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
