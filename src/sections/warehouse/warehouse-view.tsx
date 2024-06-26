import { useForm } from 'react-hook-form';

import Container from '@mui/material/Container';

import { Form } from 'src/components/hook-form';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import WarehouseTable from './warehouse-table';
import WarehouseFilter from './warehouse-filter';
// ----------------------------------------------------------------------

const data = [
  {
    id: 1,
    product_id: '1234556',
    warehouse_name: 'Umumiy mahsulotlar',
    image: 'ball',
    product_name: 'A mahsulot',
    amount: '5',
    measurement: 'dona',
    price: '1000',
    total_price: '5000',
  },
  {
    id: 2,
    product_id: '1234556',
    warehouse_name: 'Umumiy mahsulotlar',
    image: 'book',
    product_name: 'A mahsulot',
    amount: '5',
    measurement: 'dona',
    price: '1000',
    total_price: '5000',
  },
  {
    id: 3,
    product_id: '1234556',
    warehouse_name: 'Umumiy mahsulotlar',
    image: 'pikacu',
    product_name: 'A mahsulot',
    amount: '5',
    measurement: 'dona',
    price: '1000',
    total_price: '5000',
  },
  {
    id: 4,
    product_id: '1234556',
    warehouse_name: 'Umumiy mahsulotlar',
    image: 'car',
    product_name: 'A mahsulot',
    amount: '5',
    measurement: 'dona',
    price: '1000',
    total_price: '5000',
  },
  {
    id: 5,
    product_id: '1234556',
    warehouse_name: 'Umumiy mahsulotlar',
    image: 'plane',
    product_name: 'A mahsulot',
    amount: '5',
    measurement: 'dona',
    price: '1000',
    total_price: '5000',
  },
];
export default function WarehouseView() {
  const methods = useForm({
    mode: 'all',
  });

  return (
    <Container maxWidth={false}>
      <Form methods={methods}>
        <CustomBreadcrumbs
          sx={{ mb: 3 }}
          heading="Omborxona"
          links={[{ name: 'Asosiy', href: '#' }, { name: 'Omborxona' }]}
        />

        <WarehouseFilter />

        <WarehouseTable
          tableData={data}
          headLabel={[
            { id: 'index', label: '№', align: 'left', width: 10 },
            { id: 'image', label: 'Rasm', width: 40 },
            { id: 'product_id', label: 'ID', width: 40 },
            { id: 'warehouse_name', label: 'OMBORXONA NOMI', width: 340 },
            { id: 'product_name', label: 'Mahsulot nomi', width: 240 },
            { id: 'amount', label: 'Rank', align: 'center', width: 100 },
            { id: 'measurement', label: 'Rank', align: 'center', width: 100 },
            { id: 'price', label: 'Bir xirlik narxi', align: 'center', width: 110 },
            { id: 'total_price', label: 'Umumiy narxi', align: 'center', width: 110 },
          ]}
        />
      </Form>
    </Container>
  );
}
