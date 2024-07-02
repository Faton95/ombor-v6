import { Helmet } from 'react-helmet-async';

import WarehouseView from 'src/sections/warehouse/warehouse-view';
// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Омборхона </title>
      </Helmet>

      <WarehouseView />
    </>
  );
}
