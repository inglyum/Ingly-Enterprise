import { execute } from '@evershop/postgres-query-builder';
import type { PoolClient } from 'pg';

/**
 * INGLY Enterprise — tabella delle richieste di preventivo/contatto.
 * Ogni invio dal form pubblico viene salvato qui (oltre all'eventuale email),
 * così nessuna richiesta va persa anche se l'invio email non è configurato.
 */
export default async (connection: PoolClient) => {
  await execute(
    connection,
    `CREATE TABLE IF NOT EXISTS "ingly_quote_request" (
      "quote_request_id" INT GENERATED ALWAYS AS IDENTITY (START WITH 1 INCREMENT BY 1) PRIMARY KEY,
      "uuid" UUID NOT NULL DEFAULT gen_random_uuid(),
      "name" varchar NOT NULL,
      "email" varchar NOT NULL,
      "phone" varchar DEFAULT NULL,
      "subject" varchar DEFAULT NULL,
      "message" text NOT NULL,
      "emailed" boolean NOT NULL DEFAULT FALSE,
      "status" varchar NOT NULL DEFAULT 'new',
      "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      CONSTRAINT "INGLY_QUOTE_REQUEST_UUID_UNIQUE" UNIQUE ("uuid")
    )`
  );

  await execute(
    connection,
    `CREATE INDEX IF NOT EXISTS "INGLY_QUOTE_REQUEST_CREATED_AT"
       ON "ingly_quote_request" ("created_at")`
  );
};
