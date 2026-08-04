import { cn } from '@/lib/utils';

type Props = {
  className?: string;
  /** Softer wash for denser content areas */
  intensity?: 'soft' | 'medium';
};

/**
 * Soft multi-color neon spots for solid (non-photo) backgrounds.
 */
export function AmbientGlow({ className, intensity = 'soft' }: Props) {
  const a = intensity === 'soft' ? '0.11' : '0.16';
  const b = intensity === 'soft' ? '0.09' : '0.13';

  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        className,
      )}
      aria-hidden
    >
      <div
        className="absolute -left-[18%] top-[-8%] h-[70%] w-[70%] rounded-full blur-[110px]"
        style={{
          background: `radial-gradient(circle, rgba(92,255,208,${a}) 0%, transparent 70%)`,
        }}
      />
      <div
        className="absolute -right-[12%] top-[8%] h-[58%] w-[58%] rounded-full blur-[100px]"
        style={{
          background: `radial-gradient(circle, rgba(255,46,200,${a}) 0%, transparent 68%)`,
        }}
      />
      <div
        className="absolute bottom-[-18%] left-[22%] h-[55%] w-[60%] rounded-full blur-[120px]"
        style={{
          background: `radial-gradient(circle, rgba(255,229,102,${b}) 0%, transparent 70%)`,
        }}
      />
      <div
        className="absolute bottom-[12%] right-[-8%] h-[42%] w-[42%] rounded-full blur-[90px]"
        style={{
          background: `radial-gradient(circle, rgba(107,140,255,${b}) 0%, transparent 68%)`,
        }}
      />
      <div
        className="absolute left-[40%] top-[38%] h-[28%] w-[28%] rounded-full blur-[80px]"
        style={{
          background: `radial-gradient(circle, rgba(255,107,122,${b}) 0%, transparent 70%)`,
        }}
      />
    </div>
  );
}
