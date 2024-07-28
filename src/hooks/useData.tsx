'use client';

import useSWR from 'swr';
import { fetcher } from '@/lib/services';

export default function useData(endpoint: string) {
  const { data, error, isLoading } = useSWR(endpoint, fetcher);
  return { data, error, isLoading };
}
