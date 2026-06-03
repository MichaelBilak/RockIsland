import type { Metadata } from 'next';
import { MenuPageView } from '@/components/menu/MenuPageView';

export const metadata: Metadata = {
  title: 'Menu',
  description:
    'Antipasti, primi, secondi, pizza, dolci e cocktail Porto Sole — Molo di Levante, Rimini.',
  alternates: { canonical: '/menu' },
};

export default function MenuPage() {
  return <MenuPageView />;
}
