/**
 * Immagini RockIsland: sito ufficiale (Wix, rockislandrimini.it).
 *
 * TripAdvisor: la pagina risponde ai crawler con CAPTCHA/DataDome; per foto TA
 * copia l’URL in `TRIPADVISOR_EXTRA` e abilita l’host in `next.config.mjs`.
 *
 * @see https://www.rockislandrimini.it/
 */
import type { MenuCategoryId } from '@/lib/menu-data';
import { wixFill, WIX } from '@/lib/wix-media';

/**
 * Incolla qui URL immagine da TripAdvisor (scheda o recensioni), uno per riga.
 * Esempio: `https://dynamic-media.tripadvisor.com/media/photo-o/1a/2b/3c/4d.jpg`
 */
export const TRIPADVISOR_EXTRA: readonly string[] = [];

export { wixFill, WIX };

/** Open Graph: hero ufficiale */
export const OG_IMAGE = wixFill(WIX.galleryHero, 1200, 630);

/** Immagine guida per ogni sezione menu (foto dal sito). */
export const MENU_CATEGORY_PHOTO: Record<MenuCategoryId, string> = {
  antipasti: wixFill(WIX.foodTable, 1100, 900),
  primi: wixFill(WIX.primiPasta, 1100, 900),
  secondi: wixFill(WIX.fishPlate, 1100, 900),
  pizza: wixFill(WIX.pizza, 1100, 900),
  dolci: wixFill(WIX.dolciBoard, 1100, 900),
  cocktail: wixFill(WIX.bar, 1100, 900),
};

export const IMG = {
  /** Hero: stesso asset della hero Wix */
  heroPoster: wixFill(WIX.galleryHero, 1920, 1080),
  /** Sezione esperienza: vista dal pontile */
  experience: wixFill(WIX.pierView, 1920, 1080),
  /** Convention */
  conventionHero: wixFill(WIX.conventionHero, 1920, 1080),
  menuAntipasti: wixFill(WIX.foodTable, 900, 1100),
  menuPesce: wixFill(WIX.locationDock, 900, 1100),
  menuPizza: wixFill(WIX.pizza, 900, 1100),
  menuCocktail: wixFill(WIX.bar, 900, 1100),
  featured1: wixFill(WIX.venueEvening, 1600, 1000),
  featured2: wixFill(WIX.interior, 1600, 1000),
  eventi: wixFill(WIX.exteriorMolo, 1600, 1000),
} as const;
