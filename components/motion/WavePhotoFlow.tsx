'use client';

import { useEffect } from 'react';

const PHOTO_SELECTOR = '[data-wave-photo]';

/**
 * Photos light up while they are in view and fade back out once visitors
 * scroll past them, so the neon follows the reading flow.
 */
export function WavePhotoFlow() {
  useEffect(() => {
    const photos = Array.from(
      document.querySelectorAll<HTMLElement>(PHOTO_SELECTOR),
    );
    if (!photos.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      photos.forEach((photo) => photo.classList.add('is-wave-lit'));
      return;
    }

    const timers = new Map<HTMLElement, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
          .forEach((entry, index) => {
            const photo = entry.target as HTMLElement;
            const pendingTimer = timers.get(photo);

            if (!entry.isIntersecting) {
              if (pendingTimer) window.clearTimeout(pendingTimer);
              timers.delete(photo);
              photo.classList.remove('is-wave-lit');
              return;
            }

            if (photo.classList.contains('is-wave-lit') || pendingTimer) return;
            const timer = window.setTimeout(() => {
              photo.classList.add('is-wave-lit');
              timers.delete(photo);
            }, index * 110);
            timers.set(photo, timer);
          });
      },
      { rootMargin: '0px 0px -18% 0px', threshold: 0.35 },
    );

    photos.forEach((photo) => observer.observe(photo));
    return () => {
      observer.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  return null;
}
