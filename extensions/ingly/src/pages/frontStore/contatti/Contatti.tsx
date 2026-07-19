import React from 'react';

const label: React.CSSProperties = {
  display: 'block',
  fontWeight: 600,
  color: '#14182B',
  marginBottom: 6,
  fontSize: 14
};
const field: React.CSSProperties = {
  width: '100%',
  padding: '11px 13px',
  border: '1px solid #D8DCE6',
  borderRadius: 10,
  fontSize: 15,
  outline: 'none',
  background: '#fff'
};

/** Pagina Contatti + form di richiesta preventivo (POST /api/ingly/quote). */
export default function Contatti() {
  const [form, setForm] = React.useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [state, setState] = React.useState<'idle' | 'sending' | 'ok' | 'error'>(
    'idle'
  );
  const [feedback, setFeedback] = React.useState('');

  const onChange = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('sending');
    setFeedback('');
    try {
      const res = await fetch('/api/ingly/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const json = await res.json();
      if (res.ok && json.success) {
        setState('ok');
        setFeedback(json.message || 'Richiesta inviata!');
        setForm({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setState('error');
        const errs = json.errors ? Object.values(json.errors).join(' · ') : '';
        setFeedback(errs || 'Si è verificato un errore. Riprova.');
      }
    } catch {
      setState('error');
      setFeedback('Impossibile inviare ora. Riprova più tardi.');
    }
  };

  return (
    <div style={{ maxWidth: 980, margin: '0 auto', padding: '8px 0 40px' }}>
      <section
        style={{
          background: 'linear-gradient(120deg, #14182B 0%, #2E6FD1 100%)',
          color: '#fff',
          borderRadius: 16,
          padding: '40px 32px',
          marginBottom: 28
        }}
      >
        <h1 style={{ fontSize: 'clamp(26px,4vw,38px)', fontWeight: 800, margin: 0, color: '#fff' }}>
          Richiedi un preventivo
        </h1>
        <p style={{ opacity: 0.92, marginTop: 10, maxWidth: 620 }}>
          Raccontaci la tua idea: materiale, quantità, personalizzazione. Ti
          rispondiamo con una proposta su misura.
        </p>
      </section>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.6fr) minmax(0, 1fr)',
          gap: 28,
          alignItems: 'start'
        }}
      >
        <form onSubmit={submit} style={{ display: 'grid', gap: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={label}>Nome e cognome *</label>
              <input style={field} value={form.name} onChange={onChange('name')} required />
            </div>
            <div>
              <label style={label}>Email *</label>
              <input type="email" style={field} value={form.email} onChange={onChange('email')} required />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={label}>Telefono</label>
              <input style={field} value={form.phone} onChange={onChange('phone')} />
            </div>
            <div>
              <label style={label}>Cosa vuoi personalizzare?</label>
              <input
                style={field}
                placeholder="Es. bomboniere, targa, insegna…"
                value={form.subject}
                onChange={onChange('subject')}
              />
            </div>
          </div>
          <div>
            <label style={label}>Messaggio *</label>
            <textarea
              style={{ ...field, minHeight: 130, resize: 'vertical' }}
              value={form.message}
              onChange={onChange('message')}
              required
            />
          </div>

          {feedback && (
            <div
              style={{
                padding: '12px 14px',
                borderRadius: 10,
                fontSize: 14,
                background: state === 'ok' ? '#E7F6EC' : '#FDECEC',
                color: state === 'ok' ? '#1B7A3D' : '#B42318',
                border: `1px solid ${state === 'ok' ? '#BEE7CB' : '#F5C2C0'}`
              }}
            >
              {feedback}
            </div>
          )}

          <button
            type="submit"
            className="ingly-btn-primary"
            disabled={state === 'sending'}
            style={{
              padding: '13px 24px',
              border: 'none',
              cursor: state === 'sending' ? 'default' : 'pointer',
              opacity: state === 'sending' ? 0.7 : 1,
              justifySelf: 'start'
            }}
          >
            {state === 'sending' ? 'Invio in corso…' : 'Invia richiesta'}
          </button>
        </form>

        <aside style={{ display: 'grid', gap: 14 }}>
          <div style={{ border: '1px solid #E6E8EE', borderRadius: 12, padding: 20 }}>
            <div style={{ fontWeight: 700, color: '#14182B', marginBottom: 10 }}>Contatti</div>
            <div style={{ color: '#5B6172', fontSize: 14, lineHeight: 1.7 }}>
              <div>✉️ info@inglydesign.it</div>
              <div>🕒 Lun–Ven, 9:00–18:00</div>
              <div>📍 Italia · Spedizione in tutta Italia</div>
            </div>
          </div>
          <div style={{ background: '#F5F1EC', borderRadius: 12, padding: 20 }}>
            <div style={{ fontWeight: 700, color: '#14182B', marginBottom: 6 }}>Tempi di risposta</div>
            <div style={{ color: '#5B6172', fontSize: 14 }}>
              Di norma rispondiamo entro 1 giorno lavorativo con un preventivo.
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export const layout = {
  areaId: 'content',
  sortOrder: 10
};
