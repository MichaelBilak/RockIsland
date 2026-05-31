'use client';

import { useState } from 'react';
import { format, startOfDay } from 'date-fns';
import { it, enUS, de, fr, ru } from 'date-fns/locale';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, Check } from 'lucide-react';
import { useLocale } from '@/contexts/LocaleContext';
import type { Locale } from '@/lib/i18n/locales';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { MAP } from '@/lib/site';
import { cn } from '@/lib/utils';

const dateLocales: Record<Locale, typeof it> = {
  it,
  en: enUS,
  de,
  fr,
  ru,
};

export function PrenotaPageView() {
  const { t, locale } = useLocale();
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState('20:00');
  const [party, setParty] = useState('2');
  const [type, setType] = useState('cena');
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!date) {
      setError(t('prenotaDateRequired'));
      return;
    }

    const form = e.currentTarget;
    const fd = new FormData(form);

    setSubmitting(true);
    try {
      const res = await fetch('/api/prenota', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: String(fd.get('name') ?? ''),
          phone: String(fd.get('phone') ?? ''),
          email: String(fd.get('email') ?? ''),
          date: format(date, 'yyyy-MM-dd'),
          time,
          party,
          type,
          note: String(fd.get('note') ?? ''),
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

      setDone(true);
      form.reset();
      setDate(undefined);
      setTime('20:00');
      setParty('2');
      setType('cena');
    } catch {
      setError(t('formErrorGeneric'));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="mobile-main-pad">
      <div className="border-b border-white/10 px-4 py-8 md:px-8 md:py-14">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-gold">
            {t('prenotaKicker')}
          </p>
          <h1 className="mt-3 font-serif text-3xl font-light text-white sm:text-4xl md:text-5xl">
            {t('prenotaTitle')}
          </h1>
          <p className="mt-4 text-sm text-mist md:text-base">{t('prenotaLead')}</p>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 lg:grid-cols-[1fr_340px] lg:gap-16 lg:px-8 lg:py-16">
        <AnimatePresence mode="wait">
          {done ? (
            <motion.div
              key="ok"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center rounded-[2px] border border-gold/30 bg-navy/40 px-6 py-20 text-center"
            >
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold bg-gold/10 text-gold"
              >
                <Check className="h-8 w-8" strokeWidth={2.5} />
              </motion.div>
              <h2 className="mt-8 font-serif text-3xl text-white">
                {t('prenotaSuccessTitle')}
              </h2>
              <p className="mt-3 max-w-md text-sm text-mist">{t('prenotaSuccessBody')}</p>
              <Button
                type="button"
                variant="outline"
                className="mt-10"
                onClick={() => {
                  setDone(false);
                  setError(null);
                }}
              >
                {t('prenotaAgain')}
              </Button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={onSubmit}
              className="space-y-6"
            >
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
              />
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">{t('prenotaLabelName')}</Label>
                  <Input id="name" name="name" required autoComplete="name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t('prenotaLabelPhone')}</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t('prenotaLabelEmail')}</Label>
                <Input id="email" name="email" type="email" required autoComplete="email" />
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>{t('prenotaLabelDate')}</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className={cn(
                          'h-11 w-full justify-start border-white/15 bg-navy/60 text-left font-normal text-cream hover:bg-white/5',
                          !date && 'text-mist/70',
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-gold" />
                        {date
                          ? format(date, 'PPP', { locale: dateLocales[locale] })
                          : '—'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        locale={dateLocales[locale]}
                        disabled={(d) => d < startOfDay(new Date())}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>{t('prenotaLabelTime')}</Label>
                  <Select value={time} onValueChange={setTime}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('prenotaTime2000')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="17:30">{t('prenotaTime1730')}</SelectItem>
                      <SelectItem value="20:00">{t('prenotaTime2000')}</SelectItem>
                      <SelectItem value="23:00">{t('prenotaTime2300')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>{t('prenotaLabelParty')}</Label>
                  <Select value={party} onValueChange={setParty}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">{t('prenotaParty2')}</SelectItem>
                      <SelectItem value="4">{t('prenotaParty4')}</SelectItem>
                      <SelectItem value="8">{t('prenotaParty8')}</SelectItem>
                      <SelectItem value="more">{t('prenotaPartyMore')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>{t('prenotaLabelType')}</Label>
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aperitivo">{t('prenotaTypeAperitivo')}</SelectItem>
                      <SelectItem value="cena">{t('prenotaTypeCena')}</SelectItem>
                      <SelectItem value="privato">{t('prenotaTypePrivato')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="note">{t('prenotaLabelNote')}</Label>
                <Textarea
                  id="note"
                  name="note"
                  rows={4}
                  placeholder={t('prenotaPlaceholderNote')}
                />
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
                size="lg"
                className="w-full sm:w-auto"
                disabled={submitting}
              >
                {submitting ? t('formSubmitting') : t('prenotaSubmit')}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>

        <aside className="space-y-8 lg:pt-2">
          <div className="border border-gold/25 bg-gold/5 p-6">
            <h2 className="font-serif text-xl text-white">{t('prenotaShuttleTitle')}</h2>
            <p className="mt-3 text-sm leading-relaxed text-mist">{t('prenotaShuttleBody')}</p>
          </div>
          <div>
            <h2 className="mb-3 font-serif text-lg text-white">{t('prenotaMapTitle')}</h2>
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-white/10">
              <iframe
                title="Map"
                src={MAP.embedSrc}
                className="absolute inset-0 h-full w-full border-0 grayscale contrast-125"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </aside>
      </div>

      <SiteFooter />
    </main>
  );
}
