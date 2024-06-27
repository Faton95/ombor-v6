import React, { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

type CommentDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: (comment: string) => void;
};

const CommentDialog: React.FC<CommentDialogProps> = ({ open, onClose, onConfirm }) => {
  const [comment, setComment] = useState('');

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleConfirm = () => {
    onConfirm(comment);
    setComment('');
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Изоҳ</DialogTitle>
      <DialogContent sx={{ minHeight: '150px', minWidth: '400px' }}>
        <TextField
          autoFocus
          margin="dense"
          label="Изоҳ"
          type="text"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={comment}
          onChange={handleCommentChange}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose} color="error">
          Бекор қилиш
        </Button>
        <Button variant="contained" onClick={handleConfirm} color="primary">
          Тасдиқлаш
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommentDialog;
