import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';

import axios, { fetcher } from 'src/utils/axios';

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export function useGetProducts() {
  const { data, isLoading } = useSWR('/product', fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      productResults: data?.data || [],
      productLoading: isLoading,
    }),
    [data?.data, isLoading]
  );

  return memoizedValue;
}

export async function createProduct(name: { name: string }) {
  const res = await axios.post('/product', name);

  mutate('/product');
  return res.data;
}

export async function deleteProduct(id: string) {
  const res = await axios.delete(`/product/${id}`);

  mutate('/product');
  return res.data;
}

type DataProducts = {
  category?: string;
  name?: string;
  measure?: string;
};
export async function editProducts(dataProducts: DataProducts, id?: string) {
  const res = await axios.put(`/product/${id}`, dataProducts);

  mutate('/product');
  return res.data;
}
