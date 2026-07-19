import React from 'react';
import './ingly-theme.css';

/**
 * Inietta il tema Ingly (CSS del brand) in ogni pagina storefront.
 * Area "head" con sortOrder alto per caricarsi DOPO il CSS del core
 * (Tailwind sortOrder 1, GlobalCss sortOrder 5) e vincere sulle variabili.
 */
export default function InglyTheme() {
  return null;
}

export const layout = {
  areaId: 'head',
  sortOrder: 20
};
