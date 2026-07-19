import React from 'react';

/**
 * Galleria / Portfolio dei lavori — INGLY Design.
 * Griglia pronta per le TUE foto: metti i file in `public/assets/gallery/`
 * come gallery-1.jpg … gallery-6.jpg. Se un file manca, si mostra un
 * segnaposto brandizzato (marchio Ingly). Area "content".
 */
const TILES = [
  { file: 'gallery-1.jpg', label: 'Bomboniere', href: '/tutto-l-anno/bomboniere' },
  { file: 'gallery-2.jpg', label: 'Targhe & Insegne', href: '/tutto-l-anno/targhe-insegne' },
  { file: 'gallery-3.jpg', label: 'Incisioni su legno', href: '/eventi' },
  { file: 'gallery-4.jpg', label: 'Matrimonio', href: '/eventi/matrimonio' },
  { file: 'gallery-5.jpg', label: 'Regali personalizzati', href: '/tutto-l-anno/regali-personalizzati' },
  { file: 'gallery-6.jpg', label: 'Decorazioni', href: '/tutto-l-anno/decorazioni-casa' }
];

export default function InglyGallery() {
  return (
    <section style={{ margin: '8px 0 40px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(24px, 3.2vw, 32px)', fontWeight: 700, color: '#14182B', margin: '0 0 4px' }}>
          I nostri lavori
        </h2>
        <p style={{ color: '#5B6172', margin: '0 0 22px' }}>
          Alcune delle nostre personalizzazioni laser. Ogni pezzo è unico.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 16
          }}
        >
          {TILES.map((t) => (
            <a
              key={t.file}
              href={t.href}
              className="ingly-gallery-tile"
              style={{
                position: 'relative',
                display: 'block',
                aspectRatio: '4 / 3',
                borderRadius: 16,
                overflow: 'hidden',
                textDecoration: 'none',
                border: '1px solid #E6E8EE',
                backgroundColor: '#F3F5F9',
                backgroundImage: `url('/assets/gallery/${t.file}'), url('/assets/ingly-mark.svg')`,
                backgroundSize: 'cover, 42%',
                backgroundPosition: 'center, center',
                backgroundRepeat: 'no-repeat, no-repeat'
              }}
            >
              <span
                className="ingly-gallery-label"
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  padding: '18px 16px 12px',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 15,
                  background:
                    'linear-gradient(to top, rgba(20,24,43,0.78), rgba(20,24,43,0))'
                }}
              >
                {t.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export const layout = {
  areaId: 'content',
  sortOrder: 30
};
