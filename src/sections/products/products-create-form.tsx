import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { createProduct } from 'src/actions/products';
import { useGetCategories } from 'src/actions/category';
import { useGetMeasurements } from 'src/actions/units-measurements';

import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';
// ----------------------------------------------------------------------

export const NewUser = zod.object({
  name: zod.string().min(1, { message: "Iltimos textfieldni to'ldiring!" }),
  category: schemaHelper.objectOrNull<string | null>({
    message: { required_error: 'Country is required!' },
  }),
  measure: schemaHelper.objectOrNull<string | null>({
    message: { required_error: 'Country is required!' },
  }),
});

type NewUserSchema = zod.infer<typeof NewUser>;

type Props = {
  open: boolean;
  onClose: VoidFunction;
};

export default function ProductsCreateForm({ open, onClose }: Props) {
  const { categoryResults } = useGetCategories();
  const { measurementsResults } = useGetMeasurements();

  console.log(categoryResults, measurementsResults);
  const defaultValues = {
    name: '',
    category: '',
    measure: '',
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
      await createProduct(data);
      reset();
      toast.success('Kategoriya muvaffaqiyatli yaratildi!');
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
        <DialogTitle>Yangi kategoriya yaratish</DialogTitle>

        <DialogContent>
          <Box rowGap={3} columnGap={2} display="grid" sx={{ pt: 1 }}>
            <Field.Text name="name" label="Mahsulot nomi" />
            <Field.Select fullWidth name="category" label="Kategoriyalar">
              {categoryResults?.map((option: any) => (
                <MenuItem
                  key={option?._id}
                  value={option?._id}
                  sx={{ textTransform: 'capitalize' }}
                >
                  {option?.name}
                </MenuItem>
              ))}
            </Field.Select>
            <Field.Select fullWidth name="measure" label="O'lchov birliklari">
              {measurementsResults?.map((option: any) => (
                <MenuItem
                  key={option?._id}
                  value={option?._id}
                  sx={{ textTransform: 'capitalize' }}
                >
                  {option?.name}
                </MenuItem>
              ))}
            </Field.Select>
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
