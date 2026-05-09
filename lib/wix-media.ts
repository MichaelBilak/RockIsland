/**
 * Immagini dal CDN Wix del sito ufficiale https://www.rockislandrimini.it/
 * (ID file estratti dalle pagine HTML pubblicate).
 */
export function wixFill(file: string, w: number, h: number): string {
  const encoded = file.replace(/~/g, '%7E');
  return `https://static.wixstatic.com/media/${encoded}/v1/fill/w_${w},h_${h},al_c,q_85,usm_0.66_1.00_0.01,enc_auto/${encoded}`;
}

export const WIX = {
  galleryHero: '1be8b5_cce8f10635514505a1cb685c7737176d~mv2.jpeg',
  locationDock: '1be8b5_5dbee6ca6cfc4bd78b93b24f5036661d~mv2.jpeg',
  locationSea: '1be8b5_4c40913003234f93b2b7ad6fc7194328~mv2.jpeg',
  promoLogo: '1be8b5_1b58fb761d704df79f5ac8e38fd50f0f~mv2.png',
  /** /ristorante — tavola / piatti */
  foodTable: '1be8b5_4225287633f646b79ec7d9ecfa799f17~mv2.jpeg',
  pizza: '1be8b5_461e2e5b92e14d52ba0cb4ae709bc669~mv2.jpg',
  bar: '1be8b5_65ce6d7831d448f48f01f8d6fc774036~mv2.jpeg',
  interior: '1be8b5_d4f4e44b7f114f778fdce90e53bad7d2~mv2.jpeg',
  fishPlate: '1be8b5_6167c0b307ff4a1cbfb1a3fe1263fabd~mv2.jpeg',
  primiPasta: '1be8b5_78df3423d0a44dd4a62c8facf9b1df23~mv2.jpeg',
  dolciBoard: '1be8b5_52117d1b887f45dd88bf1581a3fefc2c~mv2.jpeg',
  /** /rockisland — esterno e location */
  exteriorMolo: '1be8b5_0f7c276755ff4c34a6a316d6f1c6ce2d~mv2.jpeg',
  pierView: '1be8b5_2f89b8f122a84f47b11d378c14f2ede9~mv2.jpeg',
  venueEvening: '1be8b5_57a12251a1664cb28f1dbfc1718697de~mv2.jpeg',
  terrace: '1be8b5_ce2aef7c7ddf4bb3a1ebe64d9a9f417a~mv2.jpeg',
  aerial: '1be8b5_e4be2141a3fa4adb9603d1c4533f968d~mv2.jpeg',
  /** /convention */
  conventionHero: '1be8b5_52ec3fd1ee934c78b8e2dd1344b726d3~mv2.jpg',
  conventionWide: '1be8b5_d55d4ca0b6e741858d9c0e1e608e9fc4~mv2.jpeg',
  conventionRoom: '1be8b5_6d2dba367df34cb6b3b87bfc18c046ae~mv2.jpeg',
} as const;
