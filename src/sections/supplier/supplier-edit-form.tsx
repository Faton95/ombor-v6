import React, { useState, useEffect } from 'react';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { editSupplier } from 'src/actions/supplier';

type EditModalProps = {
  open: boolean;
  onClose: () => void;
  row: {
    _id: string;
    phone: string;
    name: string;
    address: string;
  } | null;
};

export function EditModal({ open, onClose, row }: EditModalProps) {
  const [formData, setFormData] = useState({
    name: row?.name || '',
    phone: row?.phone || '',
    address: row?.address || '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.info('Save', formData);
    onClose();
    editSupplier(formData, row?._id);
  };

  useEffect(() => {
    if (row) {
      setFormData({
        name: row.name,
        phone: row.phone,
        address: row.address,
      });
    }
  }, [row]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Таҳрирлаш</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Етказиб берувчи номи"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          fullWidth
        />

        <TextField
          margin="dense"
          label="Манзил"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          fullWidth
        />

        <TextField
          margin="dense"
          label="Телефон рақами"
          name="phone"
          value={formData.phone}
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
