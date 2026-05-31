import { HomeHero } from '@/components/home/HomeHero';
import { AboutStrip } from '@/components/home/AboutStrip';
import { ExperienceSection } from '@/components/home/ExperienceSection';
import { MenuTeaser } from '@/components/home/MenuTeaser';
import { EveningTimeline } from '@/components/home/EveningTimeline';
import { EventsTicker } from '@/components/home/EventsTicker';
import { ConventionCta } from '@/components/home/ConventionCta';
import { AboutUsSection } from '@/components/home/AboutUsSection';
import { SiteFooter } from '@/components/layout/SiteFooter';

export default function HomePage() {
  return (
    <>
      <main className="mobile-main-pad">
        <HomeHero />
        <AboutStrip />
        <ExperienceSection />
        <MenuTeaser />
        <EveningTimeline />
        <EventsTicker />
        <ConventionCta />
        <AboutUsSection />
        <SiteFooter />
      </main>
    </>
  );
}
