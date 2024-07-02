import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';

import axios, { fetcher } from 'src/utils/axios';

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export function useGetSuppliers() {
  const { data, isLoading } = useSWR('/suplier', fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      supplierResults: data?.data || [],
      supplierLoading: isLoading,
    }),
    [data?.data, isLoading]
  );

  return memoizedValue;
}

export async function createSupplier(name: { name: string }) {
  const res = await axios.post('/suplier', name);

  mutate('/suplier');
  return res.data;
}

export async function deleteSupplier(id: string) {
  const res = await axios.delete(`/suplier/${id}`);

  mutate('/suplier');
  return res.data;
}

type DataSupplier = {
  phone: string;
  name: string;
  address: string;
};
export async function editSupplier(dataSupplier: DataSupplier, id?: string) {
  const res = await axios.put(`/suplier/${id}`, dataSupplier);

  mutate('/suplier');
  return res.data;
}
