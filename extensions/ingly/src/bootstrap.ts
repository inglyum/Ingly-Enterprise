/**
 * INGLY Enterprise — bootstrap dell'extension.
 *
 * Il bootstrap è l'UNICO punto in cui registrare hook/processor/widget/job/permessi
 * (il registry viene bloccato dopo il bootstrap — vedi docs/23_PLUGIN_SYSTEM.md).
 *
 * Questa extension, allo stato attuale, personalizza solo la presentazione
 * (branding admin + storefront) tramite componenti React nelle aree ufficiali,
 * quindi non necessita di registrazioni. La funzione resta come punto di
 * estensione per future capacità Ingly (subscriber, job, widget, ecc.).
 */
export default function bootstrap(): void {
  // Nessuna registrazione necessaria per la sola personalizzazione UI.
  // Esempi futuri (da abilitare quando servono):
  //   registerJob({ ... })                 // job schedulati
  //   hookAfter('checkout', ...)           // reazioni al checkout
  //   registerWidget({ ... })              // widget page-builder
}
