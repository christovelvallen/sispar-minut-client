'use client';

import { useState } from 'react';
import useData from '@/hooks/useData';
import DataPagination from '@/components/fragments/admin/DataPagination';
import { pathNewsAllPosts } from '@/lib/endpoint';
import { RotateCwIcon } from 'lucide-react';
import Breadcrumb from '@/components/fragments/admin/Breadcrumb';
import BeritaDataTableTemplate from '@/components/templates/admin/BeritaDataTableTemplate';

export default function Page() {
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, error, isLoading } = useData(
    pathNewsAllPosts({
      pageIndex,
      pageSize,
    })
  );

  return (
    <div className="flex flex-col gap-3 p-3 lg:p-6">
      <Breadcrumb title="Berita" path="/ Postingan" />

      {!isLoading ? (
        <div className="flex flex-col gap-3">
          <BeritaDataTableTemplate
            data={data.data}
            route={{
              read: '/details/berita',
              create: '/admin/buat/berita',
              update: '/admin/edit/berita',
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
