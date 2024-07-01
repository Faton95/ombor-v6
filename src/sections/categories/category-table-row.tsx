import type { CardProps } from '@mui/material/Card';

import React, { useState } from 'react';

// eslint-disable-next-line perfectionist/sort-imports
import type { TableHeadCustomProps } from 'src/components/table';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { editCategory, deleteCategory } from 'src/actions/category';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { TableHeadCustom } from 'src/components/table';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import EditModal from './category-edit-form';

type Category = {
  _id: string;
  name: string;
};

type Props = CardProps & {
  title?: string;
  subheader?: string;
  headLabel: TableHeadCustomProps['headLabel'];
  tableData: Category[];
};

export default function CategoryTableView({
  title,
  subheader,
  tableData,
  headLabel,
  ...other
}: Props) {
  return (
    <Card {...other}>
      <Scrollbar>
        <Table sx={{ minWidth: 680 }}>
          <TableHeadCustom headLabel={headLabel} />
          <TableBody>
            {tableData.map((row, index) => (
              <RowItem key={row._id} index={index + 1} row={row} />
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
    </Card>
  );
}

// ----------------------------------------------------------------------

type RowItemProps = {
  index: number;
  row: Category;
};

function RowItem({ row, index }: RowItemProps) {
  const popover = usePopover();
  const [editOpen, setEditOpen] = useState(false);
  const [editName, setEditName] = useState(row.name);

  const handleEditOpen = () => {
    setEditOpen(true);
    popover.onClose();
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleEditSave = (newName: any) => {
    console.info('Save', row._id, newName);
    editCategory(row._id, { name: newName });
    setEditOpen(false);
  };

  const handleDelete = () => {
    popover.onClose();
    deleteCategory(row._id);
  };

  return (
    <>
      <TableRow>
        <TableCell>{index}</TableCell>
        <TableCell>{row.name}</TableCell>
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
          <MenuItem onClick={handleEditOpen}>
            <Iconify icon="solar:pen-bold" />
            Таҳрирлаш
          </MenuItem>

          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Ўчириш
          </MenuItem>
        </MenuList>
      </CustomPopover>

      <EditModal
        open={editOpen}
        name={editName}
        onClose={handleEditClose}
        onSave={handleEditSave}
        onChange={(e) => setEditName(e.target.value)}
      />
    </>
  );
}
