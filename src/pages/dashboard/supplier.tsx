import { Helmet } from 'react-helmet-async';

import SupplierView from 'src/sections/supplier/supplier-view';
// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Етказиб бериш </title>
      </Helmet>

      <SupplierView />
    </>
  );
}
