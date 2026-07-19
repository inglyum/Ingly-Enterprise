import React from 'react';

/** Link utili nel footer (area footerMiddleLeft). */
export default function InglyFooterLinks() {
  const cols = [
    {
      title: 'Ingly Design',
      links: [
        { label: 'Chi siamo', href: '/chi-siamo' },
        { label: 'Contatti', href: '/contatti' },
        { label: 'Richiedi preventivo', href: '/contatti' }
      ]
    },
    {
      title: 'Catalogo',
      links: [
        { label: 'Eventi', href: '/eventi' },
        { label: 'Tutto l’Anno', href: '/tutto-l-anno' },
        { label: 'Bomboniere', href: '/tutto-l-anno/bomboniere' }
      ]
    }
  ];
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48 }}>
      {cols.map((c) => (
        <div key={c.title}>
          <div style={{ fontWeight: 700, color: '#14182B', marginBottom: 10 }}>
            {c.title}
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 6 }}>
            {c.links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  style={{ color: '#5B6172', textDecoration: 'none', fontSize: 14 }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export const layout = {
  areaId: 'footerMiddleLeft',
  sortOrder: 10
};
