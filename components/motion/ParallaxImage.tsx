'use client';

import Image from 'next/image';
import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { cn } from '@/lib/utils';

type ParallaxImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  /** Scroll-tracked wrapper; default fills a `relative` parent */
  wrapperClassName?: string;
  yRange?: [string, string];
};

export function ParallaxImage({
  src,
  alt,
  sizes,
  className,
  priority,
  wrapperClassName = 'absolute inset-0',
  yRange = ['-8%', '8%'],
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], yRange);

  return (
    <div ref={containerRef} className={cn('overflow-hidden', wrapperClassName)}>
      {shouldReduce ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className={cn('object-cover', className)}
          sizes={sizes}
        />
      ) : (
        <motion.div className="absolute inset-0" style={{ y }}>
          <div className="absolute inset-x-0 top-[-5%] h-[110%]">
            <Image
              src={src}
              alt={alt}
              fill
              priority={priority}
              className={cn('object-cover', className)}
              sizes={sizes}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}
