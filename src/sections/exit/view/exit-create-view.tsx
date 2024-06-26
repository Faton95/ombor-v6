import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { InvoiceNewEditForm } from '../exit-new-edit-form';

// ----------------------------------------------------------------------

export function InvoiceCreateView() {
  return (
    <DashboardContent maxWidth="xl">
      <CustomBreadcrumbs
        heading="Yangi nakladnoy yaratish"
        links={[
          { name: 'Asosiy', href: paths.dashboard.root },
          { name: 'nakladnoy', href: paths.dashboard.invoice.root },
          { name: 'Yangi nakladnoy' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <InvoiceNewEditForm />
    </DashboardContent>
  );
}
