import type { Metadata } from 'next';
import { EventiPageView } from '@/components/eventi/EventiPageView';

export const metadata: Metadata = {
  title: 'Eventi',
  description:
    'Aperitivi, dinner show e DJ night sul molo a Rimini. Calendario eventi RockIsland.',
  alternates: { canonical: '/eventi' },
};

export default function EventiPage() {
  return <EventiPageView />;
}
