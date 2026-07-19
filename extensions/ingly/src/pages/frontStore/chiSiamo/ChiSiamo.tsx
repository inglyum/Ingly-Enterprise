import React from 'react';

/** Pagina "Chi siamo" di Ingly Design. */
export default function ChiSiamo() {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '8px 0 40px' }}>
      <section
        style={{
          background: 'linear-gradient(120deg, #14182B 0%, #2E6FD1 100%)',
          color: '#fff',
          borderRadius: 16,
          padding: '48px 32px',
          marginBottom: 32
        }}
      >
        <h1 style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 800, margin: 0, color: '#fff' }}>
          Chi siamo
        </h1>
        <p style={{ opacity: 0.92, marginTop: 12, maxWidth: 640 }}>
          Ingly Design è un laboratorio di personalizzazione laser: trasformiamo
          le tue idee in oggetti unici, incisi e tagliati con precisione.
        </p>
      </section>

      <div style={{ display: 'grid', gap: 24 }}>
        <div>
          <h2 style={{ color: '#14182B', fontWeight: 700, fontSize: 22 }}>La nostra storia</h2>
          <p style={{ color: '#3a4152', lineHeight: 1.6 }}>
            Nasciamo dalla passione per l&apos;artigianato e la tecnologia. Uniamo
            la cura del dettaglio tipica del fatto a mano con la precisione
            dell&apos;incisione laser, per creare bomboniere, targhe, insegne,
            regali e decorazioni su misura per ogni occasione.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 16
          }}
        >
          {[
            { t: 'Materiali di qualità', d: 'Legno, plexiglass, pelle, metallo e altro, selezionati con cura.' },
            { t: 'Personalizzazione totale', d: 'Nomi, date, loghi e grafiche: ogni pezzo è unico come te.' },
            { t: 'Precisione laser', d: 'Incisione e taglio ad alta definizione nel nostro laboratorio.' }
          ].map((c) => (
            <div key={c.t} style={{ border: '1px solid #E6E8EE', borderRadius: 12, padding: 20 }}>
              <div style={{ width: 34, height: 4, borderRadius: 2, background: '#F2C21A', marginBottom: 12 }} />
              <div style={{ fontWeight: 700, color: '#14182B', marginBottom: 4 }}>{c.t}</div>
              <div style={{ color: '#5B6172', fontSize: 14, lineHeight: 1.4 }}>{c.d}</div>
            </div>
          ))}
        </div>

        <div
          style={{
            background: '#F5F1EC',
            borderRadius: 16,
            padding: 28,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ fontWeight: 800, color: '#14182B', fontSize: 20 }}>
              Hai un progetto in mente?
            </div>
            <div style={{ color: '#5B6172' }}>Scrivici: ti prepariamo un preventivo su misura.</div>
          </div>
          <a
            href="/contatti"
            className="ingly-btn-primary"
            style={{ padding: '13px 24px', textDecoration: 'none', display: 'inline-block' }}
          >
            Contattaci
          </a>
        </div>
      </div>
    </div>
  );
}

export const layout = {
  areaId: 'content',
  sortOrder: 10
};
