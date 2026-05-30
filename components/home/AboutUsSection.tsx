'use client';

import Link from 'next/link';
import { ParallaxImage } from '@/components/motion/ParallaxImage';
import { MapPin } from 'lucide-react';
import { FadeUp } from '@/components/motion/FadeUp';
import { useLocale } from '@/contexts/LocaleContext';
import { CONTACT, MAP } from '@/lib/site';
import { IMG } from '@/lib/images';

export function AboutUsSection() {
  const { t } = useLocale();

  return (
    <section
      id="about-us"
      aria-labelledby="about-us-heading"
      className="border-t border-white/10 bg-[#0a1522] py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-gold">
            {t('aboutUsKicker')}
          </p>
          <h2
            id="about-us-heading"
            className="mt-3 max-w-3xl font-serif text-3xl font-light text-white md:text-4xl lg:text-[2.75rem] lg:leading-tight"
          >
            {t('aboutUsTitle')}
          </h2>
        </FadeUp>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start lg:gap-16">
          <FadeUp className="space-y-8" delay={0.05}>
            <div className="relative aspect-[16/10] w-full overflow-hidden border border-white/10">
              <ParallaxImage
                src={IMG.conventionHero}
                alt={t('aboutUsImgAlt')}
                sizes="(min-width: 1024px) 42vw, 100vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
            </div>
            <p className="text-base leading-relaxed text-cream/90">{t('aboutUsP1')}</p>
            <p className="text-base leading-relaxed text-mist">{t('aboutUsP2')}</p>

            <dl className="grid gap-6 border-t border-gold/20 pt-8 sm:grid-cols-2">
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold/90">
                  {t('aboutUsHoursLabel')}
                </dt>
                <dd className="mt-2 text-sm text-cream">{t('aboutUsHours')}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold/90">
                  {t('aboutUsAddressLabel')}
                </dt>
                <dd className="mt-2 flex gap-2 text-sm text-cream">
                  <MapPin
                    className="mt-0.5 h-4 w-4 shrink-0 text-gold/80"
                    aria-hidden
                  />
                  <span>{CONTACT.address}</span>
                </dd>
              </div>
            </dl>

            <div className="flex flex-wrap gap-x-8 gap-y-2 border-t border-white/10 pt-6 text-sm">
              <a
                href={CONTACT.phoneHref}
                className="text-cream/90 transition-colors hover:text-gold"
              >
                {CONTACT.phone}
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-cream/90 transition-colors hover:text-gold"
              >
                {CONTACT.email}
              </a>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="lg:sticky lg:top-28">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold/90">
                {t('aboutUsMapTitle')}
              </p>
              <div className="mt-4 overflow-hidden border border-white/10 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)]">
                <div className="relative aspect-[4/3] w-full min-h-[240px] sm:min-h-[280px] lg:min-h-[320px]">
                  <iframe
                    title={t('aboutUsMapAria')}
                    src={MAP.embedSrc}
                    className="absolute inset-0 h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </div>
              <Link
                href={MAP.externalHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm font-medium uppercase tracking-[0.2em] text-gold underline-offset-4 transition-colors hover:text-cream hover:underline"
              >
                {t('aboutUsOpenMaps')}
              </Link>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
