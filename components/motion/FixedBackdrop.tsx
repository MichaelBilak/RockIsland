'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  src: string;
  alt?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** Gradient / vignette overlays inside the fixed layer */
  children?: ReactNode;
};

/**
 * Viewport-fixed photo backdrop, clipped to the parent section so it
 * never paints over neighbouring sections.
 * Parent section should include `[clip-path:inset(0)]` (or use SectionClip).
 */
export function FixedBackdrop({
  src,
  alt = '',
  priority,
  sizes = '100vw',
  className,
  children,
}: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    const target = host?.parentElement;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting && entry.intersectionRatio >= 0.2);
      },
      { threshold: [0, 0.2, 0.4, 0.6, 0.8, 1] },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={hostRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div
        className={cn(
          'pointer-events-none fixed inset-0 z-0 transform-gpu will-change-opacity transition-opacity duration-500',
          active ? 'opacity-100' : 'opacity-0',
          className,
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
        {children}
      </div>
    </div>
  );
}

/** Apply on sections that host FixedBackdrop */
export const fixedBgSectionClass = '[clip-path:inset(0)]';
