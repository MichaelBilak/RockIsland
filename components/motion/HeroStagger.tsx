'use client';

import { motion, useReducedMotion } from 'framer-motion';

type Props = {
  sentence: string;
  /** Cambia con la lingua per ricalcolare l’animazione */
  animationKey: string;
};

export function HeroStagger({ sentence, animationKey }: Props) {
  const reduce = useReducedMotion();
  const words = sentence.split(/\s+/).filter(Boolean);

  if (reduce) {
    return (
      <h1 className="max-w-4xl px-1 text-center font-sans text-[clamp(1.55rem,5.8vw,5.25rem)] font-medium leading-[1.12] tracking-tight text-white">
        {sentence}
      </h1>
    );
  }

  return (
    <h1
      key={animationKey}
      className="mx-auto flex max-w-4xl flex-wrap justify-center gap-x-2 gap-y-0.5 px-1 text-center font-sans text-[clamp(1.55rem,5.8vw,5.25rem)] font-medium leading-[1.12] tracking-tight text-white sm:gap-x-3 md:gap-x-4"
    >
      {words.map((word, i) => (
        <motion.span
          key={`${animationKey}-${word}-${i}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.55,
            delay: i * 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
}
