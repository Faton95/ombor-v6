import { Helmet } from 'react-helmet-async';

import { InvoiceListView } from 'src/sections/exit/view';
// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Чиқим </title>
      </Helmet>

      <InvoiceListView />
    </>
  );
}
