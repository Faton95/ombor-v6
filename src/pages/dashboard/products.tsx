import { Helmet } from 'react-helmet-async';

import ProductsView from 'src/sections/products/products-view';
// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Six</title>
      </Helmet>

      <ProductsView />
    </>
  );
}
