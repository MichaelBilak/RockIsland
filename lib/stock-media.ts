/**
 * Stock venue photos (Unsplash) — generic seaside restaurant imagery, no real venue branding.
 */
export function stockFill(photoId: string, w: number, h: number): string {
  return `https://images.unsplash.com/photo-${photoId}?w=${w}&h=${h}&q=85&auto=format&fit=crop`;
}

/** Verified Unsplash IDs for pier, terrace, interior, convention spaces. */
export const VENUE = {
  heroWaterfront: '1551218808-94e220e084d2',
  pierSunset: '1507525428034-b723cf961d3e',
  waterfrontDining: '1552566626-52f8b828add9',
  interior: '1517248135467-4c7edcad34c4',
  diningRoom: '1414235077428-338989a2e8c0',
  eveningTerrace: '1555396273-367ea4eb4db5',
  harbor: '1447933601403-0c6688de566e',
} as const;

/** Verified Unsplash IDs for menu category teasers. */
export const FOOD = {
  antipasti: '1540189549336-e6e99c3679fe',
  pesce: '1519708227418-c8fd9a32b7a2',
  primi: '1563379926898-05f4575a45d8',
  pizza: '1574071318508-1cdbab80d002',
  dolci: '1553621042-f6e147245754',
  cocktail: '1470337458703-46ad1756a187',
} as const;
