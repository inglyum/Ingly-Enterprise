import { NavigationItemGroup } from '@components/admin/NavigationItemGroup.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import { Mail } from 'lucide-react';
import React from 'react';

interface Props {
  quoteRequests: string;
}

/** Voce di menu admin per le richieste di preventivo. */
export default function InglyQuotesMenu({ quoteRequests }: Props) {
  return (
    <NavigationItemGroup
      id="inglyMenuGroup"
      name={_('Ingly')}
      items={[
        {
          Icon: Mail,
          url: quoteRequests,
          title: _('Richieste preventivo')
        }
      ]}
    />
  );
}

export const layout = {
  areaId: 'adminMenu',
  sortOrder: 45
};

export const query = `
  query Query {
    quoteRequests: url(routeId: "inglyQuotes")
  }
`;
