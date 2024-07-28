'use client';

import { useState } from 'react';
import useData from '@/hooks/useData';
import DataPagination from '@/components/fragments/admin/DataPagination';
import { pathDirectoryAllPost } from '@/lib/endpoint';
import { RotateCwIcon } from 'lucide-react';
import DirectoryDataTableTemplate from '@/components/templates/admin/DirectoryDataTableTemplate';
import Breadcrumb from '@/components/fragments/admin/Breadcrumb';

export default function Page() {
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, error, isLoading } = useData(
    pathDirectoryAllPost({
      category: 'akomodasi',
      pageIndex,
      pageSize,
    })
  );

  return (
    <div className="flex flex-col gap-3 p-3 lg:p-6">
      <Breadcrumb title="Akomodasi" path="/ Direktori" />

      {!isLoading ? (
        <div className="flex flex-col gap-3">
          <DirectoryDataTableTemplate
            data={data.data}
            route={{
              read: '/details/direktori',
              create: '/admin/buat/direktori/akomodasi',
              update: '/admin/edit/direktori',
            }}
          />
          <DataPagination
            pageTotal={data.meta.pagination.pageCount}
            pageIndex={data.meta.pagination.page}
            setPageIndex={(e) => setPageIndex(e)}
          />
        </div>
      ) : (
        <div className="flex items-center gap-2 py-3">
          <RotateCwIcon className="w-4 h-4 animate-spin" /> Loading
        </div>
      )}
    </div>
  );
}
