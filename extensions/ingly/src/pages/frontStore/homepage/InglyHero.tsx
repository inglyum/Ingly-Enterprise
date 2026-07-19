import React from 'react';

/**
 * Hero della homepage — INGLY Design (design "wow").
 * Sfondo brand (navy → blu) con motivo laser SVG e — se presente — la foto
 * `public/assets/ingly-hero.jpg` come layer di sfondo (tinta brand sopra, così
 * resta leggibile con o senza foto).
 * Font display: Space Grotesk (via tema). Area "content", in cima.
 */
export default function InglyHero() {
  return (
    <section
      className="ingly-hero"
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 20,
        margin: '10px 0 40px',
        backgroundColor: '#14182B',
        backgroundImage:
          'linear-gradient(115deg, rgba(20,24,43,0.94) 0%, rgba(20,24,43,0.86) 42%, rgba(46,111,209,0.80) 100%), url("/assets/ingly-hero.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* motivo laser: linee di precisione */}
      <svg
        aria-hidden="true"
        viewBox="0 0 600 400"
        preserveAspectRatio="none"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.18 }}
      >
        <defs>
          <linearGradient id="ig" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2E6FD1" />
            <stop offset="1" stopColor="#F2C21A" />
          </linearGradient>
        </defs>
        {Array.from({ length: 9 }).map((_, i) => (
          <line
            key={i}
            x1={340 + i * 30}
            y1="-20"
            x2={140 + i * 30}
            y2="420"
            stroke="url(#ig)"
            strokeWidth="1.2"
          />
        ))}
        <circle cx="470" cy="120" r="60" fill="none" stroke="#F2C21A" strokeWidth="1.4" opacity="0.6" />
      </svg>

      <div
        style={{
          position: 'relative',
          maxWidth: 1200,
          margin: '0 auto',
          padding: '72px 32px',
          color: '#fff'
        }}
      >
        <span
          className="ingly-display"
          style={{
            display: 'inline-block',
            background: 'rgba(242,194,26,0.15)',
            color: '#F2C21A',
            fontWeight: 700,
            fontSize: 12.5,
            letterSpacing: 2,
            padding: '7px 15px',
            borderRadius: 999,
            marginBottom: 22
          }}
        >
          INCISIONE · TAGLIO LASER · MADE IN ITALY
        </span>

        <h1
          className="ingly-display"
          style={{
            fontSize: 'clamp(34px, 6vw, 62px)',
            fontWeight: 700,
            lineHeight: 1.03,
            margin: 0,
            maxWidth: 820,
            color: '#fff'
          }}
        >
          Diamo forma alle tue idee,
          <br />
          <span style={{ color: '#F2C21A' }}>incise al laser.</span>
        </h1>

        <p
          style={{
            fontSize: 'clamp(16px, 2.2vw, 20px)',
            opacity: 0.92,
            margin: '20px 0 0',
            maxWidth: 620,
            lineHeight: 1.5
          }}
        >
          Bomboniere, targhe, insegne, regali e decorazioni personalizzate.
          Artigianalità e precisione laser, dal tuo progetto al prodotto finito.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 30 }}>
          <a
            href="/eventi"
            className="ingly-btn-accent"
            style={{ padding: '14px 26px', textDecoration: 'none', fontSize: 16 }}
          >
            Sfoglia il catalogo
          </a>
          <a
            href="/contatti"
            style={{
              background: 'rgba(255,255,255,0.10)',
              color: '#fff',
              fontWeight: 700,
              padding: '14px 26px',
              borderRadius: 'var(--radius, 10px)',
              textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.35)',
              fontSize: 16
            }}
          >
            Richiedi un preventivo
          </a>
        </div>

        {/* stat / trust row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 36,
            marginTop: 44,
            paddingTop: 24,
            borderTop: '1px solid rgba(255,255,255,0.14)'
          }}
        >
          {[
            { n: '100%', t: 'Personalizzato' },
            { n: '48h', t: 'Preventivo rapido' },
            { n: '🇮🇹', t: 'Made in Italy' },
            { n: '★★★★★', t: 'Cura artigianale' }
          ].map((s) => (
            <div key={s.t}>
              <div className="ingly-display" style={{ fontSize: 22, fontWeight: 700, color: '#F2C21A' }}>
                {s.n}
              </div>
              <div style={{ fontSize: 13, opacity: 0.85 }}>{s.t}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export const layout = {
  areaId: 'content',
  sortOrder: 5
};
