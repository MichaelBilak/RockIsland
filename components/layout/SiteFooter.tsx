'use client';

import Link from 'next/link';
import { Instagram, Facebook } from 'lucide-react';
import { CONTACT, WHATSAPP_HREF } from '@/lib/site';
import { useLocale } from '@/contexts/LocaleContext';
import type { MessageKey } from '@/lib/i18n/messages';
const footerLinkKeys: { href: string; key: MessageKey }[] = [
  { href: '/menu', key: 'navMenu' },
  { href: '/eventi', key: 'navEvents' },
  { href: '/convention', key: 'navConvention' },
  { href: '/prenota', key: 'navBook' },
];

export function SiteFooter() {
  const { t } = useLocale();

  return (
    <footer className="border-t border-white/10 bg-navy py-16 text-cream/80">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 px-4 text-center sm:px-6">
        <p className="font-serif text-2xl tracking-[0.35em] text-white">
          RockIsland
        </p>
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm uppercase tracking-[0.2em] text-mist">
          {footerLinkKeys.map(({ href, key }) => (
            <Link
              key={href}
              href={href}
              className="transition-colors hover:text-gold"
            >
              {t(key)}
            </Link>
          ))}
        </nav>
        <div className="space-y-1 text-sm">
          <p>
            <a
              href={CONTACT.phoneHref}
              className="transition-colors hover:text-gold"
            >
              {CONTACT.phone}
            </a>
          </p>
          <p>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-gold"
            >
              {t('mobileWhatsApp')}
            </a>
          </p>
          <p>
            <a
              href={`mailto:${CONTACT.email}`}
              className="transition-colors hover:text-gold"
            >
              {CONTACT.email}
            </a>
          </p>
        </div>
        <div className="flex items-center gap-6 text-cream">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noreferrer"
            className="touch-target inline-flex items-center justify-center text-cream transition-colors hover:text-gold"
            aria-label="Instagram"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noreferrer"
            className="touch-target inline-flex items-center justify-center text-cream transition-colors hover:text-gold"
            aria-label="Facebook"
          >
            <Facebook className="h-5 w-5" />
          </a>
        </div>
        <p className="text-xs text-mist/70">{CONTACT.address}</p>
      </div>
    </footer>
  );
}
