'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  type MotionValue,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { Moon, Wine } from 'lucide-react';
import { FadeUp } from '@/components/motion/FadeUp';
import { useLocale } from '@/contexts/LocaleContext';
import type { MessageKey } from '@/lib/i18n/messages';
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
    image: wixFill(WIX.pierView, 1600, 1000),
    color: '#FFE566',
    mood: 'rgba(255, 229, 102, 0.12)',
  },
  {
    time: '20:00',
    labelKey: 'eveningPhase1Label',
    titleKey: 'eveningPhase1Title',
    descKey: 'eveningPhase1Desc',
    image: wixFill(WIX.foodTable, 1600, 1000),
    color: '#5CFFD0',
    mood: 'rgba(92, 255, 208, 0.1)',
  },
  {
    time: '22:00',
    labelKey: 'eveningPhase2Label',
    titleKey: 'eveningPhase2Title',
    descKey: 'eveningPhase2Desc',
    image: wixFill(WIX.bar, 1600, 1000),
    color: '#FF2EC8',
    mood: 'rgba(255, 46, 200, 0.12)',
  },
  {
    time: '00:00',
    labelKey: 'eveningPhase3Label',
    titleKey: 'eveningPhase3Title',
    descKey: 'eveningPhase3Desc',
    image: wixFill(WIX.venueEvening, 1600, 1000),
    color: '#6B8CFF',
    mood: 'rgba(107, 140, 255, 0.1)',
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
  // Matches `M 0 58 Q 200 -8 400 58` in the timeline SVG viewBox.
  const y = 72.5 - 165 * t * (1 - t);
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

function SunMoonThumb({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="relative flex h-12 w-12 items-center justify-center md:h-14 md:w-14">
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ opacity: activeIndex === 0 ? 1 : 0, scale: activeIndex === 0 ? 1 : 0.85 }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden>
          <circle cx="32" cy="32" r="14" fill="#FFE566" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1="32"
              y1="32"
              x2={32 + Math.cos((deg * Math.PI) / 180) * 22}
              y2={32 + Math.sin((deg * Math.PI) / 180) * 22}
              stroke="#FFE566"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          ))}
        </svg>
      </motion.div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ opacity: activeIndex === 1 ? 1 : 0, scale: activeIndex === 1 ? 1 : 0.85 }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden>
          <defs>
            <linearGradient id="sunsetGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFE566" />
              <stop offset="100%" stopColor="#FF6B7A" />
            </linearGradient>
          </defs>
          <rect x="4" y="36" width="56" height="4" fill="#5CFFD0" opacity="0.45" />
          <path d="M12 36 A20 20 0 0 1 52 36 Z" fill="url(#sunsetGrad)" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center text-neon-pink"
        animate={{ opacity: activeIndex === 2 ? 1 : 0, scale: activeIndex === 2 ? 1 : 0.85 }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        <div className="flex items-end gap-1">
          <Wine className="h-8 w-8 md:h-9 md:w-9" strokeWidth={1.5} />
          <Wine className="h-6 w-6 rotate-12 md:h-7 md:w-7" strokeWidth={1.5} />
        </div>
      </motion.div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center text-cream"
        animate={{ opacity: activeIndex === 3 ? 1 : 0, scale: activeIndex === 3 ? 1 : 0.85 }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        <Moon className="h-10 w-10 fill-cream/20 md:h-11 md:w-11" strokeWidth={1.25} />
      </motion.div>
    </div>
  );
}

function TimelineBackground({
  item,
  index,
  progress,
  reduceMotion,
  activeIndex,
}: {
  item: { time: string; image: string };
  index: number;
  progress: MotionValue<number>;
  reduceMotion: boolean | null;
  activeIndex: number;
}) {
  const opacity = useTransform(progress, (value) =>
    reduceMotion ? (index === activeIndex ? 1 : 0) : phaseOpacity(value, index),
  );
  const shouldRender = Math.abs(index - activeIndex) <= 1;

  if (!shouldRender) return null;

  return (
    <motion.div
      className="absolute inset-0 will-change-opacity"
      style={{ opacity }}
    >
      <Image
        src={item.image}
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        priority={index === 0}
      />
    </motion.div>
  );
}

export function EveningTimeline() {
  const { t } = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbWrapRef = useRef<HTMLDivElement>(null);
  const dragLockRef = useRef(false);
  const activeIndexRef = useRef(0);
  const progress = useMotionValue(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [thumbHalf, setThumbHalf] = useState(30);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

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

  const activeItem = timelineItems[activeIndex];
  const trackPad = thumbHalf;
  const updateActiveIndex = useCallback((nextIndex: number) => {
    if (activeIndexRef.current === nextIndex) return;
    activeIndexRef.current = nextIndex;
    setActiveIndex(nextIndex);
  }, []);
  const thumbX = useTransform(progress, (value) => `${arcPosition(value).x}%`);
  const thumbY = useTransform(progress, (value) => `${arcPosition(value).y}%`);
  const thumbOffsetX = useTransform(progress, [0, 1], ['0%', '-100%']);
  const dashOffset = useTransform(progress, (value) => 400 - value * 400);
  const progressScale = useTransform(progress, [0, 1], [0, 1]);

  const scrollToProgress = useCallback((value: number, smooth: boolean) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const absoluteTop = window.scrollY + rect.top;
    const travel = Math.max(0, el.offsetHeight - window.innerHeight);
    window.scrollTo({
      top: absoluteTop + Math.max(0, Math.min(1, value)) * travel,
      behavior: smooth ? 'smooth' : 'auto',
    });
  }, []);

  const setProgressFromClientX = useCallback((clientX: number, snap: boolean) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const raw = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const next = snap ? snapProgress(raw) : raw;
    progress.set(next);
    updateActiveIndex(Math.round(next * STEPS));
    scrollToProgress(next, false);
  }, [progress, scrollToProgress, updateActiveIndex]);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (dragLockRef.current || reduceMotion) return;
    const next = Math.max(0, Math.min(1, latest));
    progress.set(next);
    updateActiveIndex(Math.round(next * STEPS));
  });

  useEffect(() => {
    const thumb = thumbWrapRef.current;
    if (!thumb) return;

    const update = () => setThumbHalf(thumb.offsetWidth / 2);

    update();
    const ro = new ResizeObserver(update);
    ro.observe(thumb);
    return () => ro.disconnect();
  }, []);

  const goToIndex = useCallback(
    (index: number) => {
      const next = index / STEPS;
      progress.set(next);
      updateActiveIndex(index);
      if (!reduceMotion) {
        scrollToProgress(next, true);
      }
    },
    [progress, reduceMotion, scrollToProgress, updateActiveIndex],
  );

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
      const next = e.key === 'ArrowRight' ? activeIndex + 1 : activeIndex - 1;
      goToIndex(Math.max(0, Math.min(STEPS, next)));
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIndex, goToIndex]);

  const stickyPanel = (
    <section
      ref={sectionRef}
      className={cn(
        'relative flex flex-col bg-ink',
        reduceMotion
          ? 'min-h-[min(68svh,580px)] md:min-h-[min(78vh,680px)]'
          : 'h-[100svh] min-h-[500px] sm:min-h-[560px]',
      )}
      aria-label={t('eveningSectionAria')}
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        {timelineItems.map((item, index) => (
          <TimelineBackground
            key={item.time}
            item={item}
            index={index}
            progress={progress}
            reduceMotion={reduceMotion}
            activeIndex={activeIndex}
          />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-ink/35" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/92 via-ink/50 to-ink/98"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/75 via-transparent to-ink/55"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 transition-colors duration-700"
        style={{ backgroundColor: activeItem.mood }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col px-4 pb-36 pt-[calc(6rem+env(safe-area-inset-top,0px))] sm:px-6 md:pb-28 md:pt-[calc(var(--nav-height)+1rem)] lg:px-8">
        <div>
          <FadeUp className="max-w-2xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-gold [text-shadow:0_1px_8px_rgba(10,16,20,0.9)] sm:text-xs sm:tracking-[0.35em]">
              {t('eveningKicker')}
            </p>
            <h2 className="mt-2 font-sans text-2xl font-semibold text-white [text-shadow:0_2px_24px_rgba(10,16,20,0.95)] sm:text-3xl md:text-4xl">
              {t('eveningTitle')}
            </h2>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-cream [text-shadow:0_1px_12px_rgba(10,16,20,0.9)]">
              {t('eveningLead')}
            </p>
          </FadeUp>

          <div
            className="relative mx-auto mt-36 max-w-4xl md:mt-8"
            style={{ paddingInline: trackPad }}
          >
            <div
              ref={trackRef}
              className="relative h-14 select-none overflow-visible touch-pan-y md:h-16"
              onPointerDown={(e) => {
                e.currentTarget.setPointerCapture(e.pointerId);
                dragLockRef.current = true;
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
                window.setTimeout(() => {
                  dragLockRef.current = false;
                }, 80);
              }}
              onPointerCancel={() => {
                setIsDragging(false);
                const snapped = snapProgress(progress.get());
                progress.set(snapped);
                updateActiveIndex(Math.round(snapped * STEPS));
                scrollToProgress(snapped, false);
                window.setTimeout(() => {
                  dragLockRef.current = false;
                }, 80);
              }}
              role="slider"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round((activeIndex / STEPS) * 100)}
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
                className="pointer-events-none absolute inset-x-0 bottom-0 h-14 w-full md:h-16"
                viewBox="0 0 400 80"
                preserveAspectRatio="none"
                aria-hidden
              >
                <defs>
                  <linearGradient id="eveningNeon" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#5CFFD0" />
                    <stop offset="25%" stopColor="#FFE566" />
                    <stop offset="50%" stopColor="#FF2EC8" />
                    <stop offset="75%" stopColor="#FF8AB8" />
                    <stop offset="100%" stopColor="#6B8CFF" />
                  </linearGradient>
                </defs>
                <path
                  d="M 0 58 Q 200 -8 400 58"
                  fill="none"
                  stroke="url(#eveningNeon)"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                  opacity="0.35"
                />
                <motion.path
                  d="M 0 58 Q 200 -8 400 58"
                  fill="none"
                  stroke="url(#eveningNeon)"
                  strokeWidth="1.75"
                  strokeDasharray="4 6"
                  vectorEffect="non-scaling-stroke"
                  style={{
                    strokeDashoffset: dashOffset,
                  }}
                />
              </svg>

              <motion.div
                className={cn(
                  'absolute z-10 cursor-grab touch-none',
                  isDragging && 'cursor-grabbing',
                )}
                style={{
                  left: thumbX,
                  top: thumbY,
                }}
              >
                <motion.div style={{ x: thumbOffsetX, y: '-50%' }}>
                  <motion.div
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
                      className="rounded-full bg-surface/95 p-1.5 shadow-neon-horizon ring-1 ring-neon-pink/40"
                    >
                      <SunMoonThumb activeIndex={activeIndex} />
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-1 flex-col justify-end pb-14 md:mt-0 md:justify-end md:pb-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.time}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="max-w-xl rounded-[2px] bg-ink/85 p-4 sm:p-5 md:p-5"
            >
              <p
                className="font-sans text-[36px] font-semibold leading-none sm:text-[44px] md:text-[52px]"
                style={{ color: activeItem.color, opacity: 0.72 }}
                aria-hidden
              >
                {activeItem.time}
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-[0.35em] text-gold">
                {activeItem.label}
              </p>
              <h3 className="mt-2 font-sans text-xl font-semibold text-white sm:text-2xl md:text-3xl">
                {activeItem.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cream">
                {activeItem.desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-ink via-ink/90 to-transparent">
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] pt-2 sm:px-6 md:pb-4 md:pt-8 lg:px-8">
          <div className="relative mx-auto flex w-full max-w-md items-end justify-between gap-2 sm:max-w-4xl sm:gap-2">
            {timelineItems.map((item, i) => (
              <button
                key={item.time}
                type="button"
                onClick={() => goToIndex(i)}
                className={cn(
                  'touch-target flex min-w-0 flex-1 flex-col items-center rounded-[2px] px-0.5 py-1 text-center transition-colors duration-500 sm:items-start sm:px-1 sm:text-left',
                  activeIndex === i
                    ? 'text-neon-yellow drop-shadow-[0_0_10px_rgba(255,229,102,0.5)]'
                    : 'text-cream/55 hover:text-neon-teal/80',
                )}
              >
                <span className="font-sans text-sm tabular-nums [text-shadow:0_1px_10px_rgba(10,16,20,0.95)] sm:text-base md:text-lg">
                  {item.time}
                </span>
                <span className="mt-0.5 max-w-full truncate text-[9px] uppercase tracking-[0.12em] [text-shadow:0_1px_8px_rgba(10,16,20,0.95)] sm:text-[10px] md:tracking-[0.25em]">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="relative mx-auto max-w-4xl px-2 sm:px-6 lg:px-8" aria-hidden>
          <div className="relative mx-auto max-w-4xl" style={{ paddingInline: trackPad }}>
            <div className="relative h-px overflow-hidden bg-white/20">
              <motion.div
                className="h-full bg-gradient-to-r from-neon-teal via-neon-yellow to-neon-pink shadow-neon-horizon"
                style={{ scaleX: progressScale, transformOrigin: 'left' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  if (reduceMotion) {
    return (
      <div id="evening">
        {stickyPanel}
      </div>
    );
  }

  return (
    <div
      id="evening"
      ref={containerRef}
      className="relative h-[220svh] md:h-[320vh]"
    >
      <div className="sticky top-0 h-[100svh] min-h-[560px]">{stickyPanel}</div>
    </div>
  );
}
