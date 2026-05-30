'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/contexts/LocaleContext';

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

  return (
    <AnimatePresence>
      {dish ? (
        <motion.div
          key={dish.id}
          role="dialog"
          aria-modal="true"
          aria-labelledby="dish-reveal-title"
          variants={{
            hidden: { opacity: 0, scale: 0.97 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: reduceMotion
                ? { duration: 0 }
                : { duration: 0.4, ease: EASE },
            },
            exit: {
              opacity: 0,
              scale: 0.97,
              transition: reduceMotion
                ? { duration: 0 }
                : { duration: 0.25, ease: EASE },
            },
          }}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex flex-col bg-[#050d14] md:flex-row"
          onClick={onClose}
        >
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-6 top-6 z-[60] text-cream hover:text-gold"
            aria-label={t('dishRevealClose')}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            ✕
          </Button>

          <div className="flex h-full w-full flex-col md:flex-row">
            <div className="relative h-[40%] w-full shrink-0 md:h-full md:w-[55%]">
              <Image
                src={dish.image}
                alt={dish.name}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 55vw, 100vw"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#050d14]/0 to-[#050d14]/80 md:bg-gradient-to-r" />
            </div>

            <div className="flex flex-1 flex-col justify-center bg-[#050d14] px-8 py-10 md:w-[45%] md:flex-none md:px-12 lg:px-16">
              <p className="text-xs uppercase tracking-[0.35em] text-gold">
                {dish.category}
              </p>
              <h2
                id="dish-reveal-title"
                className="mt-4 font-serif text-5xl font-light text-white md:text-6xl"
              >
                {dish.name}
              </h2>
              {dish.description ? (
                <p className="mt-4 leading-relaxed text-cream/80">{dish.description}</p>
              ) : null}
              <p className="mt-6 font-serif text-3xl text-gold">€ {dish.price}</p>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
