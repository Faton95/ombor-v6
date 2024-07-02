import type { IInvoiceTableFilters } from 'src/types/invoice';

import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { useTheme } from '@mui/material/styles';

import { paths } from 'src/routes/paths';

import { useSetState } from 'src/hooks/use-set-state';

import { fIsAfter } from 'src/utils/format-time';

import { _invoices } from 'src/_mock';
import { varAlpha } from 'src/theme/styles';
import { useGetExpenses } from 'src/actions/expense';
import { DashboardContent } from 'src/layouts/dashboard';

import { Label } from 'src/components/label';
import { Scrollbar } from 'src/components/scrollbar';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import {
  useTable,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
} from 'src/components/table';

import { ExitTableRow } from '../notification-table-row';
import { ExitTableToolbar } from '../notification-table-toolbar';

// ----------------------------------------------------------------------
const FAKE_DATA = [
  {
    id: 1,
    invoiceTo: {
      product_id: '#25',
      create_date: '26 Jun 2024',
      category: 'A kategoriya',
      product_name: 'A mahsulot',
      amount: '54',
      unit: 'kg',
      unit_price: '18$',
      comment: 'Qaysidir tadbir uchun',
      sender: 'Lucian Obrien',
    },
  },
  {
    id: 2,
    invoiceTo: {
      product_id: '#13',
      create_date: '26 Jun 2024',
      category: 'C kategoriya',
      product_name: 'C mahsulot',
      amount: '54',
      unit: 'dona',
      unit_price: '20$',
      comment: 'Qaysidir tadbir uchun',
      sender: 'Lucian Obrien',
    },
  },
  {
    id: 3,
    invoiceTo: {
      product_id: '#17',
      create_date: '26 Jun 2024',
      category: 'B kategoriya',
      product_name: 'B mahsulot',
      amount: '54',
      unit: 'tup',
      unit_price: '13$',
      comment: 'Qaysidir tadbir uchun',
      sender: 'Lucian Obrien',
    },
  },
  {
    id: 4,
    invoiceTo: {
      product_id: '#12',
      create_date: '26 Jun 2024',
      category: 'D kategoriya',
      product_name: 'D mahsulot',
      amount: '54',
      unit: 'kg',
      unit_price: '15$',
      comment: 'Qaysidir tadbir uchun',
      sender: 'Lucian Obrien',
    },
  },
  {
    id: 5,
    invoiceTo: {
      product_id: '#56',
      create_date: '26 Jun 2024',
      category: 'D kategoriya',
      product_name: 'D mahsulot',
      amount: '54',
      unit: 'dona',
      unit_price: '10$',
      comment: 'Qaysidir tadbir uchun',
      sender: 'Lucian Obrien',
    },
  },
];
const TABLE_HEAD = [
  { id: 'N', label: '№' },
  { id: 'product_id', label: 'ИД', align: 'center' },
  { id: 'create_date', label: 'Жўнатилган сана', align: 'center' },
  { id: 'category', label: 'Категория' },
  { id: 'product_name', label: 'Маҳсулот номи', align: 'center' },
  { id: 'amount', label: 'Брон қилиш миқдори', align: 'center' },
  { id: 'unit', label: 'Бирлиги' },
  { id: 'unit_price', label: 'Бир бирлик нархи', align: 'center' },
  { id: 'comment', label: 'Изоҳ' },
  { id: 'sender', label: 'Ким томонидан жўнатилган' },
  { id: '' },
];

// ----------------------------------------------------------------------

export function NotificationListView() {
  const { expenseResults } = useGetExpenses();

  console.log('expenseResults', expenseResults);

  const theme = useTheme();

  const table = useTable({ defaultOrderBy: 'createDate' });

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

  const TABS = [
    {
      value: 'all',
      label: 'Янги',
      color: 'default',
      count: _invoices.length,
    },
    {
      value: 'overdue',
      label: 'Қабул қилинган',
      color: 'success',
      count: getInvoiceLength('overdue'),
    },
    {
      value: 'draft',
      label: 'Қабул қилинмаган',
      color: 'error',
      count: getInvoiceLength('draft'),
    },
  ] as const;

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
        heading="Хабарнома"
        links={[{ name: 'Дашбоард', href: paths.dashboard.root }, { name: 'Хабарнома' }]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

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
          <Scrollbar sx={{ minHeight: 444 }}>
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                rowCount={_invoices.length}
                numSelected={table.selected.length}
              />

              <TableBody>
                {FAKE_DATA.map((row: any) => (
                  <ExitTableRow key={row.id} row={row} selected={table.selected.includes(row.id)} />
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
