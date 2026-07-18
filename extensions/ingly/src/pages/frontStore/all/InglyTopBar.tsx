import React from 'react';

/**
 * Announcement bar dello storefront Ingly Design, in cima a ogni pagina
 * (area "body", sortOrder 0). Comunica la proposta di valore del brand.
 *
 * Per rimuoverla: disabilitare l'extension `ingly` in config/default.json.
 */
export default function InglyTopBar() {
  return (
    <div
      className="w-full text-center text-white text-sm"
      style={{
        background: 'linear-gradient(90deg, #0F172A 0%, #B45309 100%)',
        padding: '8px 12px'
      }}
    >
      <span className="font-medium">Ingly Design</span>
      <span className="opacity-90">
        {' '}
        — Personalizzazioni laser su misura · Spedizione in tutta Italia · Preventivi rapidi
      </span>
    </div>
  );
}

export const layout = {
  areaId: 'body',
  sortOrder: 0
};
