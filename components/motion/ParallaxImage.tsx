'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type RefObject } from 'react';
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

type ImageCommonProps = Pick<
  ParallaxImageProps,
  'src' | 'alt' | 'sizes' | 'className' | 'priority'
>;

type ParallaxImageMotionProps = ParallaxImageProps & {
  containerRef: RefObject<HTMLDivElement>;
};

function StaticImage({
  src,
  alt,
  sizes,
  className,
  priority,
}: ImageCommonProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      className={cn('object-cover', className)}
      sizes={sizes}
    />
  );
}

function ParallaxImageMotion({
  src,
  alt,
  sizes,
  className,
  priority,
  yRange,
  containerRef,
}: ParallaxImageMotionProps) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], yRange ?? ['-8%', '8%']);

  return (
    <motion.div className="absolute inset-0 will-change-transform" style={{ y }}>
      <div className="absolute inset-x-0 top-[-5%] h-[110%]">
        <StaticImage
          src={src}
          alt={alt}
          sizes={sizes}
          className={className}
          priority={priority}
        />
      </div>
    </motion.div>
  );
}

export function ParallaxImage(props: ParallaxImageProps) {
  const shouldReduce = useReducedMotion();
  const wrapperClassName = props.wrapperClassName ?? 'absolute inset-0';
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (shouldReduce || !window.matchMedia('(min-width: 768px)').matches) return;
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShouldAnimate(entry.isIntersecting),
      { rootMargin: '160px 0px' },
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, [shouldReduce]);

  return (
    <div ref={containerRef} className={cn('overflow-hidden', wrapperClassName)}>
      {shouldAnimate ? (
        <ParallaxImageMotion {...props} containerRef={containerRef} />
      ) : (
        <StaticImage {...props} />
      )}
    </div>
  );
}
