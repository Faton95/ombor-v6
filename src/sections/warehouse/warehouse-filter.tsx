import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';

import { Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function WarehouseFilter() {
  return (
    <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ pb: 3 }}>
      <Field.Select fullWidth name="warehouse" label="Omborlar">
        {['Ombor 1', 'Ombor 2', 'Ombor 3', 'Ombor 4'].map((option) => (
          <MenuItem key={option} value={option} sx={{ textTransform: 'capitalize' }}>
            {option}
          </MenuItem>
        ))}
      </Field.Select>

      <Field.Select fullWidth name="category" label="Kategoriyalar">
        {['Kategoriya 1', 'Kategoriya 2', 'Kategoriya 3', 'Kategoriya 4'].map((option) => (
          <MenuItem key={option} value={option} sx={{ textTransform: 'capitalize' }}>
            {option}
          </MenuItem>
        ))}
      </Field.Select>

      <Field.Select fullWidth name="product" label="Mahsulotlar">
        {['Mahsulot 1', 'Mahsulot 2', 'Mahsulot 3', 'Mahsulot 4'].map((option) => (
          <MenuItem key={option} value={option} sx={{ textTransform: 'capitalize' }}>
            {option}
          </MenuItem>
        ))}
      </Field.Select>

      <Field.DatePicker name="createDate" label="Boshlanish sanasi" />
      <Field.DatePicker name="dueDate" label="Tugash sanasi" />
    </Stack>
  );
}
