/**
 * INGLY Enterprise — seed di categorie e prodotti demo per Ingly Design.
 *
 * Crea le categorie più usate per le personalizzazioni laser (eventi + tutto
 * l'anno) e alcuni prodotti di esempio, tramite le API admin di EverShop.
 *
 * USO (con il negozio avviato, cioè AVVIO-2 in esecuzione):
 *   node extensions/ingly/seed/ingly-seed.mjs
 *
 * Variabili opzionali:
 *   INGLY_BASE=http://localhost:3000
 *   ADMIN_EMAIL=... ADMIN_PASSWORD=...   (credenziali admin già create)
 *
 * È rieseguibile: le voci già presenti (stesso url_key/sku) vengono saltate.
 */

const BASE = process.env.INGLY_BASE || 'http://127.0.0.1:3000';
const EMAIL = process.env.ADMIN_EMAIL || 'admin@ingly.local';
const PASSWORD = process.env.ADMIN_PASSWORD || 'InglyAdmin2026';

let COOKIE = '';

async function login() {
  const res = await fetch(`${BASE}/admin/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD })
  });
  const setCookie = res.headers.get('set-cookie');
  if (setCookie) COOKIE = setCookie.split(';')[0];
  const json = await res.json().catch(() => ({}));
  if (res.status !== 200 || !COOKIE) {
    throw new Error(`Login fallito (HTTP ${res.status}). Controlla ADMIN_EMAIL/ADMIN_PASSWORD.`);
  }
  console.log('✔ Login admin OK');
}

async function api(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Cookie: COOKIE },
    body: JSON.stringify(body)
  });
  const json = await res.json().catch(() => ({}));
  return { status: res.status, json };
}

function catId(json) {
  const d = json?.data || json;
  return d?.category_id || d?.categoryId || d?.id || d?.data?.category_id;
}
function prodId(json) {
  const d = json?.data || json;
  return d?.product_id || d?.productId || d?.id || d?.data?.product_id;
}

async function createCategory({ name, url_key, parent_id = null, meta }) {
  const body = {
    name,
    url_key,
    status: 1,
    description: [],
    meta_title: meta?.title || name,
    meta_description: meta?.desc || `${name} personalizzati al laser — Ingly Design`,
    parent_id: parent_id ? String(parent_id) : null,
    include_in_nav: 1,
    show_products: 1
  };
  const { status, json } = await api('/api/categories', body);
  if (status >= 200 && status < 300) {
    const id = catId(json);
    console.log(`  ✔ Categoria: ${name} (id ${id})`);
    return id;
  }
  const msg = JSON.stringify(json).slice(0, 160);
  console.log(`  … Categoria "${name}" saltata (HTTP ${status}) ${msg}`);
  return null;
}

async function createProduct(p) {
  const body = {
    name: p.name,
    sku: p.sku,
    price: p.price,
    qty: 100,
    weight: '0.2',
    status: 1,
    visibility: 1,
    group_id: '1',
    package_id: process.env.INGLY_PACKAGE_ID || '1',
    tax_class: 1,
    manage_stock: 0,
    stock_availability: 1,
    url_key: p.url_key,
    meta_title: p.name,
    meta_description: p.short,
    short_description: p.short,
    description: [],
    category_id: p.category_id ? String(p.category_id) : null,
    images: []
  };
  const { status, json } = await api('/api/products', body);
  if (status >= 200 && status < 300) {
    const d = json?.data || json;
    console.log(`  ✔ Prodotto: ${p.name} — €${p.price} (id ${prodId(json)})`);
    return { id: prodId(json), uuid: d?.uuid, name: p.name };
  }
  console.log(`  … Prodotto "${p.name}" saltato (HTTP ${status}) ${JSON.stringify(json).slice(0, 160)}`);
  return null;
}

async function setStoreSettings() {
  const { status } = await api('/api/settings', {
    storeName: 'Ingly Design',
    storeCurrency: 'EUR',
    storeLanguage: 'it'
  });
  console.log(status === 200 ? '✔ Impostazioni negozio: Ingly Design · EUR · Italiano' : `… settings HTTP ${status}`);
}

async function main() {
  await login();

  console.log('\n== Impostazioni negozio ==');
  await setStoreSettings();

  console.log('\n== Categorie principali ==');
  const eventi = await createCategory({ name: 'Eventi', url_key: 'eventi', meta: { desc: 'Personalizzazioni laser per ogni evento' } });
  const anno = await createCategory({ name: "Tutto l'Anno", url_key: 'tutto-l-anno', meta: { desc: 'Prodotti personalizzati tutto l’anno' } });

  console.log('\n== Categorie EVENTI ==');
  const c = {};
  c.matrimonio = await createCategory({ name: 'Matrimonio', url_key: 'matrimonio', parent_id: eventi });
  c.battesimo = await createCategory({ name: 'Battesimo & Nascita', url_key: 'battesimo-nascita', parent_id: eventi });
  c.compleanni = await createCategory({ name: 'Compleanni', url_key: 'compleanni', parent_id: eventi });
  c.lauree = await createCategory({ name: 'Lauree', url_key: 'lauree', parent_id: eventi });
  c.comunioni = await createCategory({ name: 'Comunioni & Cresime', url_key: 'comunioni-cresime', parent_id: eventi });
  c.natale = await createCategory({ name: 'Natale', url_key: 'natale', parent_id: eventi });
  c.sanvalentino = await createCategory({ name: 'San Valentino', url_key: 'san-valentino', parent_id: eventi });
  c.aziendali = await createCategory({ name: 'Eventi Aziendali', url_key: 'eventi-aziendali', parent_id: eventi });

  console.log("\n== Categorie TUTTO L'ANNO ==");
  c.bomboniere = await createCategory({ name: 'Bomboniere', url_key: 'bomboniere', parent_id: anno });
  c.targhe = await createCategory({ name: 'Targhe & Insegne', url_key: 'targhe-insegne', parent_id: anno });
  c.decorazioni = await createCategory({ name: 'Decorazioni per la Casa', url_key: 'decorazioni-casa', parent_id: anno });
  c.regali = await createCategory({ name: 'Regali Personalizzati', url_key: 'regali-personalizzati', parent_id: anno });
  c.accessori = await createCategory({ name: 'Accessori', url_key: 'accessori', parent_id: anno });
  c.ufficio = await createCategory({ name: 'Ufficio & Business', url_key: 'ufficio-business', parent_id: anno });

  const featured = [];
  console.log('\n== Prodotti demo ==');
  const products = [
    { name: 'Bomboniera in legno personalizzata', sku: 'ING-BOM-001', price: '4.50', url_key: 'bomboniera-legno-personalizzata', short: 'Bomboniera in legno incisa a laser, personalizzabile con nomi e data.', category_id: c.bomboniere },
    { name: 'Cake topper matrimonio', sku: 'ING-MAT-001', price: '14.90', url_key: 'cake-topper-matrimonio', short: 'Cake topper personalizzato con i nomi degli sposi.', category_id: c.matrimonio },
    { name: 'Segnaposto personalizzati (set 10)', sku: 'ING-MAT-002', price: '9.00', url_key: 'segnaposto-personalizzati-set-10', short: 'Set di 10 segnaposto incisi a laser per il tuo evento.', category_id: c.matrimonio },
    { name: 'Partecipazioni incise (set 25)', sku: 'ING-MAT-003', price: '32.00', url_key: 'partecipazioni-incise-set-25', short: 'Inviti eleganti incisi su carta pregiata o legno sottile.', category_id: c.matrimonio },
    { name: 'Targhetta battesimo personalizzata', sku: 'ING-BAT-001', price: '12.50', url_key: 'targhetta-battesimo-personalizzata', short: 'Ricordo del battesimo con nome e data incisi.', category_id: c.battesimo },
    { name: 'Pergamena laurea personalizzata', sku: 'ING-LAU-001', price: '11.00', url_key: 'pergamena-laurea-personalizzata', short: 'Targa/pergamena celebrativa per la laurea.', category_id: c.lauree },
    { name: 'Decorazione natalizia incisa', sku: 'ING-NAT-001', price: '7.50', url_key: 'decorazione-natalizia-incisa', short: 'Addobbo natalizio in legno personalizzato.', category_id: c.natale },
    { name: 'Cuore in legno San Valentino', sku: 'ING-SVA-001', price: '9.90', url_key: 'cuore-legno-san-valentino', short: 'Cuore in legno inciso con dedica personalizzata.', category_id: c.sanvalentino },
    { name: 'Targa incisa in plexiglass', sku: 'ING-TAR-001', price: '29.90', url_key: 'targa-incisa-plexiglass', short: 'Targa professionale in plexiglass, incisione su misura.', category_id: c.targhe },
    { name: 'Insegna in legno per attività', sku: 'ING-TAR-002', price: '49.00', url_key: 'insegna-legno-attivita', short: 'Insegna personalizzata per negozio o attività.', category_id: c.targhe },
    { name: 'Portachiavi personalizzato in legno', sku: 'ING-ACC-001', price: '6.90', url_key: 'portachiavi-personalizzato-legno', short: 'Portachiavi in legno inciso con nome o logo.', category_id: c.accessori },
    { name: 'Quadretto decorativo per la casa', sku: 'ING-DEC-001', price: '19.90', url_key: 'quadretto-decorativo-casa', short: 'Quadretto in legno inciso, decoro per la casa.', category_id: c.decorazioni },
    { name: 'Regalo personalizzato inciso', sku: 'ING-REG-001', price: '15.00', url_key: 'regalo-personalizzato-inciso', short: 'Idea regalo unica, incisa a laser su misura.', category_id: c.regali },
    { name: 'Portachiavi aziendale con logo (set 50)', sku: 'ING-AZI-001', price: '120.00', url_key: 'portachiavi-aziendale-logo-set-50', short: 'Gadget aziendali personalizzati con il logo, set da 50.', category_id: c.aziendali }
  ];
  for (const p of products) {
    const created = await createProduct(p);
    if (created?.uuid) featured.push(created);
  }

  // Collezione "In Evidenza" + widget homepage "Prodotti in evidenza".
  console.log('\n== Prodotti in evidenza (homepage) ==');
  const coll = await api('/api/collections', {
    name: 'In Evidenza',
    code: 'in-evidenza',
    description: []
  });
  const collUuid = coll.json?.data?.uuid;
  if (collUuid) {
    console.log(`  ✔ Collezione "In Evidenza" (code in-evidenza)`);
    for (const f of featured.slice(0, 6)) {
      const a = await api(`/api/collections/${collUuid}/products`, { product_id: f.uuid });
      if (a.status < 300) console.log(`    ✔ in evidenza: ${f.name}`);
    }
    const w = await api('/api/widgets', {
      type: 'collection_products',
      name: 'Prodotti in evidenza',
      status: 1,
      settings: {
        collection: 'in-evidenza',
        count: 6,
        countPerRow: 3,
        heading: 'Prodotti in evidenza',
        subText: 'Le nostre personalizzazioni più richieste'
      },
      // Posizione in homepage: dopo la vetrina categorie (sortOrder 15),
      // prima della fascia valori/CTA (sortOrder 40).
      placements: [{ route: 'homepage', area: 'content', sort_order: 25 }]
    });
    console.log(w.status < 300
      ? '  ✔ Widget homepage "Prodotti in evidenza" creato'
      : `  … Widget non creato (HTTP ${w.status}) — puoi crearlo dal pannello (CMS → Widgets)`);
  } else {
    console.log(`  … Collezione non creata (HTTP ${coll.status}) — creala dal pannello (Catalog → Collections)`);
  }

  console.log('\n✔ Seed completato. Apri http://localhost:3000 e il pannello admin → Catalog.');
}

main().catch((e) => {
  console.error('ERRORE seed:', e.message);
  process.exit(1);
});
