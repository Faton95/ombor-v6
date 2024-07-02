import React, { useState, useEffect } from 'react';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { editCustomer } from 'src/actions/customer';

type EditModalProps = {
  open: boolean;
  onClose: () => void;
  row: {
    _id: string;
    name: string;
    phone: string;
    organization: string;
  } | null;
};

export function EditModal({ open, onClose, row }: EditModalProps) {
  const [formData, setFormData] = useState({
    name: row?.name || '',
    phone: row?.phone || '',
    organization: row?.organization || '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.info('Save', formData);
    onClose();
    editCustomer(formData, row?._id);
  };

  useEffect(() => {
    if (row) {
      setFormData({
        name: row.name,
        phone: row.phone,
        organization: row.organization,
      });
    }
  }, [row]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Таҳрирлаш</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Мижоз"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Телефон номери"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Ташкилот"
          name="organization"
          value={formData.organization}
          onChange={handleInputChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">
          Бекор қилиш
        </Button>
        <Button onClick={handleSave} color="primary">
          Саҡлаш
        </Button>
      </DialogActions>
    </Dialog>
  );
}
