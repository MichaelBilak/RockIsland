'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { FadeUp } from '@/components/motion/FadeUp';
import { useLocale } from '@/contexts/LocaleContext';
import type { MessageKey } from '@/lib/i18n/messages';

const eventFieldGroups: { date: MessageKey; title: MessageKey; artist: MessageKey }[] =
  [
    { date: 'ev1Date', title: 'ev1Title', artist: 'ev1Artist' },
    { date: 'ev2Date', title: 'ev2Title', artist: 'ev2Artist' },
    { date: 'ev3Date', title: 'ev3Title', artist: 'ev3Artist' },
    { date: 'ev4Date', title: 'ev4Title', artist: 'ev4Artist' },
    { date: 'ev5Date', title: 'ev5Title', artist: 'ev5Artist' },
  ];

function MarqueeRow({
  events,
}: {
  events: { date: string; title: string; artist: string }[];
}) {
  const doubled = [...events, ...events];
  return (
    <div className="flex w-max animate-marquee gap-6 pr-6">
      {doubled.map((e, i) => (
        <article
          key={`${e.title}-${i}`}
          className="flex min-w-[220px] items-stretch overflow-hidden border border-white/10 bg-navy/60 sm:min-w-[260px]"
        >
          <div className="flex w-16 flex-col items-center justify-center bg-gold/15 px-2 text-center">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-gold">
              {e.date}
            </span>
          </div>
          <div className="flex flex-1 flex-col justify-center px-4 py-3">
            <p className="font-serif text-lg text-white">{e.title}</p>
            <p className="text-xs text-mist">{e.artist}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export function EventsTicker() {
  const { t } = useLocale();

  const events = useMemo(
    () =>
      eventFieldGroups.map((g) => ({
        date: t(g.date),
        title: t(g.title),
        artist: t(g.artist),
      })),
    [t],
  );

  return (
    <section className="border-y border-white/10 bg-navy py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeUp className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-gold">
              {t('eventsKicker')}
            </p>
            <h2 className="mt-2 font-serif text-3xl font-light text-white md:text-4xl">
              {t('eventsTitle')}
            </h2>
          </div>
          <Link
            href="/eventi"
            className="text-sm font-medium uppercase tracking-[0.2em] text-mist underline-offset-4 hover:text-gold hover:underline"
          >
            {t('eventsCalendar')}
          </Link>
        </FadeUp>
      </div>

      <div className="relative mt-10 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-navy to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-navy to-transparent" />
        <MarqueeRow events={events} />
      </div>
    </section>
  );
}
