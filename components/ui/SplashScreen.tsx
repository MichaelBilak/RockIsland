'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

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

    const unmountMs = reduceMotion ? 900 : 2000;
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
    : { delay: 0.2, duration: 0.8, ease: EASE };

  const lineTransition = reduceMotion
    ? { duration: 0 }
    : { delay: 1, duration: 0.4, ease: EASE };

  const overlayTransition = reduceMotion
    ? { delay: 0.5, duration: 0.4, ease: EASE }
    : { delay: 1.6, duration: 0.4, ease: EASE };

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050d14]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={overlayTransition}
        >
          <div className="flex flex-col items-center">
            <motion.p
              className="font-serif text-2xl text-white"
              initial={
                reduceMotion
                  ? { opacity: 1, letterSpacing: '0.35em' }
                  : { opacity: 0, letterSpacing: '0.1em' }
              }
              animate={{ opacity: 1, letterSpacing: '0.35em' }}
              transition={titleTransition}
            >
              RockIsland
            </motion.p>
            <motion.div
              className="mt-4 h-px w-12 bg-gold"
              initial={{ opacity: reduceMotion ? 1 : 0 }}
              animate={{ opacity: 1 }}
              transition={lineTransition}
              aria-hidden
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
