import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      sans: ['var(--font-sans)', 'Helvetica Neue', 'Arial', 'sans-serif'],
      display: ['var(--font-sans)', 'Helvetica Neue', 'Arial', 'sans-serif'],
      mono: [
        'ui-monospace',
        'SFMono-Regular',
        'Menlo',
        'Monaco',
        'Consolas',
        'monospace',
      ],
    },
    extend: {
      colors: {
        navy: '#0E161C',
        ink: '#070C10',
        surface: '#162029',
        /** Logo rock ochre / yellow */
        gold: '#E0D060',
        cream: '#F2F4F5',
        /** Logo teal rock */
        mist: '#70B0A0',
        /** Logo rocks */
        rock: {
          teal: '#70B0A0',
          yellow: '#E0D060',
          coral: '#E07070',
          orange: '#E09060',
          pink: '#E090A0',
          blue: '#405080',
        },
        /** Neon palette — logo rocks + brand pink */
        neon: {
          teal: '#5CFFD0',
          yellow: '#FFE566',
          coral: '#FF6B7A',
          orange: '#FF9A4A',
          pink: '#FF2EC8',
          blue: '#6B8CFF',
          magenta: '#FF2EC8',
        },
        pop: '#FB00BC',
        coral: '#E07070',
        sea: '#70B0A0',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
      },
      boxShadow: {
        'neon-teal':
          '0 0 12px rgba(92,255,208,0.55), 0 0 36px rgba(92,255,208,0.25)',
        'neon-yellow':
          '0 0 12px rgba(255,229,102,0.55), 0 0 36px rgba(255,229,102,0.25)',
        'neon-coral':
          '0 0 12px rgba(255,107,122,0.55), 0 0 36px rgba(255,107,122,0.25)',
        'neon-pink':
          '0 0 14px rgba(255,46,200,0.65), 0 0 40px rgba(251,0,188,0.35)',
        'neon-blue':
          '0 0 12px rgba(107,140,255,0.55), 0 0 36px rgba(107,140,255,0.25)',
        'neon-horizon':
          '0 0 14px rgba(92,255,208,0.3), 0 0 28px rgba(255,229,102,0.25), 0 0 42px rgba(255,46,200,0.3), 0 0 56px rgba(107,140,255,0.22)',
      },
      spacing: {
        '18': '4.5rem',
      },
      keyframes: {
        'chevron-bounce': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(6px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'horizon-drift': {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-2%)' },
        },
        'neon-pulse': {
          '0%, 100%': { opacity: '0.7', filter: 'brightness(1)' },
          '50%': { opacity: '1', filter: 'brightness(1.15)' },
        },
      },
      animation: {
        'chevron-bounce': 'chevron-bounce 1.6s ease-in-out infinite',
        marquee: 'marquee 40s linear infinite',
        'horizon-drift': 'horizon-drift 18s ease-in-out infinite',
        'neon-pulse': 'neon-pulse 3.2s ease-in-out infinite',
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
