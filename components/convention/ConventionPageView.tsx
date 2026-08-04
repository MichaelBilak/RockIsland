'use client';

import { useState } from 'react';
import { ParallaxImage } from '@/components/motion/ParallaxImage';
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
import { cn } from '@/lib/utils';

const PACKS: {
  title: MessageKey;
  lead: MessageKey;
  b1: MessageKey;
  b2: MessageKey;
  neon: string;
  bullet: string;
}[] = [
  {
    title: 'convPack1Title',
    lead: 'convPack1Lead',
    b1: 'convPack1B1',
    b2: 'convPack1B2',
    neon: 'menu-neon-teal',
    bullet: 'border-neon-teal/70',
  },
  {
    title: 'convPack2Title',
    lead: 'convPack2Lead',
    b1: 'convPack2B1',
    b2: 'convPack2B2',
    neon: 'menu-neon-yellow',
    bullet: 'border-neon-yellow/70',
  },
  {
    title: 'convPack3Title',
    lead: 'convPack3Lead',
    b1: 'convPack3B1',
    b2: 'convPack3B2',
    neon: 'menu-neon-pink',
    bullet: 'border-neon-pink/70',
  },
];

const TESTIMONIALS: {
  quote: MessageKey;
  author: MessageKey;
  role: MessageKey;
  accent: string;
}[] = [
  {
    quote: 'convTestimonial1Quote',
    author: 'convTestimonial1Author',
    role: 'convTestimonial1Role',
    accent: 'border-neon-teal/55',
  },
  {
    quote: 'convTestimonial2Quote',
    author: 'convTestimonial2Author',
    role: 'convTestimonial2Role',
    accent: 'border-neon-pink/55',
  },
];

export function ConventionPageView() {
  const { t } = useLocale();
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <main className="mobile-main-pad">
      <section className="relative min-h-[42svh] w-full overflow-hidden sm:min-h-[48vh] md:min-h-[56vh]">
        <ParallaxImage
          src={IMG.conventionHero}
          alt=""
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/75 to-navy/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/70 via-transparent to-navy/40" />

        <div className="relative z-10 mx-auto flex min-h-[42svh] max-w-4xl flex-col justify-end px-4 pb-10 pt-8 sm:min-h-[48vh] sm:pb-12 md:min-h-[56vh] md:pb-16 md:pt-12">
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-neon-blue [text-shadow:0_0_4px_rgba(255,255,255,0.55),0_0_10px_rgba(107,140,255,0.9),0_0_22px_rgba(107,140,255,0.65),0_0_36px_rgba(107,140,255,0.35)] sm:text-xs sm:tracking-[0.35em]">
            {t('convPageKicker')}
          </p>
          <h1 className="mt-3 font-sans text-3xl font-semibold text-white [text-shadow:0_2px_24px_rgba(10,16,20,0.9)] sm:text-4xl md:text-6xl">
            {t('convPageHeroTitle')}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-cream/90 [text-shadow:0_1px_12px_rgba(10,16,20,0.85)] md:text-base">
            {t('convPageHeroLead')}
          </p>
        </div>
      </section>

      <section className="border-b border-white/10 bg-surface px-4 py-12 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3 md:gap-6">
          {PACKS.map((pack, i) => (
            <FadeUp key={pack.title} delay={i * 0.06}>
              <article
                className={cn(
                  'menu-neon-card group flex h-full flex-col bg-navy/70 p-6 transition-transform duration-300 hover:-translate-y-0.5 sm:p-8',
                  pack.neon,
                  'is-wave-lit',
                )}
              >
                <h2 className="font-sans text-2xl font-semibold text-white">
                  {t(pack.title)}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-mist">
                  {t(pack.lead)}
                </p>
                <ul className="mt-6 space-y-2.5 text-sm text-cream/90">
                  <li className={cn('border-l-2 pl-3', pack.bullet)}>
                    {t(pack.b1)}
                  </li>
                  <li className={cn('border-l-2 pl-3', pack.bullet)}>
                    {t(pack.b2)}
                  </li>
                </ul>
              </article>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="bg-ink px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2 md:gap-12">
          {TESTIMONIALS.map((tb, i) => (
            <FadeUp key={tb.quote} delay={i * 0.08}>
              <blockquote
                className={cn(
                  'rounded-[2px] border border-white/10 bg-surface/60 p-6 pl-6 sm:p-7',
                  'border-l-[3px]',
                  tb.accent,
                )}
              >
                <p className="font-sans text-xl italic leading-snug text-white md:text-2xl">
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

      <section className="bg-navy px-4 py-16 md:py-24">
        <div className="mx-auto max-w-xl">
          <FadeUp className="text-center">
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-neon-blue [text-shadow:0_0_4px_rgba(255,255,255,0.55),0_0_10px_rgba(107,140,255,0.9),0_0_22px_rgba(107,140,255,0.65),0_0_36px_rgba(107,140,255,0.35)]">
              {t('convPageKicker')}
            </p>
            <h2 className="mt-3 font-sans text-3xl font-semibold text-white md:text-4xl">
              {t('convFormTitle')}
            </h2>
          </FadeUp>

          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="ok"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="frame-neon-teal mt-10 flex flex-col items-center bg-surface/70 px-6 py-12 text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-neon-teal text-neon-teal shadow-neon-teal">
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
                className="frame-neon mt-10 space-y-5 bg-surface/50 p-5 sm:p-7"
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
                <Button
                  type="submit"
                  variant="outline"
                  size="lg"
                  className="w-full min-h-[48px] border-neon-pink/60 shadow-neon-horizon"
                  disabled={submitting}
                >
                  {submitting ? t('formSubmitting') : t('convFormSubmit')}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
