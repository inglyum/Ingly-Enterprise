import React from 'react';

interface QuoteRow {
  uuid: string;
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
  emailed: boolean;
  status: string;
  created_at: string;
}

/** Pagina admin: elenco e gestione delle richieste di preventivo. */
export default function InglyQuotes() {
  const [rows, setRows] = React.useState<QuoteRow[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  const load = React.useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/ingly/quotes', {
        headers: { Accept: 'application/json' }
      });
      const json = await res.json();
      if (json.success) setRows(json.data || []);
      else setError(json.error || 'Errore di caricamento');
    } catch {
      setError('Impossibile caricare le richieste.');
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  const setStatus = async (uuid: string, status: string) => {
    await fetch('/api/ingly/quotes/status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uuid, status })
    });
    setRows((rs) => rs.map((r) => (r.uuid === uuid ? { ...r, status } : r)));
  };

  const fmt = (d: string) => {
    try {
      return new Date(d).toLocaleString('it-IT');
    } catch {
      return d;
    }
  };

  const newCount = rows.filter((r) => r.status === 'new').length;

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold" style={{ color: '#14182B' }}>
          Richieste preventivo{' '}
          {newCount > 0 && (
            <span
              style={{
                background: '#F2C21A',
                color: '#14182B',
                borderRadius: 999,
                padding: '2px 10px',
                fontSize: 13,
                verticalAlign: 'middle'
              }}
            >
              {newCount} nuove
            </span>
          )}
        </h1>
        <button
          onClick={load}
          className="rounded-md border px-3 py-2 text-sm"
          style={{ borderColor: '#D8DCE6' }}
        >
          Aggiorna
        </button>
      </div>

      {loading && <div>Caricamento…</div>}
      {error && <div style={{ color: '#B42318' }}>{error}</div>}

      {!loading && !error && rows.length === 0 && (
        <div
          className="rounded-lg border p-8 text-center"
          style={{ borderColor: '#E6E8EE', color: '#5B6172' }}
        >
          Nessuna richiesta ancora. Le richieste inviate dal form “Contatti”
          appariranno qui.
        </div>
      )}

      {!loading && rows.length > 0 && (
        <div className="rounded-lg border overflow-x-auto" style={{ borderColor: '#E6E8EE' }}>
          <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#F7F8FA', textAlign: 'left' }}>
                <th className="p-3">Data</th>
                <th className="p-3">Nome</th>
                <th className="p-3">Contatti</th>
                <th className="p-3">Oggetto</th>
                <th className="p-3">Messaggio</th>
                <th className="p-3">Stato</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.uuid} style={{ borderTop: '1px solid #EDEFF3' }}>
                  <td className="p-3 whitespace-nowrap" style={{ color: '#5B6172' }}>
                    {fmt(r.created_at)}
                  </td>
                  <td className="p-3 font-medium" style={{ color: '#14182B' }}>
                    {r.name}
                  </td>
                  <td className="p-3" style={{ color: '#5B6172' }}>
                    <div>
                      <a href={`mailto:${r.email}`} style={{ color: '#2E6FD1' }}>
                        {r.email}
                      </a>
                    </div>
                    {r.phone && <div>{r.phone}</div>}
                  </td>
                  <td className="p-3">{r.subject || '—'}</td>
                  <td className="p-3" style={{ maxWidth: 340 }}>
                    {r.message}
                  </td>
                  <td className="p-3">
                    <span
                      style={{
                        background: r.status === 'handled' ? '#E7F6EC' : '#FEF6DA',
                        color: r.status === 'handled' ? '#1B7A3D' : '#8A6D1B',
                        borderRadius: 999,
                        padding: '2px 10px',
                        fontSize: 12,
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {r.status === 'handled' ? 'Gestita' : 'Nuova'}
                    </span>
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    {r.status === 'new' ? (
                      <button
                        onClick={() => setStatus(r.uuid, 'handled')}
                        className="rounded-md px-3 py-1 text-sm"
                        style={{ background: '#2E6FD1', color: '#fff' }}
                      >
                        Segna gestita
                      </button>
                    ) : (
                      <button
                        onClick={() => setStatus(r.uuid, 'new')}
                        className="rounded-md border px-3 py-1 text-sm"
                        style={{ borderColor: '#D8DCE6', color: '#5B6172' }}
                      >
                        Riapri
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export const layout = {
  areaId: 'content',
  sortOrder: 10
};
