import React from 'react';

/**
 * Carica i font del brand Ingly Design da Google Fonts:
 *  - Space Grotesk: titoli/display (carattere tecnico-premium)
 *  - Inter: testo corrente (alta leggibilità)
 * Area "head".
 */
export default function InglyFonts() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap"
      />
    </>
  );
}

export const layout = {
  areaId: 'head',
  sortOrder: 2
};
