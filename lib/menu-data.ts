import type { MessageKey } from '@/lib/i18n/messages';
import { stockFill, VENUE } from '@/lib/stock-media';
import { wixFill, WIX } from '@/lib/wix-media';

export type MenuCategoryId =
  | 'antipasti'
  | 'primi'
  | 'secondi'
  | 'pizza'
  | 'dolci'
  | 'cocktail';

export type MenuItem = {
  id: string;
  name: string;
  description?: string;
  price: string;
  image: string;
};

/** Unsplash: ID verificati (HTTP 200). */
function u(photoId: string, w = 800): string {
  return `https://images.unsplash.com/photo-${photoId}?w=${w}&q=85&auto=format&fit=crop`;
}

/** Generic food imagery for menu fallbacks. */
const OFFICIAL = {
  meals: wixFill(WIX.foodTable, 800, 600),
  pizza: wixFill(WIX.pizza, 800, 600),
  bar: wixFill(WIX.bar, 800, 600),
  interior: stockFill(VENUE.interior, 800, 600),
} as const;

export const MENU_TABS: { id: MenuCategoryId; labelKey: MessageKey }[] = [
  { id: 'antipasti', labelKey: 'menuTabAntipasti' },
  { id: 'primi', labelKey: 'menuTabPrimi' },
  { id: 'secondi', labelKey: 'menuTabSecondi' },
  { id: 'pizza', labelKey: 'menuTabPizza' },
  { id: 'dolci', labelKey: 'menuTabDolci' },
  { id: 'cocktail', labelKey: 'menuTabCocktail' },
];

export const MENU: Record<MenuCategoryId, MenuItem[]> = {
  antipasti: [
    {
      id: 'antipasti-crudo-scampi',
      name: 'Crudo di scampi e ricci',
      price: '28',
      image: u('1540189549336-e6e99c3679fe'),
    },
    {
      id: 'antipasti-carpaccio-branzino',
      name: 'Carpaccio di branzino, agrumi e finocchio',
      price: '22',
      image: u('1467003909585-2f8a72700288'),
    },
    {
      id: 'antipasti-polpo',
      name: 'Polpo arrosto, crema di ceci e paprika',
      price: '20',
      image: u('1529692236671-f1f6cf9683ba'),
    },
    {
      id: 'antipasti-burrata',
      name: 'Burrata, pomodori confit e basilico',
      price: '18',
      image: u('1595295333158-4742f28fbd85'),
    },
  ],
  primi: [
    {
      id: 'primi-vongole',
      name: 'Spaghetti alle vongole veraci',
      price: '24',
      image: u('1563379926898-05f4575a45d8'),
    },
    {
      id: 'primi-risotto',
      name: 'Risotto ai frutti di mare',
      price: '26',
      image: u('1555939594-58d7cb561ad1'),
    },
    {
      id: 'primi-paccheri',
      name: 'Paccheri, scampi e bisque',
      price: '28',
      image: u('1562967914-608f82629710'),
    },
    {
      id: 'primi-nero',
      name: 'Linguine al nero di seppia',
      price: '22',
      image: u('1560518883-ce09059eeffa'),
    },
  ],
  secondi: [
    {
      id: 'secondi-branzino',
      name: 'Branzino al sale, verdure di stagione',
      price: '34',
      image: u('1519708227418-c8fd9a32b7a2'),
    },
    {
      id: 'secondi-grigliata',
      name: 'Grigliata mista di pesce',
      price: '38',
      image: u('1529692236671-f1f6cf9683ba'),
    },
    {
      id: 'secondi-frittura',
      name: 'Frittura adriatica',
      price: '30',
      image: u('1504674900247-0877df9cc836'),
    },
    {
      id: 'secondi-tonno',
      name: 'Tagliata di tonno, sesamo e soia',
      price: '32',
      image: u('1546069901-ba9599a7e63c'),
    },
  ],
  pizza: [
    {
      id: 'pizza-marinara',
      name: 'Marinara',
      price: '10',
      image: u('1574071318508-1cdbab80d002'),
    },
    {
      id: 'pizza-bufala',
      name: 'Bufala, datterini e basilico',
      price: '14',
      image: OFFICIAL.pizza,
    },
    {
      id: 'pizza-diavola',
      name: 'Diavola',
      price: '12',
      image: u('1567620905732-2d1ec7ab7445'),
    },
    {
      id: 'pizza-prosciutto',
      name: 'Prosciutto e rucola',
      price: '13',
      image: u('1551782450-a2132b4ba21d'),
    },
  ],
  dolci: [
    {
      id: 'dolci-tiramisu',
      name: 'Tiramisù al caffè',
      price: '10',
      image: u('1553621042-f6e147245754'),
    },
    {
      id: 'dolci-panna',
      name: 'Panna cotta, frutti rossi',
      price: '9',
      image: u('1509042239860-f550ce710b93'),
    },
    {
      id: 'dolci-sorbetto',
      name: 'Sorbetto al limone',
      price: '8',
      image: u('1540189549336-e6e99c3679fe'),
    },
  ],
  cocktail: [
    {
      id: 'cocktail-spritz',
      name: 'Porto Sole Spritz',
      price: '12',
      image: u('1470337458703-46ad1756a187'),
    },
    {
      id: 'cocktail-negroni',
      name: 'Negroni sul Pontile',
      price: '14',
      image: OFFICIAL.bar,
    },
    {
      id: 'cocktail-margarita',
      name: 'Margarita al sale marino',
      price: '13',
      image: OFFICIAL.meals,
    },
    {
      id: 'cocktail-old-fashioned',
      name: 'Old Fashioned affumicato',
      price: '15',
      image: OFFICIAL.interior,
    },
  ],
};
