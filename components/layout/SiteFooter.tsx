'use client';

import Link from 'next/link';
import { Instagram, Facebook } from 'lucide-react';
import { CONTACT, WHATSAPP_HREF } from '@/lib/site';
import { useLocale } from '@/contexts/LocaleContext';
import type { MessageKey } from '@/lib/i18n/messages';
import { RockHorizon } from '@/components/brand/RockHorizon';

const footerLinkKeys: { href: string; key: MessageKey }[] = [
  { href: '/menu', key: 'navMenu' },
  { href: '/eventi', key: 'navEvents' },
  { href: '/convention', key: 'navConvention' },
  { href: '/prenota', key: 'navBook' },
];

export function SiteFooter() {
  const { t } = useLocale();

  return (
    <footer className="relative text-cream/80">
      {/*
        Pull the wave up so its transparent crest sits on the previous section
        (no navy flash strip). Ink only fills under the solid rock body.
      */}
      <div className="pointer-events-none relative -mt-8 leading-[0] sm:-mt-10 md:-mt-12">
        <RockHorizon className="relative z-[1] block h-16 w-full sm:h-20 md:h-24" />
      </div>
      <div className="relative z-10 -mt-1 overflow-hidden bg-ink">
        {/* Wave gradient continues into the footer body */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-40 sm:h-48"
          aria-hidden
          style={{
            background:
              'linear-gradient(180deg, rgba(7,12,16,0) 0%, rgba(7,12,16,0.55) 55%, #070C10 100%), linear-gradient(90deg, rgba(92,255,208,0.22) 0%, rgba(255,229,102,0.2) 18%, rgba(255,107,122,0.22) 38%, rgba(255,154,74,0.2) 55%, rgba(255,46,200,0.2) 72%, rgba(107,140,255,0.22) 100%)',
          }}
        />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-10 px-4 pb-12 pt-8 text-center sm:px-6 sm:pb-16 sm:pt-10">
          <div>
            <p className="font-brand text-neon-brand text-2xl sm:text-3xl">Rockisland</p>
            <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.45em] text-neon-teal/90">
              Rimini
            </p>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm uppercase tracking-[0.2em] text-mist">
            {footerLinkKeys.map(({ href, key }) => (
              <Link
                key={href}
                href={href}
                className="transition-colors hover:text-neon-yellow"
              >
                {t(key)}
              </Link>
            ))}
          </nav>
          <div className="space-y-1 text-sm">
            <p>
              <a
                href={CONTACT.phoneHref}
                className="transition-colors hover:text-neon-teal"
              >
                {CONTACT.phone}
              </a>
            </p>
            <p>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-neon-blue"
              >
                {t('mobileWhatsApp')}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${CONTACT.email}`}
                className="transition-colors hover:text-neon-pink"
              >
                {CONTACT.email}
              </a>
            </p>
            <p className="pt-2 text-cream/55">{CONTACT.address}</p>
          </div>
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target rounded-[2px] p-2 text-cream/70 transition-colors hover:text-neon-pink"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target rounded-[2px] p-2 text-cream/70 transition-colors hover:text-neon-blue"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
