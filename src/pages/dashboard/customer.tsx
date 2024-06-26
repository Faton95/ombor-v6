import { Helmet } from 'react-helmet-async';

import CustomerView from 'src/sections/customer/customer-view';
// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Six</title>
      </Helmet>

      <CustomerView />
    </>
  );
}
