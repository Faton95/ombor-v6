import { Helmet } from 'react-helmet-async';

import DepartmentView from 'src/sections/department/department-view';
// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Отдел </title>
      </Helmet>

      <DepartmentView />
    </>
  );
}
