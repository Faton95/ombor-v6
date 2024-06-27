import type { IInvoiceTableFilters } from 'src/types/invoice';

import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import TableBody from '@mui/material/TableBody';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { sumBy } from 'src/utils/helper';
import { fIsAfter } from 'src/utils/format-time';

import { _invoices } from 'src/_mock';
import { varAlpha } from 'src/theme/styles';
import { useGetExpenses } from 'src/actions/expense';
import { DashboardContent } from 'src/layouts/dashboard';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import {
  useTable,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
} from 'src/components/table';

import { ExitAnalytic } from '../exit-analytic';
import { ExitTableRow } from '../exit-table-row';
import { ExitTableToolbar } from '../exit-table-toolbar';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'invoiceNumber', label: 'Customer' },
  { id: 'createDate', label: 'Create' },
  { id: 'dueDate', label: 'Due' },
  { id: 'price', label: 'Amount' },
  { id: 'sent', label: 'Sent', align: 'center' },
  { id: 'status', label: 'Status' },
  { id: '' },
];

// ----------------------------------------------------------------------

export function InvoiceListView() {
  const { expenseResults } = useGetExpenses();

  console.log('expenseResults', expenseResults);

  const theme = useTheme();

  const router = useRouter();

  const table = useTable({ defaultOrderBy: 'createDate' });

  const confirm = useBoolean();

  const filters = useSetState<IInvoiceTableFilters>({
    name: '',
    service: [],
    status: 'all',
    startDate: null,
    endDate: null,
  });

  const dateError = fIsAfter(filters.state.startDate, filters.state.endDate);

  const getInvoiceLength = (status: string) =>
    _invoices.filter((item) => item.status === status).length;

  const getTotalAmount = (status: string) =>
    sumBy(
      _invoices.filter((item) => item.status === status),
      (invoice) => invoice.totalAmount
    );

  const getPercentByStatus = (status: string) =>
    (getInvoiceLength(status) / _invoices.length) * 100;

  const TABS = [
    {
      value: 'all',
      label: 'Умумий',
      color: 'default',
      count: _invoices.length,
    },
    {
      value: 'paid',
      label: 'Тасдиқланган',
      color: 'success',
      count: getInvoiceLength('paid'),
    },
    {
      value: 'pending',
      label: 'Янги',
      color: 'warning',
      count: getInvoiceLength('pending'),
    },
    {
      value: 'overdue',
      label: 'Қайтариш',
      color: 'error',
      count: getInvoiceLength('overdue'),
    },
    {
      value: 'draft',
      label: 'Тасдиқланмаган',
      color: 'default',
      count: getInvoiceLength('draft'),
    },
  ] as const;

  const handleEditRow = useCallback(
    (id: string) => {
      router.push(paths.dashboard.invoice.edit(id));
    },
    [router]
  );

  const handleViewRow = useCallback(
    (id: string) => {
      router.push(paths.dashboard.invoice.details(id));
    },
    [router]
  );

  const handleFilterStatus = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      table.onResetPage();
      filters.setState({ status: newValue });
    },
    [filters, table]
  );

  return (
    <DashboardContent maxWidth="xl">
      <CustomBreadcrumbs
        heading="Чиқим"
        links={[{ name: 'Асосий', href: paths.dashboard.root }, { name: 'Чиқим' }]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.invoice.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            Янги яратиш
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Card sx={{ mb: { xs: 3, md: 5 } }}>
        <Scrollbar sx={{ minHeight: 108 }}>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
            sx={{ py: 2 }}
          >
            <ExitAnalytic
              title="Умумий"
              total={_invoices.length}
              percent={100}
              price={sumBy(_invoices, (invoice) => invoice.totalAmount)}
              icon="solar:bill-list-bold-duotone"
              color={theme.vars.palette.info.main}
            />

            <ExitAnalytic
              title="Тасдиқланган"
              total={getInvoiceLength('paid')}
              percent={getPercentByStatus('paid')}
              price={getTotalAmount('paid')}
              icon="solar:file-check-bold-duotone"
              color={theme.vars.palette.success.main}
            />

            <ExitAnalytic
              title="Янги"
              total={getInvoiceLength('pending')}
              percent={getPercentByStatus('pending')}
              price={getTotalAmount('pending')}
              icon="solar:sort-by-time-bold-duotone"
              color={theme.vars.palette.warning.main}
            />

            <ExitAnalytic
              title="Қайтариш"
              total={getInvoiceLength('overdue')}
              percent={getPercentByStatus('overdue')}
              price={getTotalAmount('overdue')}
              icon="solar:bell-bing-bold-duotone"
              color={theme.vars.palette.error.main}
            />

            <ExitAnalytic
              title="Тасдиқланмаган"
              total={getInvoiceLength('draft')}
              percent={getPercentByStatus('draft')}
              price={getTotalAmount('draft')}
              icon="solar:file-corrupted-bold-duotone"
              color={theme.vars.palette.text.secondary}
            />
          </Stack>
        </Scrollbar>
      </Card>

      <Card>
        <Tabs
          value={filters.state.status}
          onChange={handleFilterStatus}
          sx={{
            px: 2.5,
            boxShadow: `inset 0 -2px 0 0 ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
          }}
        >
          {TABS.map((tab) => (
            <Tab
              key={tab.value}
              value={tab.value}
              label={tab.label}
              iconPosition="end"
              icon={
                <Label
                  variant={
                    ((tab.value === 'all' || tab.value === filters.state.status) && 'filled') ||
                    'soft'
                  }
                  color={tab.color}
                >
                  {tab.count}
                </Label>
              }
            />
          ))}
        </Tabs>

        <ExitTableToolbar filters={filters} dateError={dateError} onResetPage={table.onResetPage} />

        <Box sx={{ position: 'relative' }}>
          <TableSelectedAction
            dense={false}
            numSelected={table.selected.length}
            rowCount={_invoices.length}
            onSelectAllRows={(checked) => {
              table.onSelectAllRows(
                checked,
                _invoices.map((row) => row.id)
              );
            }}
            action={
              <Stack direction="row">
                <Tooltip title="Sent">
                  <IconButton color="primary">
                    <Iconify icon="iconamoon:send-fill" />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Download">
                  <IconButton color="primary">
                    <Iconify icon="eva:download-outline" />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Print">
                  <IconButton color="primary">
                    <Iconify icon="solar:printer-minimalistic-bold" />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Delete">
                  <IconButton color="primary" onClick={confirm.onTrue}>
                    <Iconify icon="solar:trash-bin-trash-bold" />
                  </IconButton>
                </Tooltip>
              </Stack>
            }
          />

          <Scrollbar sx={{ minHeight: 444 }}>
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                rowCount={_invoices.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
              />

              <TableBody>
                {_invoices.map((row) => (
                  <ExitTableRow
                    key={row.id}
                    row={row}
                    selected={table.selected.includes(row.id)}
                    onViewRow={() => handleViewRow(row.id)}
                    onEditRow={() => handleEditRow(row.id)}
                  />
                ))}

                <TableEmptyRows
                  height={table.dense ? 56 : 56 + 20}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, _invoices.length)}
                />

                <TableNoData notFound={false} />
              </TableBody>
            </Table>
          </Scrollbar>
        </Box>
      </Card>
    </DashboardContent>
  );
}
