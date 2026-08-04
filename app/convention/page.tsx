import type { Metadata } from 'next';
import { ConventionPageView } from '@/components/convention/ConventionPageView';

export const metadata: Metadata = {
  title: 'Convention',
  description:
    'Meeting, eventi aziendali e gala dinner sul mare a Rimini. RockIsland Convention.',
  alternates: { canonical: '/convention' },
};

export default function ConventionPage() {
  return <ConventionPageView />;
}
