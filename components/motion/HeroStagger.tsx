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
      <h1 className="max-w-5xl px-1 text-center font-serif text-[clamp(1.75rem,8.5vw,7rem)] font-light leading-[1.08] tracking-tight text-white">
        {sentence}
      </h1>
    );
  }

  return (
    <h1
      key={animationKey}
      className="mx-auto flex max-w-5xl flex-wrap justify-center gap-x-2 gap-y-0.5 px-1 text-center font-serif text-[clamp(1.75rem,8.5vw,7rem)] font-light leading-[1.08] tracking-tight text-white sm:gap-x-3 md:gap-x-4"
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
