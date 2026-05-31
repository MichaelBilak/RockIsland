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

type ImageCommonProps = Pick<
  ParallaxImageProps,
  'src' | 'alt' | 'sizes' | 'className' | 'priority'
>;

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
  wrapperClassName,
  yRange,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], yRange ?? ['-8%', '8%']);

  return (
    <div ref={containerRef} className={cn('overflow-hidden', wrapperClassName)}>
      <motion.div className="absolute inset-0" style={{ y }}>
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
    </div>
  );
}

export function ParallaxImage(props: ParallaxImageProps) {
  const shouldReduce = useReducedMotion();
  const wrapperClassName = props.wrapperClassName ?? 'absolute inset-0';

  if (shouldReduce) {
    return (
      <div className={cn('overflow-hidden', wrapperClassName)}>
        <StaticImage {...props} />
      </div>
    );
  }

  return <ParallaxImageMotion {...props} wrapperClassName={wrapperClassName} />;
}
