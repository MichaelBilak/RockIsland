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
    <section className="relative isolate overflow-hidden bg-[#050d14] py-24 md:py-32">
      <ParallaxImage
        src={IMG.featured2}
        alt=""
        sizes="100vw"
        wrapperClassName="absolute inset-0"
      />
      <div className="absolute inset-0 bg-black/50" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-b from-navy/92 via-[#050d14]/94 to-[#020810]/98"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_85%_70%_at_50%_42%,rgba(5,13,20,0.15)_0%,rgba(2,8,16,0.75)_100%)]"
        aria-hidden
      />
      <FadeUp className="relative z-10">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="font-serif text-3xl font-light italic text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.55)] md:text-[2.75rem] md:leading-snug">
            {t('convTitle')}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-cream drop-shadow-[0_1px_12px_rgba(0,0,0,0.5)] md:text-base">
            {t('convBody')}
          </p>
          <Button asChild className="mt-10 rounded-full px-10 shadow-lg shadow-black/30">
            <Link href="/convention">{t('convCta')}</Link>
          </Button>
        </div>
      </FadeUp>
    </section>
  );
}
