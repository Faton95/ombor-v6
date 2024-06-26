import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';

import axios, { fetcher } from 'src/utils/axios';

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export function useGetStatusses() {
  const { data, isLoading } = useSWR('/status', fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      statusResults: data?.data || [],
      statusLoading: isLoading,
    }),
    [data?.data, isLoading]
  );

  return memoizedValue;
}

export async function createStatus(name: { name: string }) {
  const res = await axios.post('/status', name);

  mutate('/status');
  return res.data;
}

export async function deleteStatus(id: string) {
  const res = await axios.delete(`/status/${id}`);

  mutate('/status');
  return res.data;
}
