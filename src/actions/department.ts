import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';

import axios, { fetcher } from 'src/utils/axios';

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export function useGetDepartments() {
  const { data, isLoading } = useSWR('/otdel', fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      departmentResults: data?.data || [],
      departmentLoading: isLoading,
    }),
    [data?.data, isLoading]
  );

  return memoizedValue;
}

export async function createDepartment(name: { name: string }) {
  const res = await axios.post('/otdel', name);

  mutate('/otdel');
  return res.data;
}

export async function deleteDepartment(id: string) {
  const res = await axios.delete(`/otdel/${id}`);

  mutate('/otdel');
  return res.data;
}

export async function editDepartment(id: string, name: { name: string }) {
  const res = await axios.put(`/otdel/${id}`, name);

  mutate('/otdel');
  return res.data;
}
