'use client';

import { useState } from 'react';
import { pathNewsPosts } from '@/lib/endpoint';
import useData from '@/hooks/useData';
import CardHero from '@/components/fragments/main/CardHero';
import Container from '@/components/fragments/main/Container';
import { Button } from '@/components/ui/button';
import NewsListTemplate from '@/components/templates/main/NewsListTemplate';
import { RotateCwIcon } from 'lucide-react';

export default function Page() {
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(9);

  const { data, error, isLoading } = useData(
    pathNewsPosts({
      pageIndex,
      pageSize,
    })
  );

  return (
    <Container>
      <div className="p-3">
        <CardHero
          title="Berita"
          description="Pusat Informasi Berita di Minahasa Utara"
          imgUrl="/assets/draw-berita.svg"
        />

        {isLoading ? (
          <div className="flex items-center justify-center gap-2 py-3">
            <RotateCwIcon className="w-4 h-4 animate-spin" /> Loading
          </div>
        ) : (
          <>
            <NewsListTemplate data={data.data} />
            {pageSize < data.meta.pagination.total ? (
              <div className="flex justify-center py-6">
                <Button onClick={() => setPageSize(pageSize + 3)}>
                  Lihat lainnya
                </Button>
              </div>
            ) : null}
          </>
        )}
      </div>
    </Container>
  );
}
