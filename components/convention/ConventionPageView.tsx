'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { IMG } from '@/lib/images';
import { useLocale } from '@/contexts/LocaleContext';
import type { MessageKey } from '@/lib/i18n/messages';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FadeUp } from '@/components/motion/FadeUp';
import { SiteFooter } from '@/components/layout/SiteFooter';

const PACKS: {
  title: MessageKey;
  lead: MessageKey;
  b1: MessageKey;
  b2: MessageKey;
}[] = [
  {
    title: 'convPack1Title',
    lead: 'convPack1Lead',
    b1: 'convPack1B1',
    b2: 'convPack1B2',
  },
  {
    title: 'convPack2Title',
    lead: 'convPack2Lead',
    b1: 'convPack2B1',
    b2: 'convPack2B2',
  },
  {
    title: 'convPack3Title',
    lead: 'convPack3Lead',
    b1: 'convPack3B1',
    b2: 'convPack3B2',
  },
];

const TESTIMONIALS: {
  quote: MessageKey;
  author: MessageKey;
  role: MessageKey;
}[] = [
  {
    quote: 'convTestimonial1Quote',
    author: 'convTestimonial1Author',
    role: 'convTestimonial1Role',
  },
  {
    quote: 'convTestimonial2Quote',
    author: 'convTestimonial2Author',
    role: 'convTestimonial2Role',
  },
];

export function ConventionPageView() {
  const { t } = useLocale();
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <main className="pb-14 md:pb-0">
      <section className="relative min-h-[45vh] w-full md:min-h-[52vh]">
        <Image
          src={IMG.conventionHero}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/30" />
        <div className="relative z-10 mx-auto flex min-h-[45vh] max-w-4xl flex-col justify-end px-4 pb-12 pt-28 md:min-h-[52vh] md:pb-16 md:pt-32">
          <p className="text-xs uppercase tracking-[0.35em] text-gold">
            {t('convPageKicker')}
          </p>
          <h1 className="mt-3 font-serif text-4xl font-light text-white md:text-6xl">
            {t('convPageHeroTitle')}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-cream/90 md:text-base">
            {t('convPageHeroLead')}
          </p>
        </div>
      </section>

      <section className="border-b border-white/10 bg-navy px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3 md:gap-6">
          {PACKS.map((pack, i) => (
            <FadeUp key={pack.title} delay={i * 0.06}>
              <article className="flex h-full flex-col border border-white/10 bg-[#0a1522] p-8">
                <h2 className="font-serif text-2xl text-white">{t(pack.title)}</h2>
                <p className="mt-3 text-sm leading-relaxed text-mist">{t(pack.lead)}</p>
                <ul className="mt-6 space-y-2 text-sm text-cream/90">
                  <li className="border-l-2 border-gold/50 pl-3">{t(pack.b1)}</li>
                  <li className="border-l-2 border-gold/50 pl-3">{t(pack.b2)}</li>
                </ul>
              </article>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="bg-[#08121c] px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2 md:gap-12">
          {TESTIMONIALS.map((tb) => (
            <FadeUp key={tb.quote}>
              <blockquote className="border-l border-gold/40 pl-6">
                <p className="font-serif text-xl italic leading-snug text-white md:text-2xl">
                  “{t(tb.quote)}”
                </p>
                <footer className="mt-4 text-sm text-mist">
                  <span className="font-medium text-cream">{t(tb.author)}</span>
                  <span className="mx-2 text-gold/60">·</span>
                  <span>{t(tb.role)}</span>
                </footer>
              </blockquote>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-xl px-4 py-16 md:py-24">
        <h2 className="text-center font-serif text-3xl text-white">{t('convFormTitle')}</h2>
        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="ok"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-10 flex flex-col items-center rounded-[2px] border border-gold/30 bg-navy/50 px-6 py-12 text-center"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold text-gold">
                <Check className="h-7 w-7" />
              </div>
              <p className="mt-6 text-cream">{t('convFormSuccess')}</p>
              <Button
                type="button"
                variant="ghost"
                className="mt-6"
                onClick={() => {
                  setSent(false);
                  setError(null);
                }}
              >
                {t('prenotaAgain')}
              </Button>
            </motion.div>
          ) : (
            <motion.form
              key="f"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-10 space-y-5"
              onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                setError(null);
                const form = e.currentTarget;
                const fd = new FormData(form);

                setSubmitting(true);
                try {
                  const res = await fetch('/api/convention', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      company: String(fd.get('company') ?? ''),
                      cname: String(fd.get('cname') ?? ''),
                      cemail: String(fd.get('cemail') ?? ''),
                      cphone: String(fd.get('cphone') ?? ''),
                      cmsg: String(fd.get('cmsg') ?? ''),
                      website: String(fd.get('website') ?? ''),
                    }),
                  });

                  if (res.status === 503) {
                    setError(t('formErrorNotConfigured'));
                    return;
                  }

                  if (!res.ok) {
                    setError(t('formErrorGeneric'));
                    return;
                  }

                  setSent(true);
                  form.reset();
                } catch {
                  setError(t('formErrorGeneric'));
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
              />
              <div className="space-y-2">
                <Label htmlFor="company">{t('convFormLabelCompany')}</Label>
                <Input id="company" name="company" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cname">{t('convFormLabelName')}</Label>
                <Input id="cname" name="cname" required />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="cemail">{t('convFormLabelEmail')}</Label>
                  <Input id="cemail" name="cemail" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cphone">{t('convFormLabelPhone')}</Label>
                  <Input id="cphone" name="cphone" type="tel" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cmsg">{t('convFormLabelMessage')}</Label>
                <Textarea id="cmsg" name="cmsg" rows={5} required />
              </div>
              {error ? (
                <p
                  role="alert"
                  className="rounded-[2px] border border-red-400/40 bg-red-950/30 px-4 py-3 text-sm text-red-100"
                >
                  {error}
                </p>
              ) : null}
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? t('formSubmitting') : t('convFormSubmit')}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </section>

      <SiteFooter />
    </main>
  );
}
