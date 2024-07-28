'use client';

import { pathDirectory, pathNewsLatest, pathNewsPosts } from '@/lib/endpoint';
import useData from '@/hooks/useData';
import Container from '@/components/fragments/main/Container';
import { RotateCwIcon } from 'lucide-react';
import CardNews from './CardNews';
import CardDirectory from './CardDirectory';
import CardNewsLatest from './CardNewsLatest';

export default function Higlights() {
  const newsLatest = useData(pathNewsLatest());

  const posts = useData(
    pathNewsPosts({
      pageIndex: 1,
      pageSize: 2,
    })
  );

  const directories = useData(
    pathDirectory({
      pageIndex: 1,
      pageSize: 4,
    })
  );

  return (
    <Container>
      <div className="p-3">
        {posts.isLoading || directories.isLoading || newsLatest.isLoading ? (
          <div className="flex items-center justify-center gap-2 py-3">
            <RotateCwIcon className="w-4 h-4 animate-spin" /> Loading
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <CardNewsLatest data={newsLatest.data} />
            <p className="mt-3 text-lg font-medium text-muted-foreground">
              Postingan Terakhir
            </p>
            <div className="grid grid-cols-1 gap-3">
              {posts.data?.data?.map((item: any, index: number) => (
                <CardNews key={index} item={item} />
              ))}
            </div>
            <div className="grid justify-center grid-cols-4 gap-3 pb-6 max-lg:grid-cols-1">
              {directories.data?.data?.map((item: any, index: number) => (
                <CardDirectory key={index} item={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
