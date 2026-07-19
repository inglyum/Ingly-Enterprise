import React from 'react';

/**
 * Pannello di benvenuto INGLY sulla dashboard admin.
 * Fornisce collegamenti rapidi alle attività operative di Ingly Design.
 * Area "content" della sola route `dashboard`.
 */
type QuickLink = { label: string; description: string; href: string };

const links: QuickLink[] = [
  {
    label: 'Ordini',
    description: 'Gestisci ordini e avanzamento',
    href: '/admin/orders'
  },
  {
    label: 'Prodotti',
    description: 'Catalogo e personalizzazioni',
    href: '/admin/products'
  },
  {
    label: 'Clienti',
    description: 'Anagrafica e relazioni',
    href: '/admin/customers'
  },
  {
    label: 'Contenuti CMS',
    description: 'Pagine, blog e portfolio',
    href: '/admin/cms/pages'
  }
];

export default function InglyDashboard() {
  return (
    <div className="mb-6">
      <div
        className="rounded-xl p-6 text-white"
        style={{
          background: 'linear-gradient(120deg, #14182B 0%, #1E2547 55%, #2E6FD1 100%)'
        }}
      >
        <h2 className="text-2xl font-bold mb-1">Benvenuto in INGLY Enterprise</h2>
        <p className="opacity-90 text-sm">
          Il gestionale unificato di Ingly Design: ecommerce, produzione laser,
          preventivi e CRM in un&apos;unica piattaforma.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="block rounded-lg border border-divider bg-white p-4 transition-shadow hover:shadow-md"
          >
            <div className="font-semibold text-gray-900">{link.label}</div>
            <div className="text-sm text-gray-500 mt-1">{link.description}</div>
          </a>
        ))}
      </div>
    </div>
  );
}

export const layout = {
  areaId: 'content',
  sortOrder: 1
};
