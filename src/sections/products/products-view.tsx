import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableContainer from '@mui/material/TableContainer';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import CategoryTableRow from './products-table-row';
import CategoryCreateForm from './products-create-form';
import { useGetProducts } from '../../actions/products';

// ----------------------------------------------------------------------

export default function ProductsView() {
  const { productResults } = useGetProducts();

  const quickEdit = useBoolean();

  return (
    <Container maxWidth={false}>
      <CustomBreadcrumbs
        sx={{ mb: 3 }}
        heading="Маҳсулотлар"
        action={
          <Button
            variant="contained"
            onClick={quickEdit.onTrue}
            startIcon={<Iconify icon="mdi:user-add" />}
          >
            Янги яратиш
          </Button>
        }
        links={[{ name: 'Ёрдамчилар', href: '#' }, { name: 'Маҳсулотлар' }]}
      />

      <Card>
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <Scrollbar>
            <CategoryTableRow
              title="New invoice"
              tableData={productResults}
              headLabel={[
                { id: 'N', label: '№', width: 10 },
                { id: 'product', label: 'Маҳсулотлар', width: 470 },
                { id: 'category', label: 'Категорияси', width: 470 },
                { id: 'measurements', label: 'Ўлчов бирлиги', width: 470 },
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
