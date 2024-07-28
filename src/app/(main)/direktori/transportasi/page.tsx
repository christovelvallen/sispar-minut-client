'use client';

import { useState } from 'react';
import { pathDirectoryPosts } from '@/lib/endpoint';
import useData from '@/hooks/useData';
import CardHero from '@/components/fragments/main/CardHero';
import Container from '@/components/fragments/main/Container';
import { Button } from '@/components/ui/button';
import DirectoryListTemplate from '@/components/templates/main/DirectoryListTemplate';
import { RotateCwIcon } from 'lucide-react';

export default function Page() {
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(9);

  const { data, error, isLoading } = useData(
    pathDirectoryPosts({
      category: 'transportasi',
      pageIndex,
      pageSize,
    })
  );

  return (
    <Container>
      <div className="p-3">
        <CardHero
          title="Transportasi"
          description="Temukan Transportasi yang ada di Minahasa Utara"
          imgUrl="/assets/draw-transportasi.svg"
        />

        {isLoading ? (
          <div className="flex items-center justify-center gap-2 py-3">
            <RotateCwIcon className="w-4 h-4 animate-spin" /> Loading
          </div>
        ) : (
          <>
            <DirectoryListTemplate data={data.data} />
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
