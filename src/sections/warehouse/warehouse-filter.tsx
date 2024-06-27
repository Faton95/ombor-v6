import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';

import { Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function WarehouseFilter() {
  return (
    <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ pb: 3 }}>
      <Field.Select fullWidth name="warehouse" label="Омборлар">
        {['Омбор 1', 'Омбор 2', 'Омбор 3', 'Омбор 4'].map((option) => (
          <MenuItem key={option} value={option} sx={{ textTransform: 'capitalize' }}>
            {option}
          </MenuItem>
        ))}
      </Field.Select>

      <Field.Select fullWidth name="category" label="Категориялар">
        {['Категория 1', 'Категория 2', 'Категория 3', 'Категория 4'].map((option) => (
          <MenuItem key={option} value={option} sx={{ textTransform: 'capitalize' }}>
            {option}
          </MenuItem>
        ))}
      </Field.Select>

      <Field.Select fullWidth name="product" label="Маҳсулотлар">
        {['Маҳсулот 1', 'Маҳсулот 2', 'Маҳсулот 3', 'Маҳсулот 4'].map((option) => (
          <MenuItem key={option} value={option} sx={{ textTransform: 'capitalize' }}>
            {option}
          </MenuItem>
        ))}
      </Field.Select>

      <Field.DatePicker name="createDate" label="Бошланиш санаси" />
      <Field.DatePicker name="dueDate" label="Тугаш санаси" />
    </Stack>
  );
}
