import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableContainer from '@mui/material/TableContainer';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import CategoryTableRow from './units&measurements-table-row';
import CategoryCreateForm from './units&measurements-create-form';
import { useGetMeasurements } from '../../actions/units-measurements';

// ----------------------------------------------------------------------

export default function CategoriesView() {
  const { measurementsResults } = useGetMeasurements();

  const quickEdit = useBoolean();

  return (
    <Container maxWidth={false}>
      <CustomBreadcrumbs
        sx={{ mb: 3 }}
        heading="Ўлчов бирликлари"
        action={
          <Button
            variant="contained"
            onClick={quickEdit.onTrue}
            startIcon={<Iconify icon="mdi:user-add" />}
          >
            Янги яратиш
          </Button>
        }
        links={[{ name: 'Ёрдамчилар', href: '#' }, { name: 'Ўлчов бирликлари' }]}
      />

      <Card>
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <Scrollbar>
            <CategoryTableRow
              title="New invoice"
              tableData={measurementsResults}
              headLabel={[
                { id: 'N', label: '№', width: 10 },
                { id: 'units', label: 'Ўлчов бирликлари', width: 1410 },
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
