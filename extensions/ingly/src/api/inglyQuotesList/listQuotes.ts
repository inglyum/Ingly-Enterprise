import { select } from '@evershop/evershop/lib/postgres/query';
import { pool } from '@evershop/evershop/lib/postgres';
import { EvershopRequest } from '@evershop/evershop/types/request';
import { EvershopResponse } from '@evershop/evershop/types/response';

/**
 * Elenco delle richieste di preventivo (admin). Firma a 3 argomenti.
 */
export default async (
  request: EvershopRequest,
  response: EvershopResponse,
  next
) => {
  try {
    const rows = await select()
      .from('ingly_quote_request')
      .orderBy('created_at', 'DESC')
      .execute(pool);
    response.json({ success: true, data: rows });
  } catch (e) {
    response
      .status(500)
      .json({ success: false, error: 'Errore nel caricamento delle richieste.' });
  }
};
