import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';

import axios, { fetcher } from 'src/utils/axios';

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export function useGetMeasurements() {
  const { data, isLoading, error, isValidating } = useSWR('/measure', fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      measurementsResults: data?.data || [],
      measurementsLoading: isLoading,
      measurementsError: error,
      measurementsValidating: isValidating,
    }),
    [data?.data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export async function createMeasurements(name: { name: string }) {
  const res = await axios.post('/measure', name);

  mutate('/measure');
  return res.data;
}

export async function deleteMeasurements(id: string) {
  const res = await axios.delete(`/measure/${id}`);

  mutate('/measure');
  return res.data;
}

export async function editMeasurements(id: string, name: { name: string }) {
  const res = await axios.put(`/measure/${id}`, name);

  mutate('/measure');
  return res.data;
}
