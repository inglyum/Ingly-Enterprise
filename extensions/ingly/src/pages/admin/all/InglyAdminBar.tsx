import React from 'react';

/**
 * Barra di branding INGLY Enterprise, mostrata in testa a ogni pagina admin
 * (area "header"). Identifica il pannello come gestionale di Ingly Design.
 *
 * Per rimuoverla: disabilitare l'extension `ingly` in config/default.json
 * (system.extensions[].enabled = false).
 */
export default function InglyAdminBar() {
  return (
    <div
      style={{
        background: 'linear-gradient(90deg, #14182B 0%, #1E2547 55%, #2E6FD1 100%)'
      }}
      className="text-white"
    >
      <div className="flex items-center justify-between px-6 py-2">
        <div className="flex items-center gap-3">
          <span
            className="inline-flex items-center justify-center rounded-md font-bold"
            style={{
              width: 28,
              height: 28,
              background: '#F2C21A',
              color: '#14182B'
            }}
          >
            I
          </span>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-wide">
              INGLY Enterprise
            </div>
            <div className="text-[11px] opacity-80">
              Pannello gestionale · Ingly Design
            </div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 text-[11px] opacity-90">
          <span
            className="rounded-full px-3 py-1"
            style={{ background: 'rgba(255,255,255,0.12)' }}
          >
            Personalizzazioni laser
          </span>
          <span
            className="rounded-full px-3 py-1"
            style={{ background: 'rgba(255,255,255,0.12)' }}
          >
            Made in Italy
          </span>
        </div>
      </div>
    </div>
  );
}

export const layout = {
  areaId: 'header',
  sortOrder: 1
};
