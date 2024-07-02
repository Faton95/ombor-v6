import React, { useState, useEffect } from 'react';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { editProducts } from 'src/actions/products';

type EditModalProps = {
  open: boolean;
  onClose: () => void;
  row: {
    _id: string;
    name: string;
    category: {
      name: string;
      _id: string;
    };
    measure: {
      name: string;
      _id: string;
    };
  } | null;
};

export function EditModal({ open, onClose, row }: EditModalProps) {
  const [formData, setFormData] = useState({
    name: row?.name || '',
    category: row?.category.name || undefined,
    measure: row?.measure.name || undefined,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.info('Save', formData);
    onClose();
    editProducts(formData, row?._id);
  };

  useEffect(() => {
    if (row) {
      setFormData({
        name: row.name,
        category: row.category.name,
        measure: row.measure.name,
      });
    }
  }, [row]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Таҳрирлаш</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Маҳсулотлар"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Категорияси"
          name="category"
          value={formData?.category}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Ўлчов бирлиги"
          name="measure"
          value={formData?.measure}
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
