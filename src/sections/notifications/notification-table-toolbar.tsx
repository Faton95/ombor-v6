import type { IDatePickerControl } from 'src/types/common';

import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { formHelperTextClasses } from '@mui/material/FormHelperText';

import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

type Props = {
  dateError: boolean;
  onResetPage: () => void;
  filters: any;
};

export function ExitTableToolbar({ filters, dateError, onResetPage }: Props) {
  const methods = useForm();

  const handleFilterStartDate = useCallback(
    (newValue: IDatePickerControl) => {
      onResetPage();
      filters.setState({ startDate: newValue });
    },
    [filters, onResetPage]
  );

  const handleFilterEndDate = useCallback(
    (newValue: IDatePickerControl) => {
      onResetPage();
      filters.setState({ endDate: newValue });
    },
    [filters, onResetPage]
  );

  return (
    <Form methods={methods}>
      <Stack
        spacing={2}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        direction={{ xs: 'column', md: 'row' }}
        sx={{ p: 2.5, pr: { xs: 2.5, md: 1 } }}
      >
        <Field.Select name="status" label="Бўлим">
          {['Омбор 1', 'Омбор 2', 'Омбор 3'].map((option) => (
            <MenuItem key={option} value={option} sx={{ textTransform: 'capitalize' }}>
              {option}
            </MenuItem>
          ))}
        </Field.Select>
        <Field.Select name="status" label="Исм">
          {['Азизов Азиз', 'Луcиан Обриен', 'Жайдон Франкие'].map((option) => (
            <MenuItem key={option} value={option} sx={{ textTransform: 'capitalize' }}>
              {option}
            </MenuItem>
          ))}
        </Field.Select>

        <DatePicker
          label="Бошланиш санаси"
          value={filters.state.endDate}
          onChange={handleFilterStartDate}
          slotProps={{ textField: { fullWidth: true } }}
          sx={{ maxWidth: { md: 180 } }}
        />

        <DatePicker
          label="Тугаш санаси"
          value={filters.state.endDate}
          onChange={handleFilterEndDate}
          slotProps={{
            textField: {
              fullWidth: true,
              error: dateError,
              helperText: dateError ? 'End date must be later than start date' : null,
            },
          }}
          sx={{
            maxWidth: { md: 180 },
            [`& .${formHelperTextClasses.root}`]: {
              bottom: { md: -40 },
              position: { md: 'absolute' },
            },
          }}
        />
      </Stack>
    </Form>
  );
}
