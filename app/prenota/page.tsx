import type { Metadata } from 'next';
import { PrenotaPageView } from '@/components/prenota/PrenotaPageView';

export const metadata: Metadata = {
  title: 'Prenota',
  description:
    'Prenota tavolo o evento privato a RockIsland Rimini. Navetta gratuita dalla Ruota.',
  alternates: { canonical: '/prenota' },
};

export default function PrenotaPage() {
  return <PrenotaPageView />;
}
