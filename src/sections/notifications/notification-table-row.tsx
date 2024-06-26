import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { Iconify } from 'src/components/iconify';
import { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

type Props = {
  row: any;
  selected: boolean;
};

export function ExitTableRow({ row, selected }: Props) {
  const popover = usePopover();

  return (
    <TableRow hover selected={selected}>
      <TableCell>{row.id}</TableCell>

      <TableCell>{row.invoiceTo.product_id}</TableCell>

      <TableCell>
        <ListItemText
          primary={row.invoiceTo.create_date}
          primaryTypographyProps={{ typography: 'body2', noWrap: true }}
        />
      </TableCell>

      <TableCell>{row.invoiceTo.category}</TableCell>

      <TableCell>{row.invoiceTo.product_name}</TableCell>

      <TableCell align="center">{row.invoiceTo.amount}</TableCell>

      <TableCell align="center">{row.invoiceTo.unit}</TableCell>

      <TableCell align="center">{row.invoiceTo.unit_price}</TableCell>

      <TableCell>{row.invoiceTo.comment}</TableCell>

      <TableCell>
        <ListItemText primary={<Typography>{row.invoiceTo.sender}</Typography>} />
      </TableCell>

      <TableCell
        align="right"
        sx={{ px: 1, display: 'flex', justifyContent: 'center', gap: 1, padding: '20px' }}
      >
        <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
          <Iconify icon="iconamoon:send-fill" />
        </IconButton>
        <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
          <Iconify icon="solar:trash-bin-trash-bold" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
