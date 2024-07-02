import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';

import axios, { fetcher } from 'src/utils/axios';

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export function useGetCustomer() {
  const { data, isLoading } = useSWR('/customer', fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      customerResults: data?.data || [],
      customerLoading: isLoading,
    }),
    [data?.data, isLoading]
  );

  return memoizedValue;
}

export async function createCustomer(name: { name: string }) {
  const res = await axios.post('/customer', name);

  mutate('/customer');
  return res.data;
}

export async function deleteCustomer(id: string) {
  const res = await axios.delete(`/customer/${id}`);

  mutate('/customer');
  return res.data;
}

type DataCustomer = {
  phone: string;
  name: string;
  organization: string;
};
export async function editCustomer(dataCustomer: DataCustomer, id?: string) {
  const res = await axios.put(`/customer/${id}`, dataCustomer);

  mutate('/customer');
  return res.data;
}
