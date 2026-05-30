'use client';



import { motion } from 'framer-motion';

import { FadeUp } from '@/components/motion/FadeUp';

import { ParallaxImage } from '@/components/motion/ParallaxImage';

import { IMG } from '@/lib/images';

import { useLocale } from '@/contexts/LocaleContext';



export function ExperienceSection() {

  const { t } = useLocale();



  return (

    <section className="bg-navy py-20 md:py-28">

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:grid-cols-2 md:gap-0 md:px-0 lg:gap-8">

        <motion.div

          className="relative aspect-[4/5] w-full overflow-hidden md:min-h-[520px] md:rounded-none"

          initial={{ opacity: 0, x: -28 }}

          whileInView={{ opacity: 1, x: 0 }}

          viewport={{ once: true, margin: '-80px' }}

          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}

        >

          <ParallaxImage

            src={IMG.experience}

            alt={t('expImgAlt')}

            sizes="(min-width: 768px) 50vw, 100vw"

          />

          <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent md:bg-gradient-to-r" />

        </motion.div>



        <FadeUp className="px-4 md:px-10 lg:pr-16">

          <p className="text-xs font-medium uppercase tracking-[0.35em] text-gold">

            {t('expKicker')}

          </p>

          <h2 className="mt-4 font-serif text-4xl font-light text-white md:text-5xl">

            {t('expTitle')}

          </h2>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/85">

            {t('expP1')}

          </p>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-mist">

            {t('expP2')}

          </p>

        </FadeUp>

      </div>

    </section>

  );

}

