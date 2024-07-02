import React from 'react';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

type EditModalProps = {
  open: boolean;
  name: string;
  onClose: () => void;
  onSave: (newName: string) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function EditModal({ open, name, onClose, onSave, onChange }: EditModalProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Таҳрирлаш</DialogTitle>
      <DialogContent sx={{ minHeight: '100px', minWidth: '400px' }}>
        <TextField
          autoFocus
          margin="dense"
          label="Сабаб номи"
          type="text"
          fullWidth
          variant="standard"
          value={name}
          onChange={onChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">
          Бекор қилиш
        </Button>
        <Button onClick={() => onSave(name)} color="primary">
          Саҡлаш
        </Button>
      </DialogActions>
    </Dialog>
  );
}
