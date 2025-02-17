import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { InvoiceCreateView } from 'src/sections/exit/view';

// ----------------------------------------------------------------------

const metadata = { title: `Create a new invoice | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <InvoiceCreateView />
    </>
  );
}
