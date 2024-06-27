import { Helmet } from 'react-helmet-async';

import { NotificationListView } from 'src/sections/notifications/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Хабарнома </title>
      </Helmet>

      <NotificationListView />
    </>
  );
}
