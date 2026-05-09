import type { MessageKey } from '@/lib/i18n/messages';
import { wixFill, WIX } from '@/lib/wix-media';

export type EventBadge = 'aperitivo' | 'dinner' | 'dj';

export type UpcomingEvent = {
  id: string;
  dateKey: MessageKey;
  titleKey: MessageKey;
  artistKey: MessageKey;
  badge: EventBadge;
  image: string;
};

export const UPCOMING_EVENTS: UpcomingEvent[] = [
  {
    id: '1',
    dateKey: 'evUp1Date',
    titleKey: 'evUp1Title',
    artistKey: 'evUp1Artist',
    badge: 'dj',
    image: wixFill(WIX.venueEvening, 800, 600),
  },
  {
    id: '2',
    dateKey: 'evUp2Date',
    titleKey: 'evUp2Title',
    artistKey: 'evUp2Artist',
    badge: 'dinner',
    image: wixFill(WIX.foodTable, 800, 600),
  },
  {
    id: '3',
    dateKey: 'evUp3Date',
    titleKey: 'evUp3Title',
    artistKey: 'evUp3Artist',
    badge: 'aperitivo',
    image: wixFill(WIX.bar, 800, 600),
  },
  {
    id: '4',
    dateKey: 'evUp4Date',
    titleKey: 'evUp4Title',
    artistKey: 'evUp4Artist',
    badge: 'dj',
    image: wixFill(WIX.exteriorMolo, 800, 600),
  },
];

export const PAST_EVENT_TITLE_KEYS: MessageKey[] = [
  'evPast1Title',
  'evPast2Title',
  'evPast3Title',
];
