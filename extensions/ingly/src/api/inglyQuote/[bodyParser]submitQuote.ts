import { insert } from '@evershop/evershop/lib/postgres/query';
import { pool } from '@evershop/evershop/lib/postgres';
import { EvershopRequest } from '@evershop/evershop/types/request';
import { EvershopResponse } from '@evershop/evershop/types/response';

function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

/**
 * Riceve una richiesta di preventivo/contatto dal form pubblico.
 * 1) Salva SEMPRE la richiesta nel database (ingly_quote_request).
 * 2) Se l'SMTP è configurato (variabili SMTP_* nel .env) invia anche una email
 *    di notifica al titolare. L'assenza di SMTP non fa fallire la richiesta.
 *
 * Firma a 3 argomenti (invia risposta): evita ERR_HTTP_HEADERS_SENT.
 */
export default async (
  request: EvershopRequest,
  response: EvershopResponse,
  next
) => {
  const body = request.body || {};
  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const phone = String(body.phone || '').trim();
  const subject = String(body.subject || '').trim();
  const message = String(body.message || '').trim();

  const errors: Record<string, string> = {};
  if (!name) errors.name = 'Il nome è obbligatorio';
  if (!email || !isEmail(email)) errors.email = 'Email non valida';
  if (!message || message.length < 5) errors.message = 'Scrivi un messaggio';
  if (Object.keys(errors).length > 0) {
    return response.status(400).json({ success: false, errors });
  }

  // 1) Salvataggio nel database (fonte di verità).
  let saved;
  try {
    saved = await insert('ingly_quote_request')
      .given({ name, email, phone: phone || null, subject: subject || null, message })
      .execute(pool);
  } catch (e) {
    return response.status(500).json({
      success: false,
      errors: { general: 'Errore nel salvataggio della richiesta. Riprova.' }
    });
  }

  // 2) Notifica email (best-effort, solo se SMTP configurato).
  let emailed = false;
  if (process.env.SMTP_HOST) {
    try {
      const { default: nodemailer } = await import('nodemailer');
      const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: String(process.env.SMTP_SECURE || 'false') === 'true',
        auth: process.env.SMTP_USER
          ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
          : undefined
      });
      const to =
        process.env.INGLY_QUOTE_TO || process.env.SMTP_USER || email;
      const html = `
        <h2 style="color:#14182B">Nuova richiesta di preventivo — Ingly Design</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Telefono:</strong> ${phone}</p>` : ''}
        ${subject ? `<p><strong>Oggetto:</strong> ${subject}</p>` : ''}
        <p><strong>Messaggio:</strong></p>
        <p style="white-space:pre-wrap">${message.replace(/</g, '&lt;')}</p>
        <hr/>
        <p style="color:#5B6172;font-size:12px">Inviato dal sito Ingly Design.</p>`;
      await transport.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to,
        replyTo: email,
        subject: `Richiesta preventivo${subject ? ` — ${subject}` : ''} — ${name}`,
        html
      });
      emailed = true;
    } catch (e) {
      // Email non riuscita: la richiesta resta salvata nel DB. Nessun errore all'utente.
      emailed = false;
    }
  }

  return response.status(201).json({
    success: true,
    emailed,
    message:
      'Grazie! Abbiamo ricevuto la tua richiesta e ti risponderemo al più presto.'
  });
};
