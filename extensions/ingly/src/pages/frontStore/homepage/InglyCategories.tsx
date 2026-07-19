import React from 'react';
import {
  Gem,
  Baby,
  Cake,
  GraduationCap,
  Church,
  TreePine,
  Heart,
  Briefcase,
  Gift,
  Signpost,
  House,
  Sparkles,
  KeyRound,
  Building2,
  PartyPopper,
  CalendarDays,
  Tag,
  ChevronRight,
  LucideIcon
} from 'lucide-react';

/**
 * Vetrina categorie della homepage — INGLY Design.
 * Legge le categorie dal database (GraphQL) e mostra i due gruppi principali
 * (Eventi / Tutto l'Anno) con icone MIRATE per ogni categoria.
 * Aggiungendo/rinominando categorie dal pannello, la vetrina si aggiorna.
 */
interface Cat {
  name: string;
  urlKey: string;
  url: string;
  hasChildren: boolean;
  parent?: { categoryId: number } | null;
  children?: { name: string; url: string; urlKey?: string }[];
}
interface Props {
  categories?: { items?: Cat[] };
}

const ICONS: Record<string, LucideIcon> = {
  matrimonio: Gem,
  'battesimo-nascita': Baby,
  compleanni: Cake,
  lauree: GraduationCap,
  'comunioni-cresime': Church,
  natale: TreePine,
  'san-valentino': Heart,
  'eventi-aziendali': Briefcase,
  bomboniere: Gift,
  'targhe-insegne': Signpost,
  'decorazioni-casa': House,
  'regali-personalizzati': Sparkles,
  accessori: KeyRound,
  'ufficio-business': Building2
};
const PARENT_ICONS: Record<string, LucideIcon> = {
  eventi: PartyPopper,
  'tutto-l-anno': CalendarDays
};

function slugFromUrl(url: string): string {
  const parts = url.split('/').filter(Boolean);
  return parts[parts.length - 1] || '';
}

export default function InglyCategories({ categories }: Props) {
  const items = categories?.items || [];
  const topLevel = items.filter((c) => !c.parent);
  if (topLevel.length === 0) return null;
  topLevel.sort((a, b) => (a.urlKey === 'eventi' ? -1 : b.urlKey === 'eventi' ? 1 : 0));

  return (
    <section style={{ margin: '8px 0 44px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(24px, 3.2vw, 32px)', fontWeight: 700, color: '#14182B', margin: '0 0 4px' }}>
          Le nostre categorie
        </h2>
        <p style={{ color: '#5B6172', margin: '0 0 26px' }}>
          Trova l&apos;idea giusta per ogni occasione — o per tutto l&apos;anno.
        </p>

        {topLevel.map((parent) => {
          const PIcon = PARENT_ICONS[parent.urlKey] || Tag;
          return (
            <div key={parent.urlKey} style={{ marginBottom: 30 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <span
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 9,
                    background: '#14182B',
                    color: '#F2C21A',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <PIcon size={18} strokeWidth={2} />
                </span>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: '#14182B', margin: 0 }}>
                  <a href={parent.url} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {parent.name}
                  </a>
                </h3>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                  gap: 14
                }}
              >
                {(parent.children || []).map((child) => {
                  const slug = child.urlKey || slugFromUrl(child.url);
                  const Icon = ICONS[slug] || Tag;
                  return (
                    <a
                      key={child.url}
                      href={child.url}
                      className="ingly-cat-card"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 14,
                        padding: '16px',
                        borderRadius: 14,
                        border: '1px solid #E6E8EE',
                        background: '#fff',
                        textDecoration: 'none',
                        color: '#14182B'
                      }}
                    >
                      <span
                        style={{
                          width: 46,
                          height: 46,
                          borderRadius: 12,
                          flexShrink: 0,
                          background: '#EEF3FC',
                          color: '#2E6FD1',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Icon size={22} strokeWidth={1.9} />
                      </span>
                      <span style={{ flex: 1, fontWeight: 600, fontSize: 15, lineHeight: 1.2 }}>
                        {child.name}
                      </span>
                      <ChevronRight size={18} color="#B7BECC" />
                    </a>
                  );
                })}
              </div>
            </div>
          );
        })}
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
        children { name url urlKey }
      }
    }
  }
`;
