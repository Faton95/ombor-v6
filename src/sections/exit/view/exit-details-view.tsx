import type { IInvoice } from 'src/types/invoice';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { InvoiceDetails } from '../exit-details';

// ----------------------------------------------------------------------

type Props = {
  invoice?: IInvoice;
};

export function InvoiceDetailsView({ invoice }: Props) {
  return (
    <DashboardContent maxWidth="xl">
      <CustomBreadcrumbs
        heading={invoice?.invoiceNumber}
        links={[
          { name: 'Дашбоард', href: paths.dashboard.root },
          { name: 'Ҳисоб', href: paths.dashboard.invoice.root },
          { name: invoice?.invoiceNumber },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <InvoiceDetails invoice={invoice} />
    </DashboardContent>
  );
}
