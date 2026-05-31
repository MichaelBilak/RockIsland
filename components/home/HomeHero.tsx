'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HeroStagger } from '@/components/motion/HeroStagger';
import { ParallaxImage } from '@/components/motion/ParallaxImage';
import { IMG } from '@/lib/images';
import { useLocale } from '@/contexts/LocaleContext';

export function HomeHero() {
  const { t, locale } = useLocale();
  const tagline = t('heroTagline');

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      <div className="absolute inset-0 hidden md:block">
        <ParallaxImage
          src={IMG.heroPoster}
          alt={t('heroBgAlt')}
          priority
          sizes="100vw"
          yRange={['-5%', '5%']}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-transparent to-navy/40" />
      </div>

      <div className="absolute inset-0 md:hidden">
        <ParallaxImage
          src={IMG.heroPoster}
          alt={t('heroBgAlt')}
          priority
          sizes="100vw"
          yRange={['-5%', '5%']}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/75 to-navy/30" />
      </div>

      <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-4 pb-[calc(7rem+var(--mobile-bar-height)+env(safe-area-inset-bottom,0px))] pt-[calc(5.5rem+env(safe-area-inset-top,0px))] text-center md:pb-24 md:pt-24">
        <HeroStagger sentence={tagline} animationKey={locale} />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.5 }}
          className="mt-8 sm:mt-12"
        >
          <Button asChild variant="outline" size="lg" className="min-h-[48px] px-8 sm:px-10">
            <Link href="/prenota">{t('heroCta')}</Link>
          </Button>
        </motion.div>
      </div>

      <a
        href="#about"
        className="absolute bottom-10 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1 text-white/80 md:flex"
        aria-label={t('heroScrollAria')}
      >
        <span className="animate-chevron-bounce">
          <ChevronDown className="h-7 w-7" />
        </span>
      </a>
    </section>
  );
}
