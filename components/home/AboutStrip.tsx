'use client';

import { FadeUp } from '@/components/motion/FadeUp';
import { useLocale } from '@/contexts/LocaleContext';
import type { MessageKey } from '@/lib/i18n/messages';
import { RockHorizon } from '@/components/brand/RockHorizon';

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
      className="relative overflow-hidden border-y border-white/10 bg-surface py-10 text-cream sm:py-14"
    >
      <RockHorizon className="absolute inset-x-0 bottom-0 h-12 opacity-40" />
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
