import React from 'react';

/**
 * Fascia "Perché Ingly" + CTA preventivo, in fondo alla homepage.
 * Area "content", sortOrder alto (sotto ai prodotti in evidenza).
 */
const POINTS = [
  { t: 'Su misura', d: 'Ogni pezzo personalizzato con nomi, date, loghi e grafiche.' },
  { t: 'Preventivo rapido', d: 'Ricevi una stima veloce per il tuo progetto.' },
  { t: 'Made in Italy', d: 'Lavorazione laser di precisione nel nostro laboratorio.' },
  { t: 'Spedizione in Italia', d: 'Consegna in tutta Italia, imballo protetto.' }
];

export default function InglyValueProps() {
  return (
    <section style={{ margin: '8px 0 8px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 16,
            marginBottom: 28
          }}
        >
          {POINTS.map((p) => (
            <div
              key={p.t}
              style={{
                padding: '20px',
                borderRadius: 12,
                border: '1px solid #E6E8EE',
                background: '#fff'
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 4,
                  borderRadius: 2,
                  background: '#F2C21A',
                  marginBottom: 12
                }}
              />
              <div style={{ fontWeight: 700, color: '#14182B', marginBottom: 4 }}>
                {p.t}
              </div>
              <div style={{ color: '#5B6172', fontSize: 14, lineHeight: 1.4 }}>
                {p.d}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            background: 'linear-gradient(120deg, #14182B 0%, #2E6FD1 100%)',
            borderRadius: 16,
            padding: '32px',
            color: '#fff',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16
          }}
        >
          <div>
            <div style={{ fontSize: 'clamp(20px,3vw,26px)', fontWeight: 800 }}>
              Hai un&apos;idea da personalizzare?
            </div>
            <div style={{ opacity: 0.9 }}>
              Raccontacela: ti prepariamo un preventivo su misura.
            </div>
          </div>
          <a
            href="/eventi"
            style={{
              background: '#F2C21A',
              color: '#14182B',
              fontWeight: 700,
              padding: '13px 26px',
              borderRadius: 10,
              textDecoration: 'none',
              whiteSpace: 'nowrap'
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
  sortOrder: 40
};
