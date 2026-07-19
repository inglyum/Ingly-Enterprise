import React from 'react';

/**
 * Vetrina categorie della homepage — INGLY Design.
 * Legge dinamicamente le categorie dal database (GraphQL). Mostra i due gruppi
 * principali (Eventi / Tutto l'Anno) con le relative sottocategorie come card.
 * Quando aggiungi/rinomini categorie dal pannello, qui si aggiornano da sole.
 */
interface Cat {
  name: string;
  urlKey: string;
  url: string;
  hasChildren: boolean;
  parent?: { categoryId: number } | null;
  children?: { name: string; url: string }[];
}
interface Props {
  categories?: { items?: Cat[] };
}

const ACCENTS = ['#2E6FD1', '#F2C21A', '#14182B'];

export default function InglyCategories({ categories }: Props) {
  const items = categories?.items || [];
  const topLevel = items.filter((c) => !c.parent);
  if (topLevel.length === 0) return null;

  // "Eventi" prima, poi il resto.
  topLevel.sort((a, b) => {
    if (a.urlKey === 'eventi') return -1;
    if (b.urlKey === 'eventi') return 1;
    return 0;
  });

  return (
    <section style={{ margin: '8px 0 40px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h2
          style={{
            fontSize: 'clamp(22px, 3vw, 30px)',
            fontWeight: 800,
            color: '#14182B',
            margin: '0 0 4px'
          }}
        >
          Le nostre categorie
        </h2>
        <p style={{ color: '#5B6172', margin: '0 0 24px' }}>
          Trova l&apos;idea giusta per ogni occasione — o per tutto l&apos;anno.
        </p>

        {topLevel.map((parent) => (
          <div key={parent.urlKey} style={{ marginBottom: 28 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 14
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 22,
                  borderRadius: 4,
                  background: '#2E6FD1',
                  display: 'inline-block'
                }}
              />
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: '#14182B',
                  margin: 0
                }}
              >
                <a href={parent.url} style={{ color: 'inherit', textDecoration: 'none' }}>
                  {parent.name}
                </a>
              </h3>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                gap: 14
              }}
            >
              {(parent.children || []).map((child, i) => (
                <a
                  key={child.url}
                  href={child.url}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '16px 16px',
                    borderRadius: 12,
                    border: '1px solid #E6E8EE',
                    background: '#fff',
                    textDecoration: 'none',
                    color: '#14182B',
                    transition: 'box-shadow .15s, transform .15s'
                  }}
                >
                  <span
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      flexShrink: 0,
                      background: ACCENTS[i % ACCENTS.length],
                      color: ACCENTS[i % ACCENTS.length] === '#F2C21A' ? '#14182B' : '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: 18
                    }}
                  >
                    {child.name.charAt(0)}
                  </span>
                  <span style={{ fontWeight: 600, fontSize: 15, lineHeight: 1.2 }}>
                    {child.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export const layout = {
  areaId: 'content',
  sortOrder: 15
};

export const query = `
  query query {
    categories {
      items {
        name
        urlKey
        url
        hasChildren
        parent { categoryId }
        children { name url }
      }
    }
  }
`;
