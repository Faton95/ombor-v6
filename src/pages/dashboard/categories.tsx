import { Helmet } from 'react-helmet-async';

import CategoriesView from 'src/sections/categories/category-view';
// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Six</title>
      </Helmet>

      <CategoriesView />
    </>
  );
}
