'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { RockHorizon } from '@/components/brand/RockHorizon';

const EASE = [0.22, 1, 0.36, 1] as const;
const STORAGE_KEY = 'ri_splash_shown';

export function SplashScreen() {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
    } catch {
      return;
    }
    setShow(true);
  }, [mounted]);

  useEffect(() => {
    if (!show) return;

    const unmountMs = reduceMotion ? 900 : 2200;
    const timer = window.setTimeout(() => {
      try {
        sessionStorage.setItem(STORAGE_KEY, '1');
      } catch {
        /* ignore */
      }
      setShow(false);
    }, unmountMs);

    return () => window.clearTimeout(timer);
  }, [show, reduceMotion]);

  if (!mounted) return null;

  const titleTransition = reduceMotion
    ? { duration: 0 }
    : { delay: 0.15, duration: 0.85, ease: EASE };

  const overlayTransition = reduceMotion
    ? { delay: 0.5, duration: 0.4, ease: EASE }
    : { delay: 1.7, duration: 0.45, ease: EASE };

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-ink"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={overlayTransition}
        >
          <motion.div
            className="relative flex flex-col items-center px-6"
            initial={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={titleTransition}
          >
            <Image
              src="/brand/rockisland-logo.png"
              alt="Rockisland Rimini"
              width={320}
              height={126}
              className="h-auto w-[min(280px,72vw)] drop-shadow-[0_0_32px_rgba(255,46,200,0.45)]"
              priority
            />
            <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.45em] text-neon-yellow/90">
              Rimini
            </p>
          </motion.div>

          <div className="absolute inset-x-0 bottom-0">
            <RockHorizon className="h-14 sm:h-16" />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
