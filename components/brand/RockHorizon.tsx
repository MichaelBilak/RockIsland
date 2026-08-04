'use client';

import { useId } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  className?: string;
};

const HORIZON_PATH =
  'M0 82 C35 74 65 48 105 52 C145 56 168 32 208 40 C248 48 278 22 328 34 C378 46 418 18 468 30 C518 42 558 14 618 26 C678 38 718 12 778 24 C838 36 878 16 938 28 C998 40 1038 20 1098 32 C1140 40 1172 54 1200 62 L1200 120 L0 120 Z';
const HORIZON_RIM =
  'M0 82 C35 74 65 48 105 52 C145 56 168 32 208 40 C248 48 278 22 328 34 C378 46 418 18 468 30 C518 42 558 14 618 26 C678 38 718 12 778 24 C838 36 878 16 938 28 C998 40 1038 20 1098 32 C1140 40 1172 54 1200 62';
const HORIZON_GLOW =
  'M0 78 C40 70 70 42 110 48 C150 54 170 28 210 36 C250 44 280 18 330 30 C380 42 420 14 470 26 C520 38 560 10 620 22 C680 34 720 8 780 20 C840 32 880 12 940 24 C1000 36 1040 16 1100 28 C1140 36 1170 50 1200 58 L1200 120 L0 120 Z';

/**
 * Static multi-color rock horizon. Its visual continuation is handled by
 * the photo wave-flow effect as visitors scroll through the page.
 */
export function RockHorizon({ className }: Props) {
  const uid = useId().replace(/:/g, '');
  const fillId = `rockFill-${uid}`;
  const neonId = `rockNeon-${uid}`;
  const glowId = `neonGlow-${uid}`;

  return (
    <div
      className={cn('pointer-events-none relative w-full overflow-visible', className)}
      aria-hidden
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
          <defs>
            <linearGradient id={fillId} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#70B0A0" />
              <stop offset="18%" stopColor="#E0D060" />
              <stop offset="38%" stopColor="#E07070" />
              <stop offset="55%" stopColor="#E09060" />
              <stop offset="72%" stopColor="#E090A0" />
              <stop offset="100%" stopColor="#405080" />
            </linearGradient>
            <linearGradient id={neonId} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#5CFFD0" />
              <stop offset="18%" stopColor="#FFE566" />
              <stop offset="38%" stopColor="#FF6B7A" />
              <stop offset="55%" stopColor="#FF9A4A" />
              <stop offset="72%" stopColor="#FF8AB8" />
              <stop offset="100%" stopColor="#6B8CFF" />
            </linearGradient>
            <filter id={glowId} x="-20%" y="-80%" width="140%" height="260%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            d={HORIZON_GLOW}
            fill={`url(#${neonId})`}
            filter={`url(#${glowId})`}
            opacity="0.35"
          />

          <path d={HORIZON_PATH} fill={`url(#${fillId})`} opacity={0.92} />

          <path
            d={HORIZON_RIM}
            fill="none"
            stroke={`url(#${neonId})`}
            strokeWidth="2.5"
            filter={`url(#${glowId})`}
          />
      </svg>
    </div>
  );
}
