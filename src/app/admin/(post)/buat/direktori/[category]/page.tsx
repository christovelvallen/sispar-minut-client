'use client';

import { RotateCwIcon } from 'lucide-react';
import DataForm from '@/components/fragments/admin/DataForm';
import useData from '@/hooks/useData';
import { pathDirectoryCategory } from '@/lib/endpoint';
import Breadcrumb from '@/components/fragments/admin/Breadcrumb';

export default function Page({ params }: { params: { category: string } }) {
  const { data, error, isLoading } = useData(
    pathDirectoryCategory({
      category: params.category,
    })
  );

  return (
    <div className="flex flex-col gap-3 p-3 lg:p-6">
      <Breadcrumb title="Buat data baru" path="/ Direktori / Objek Wisata" />

      {!isLoading ? (
        data.data.length !== 0 ? (
          <div className="flex flex-col gap-3">
            <DataForm categoryId={data.data[0].id} />
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
