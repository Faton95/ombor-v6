import type { CardProps } from '@mui/material/Card';
import type { TableHeadCustomProps } from 'src/components/table';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';

import { fCurrency } from 'src/utils/format-number';

import { Scrollbar } from 'src/components/scrollbar';
import { TableHeadCustom } from 'src/components/table';

// ----------------------------------------------------------------------

type Props = CardProps & {
  subheader?: string;
  headLabel: TableHeadCustomProps['headLabel'];
  tableData: {
    id: number;
    product_id: string;
    warehouse_name: string;
    image: string;
    product_name: string;
    amount: string;
    measurement: string;
    price: string;
    total_price: string;
  }[];
};

export default function WarehouseTable({ subheader, tableData, headLabel, ...other }: Props) {
  return (
    <Card {...other}>
      <Scrollbar sx={{ minHeight: 422 }}>
        <Table sx={{ minWidth: 640 }}>
          <TableHeadCustom headLabel={headLabel} />

          <TableBody>
            {tableData.map((row) => (
              <RowItem key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
    </Card>
  );
}

// ----------------------------------------------------------------------

type RowItemProps = {
  row: Props['tableData'][number];
};

function RowItem({ row }: RowItemProps) {
  return (
    <TableRow>
      <TableCell>{row.id}</TableCell>
      <TableCell>
        <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
          <Avatar variant="rounded" alt={row.image} src={`/assets/images/${row.image}.jpeg`} />
        </Box>
      </TableCell>
      <TableCell>{row.product_id}</TableCell>
      <TableCell>{row.warehouse_name}</TableCell>

      <TableCell>{row.product_name}</TableCell>

      <TableCell align="center">{fCurrency(row.amount)}</TableCell>
      <TableCell align="center">{row.measurement}</TableCell>
      <TableCell align="center">{fCurrency(row.price)}</TableCell>
      <TableCell align="center">{fCurrency(row.total_price)}</TableCell>
    </TableRow>
  );
}
