import type { IInvoice } from 'src/types/invoice';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { fCurrency } from 'src/utils/format-number';
import { fDate, fTime } from 'src/utils/format-time';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

type Props = {
  row: IInvoice;
  selected: boolean;
  onViewRow: () => void;
  onEditRow: () => void;
};

export function ExitTableRow({ row, selected, onViewRow, onEditRow }: Props) {
  const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell>
          <Stack spacing={2} direction="row" alignItems="center">
            <Avatar alt={row.invoiceTo.name}>{row.invoiceTo.name.charAt(0).toUpperCase()}</Avatar>

            <ListItemText
              disableTypography
              primary={
                <Typography variant="body2" noWrap>
                  {row.invoiceTo.name}
                </Typography>
              }
              secondary={
                <Link
                  noWrap
                  variant="body2"
                  onClick={onViewRow}
                  sx={{ color: 'text.disabled', cursor: 'pointer' }}
                >
                  {row.invoiceNumber}
                </Link>
              }
            />
          </Stack>
        </TableCell>

        <TableCell>
          <ListItemText
            primary={fDate(row.createDate)}
            secondary={fTime(row.createDate)}
            primaryTypographyProps={{ typography: 'body2', noWrap: true }}
            secondaryTypographyProps={{ mt: 0.5, component: 'span', typography: 'caption' }}
          />
        </TableCell>

        <TableCell>
          <ListItemText
            primary={fDate(row.dueDate)}
            secondary={fTime(row.dueDate)}
            primaryTypographyProps={{ typography: 'body2', noWrap: true }}
            secondaryTypographyProps={{ mt: 0.5, component: 'span', typography: 'caption' }}
          />
        </TableCell>

        <TableCell>{fCurrency(row.totalAmount)}</TableCell>

        <TableCell align="center">{row.sent}</TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={
              (row.status === 'paid' && 'success') ||
              (row.status === 'pending' && 'warning') ||
              (row.status === 'overdue' && 'error') ||
              'default'
            }
          >
            {row.status}
          </Label>
        </TableCell>

        <TableCell align="right" sx={{ px: 1 }}>
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              onViewRow();
              popover.onClose();
            }}
          >
            <Iconify icon="solar:eye-bold" />
            Кўриш
          </MenuItem>

          <MenuItem
            onClick={() => {
              onEditRow();
              popover.onClose();
            }}
          >
            <Iconify icon="solar:pen-bold" />
            Таҳрирлаш
          </MenuItem>
        </MenuList>
      </CustomPopover>
    </>
  );
}
