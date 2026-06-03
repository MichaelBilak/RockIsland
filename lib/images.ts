/**
 * Site imagery: venue and food photos from Unsplash stock.
 */
import type { MenuCategoryId } from '@/lib/menu-data';
import { stockFill, FOOD, VENUE } from '@/lib/stock-media';
import { wixFill, WIX } from '@/lib/wix-media';

export const TRIPADVISOR_EXTRA: readonly string[] = [];

export { wixFill, WIX };

/** Open Graph / social preview — generic waterfront. */
export const OG_IMAGE = stockFill(VENUE.pierSunset, 1200, 630);

/** Section guide images for menu categories (food). */
export const MENU_CATEGORY_PHOTO: Record<MenuCategoryId, string> = {
  antipasti: stockFill(FOOD.antipasti, 1100, 900),
  primi: stockFill(FOOD.primi, 1100, 900),
  secondi: stockFill(FOOD.pesce, 1100, 900),
  pizza: stockFill(FOOD.pizza, 1100, 900),
  dolci: stockFill(FOOD.dolci, 1100, 900),
  cocktail: stockFill(FOOD.cocktail, 1100, 900),
};

export const IMG = {
  heroPoster: stockFill(VENUE.heroWaterfront, 1920, 1080),
  experience: stockFill(VENUE.pierSunset, 1920, 1080),
  conventionHero: stockFill(VENUE.diningRoom, 1920, 1080),
  menuAntipasti: stockFill(FOOD.antipasti, 900, 1100),
  menuPesce: stockFill(FOOD.pesce, 900, 1100),
  menuPizza: stockFill(FOOD.pizza, 900, 1100),
  menuCocktail: stockFill(FOOD.cocktail, 900, 1100),
  featured1: stockFill(VENUE.eveningTerrace, 1600, 1000),
  featured2: stockFill(VENUE.interior, 1600, 1000),
  eventi: stockFill(VENUE.waterfrontDining, 1600, 1000),
} as const;
