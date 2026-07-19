import React from 'react';
import {
  Gem, Baby, Cake, GraduationCap, Church, TreePine, Heart, Briefcase, Gift,
  Signpost, House, Sparkles, KeyRound, Building2, Cpu, Flame, Ruler, PenTool,
  Scan, Package, ShoppingCart, Users, Settings, BarChart3, Megaphone, Bot,
  Cloud, ShieldCheck, Upload, Search, Bell, Calendar, Wrench, Layers, LucideIcon
} from 'lucide-react';

const NAVY = '#14182B';
const BLUE = '#2E6FD1';
const GOLD = '#F2C21A';

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 44 }}>
      <h2 className="ingly-display" style={{ fontSize: 24, fontWeight: 700, color: NAVY, margin: '0 0 2px' }}>{title}</h2>
      {subtitle && <p style={{ color: '#5B6172', margin: '0 0 18px' }}>{subtitle}</p>}
      {children}
    </section>
  );
}

function Swatch({ name, hex }: { name: string; hex: string }) {
  return (
    <div style={{ border: '1px solid #E6E8EE', borderRadius: 12, overflow: 'hidden' }}>
      <div style={{ background: hex, height: 64 }} />
      <div style={{ padding: '8px 10px' }}>
        <div style={{ fontWeight: 600, fontSize: 13, color: NAVY }}>{name}</div>
        <div style={{ fontSize: 12, color: '#5B6172', fontFamily: 'monospace' }}>{hex}</div>
      </div>
    </div>
  );
}

const ICONS: { Icon: LucideIcon; label: string }[] = [
  { Icon: Flame, label: 'Laser' }, { Icon: Cpu, label: 'CNC' }, { Icon: Scan, label: 'Precisione' },
  { Icon: Ruler, label: 'Misure' }, { Icon: PenTool, label: 'Incisione' }, { Icon: Layers, label: 'Materiali' },
  { Icon: Package, label: 'Produzione' }, { Icon: ShoppingCart, label: 'Ordini' }, { Icon: Users, label: 'Clienti/CRM' },
  { Icon: BarChart3, label: 'Analytics' }, { Icon: Megaphone, label: 'Marketing' }, { Icon: Bot, label: 'AI' },
  { Icon: Cloud, label: 'Cloud' }, { Icon: ShieldCheck, label: 'Sicurezza' }, { Icon: Settings, label: 'Impostazioni' },
  { Icon: Upload, label: 'Upload' }, { Icon: Search, label: 'Ricerca' }, { Icon: Bell, label: 'Notifiche' },
  { Icon: Calendar, label: 'Calendario' }, { Icon: Wrench, label: 'Strumenti' },
  { Icon: Gem, label: 'Matrimonio' }, { Icon: Baby, label: 'Nascita' }, { Icon: Cake, label: 'Compleanni' },
  { Icon: GraduationCap, label: 'Lauree' }, { Icon: Church, label: 'Comunioni' }, { Icon: TreePine, label: 'Natale' },
  { Icon: Heart, label: 'San Valentino' }, { Icon: Briefcase, label: 'Aziendali' }, { Icon: Gift, label: 'Bomboniere' },
  { Icon: Signpost, label: 'Targhe' }, { Icon: House, label: 'Decorazioni' }, { Icon: Sparkles, label: 'Regali' },
  { Icon: KeyRound, label: 'Accessori' }, { Icon: Building2, label: 'Business' }
];

export default function DesignSystem() {
  const fieldStyle: React.CSSProperties = { width: '100%', padding: '11px 13px', border: '1px solid #D8DCE6', borderRadius: 10, fontSize: 15 };
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '8px 0 60px' }}>
      <section style={{ background: 'var(--ingly-gradient, linear-gradient(115deg,#14182B,#2E6FD1))', color: '#fff', borderRadius: 20, padding: '44px 32px', marginBottom: 40 }}>
        <div className="ingly-display" style={{ fontSize: 13, letterSpacing: 2, color: GOLD, fontWeight: 700 }}>INGLY DESIGN</div>
        <h1 className="ingly-display" style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, margin: '6px 0 0', color: '#fff' }}>Design System</h1>
        <p style={{ opacity: 0.9, margin: '10px 0 0', maxWidth: 620 }}>
          Token, tipografia, colori, icone e componenti del brand — in codice, versionati e riutilizzabili in tutto il sito e il pannello.
        </p>
      </section>

      <Section title="Colori" subtitle="Palette del brand derivata dal logo (navy · blu · oro) + neutri e semantici.">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px,1fr))', gap: 12 }}>
          <Swatch name="Navy 800" hex="#14182B" />
          <Swatch name="Navy 700" hex="#1E2547" />
          <Swatch name="Blu 500 (primario)" hex="#2E6FD1" />
          <Swatch name="Blu 100" hex="#EEF3FC" />
          <Swatch name="Oro 500 (accento)" hex="#F2C21A" />
          <Swatch name="Oro 100" hex="#FDF3D3" />
          <Swatch name="Crema" hex="#F5F1EC" />
          <Swatch name="Neutro 500" hex="#5B6172" />
          <Swatch name="Neutro 200" hex="#E6E8EE" />
          <Swatch name="Success" hex="#1B7A3D" />
          <Swatch name="Warning" hex="#8A6D1B" />
          <Swatch name="Error" hex="#B42318" />
        </div>
      </Section>

      <Section title="Tipografia" subtitle="Display: Space Grotesk · Testo: Inter.">
        <div style={{ display: 'grid', gap: 10 }}>
          <div className="ingly-display" style={{ fontSize: 44, fontWeight: 700, color: NAVY }}>Diamo forma alle idee</div>
          <div className="ingly-display" style={{ fontSize: 30, fontWeight: 700, color: NAVY }}>Titolo H2 · Space Grotesk 700</div>
          <div className="ingly-display" style={{ fontSize: 22, fontWeight: 600, color: NAVY }}>Titolo H3 · Space Grotesk 600</div>
          <div style={{ fontSize: 16, color: '#3A4152' }}>Testo corrente · Inter Regular — il quadratino salta sopra il cane pigro. 0123456789</div>
          <div style={{ fontSize: 16, color: '#3A4152', fontWeight: 600 }}>Testo enfatizzato · Inter Semibold</div>
          <div style={{ fontSize: 13, color: '#5B6172' }}>Small / caption · Inter 13px</div>
        </div>
      </Section>

      <Section title="Bottoni">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
          <button className="ingly-btn-primary" style={{ padding: '12px 22px', border: 'none' }}>Primario</button>
          <button className="ingly-btn-accent" style={{ padding: '12px 22px', border: 'none' }}>Accento</button>
          <button style={{ padding: '12px 22px', borderRadius: 10, border: '1px solid #D8DCE6', background: '#fff', fontWeight: 600, color: NAVY }}>Outline</button>
          <a href="#" style={{ color: BLUE, fontWeight: 600 }}>Link</a>
        </div>
      </Section>

      <Section title="Badge & stati">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {[
            { t: 'Nuova', bg: '#FEF6DA', c: '#8A6D1B' },
            { t: 'Gestita', bg: '#E7F6EC', c: '#1B7A3D' },
            { t: 'Errore', bg: '#FDECEC', c: '#B42318' },
            { t: 'Info', bg: '#EEF3FC', c: '#2E6FD1' }
          ].map((b) => (
            <span key={b.t} style={{ background: b.bg, color: b.c, borderRadius: 999, padding: '4px 12px', fontSize: 13, fontWeight: 600 }}>{b.t}</span>
          ))}
        </div>
      </Section>

      <Section title="Form">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 14, maxWidth: 620 }}>
          <input style={fieldStyle} placeholder="Campo di testo" />
          <select style={fieldStyle}><option>Seleziona…</option></select>
          <textarea style={{ ...fieldStyle, gridColumn: '1 / -1', minHeight: 90 }} placeholder="Area di testo" />
        </div>
      </Section>

      <Section title="Icone" subtitle="Set tecnico/geometrico (lucide) — laser, produzione, gestione, categorie.">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(96px,1fr))', gap: 12 }}>
          {ICONS.map(({ Icon, label }) => (
            <div key={label} style={{ border: '1px solid #E6E8EE', borderRadius: 12, padding: '14px 8px', textAlign: 'center' }}>
              <span style={{ display: 'inline-flex', width: 44, height: 44, borderRadius: 11, background: '#EEF3FC', color: BLUE, alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={22} strokeWidth={1.9} />
              </span>
              <div style={{ fontSize: 11.5, color: '#5B6172', marginTop: 8 }}>{label}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Elementi brand" subtitle="Divisori, righello, raggio laser, accento oro.">
        <div style={{ display: 'grid', gap: 20, maxWidth: 620 }}>
          <div style={{ height: 3, borderRadius: 2, background: GOLD, width: 60 }} />
          <div style={{ height: 1, background: '#E6E8EE' }} />
          <svg viewBox="0 0 300 40" width="300" height="40" aria-hidden="true">
            <line x1="0" y1="30" x2="260" y2="10" stroke={NAVY} strokeWidth="1.4" />
            {Array.from({ length: 12 }).map((_, i) => (
              <line key={i} x1={10 + i * 21} y1="30" x2={10 + i * 21} y2={i % 2 ? 24 : 20} stroke={NAVY} strokeWidth="1.2" />
            ))}
          </svg>
          <svg viewBox="0 0 120 40" width="120" height="40" aria-hidden="true">
            <line x1="60" y1="0" x2="60" y2="28" stroke={GOLD} strokeWidth="2" strokeDasharray="6 6" />
            <circle cx="60" cy="30" r="5" fill={GOLD} />
          </svg>
        </div>
      </Section>
    </div>
  );
}

export const layout = {
  areaId: 'content',
  sortOrder: 10
};
