'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import { useLocale } from '@/contexts/LocaleContext';
import { cn } from '@/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as const;

export type DishRevealData = {
  id: string;
  name: string;
  description?: string;
  price: string;
  image: string;
  category: string;
};

type DishRevealProps = {
  dish: DishRevealData | null;
  onClose: () => void;
};

function CloseButton({
  className,
  onClose,
  label,
}: {
  className?: string;
  onClose: () => void;
  label: string;
}) {
  const handleClose = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onClose();
  };

  return (
    <button
      type="button"
      className={cn(
        'inline-flex touch-target items-center justify-center',
        className,
      )}
      aria-label={label}
      onPointerUp={handleClose}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <X className="h-5 w-5 pointer-events-none" strokeWidth={1.75} aria-hidden />
    </button>
  );
}

export function DishReveal({ dish, onClose }: DishRevealProps) {
  const { t } = useLocale();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!dish) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [dish, onClose]);

  useEffect(() => {
    if (!dish) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [dish]);

  const cardTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.38, ease: EASE };

  const backdropTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.3, ease: EASE };

  return (
    <AnimatePresence>
      {dish ? (
        <div key={dish.id} className="fixed inset-0 z-50">
          <motion.button
            type="button"
            aria-label={t('dishRevealClose')}
            className="absolute inset-0 z-0 bg-[#050d14]/75 backdrop-blur-[3px] md:bg-[#050d14]/0 md:backdrop-blur-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={backdropTransition}
            onClick={onClose}
          />

          {/* Mobile — centered card */}
          <div className="absolute inset-0 z-10 flex items-center justify-center px-5 py-8 md:hidden">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="dish-reveal-title-mobile"
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={cardTransition}
              className="relative w-full max-w-[min(100%,340px)] overflow-hidden rounded-sm border border-white/15 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.65)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[3/4] min-h-[380px] w-full">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  className="object-cover"
                  sizes="340px"
                  priority
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-[#050d14]/35"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050d14]/55 via-transparent to-[#050d14]/20"
                  aria-hidden
                />
                {/* Bottom vignette — stronger read on price block */}
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-[radial-gradient(ellipse_130%_90%_at_50%_100%,rgba(5,13,20,0.98)_0%,rgba(5,13,20,0.72)_42%,transparent_100%)]"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#050d14] via-[#050d14]/92 to-transparent"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute left-5 top-0 h-px w-10 bg-gold/70"
                  aria-hidden
                />

                <CloseButton
                  label={t('dishRevealClose')}
                  onClose={onClose}
                  className="absolute right-2 top-2 z-20 rounded-full border border-white/10 bg-[#050d14]/50 p-2 text-cream backdrop-blur-sm hover:border-gold/30 hover:bg-[#050d14]/70 hover:text-gold"
                />

                <div className="absolute inset-x-0 bottom-0 z-[1] p-6 pt-20">
                  <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-gold">
                    {dish.category}
                  </p>
                  <h2
                    id="dish-reveal-title-mobile"
                    className="mt-2 font-serif text-[1.75rem] font-light leading-tight text-white"
                  >
                    {dish.name}
                  </h2>
                  {dish.description ? (
                    <p className="mt-3 text-sm leading-relaxed text-cream/85">
                      {dish.description}
                    </p>
                  ) : null}
                  <div className="relative mt-5 flex items-center justify-between border-t border-gold/35 pt-4">
                    <span className="text-[10px] uppercase tracking-[0.28em] text-mist/90">
                      {t('dishRevealPrice')}
                    </span>
                    <p className="font-serif text-2xl tabular-nums text-gold">
                      € {dish.price}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Desktop — full split layout */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="dish-reveal-title"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={cardTransition}
            className="absolute inset-0 z-10 hidden flex-col bg-[#050d14] md:flex md:flex-row"
            onClick={onClose}
          >
            <CloseButton
              label={t('dishRevealClose')}
              onClose={onClose}
              className="absolute right-6 top-6 z-[60] rounded-full p-2 text-cream hover:text-gold"
            />

            <div className="relative h-full w-[55%] shrink-0">
              <Image
                src={dish.image}
                alt={dish.name}
                fill
                className="object-cover"
                sizes="55vw"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent to-[#050d14]/80" />
            </div>

            <div className="flex w-[45%] flex-none flex-col justify-center overflow-y-auto bg-[#050d14] px-12 lg:px-16">
              <p className="text-xs uppercase tracking-[0.35em] text-gold">
                {dish.category}
              </p>
              <h2
                id="dish-reveal-title"
                className="mt-4 font-serif text-5xl font-light text-white lg:text-6xl"
              >
                {dish.name}
              </h2>
              {dish.description ? (
                <p className="mt-4 leading-relaxed text-cream/80">{dish.description}</p>
              ) : null}
              <p className="mt-6 font-serif text-3xl text-gold">€ {dish.price}</p>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
