import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';

import axios, { fetcher } from 'src/utils/axios';

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export function useGetExpenses() {
  const { data, isLoading } = useSWR('/expense', fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      expenseResults: data?.data || [],
      expenseLoading: isLoading,
    }),
    [data?.data, isLoading]
  );

  return memoizedValue;
}

export async function createExpense(name: {name: string}) {
  const res = await axios.post('/expense', name);

  mutate('/expense');
  return res.data;
}


export async function deleteExpense(id: string) {
  const res = await axios.delete(`/expense/${id}`);

  mutate('/expense');
  return res.data;
}
