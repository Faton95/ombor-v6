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
        heading="O'lchov birliklari"
        action={
          <Button
            variant="contained"
            onClick={quickEdit.onTrue}
            startIcon={<Iconify icon="mdi:user-add" />}
          >
            Yangi yaratish
          </Button>
        }
        links={[{ name: 'Yordamchilar', href: '#' }, { name: 'O\'lchov birliklari' }]}
      />

      <Card>
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <Scrollbar>
            <CategoryTableRow
              title="New invoice"
              tableData={measurementsResults}
              headLabel={[
                { id: 'N', label: '№', width: 10 },
                { id: 'units', label: 'O\'lchov birligi', width: 1410 },
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
