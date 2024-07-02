import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableContainer from '@mui/material/TableContainer';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import CategoryTableRow from './supplier-table-row';
import CategoryCreateForm from './supplier-create-form';
import { useGetSuppliers } from '../../actions/supplier';

// ----------------------------------------------------------------------

export default function SupplierView() {
  const { supplierResults } = useGetSuppliers();

  const quickEdit = useBoolean();

  return (
    <Container maxWidth={false}>
      <CustomBreadcrumbs
        sx={{ mb: 3 }}
        heading="Етказиб бериш"
        action={
          <Button
            variant="contained"
            onClick={quickEdit.onTrue}
            startIcon={<Iconify icon="mdi:user-add" />}
          >
            Янги яратиш
          </Button>
        }
        links={[{ name: 'Ёрдамчилар', href: '#' }, { name: 'Етказиб бериш' }]}
      />

      <Card>
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <Scrollbar>
            <CategoryTableRow
              title="Yetkazib beruvchi"
              tableData={supplierResults}
              headLabel={[
                { id: 'N', label: '№', width: 10 },
                { id: 'name', label: 'Етказиб берувчи номи', width: 470 },
                { id: 'phone', label: 'Манзил', width: 470 },
                { id: 'address', label: 'Телефон рақами', width: 470 },
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
