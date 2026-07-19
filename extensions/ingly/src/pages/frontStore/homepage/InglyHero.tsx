import React from 'react';

/**
 * Hero della homepage — INGLY Design.
 * Sfondo nei colori del brand (navy → blu), titolo, sottotitolo e due CTA.
 * Area "content" della homepage, in cima (sortOrder basso).
 */
export default function InglyHero() {
  return (
    <section
      className="ingly-hero"
      style={{
        background:
          'linear-gradient(120deg, #14182B 0%, #1E2547 55%, #2E6FD1 100%)',
        color: '#fff',
        borderRadius: 16,
        overflow: 'hidden',
        margin: '8px 0 32px'
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '56px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: 20
        }}
      >
        <span
          style={{
            alignSelf: 'flex-start',
            background: 'rgba(242,194,26,0.15)',
            color: '#F2C21A',
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: 1,
            padding: '6px 14px',
            borderRadius: 999
          }}
        >
          INCISIONE E TAGLIO LASER · MADE IN ITALY
        </span>

        <h1
          style={{
            fontSize: 'clamp(28px, 5vw, 48px)',
            fontWeight: 800,
            lineHeight: 1.1,
            margin: 0,
            maxWidth: 720,
            color: '#ffffff'
          }}
        >
          Personalizzazioni laser <span style={{ color: '#F2C21A' }}>su misura</span>
        </h1>

        <p
          style={{
            fontSize: 'clamp(15px, 2.2vw, 19px)',
            opacity: 0.92,
            margin: 0,
            maxWidth: 640
          }}
        >
          Bomboniere, targhe, insegne, regali e decorazioni incisi al laser.
          Dalla tua idea al prodotto finito — con preventivo rapido e spedizione
          in tutta Italia.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 8 }}>
          <a
            href="/eventi"
            style={{
              background: '#F2C21A',
              color: '#14182B',
              fontWeight: 700,
              padding: '13px 24px',
              borderRadius: 10,
              textDecoration: 'none'
            }}
          >
            Sfoglia il catalogo
          </a>
          <a
            href="/eventi/matrimonio"
            style={{
              background: 'rgba(255,255,255,0.12)',
              color: '#fff',
              fontWeight: 700,
              padding: '13px 24px',
              borderRadius: 10,
              textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.35)'
            }}
          >
            Richiedi un preventivo
          </a>
        </div>
      </div>
    </section>
  );
}

export const layout = {
  areaId: 'content',
  sortOrder: 5
};
