'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Moon, Wine } from 'lucide-react';
import { FadeUp } from '@/components/motion/FadeUp';
import { useLocale } from '@/contexts/LocaleContext';
import type { MessageKey } from '@/lib/i18n/messages';
import { stockFill, VENUE } from '@/lib/stock-media';
import { wixFill, WIX } from '@/lib/wix-media';
import { cn } from '@/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as const;
const STEPS = 3;

const PHASE_DEFS = [
  {
    time: '18:00',
    labelKey: 'eveningPhase0Label',
    titleKey: 'eveningPhase0Title',
    descKey: 'eveningPhase0Desc',
    image: stockFill(VENUE.pierSunset, 1600, 1000),
    color: '#E8A838',
    mood: 'rgba(232, 168, 56, 0.14)',
  },
  {
    time: '20:00',
    labelKey: 'eveningPhase1Label',
    titleKey: 'eveningPhase1Title',
    descKey: 'eveningPhase1Desc',
    image: wixFill(WIX.foodTable, 1600, 1000),
    color: '#8FB8C9',
    mood: 'rgba(143, 184, 201, 0.12)',
  },
  {
    time: '22:00',
    labelKey: 'eveningPhase2Label',
    titleKey: 'eveningPhase2Title',
    descKey: 'eveningPhase2Desc',
    image: wixFill(WIX.bar, 1600, 1000),
    color: '#E8A838',
    mood: 'rgba(232, 168, 56, 0.16)',
  },
  {
    time: '00:00',
    labelKey: 'eveningPhase3Label',
    titleKey: 'eveningPhase3Title',
    descKey: 'eveningPhase3Desc',
    image: stockFill(VENUE.eveningTerrace, 1600, 1000),
    color: '#F5EDD8',
    mood: 'rgba(245, 237, 216, 0.08)',
  },
] as const satisfies ReadonlyArray<{
  time: string;
  labelKey: MessageKey;
  titleKey: MessageKey;
  descKey: MessageKey;
  image: string;
  color: string;
  mood: string;
}>;

function arcPosition(t: number) {
  const x = t * 100;
  const y = 18 - Math.sin(t * Math.PI) * 62;
  return { x, y };
}

function snapProgress(value: number) {
  return Math.round(value * STEPS) / STEPS;
}

function phaseOpacity(progress: number, index: number) {
  const center = index / STEPS;
  const dist = Math.abs(progress - center);
  return Math.max(0, Math.min(1, 1 - dist * STEPS * 1.15));
}

function SunMoonThumb({ progress }: { progress: number }) {
  const p0 = Math.max(0, 1 - progress * STEPS);
  const p1 = Math.max(0, 1 - Math.abs(progress - 1 / STEPS) * STEPS);
  const p2 = Math.max(0, 1 - Math.abs(progress - 2 / STEPS) * STEPS);
  const p3 = Math.max(0, 1 - Math.abs(progress - 1) * STEPS);

  return (
    <div className="relative flex h-12 w-12 items-center justify-center md:h-14 md:w-14">
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ opacity: p0, scale: 0.85 + p0 * 0.15 }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden>
          <circle cx="32" cy="32" r="14" fill="#E8A838" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1="32"
              y1="32"
              x2={32 + Math.cos((deg * Math.PI) / 180) * 22}
              y2={32 + Math.sin((deg * Math.PI) / 180) * 22}
              stroke="#E8A838"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          ))}
        </svg>
      </motion.div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ opacity: p1, scale: 0.85 + p1 * 0.15 }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden>
          <defs>
            <linearGradient id="sunsetGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F5C842" />
              <stop offset="100%" stopColor="#E86A4A" />
            </linearGradient>
          </defs>
          <rect x="4" y="36" width="56" height="4" fill="#8FB8C9" opacity="0.35" />
          <path d="M12 36 A20 20 0 0 1 52 36 Z" fill="url(#sunsetGrad)" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center text-gold"
        animate={{ opacity: p2, scale: 0.85 + p2 * 0.15 }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        <div className="flex items-end gap-1">
          <Wine className="h-8 w-8 md:h-9 md:w-9" strokeWidth={1.5} />
          <Wine className="h-6 w-6 rotate-12 md:h-7 md:w-7" strokeWidth={1.5} />
        </div>
      </motion.div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center text-cream"
        animate={{ opacity: p3, scale: 0.85 + p3 * 0.15 }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        <Moon className="h-10 w-10 fill-cream/20 md:h-11 md:w-11" strokeWidth={1.25} />
      </motion.div>
    </div>
  );
}

export function EveningTimeline() {
  const { t } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbWrapRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [thumbHalf, setThumbHalf] = useState(30);
  const reduceMotion = useReducedMotion();

  const timelineItems = useMemo(
    () =>
      PHASE_DEFS.map((phase) => ({
        time: phase.time,
        label: t(phase.labelKey),
        title: t(phase.titleKey),
        desc: t(phase.descKey),
        image: phase.image,
        color: phase.color,
        mood: phase.mood,
      })),
    [t],
  );

  const activeIndex = Math.min(
    timelineItems.length - 1,
    Math.round(progress * STEPS),
  );
  const activeItem = timelineItems[activeIndex];
  const thumbPos = arcPosition(progress);
  const trackPad = thumbHalf * 2;

  const setProgressFromClientX = useCallback((clientX: number, snap: boolean) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const raw = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    setProgress(snap ? snapProgress(raw) : raw);
  }, []);

  useEffect(() => {
    const thumb = thumbWrapRef.current;
    if (!thumb) return;

    const update = () => setThumbHalf(thumb.offsetWidth / 2);

    update();
    const ro = new ResizeObserver(update);
    ro.observe(thumb);
    return () => ro.disconnect();
  }, []);

  const goToIndex = useCallback((index: number) => {
    setProgress(index / STEPS);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      const target = e.target as HTMLElement;
      if (target.closest('input, textarea, select')) return;
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const inView =
        rect.top < window.innerHeight * 0.9 && rect.bottom > window.innerHeight * 0.1;
      if (!inView) return;
      e.preventDefault();
      setProgress((p) => {
        const step = Math.round(p * STEPS);
        const next = e.key === 'ArrowRight' ? step + 1 : step - 1;
        return Math.max(0, Math.min(STEPS, next)) / STEPS;
      });
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[min(68svh,580px)] bg-[#050d14] md:min-h-[min(78vh,680px)]"
      aria-label={t('eveningSectionAria')}
    >
      {/* Full-section background images */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        {timelineItems.map((item, i) => {
          const opacity = reduceMotion
            ? i === activeIndex
              ? 1
              : 0
            : phaseOpacity(progress, i);

          return (
            <motion.div
              key={item.time}
              className="absolute inset-0"
              animate={{ opacity }}
              transition={{ duration: reduceMotion ? 0 : 0.75, ease: EASE }}
            >
              <Image
                src={item.image}
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
                priority={i === 0}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Readability scrims over entire section */}
      <div
        className="pointer-events-none absolute inset-0 bg-[#050d14]/35"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#050d14]/92 via-[#050d14]/50 to-[#050d14]/98"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#050d14]/75 via-transparent to-[#050d14]/55"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 transition-colors duration-700"
        style={{ backgroundColor: activeItem.mood }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-[min(68svh,580px)] max-w-6xl flex-col px-4 pb-28 pt-8 sm:px-6 md:min-h-[min(78vh,680px)] md:pb-28 md:pt-12 lg:px-8">
        <div>
          <FadeUp className="max-w-2xl">
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-gold [text-shadow:0_1px_8px_rgba(5,13,20,0.9)] sm:text-xs sm:tracking-[0.35em]">
            {t('eveningKicker')}
          </p>
          <h2 className="mt-2 font-serif text-2xl font-light text-white [text-shadow:0_2px_24px_rgba(5,13,20,0.95)] sm:text-3xl md:text-4xl">
            {t('eveningTitle')}
          </h2>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-cream [text-shadow:0_1px_12px_rgba(5,13,20,0.9)]">
            {t('eveningLead')}
          </p>
          </FadeUp>

          <div
            className="relative mx-auto mt-5 max-w-4xl md:mt-8"
            style={{ paddingInline: trackPad }}
          >
          <div
            ref={trackRef}
            className="relative h-16 select-none overflow-visible touch-pan-y md:h-24"
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              setIsDragging(true);
              setProgressFromClientX(e.clientX, false);
            }}
            onPointerMove={(e) => {
              if (e.buttons !== 1) return;
              setProgressFromClientX(e.clientX, false);
            }}
            onPointerUp={(e) => {
              setIsDragging(false);
              setProgressFromClientX(e.clientX, true);
              try {
                e.currentTarget.releasePointerCapture(e.pointerId);
              } catch {
                /* already released */
              }
            }}
            onPointerCancel={() => {
              setIsDragging(false);
              setProgress((p) => snapProgress(p));
            }}
            role="slider"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress * 100)}
            aria-valuetext={`${activeItem.time}, ${activeItem.label}`}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') {
                e.preventDefault();
                goToIndex(Math.min(STEPS, activeIndex + 1));
              }
              if (e.key === 'ArrowLeft') {
                e.preventDefault();
                goToIndex(Math.max(0, activeIndex - 1));
              }
            }}
          >
            <svg
              className="pointer-events-none absolute inset-x-0 bottom-1 h-14 w-full md:h-16"
              viewBox="0 0 400 80"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                d="M 0 58 Q 200 -8 400 58"
                fill="none"
                stroke="rgba(232,168,56,0.25)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M 0 58 Q 200 -8 400 58"
                fill="none"
                stroke="rgba(232,168,56,0.55)"
                strokeWidth="1"
                strokeDasharray="4 6"
                vectorEffect="non-scaling-stroke"
                style={{
                  strokeDashoffset: 400 - progress * 400,
                  transition: reduceMotion ? 'none' : 'stroke-dashoffset 0.4s ease',
                }}
              />
            </svg>

            <motion.div
              className={cn(
                'absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-grab touch-none',
                isDragging && 'cursor-grabbing',
              )}
              style={{
                left: `${thumbPos.x}%`,
                top: `${thumbPos.y}%`,
              }}
              animate={
                reduceMotion
                  ? {}
                  : isDragging
                    ? { scale: 1.08 }
                    : { scale: 1 }
              }
              transition={{ duration: 0.3, ease: EASE }}
            >
              <div
                ref={thumbWrapRef}
                className="rounded-full bg-[#0a1522]/80 p-1.5 shadow-[0_0_28px_rgba(232,168,56,0.35)] ring-1 ring-gold/30 backdrop-blur-sm"
              >
                <SunMoonThumb progress={progress} />
              </div>
            </motion.div>
          </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-center py-3 md:py-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.time}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="max-w-xl rounded-[2px] bg-[#050d14]/55 p-4 backdrop-blur-md sm:p-5 md:p-5"
            >
              <p
                className="font-serif text-[36px] font-light leading-none sm:text-[44px] md:text-[52px]"
                style={{ color: activeItem.color, opacity: 0.72 }}
                aria-hidden
              >
                {activeItem.time}
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-[0.35em] text-gold">
                {activeItem.label}
              </p>
              <h3 className="mt-2 font-serif text-xl font-light text-white sm:text-2xl md:text-3xl">
                {activeItem.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cream">
                {activeItem.desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-[#050d14] via-[#050d14]/90 to-transparent">
        <div className="relative mx-auto max-w-6xl px-4 pb-[calc(0.75rem+var(--mobile-bar-height)+env(safe-area-inset-bottom,0px))] pt-5 sm:px-6 md:pb-4 md:pt-8 lg:px-8">
          <div
            className="relative mx-auto flex max-w-4xl items-end justify-between gap-1 sm:gap-2"
            style={{ paddingInline: trackPad }}
          >
            {timelineItems.map((item, i) => (
              <button
                key={item.time}
                type="button"
                onClick={() => goToIndex(i)}
                className={cn(
                  'touch-target flex min-w-0 flex-1 flex-col items-center rounded-[2px] px-0.5 py-1 text-center transition-colors duration-500 sm:items-start sm:px-1 sm:text-left',
                  activeIndex === i
                    ? 'text-gold'
                    : 'text-cream/55 hover:text-cream/80',
                )}
              >
                <span className="font-serif text-sm tabular-nums [text-shadow:0_1px_10px_rgba(5,13,20,0.95)] sm:text-base md:text-lg">
                  {item.time}
                </span>
                <span className="mt-0.5 hidden max-w-full truncate text-[9px] uppercase tracking-[0.18em] [text-shadow:0_1px_8px_rgba(5,13,20,0.95)] min-[400px]:block sm:text-[10px] md:tracking-[0.25em]">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8" aria-hidden>
          <div className="relative mx-auto max-w-4xl" style={{ paddingInline: trackPad }}>
            <div className="relative h-px overflow-hidden bg-white/20">
              <motion.div
                className="h-full bg-gold shadow-[0_0_10px_rgba(232,168,56,0.55)]"
                animate={{ width: `${progress * 100}%` }}
                transition={{ duration: reduceMotion ? 0 : 0.5, ease: EASE }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
