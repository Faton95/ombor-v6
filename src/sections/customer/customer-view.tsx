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
        heading="Mijoz"
        action={
          <Button
            variant="contained"
            onClick={quickEdit.onTrue}
            startIcon={<Iconify icon="mdi:user-add" />}
          >
            Yangi yaratish
          </Button>
        }
        links={[{ name: 'Yordamchilar', href: '#' }, { name: 'Mijoz' }]}
      />

      <Card>
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <Scrollbar>
            <CategoryTableRow
              title="New invoice"
              tableData={customerResults}
              headLabel={[
                { id: 'N', label: '№', width: 10 },
                { id: 'customer', label: 'Mijoz', width: 470 },
                { id: 'organization', label: 'Tashkilot', width: 470 },
                { id: 'phone', label: 'Telefon nomeri', width: 460 },
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
