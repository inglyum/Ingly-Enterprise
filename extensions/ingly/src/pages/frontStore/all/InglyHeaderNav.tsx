import React from 'react';

/** Barra di navigazione Ingly sotto l'header (area headerBottom). */
const LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Catalogo', href: '/eventi' },
  { label: 'Tutto l’Anno', href: '/tutto-l-anno' },
  { label: 'Chi siamo', href: '/chi-siamo' },
  { label: 'Contatti', href: '/contatti' }
];

export default function InglyHeaderNav() {
  return (
    <nav
      style={{ borderTop: '1px solid #EDEFF3' }}
      aria-label="Navigazione principale"
    >
      <div
        className="page-width"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 22,
          padding: '10px 0'
        }}
      >
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            style={{
              color: '#14182B',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: 14
            }}
          >
            {l.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

export const layout = {
  areaId: 'headerBottom',
  sortOrder: 10
};
