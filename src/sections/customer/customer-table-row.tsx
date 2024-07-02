import React, { useState } from 'react';

// eslint-disable-next-line perfectionist/sort-imports
import type { CardProps } from '@mui/material/Card';
import type { TableHeadCustomProps } from 'src/components/table';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { deleteCustomer } from 'src/actions/customer';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { TableHeadCustom } from 'src/components/table';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import { EditModal } from './customer-edit-form';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
  headLabel: TableHeadCustomProps['headLabel'];
  tableData: {
    _id: string;
    name: string;
    phone: string;
    organization: string;
  }[];
};

export default function CategoryTableView({
  title,
  subheader,
  tableData,
  headLabel,
  ...other
}: Props) {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentRow, setCurrentRow] = useState<Props['tableData'][number] | null>(null);

  const handleEditOpen = (row: Props['tableData'][number]) => {
    setCurrentRow(row);
    setOpenEditModal(true);
  };

  const handleEditClose = () => {
    setCurrentRow(null);
    setOpenEditModal(false);
  };

  return (
    <Card {...other}>
      <Scrollbar>
        <Table sx={{ minWidth: 680 }}>
          <TableHeadCustom headLabel={headLabel} />

          <TableBody>
            {tableData.map((row, index) => (
              <RowItem key={row._id} index={index + 1} row={row} onEdit={handleEditOpen} />
            ))}
          </TableBody>
        </Table>
      </Scrollbar>

      <EditModal open={openEditModal} onClose={handleEditClose} row={currentRow} />
    </Card>
  );
}

// ----------------------------------------------------------------------

type RowItemProps = {
  index: number;
  row: Props['tableData'][number];
  onEdit: (row: Props['tableData'][number]) => void;
};

function RowItem({ row, index, onEdit }: RowItemProps) {
  const popover = usePopover();

  const handleEdit = () => {
    popover.onClose();
    onEdit(row);
  };

  const handleDelete = () => {
    popover.onClose();
    deleteCustomer(row._id);
  };

  return (
    <>
      <TableRow>
        <TableCell>{index}</TableCell>
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.organization}</TableCell>
        <TableCell>{row.phone}</TableCell>
        <TableCell align="right" sx={{ pr: 1 }}>
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
          <MenuItem onClick={handleEdit}>
            <Iconify icon="solar:pen-bold" />
            Таҳрирлаш
          </MenuItem>

          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Ўчириш
          </MenuItem>
        </MenuList>
      </CustomPopover>
    </>
  );
}
