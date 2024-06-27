import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableContainer from '@mui/material/TableContainer';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import CategoryTableRow from './customer-table-row';
import CategoryCreateForm from './customer-create-form';
import { useGetCustomer } from '../../actions/customer';

// ----------------------------------------------------------------------

export default function CategoriesView() {
  const { customerResults } = useGetCustomer();

  const quickEdit = useBoolean();

  return (
    <Container maxWidth={false}>
      <CustomBreadcrumbs
        sx={{ mb: 3 }}
        heading="Мижоз"
        action={
          <Button
            variant="contained"
            onClick={quickEdit.onTrue}
            startIcon={<Iconify icon="mdi:user-add" />}
          >
            Янги яратиш
          </Button>
        }
        links={[{ name: 'Ёрдамчилар', href: '#' }, { name: 'Мижоз' }]}
      />

      <Card>
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <Scrollbar>
            <CategoryTableRow
              title="New invoice"
              tableData={customerResults}
              headLabel={[
                { id: 'N', label: '№', width: 10 },
                { id: 'customer', label: 'Мижоз', width: 470 },
                { id: 'organization', label: 'Ташкилот', width: 470 },
                { id: 'phone', label: 'Телефон номери', width: 460 },
                { id: '', width: 10 },
              ]}
            />
          </Scrollbar>
        </TableContainer>
      </Card>

      <CategoryCreateForm open={quickEdit.value} onClose={quickEdit.onFalse} />
    </Container>
  );
}

// ----------------------------------------------------------------------
