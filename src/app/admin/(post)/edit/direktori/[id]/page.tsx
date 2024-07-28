'use client';

import { RotateCwIcon } from 'lucide-react';
import useData from '@/hooks/useData';
import { pathDirectoryById } from '@/lib/endpoint';
import DataFormEdit from '@/components/fragments/admin/DataFormEdit';
import Breadcrumb from '@/components/fragments/admin/Breadcrumb';

export default function Page({ params }: { params: { id: string } }) {
  const { data, error, isLoading } = useData(
    pathDirectoryById({ id: params.id })
  );

  return (
    <div className="flex flex-col gap-3 p-3 lg:p-6">
      <Breadcrumb title="Edit data" path={`/ Direktori / ${params.id}`} />

      {!isLoading ? (
        data.data.length !== 0 ? (
          <div className="flex flex-col gap-3">
            <DataFormEdit data={data.data} />
          </div>
        ) : null
      ) : (
        <div className="flex items-center gap-2 py-3">
          <RotateCwIcon className="w-4 h-4 animate-spin" /> Loading
        </div>
      )}
    </div>
  );
}
