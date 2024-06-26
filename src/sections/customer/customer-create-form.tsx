import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { createCustomer } from 'src/actions/customer';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';
// ----------------------------------------------------------------------

export const NewUser = zod.object({
  name: zod.string().min(1, { message: "Iltimos textfieldni to'ldiring!" }),
  phone: zod.string().min(1, { message: "Iltimos textfieldni to'ldiring!" }),
  organization: zod.string().min(1, { message: "Iltimos textfieldni to'ldiring!" }),
});

type NewUserSchema = zod.infer<typeof NewUser>;

type Props = {
  open: boolean;
  onClose: VoidFunction;
};

export default function CustomerCreateForm({ open, onClose }: Props) {
  const defaultValues = {
    name: '',
    phone: '',
    organization: ''
  };

  const methods = useForm<NewUserSchema>({
    mode: 'onSubmit',
    resolver: zodResolver(NewUser),
    defaultValues,
  });

  const {
    reset,
    formState: { isSubmitting },
    handleSubmit,
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await createCustomer(data);
      reset();
      toast.success('Mijoz muvaffaqiyatli yaratildi!');
      onClose();
    } catch (error) {
      console.error(error);
    }
  });
  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: 720 },
      }}
    >
      <Form methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Yangi mijoz yaratish</DialogTitle>

        <DialogContent>
          <Box rowGap={3} columnGap={2} display="grid" sx={{ pt: 1 }}>
            <Field.Text name="name" label="Yetkazib beruvchi" />
            <Field.Text name="phone" label="Telefon raqami" />
            <Field.Text name="organization" label="Tashkilot nomi" />
          </Box>
        </DialogContent>

        <DialogActions>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Yaratish
          </LoadingButton>
          <Button
            variant="outlined"
            onClick={() => {
              onClose();
              reset();
            }}
          >
            Bekor qilish
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
