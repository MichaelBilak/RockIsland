'use client';

import { FadeUp } from '@/components/motion/FadeUp';
import { useLocale } from '@/contexts/LocaleContext';
import type { MessageKey } from '@/lib/i18n/messages';
import { RockHorizon } from '@/components/brand/RockHorizon';
import { AmbientGlow } from '@/components/brand/AmbientGlow';

const statKeys: { sub: MessageKey; title: MessageKey; neon: string }[] = [
  { sub: 'about1Sub', title: 'about1Title', neon: 'text-neon-teal' },
  { sub: 'about2Sub', title: 'about2Title', neon: 'text-neon-yellow' },
  { sub: 'about3Sub', title: 'about3Title', neon: 'text-neon-pink' },
];

export function AboutStrip() {
  const { t } = useLocale();

  return (
    <section
      id="about"
      className="relative overflow-hidden border-b border-white/10 bg-surface py-10 text-cream sm:py-14"
    >
      <AmbientGlow />
      {/* Soft neon wash under the hero wave — same treatment as the footer */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-36 sm:h-44"
        aria-hidden
        style={{
          background:
            'linear-gradient(180deg, rgba(22,32,41,0) 0%, rgba(22,32,41,0.55) 55%, #162029 100%), linear-gradient(90deg, rgba(92,255,208,0.22) 0%, rgba(255,229,102,0.2) 18%, rgba(255,107,122,0.22) 38%, rgba(255,154,74,0.2) 55%, rgba(255,46,200,0.2) 72%, rgba(107,140,255,0.22) 100%)',
        }}
      />
      <RockHorizon className="absolute inset-x-0 bottom-0 z-[1] h-12 opacity-40" />
      <FadeUp className="relative z-10">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-3 md:gap-10 md:px-6 lg:px-8">
          {statKeys.map((s) => (
            <div key={s.title} className="text-center">
              <p
                className={`text-xs font-medium uppercase tracking-[0.35em] ${s.neon}`}
              >
                {t(s.sub)}
              </p>
              <p className="mt-2 font-sans text-xl font-semibold tracking-wide text-white sm:mt-3 sm:text-2xl md:text-3xl">
                {t(s.title)}
              </p>
            </div>
          ))}
        </div>
      </FadeUp>
    </section>
  );
}
