import { useFormContext } from 'react-hook-form';

import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';

import { Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export function InvoiceNewEditStatusDate() {
  const { watch } = useFormContext();

  const values = watch();

  return (
    <Stack
      spacing={2}
      direction={{ xs: 'column', sm: 'row' }}
      sx={{ p: 3, bgcolor: 'background.neutral' }}
    >
      <Field.Text
        disabled
        name="invoiceNumber"
        label="Nakladnoy raqami"
        value={values.invoiceNumber}
      />

      <Field.Select fullWidth name="status" label="Sababi" InputLabelProps={{ shrink: true }}>
        {["Beg'araz", "G'arazli"].map((option) => (
          <MenuItem key={option} value={option} sx={{ textTransform: 'capitalize' }}>
            {option}
          </MenuItem>
        ))}
      </Field.Select>

      <Field.DatePicker name="createDate" label="Chislo-dan" />
      <Field.DatePicker name="dueDate" label="Chislo-gacha" />
    </Stack>
  );
}
