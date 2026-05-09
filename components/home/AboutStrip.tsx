'use client';

import { FadeUp } from '@/components/motion/FadeUp';
import { useLocale } from '@/contexts/LocaleContext';
import type { MessageKey } from '@/lib/i18n/messages';

const statKeys: { sub: MessageKey; title: MessageKey }[] = [
  { sub: 'about1Sub', title: 'about1Title' },
  { sub: 'about2Sub', title: 'about2Title' },
  { sub: 'about3Sub', title: 'about3Title' },
];

export function AboutStrip() {
  const { t } = useLocale();

  return (
    <section
      id="about"
      className="border-y border-gold/25 bg-cream py-14 text-navy"
    >
      <FadeUp>
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
          {statKeys.map((s) => (
            <div key={s.title} className="text-center">
              <p className="text-xs font-medium uppercase tracking-[0.35em] text-navy/65">
                {t(s.sub)}
              </p>
              <p className="mt-3 font-serif text-2xl tracking-wide sm:text-3xl">
                {t(s.title)}
              </p>
            </div>
          ))}
        </div>
      </FadeUp>
    </section>
  );
}
