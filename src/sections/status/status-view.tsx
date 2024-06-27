import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableContainer from '@mui/material/TableContainer';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import CategoryTableRow from './status-table-row';
import CategoryCreateForm from './status-create-form';
import { useGetStatusses } from '../../actions/status';

// ----------------------------------------------------------------------

export default function StatussesView() {
  const { statusResults } = useGetStatusses();

  const quickEdit = useBoolean();

  return (
    <Container maxWidth={false}>
      <CustomBreadcrumbs
        sx={{ mb: 3 }}
        heading="Сабаблар"
        action={
          <Button
            variant="contained"
            onClick={quickEdit.onTrue}
            startIcon={<Iconify icon="mdi:user-add" />}
          >
            Янги яратиш
          </Button>
        }
        links={[{ name: 'Ёрдамчилар', href: '#' }, { name: 'Сабаблар' }]}
      />

      <Card>
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <Scrollbar>
            <CategoryTableRow
              title="Statusses"
              tableData={statusResults}
              headLabel={[
                { id: 'N', label: '№', width: 10 },
                { id: 'status', label: 'Сабаб номи', width: 1410 },
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
