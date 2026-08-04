'use client';

import Link from 'next/link';
import { FadeUp } from '@/components/motion/FadeUp';
import { ParallaxImage } from '@/components/motion/ParallaxImage';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/contexts/LocaleContext';
import { IMG } from '@/lib/images';

export function ConventionCta() {
  const { t } = useLocale();

  return (
    <section className="relative isolate overflow-hidden bg-ink py-16 md:py-32">
      <ParallaxImage
        src={IMG.featured2}
        alt=""
        sizes="100vw"
        wrapperClassName="absolute inset-0"
      />
      <div className="absolute inset-0 bg-black/50" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-b from-navy/92 via-ink/94 to-ink/98"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_85%_70%_at_50%_42%,rgba(10,16,20,0.15)_0%,rgba(10,16,20,0.75)_100%)]"
        aria-hidden
      />
      <FadeUp className="relative z-10">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="font-sans text-2xl font-semibold italic text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.55)] sm:text-3xl md:text-[2.75rem] md:leading-snug">
            {t('convTitle')}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-cream drop-shadow-[0_1px_12px_rgba(0,0,0,0.5)] md:text-base">
            {t('convBody')}
          </p>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="mt-10 min-h-[48px] border-neon-pink/60 px-8 shadow-neon-horizon sm:px-10"
          >
            <Link href="/convention">{t('convCta')}</Link>
          </Button>
        </div>
      </FadeUp>
    </section>
  );
}
