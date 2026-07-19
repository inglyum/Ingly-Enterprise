import { update } from '@evershop/evershop/lib/postgres/query';
import { pool } from '@evershop/evershop/lib/postgres';
import { EvershopRequest } from '@evershop/evershop/types/request';
import { EvershopResponse } from '@evershop/evershop/types/response';

const ALLOWED = ['new', 'handled'];

/** Aggiorna lo stato di una richiesta di preventivo (admin). */
export default async (
  request: EvershopRequest,
  response: EvershopResponse,
  next
) => {
  const uuid = String(request.body?.uuid || '').trim();
  const status = String(request.body?.status || '').trim();
  if (!uuid || !ALLOWED.includes(status)) {
    return response
      .status(400)
      .json({ success: false, error: 'Parametri non validi.' });
  }
  try {
    await update('ingly_quote_request')
      .given({ status })
      .where('uuid', '=', uuid)
      .execute(pool);
    response.json({ success: true });
  } catch (e) {
    response
      .status(500)
      .json({ success: false, error: 'Errore aggiornamento stato.' });
  }
};
