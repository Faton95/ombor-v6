import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';

import axios, { fetcher } from 'src/utils/axios';

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export function useGetCategories() {
  const { data, isLoading, error, isValidating } = useSWR('/category', fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      categoryResults: data?.data || [],
      categoryLoading: isLoading,
      categoryError: error,
      categoryValidating: isValidating,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export async function createCategory(name: { name: string }) {
  const res = await axios.post('/category', name);

  mutate('/category');
  return res.data;
}

export async function deleteCategory(id: string) {
  const res = await axios.delete(`/category/${id}`);

  mutate('/category');
  return res.data;
}

export async function editCategory(id: string, name: { name: string }) {
  const res = await axios.put(`/category/${id}`, name);

  mutate('/category');
  return res.data;
}
