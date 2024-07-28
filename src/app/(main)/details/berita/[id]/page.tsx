'use client';

import Image from 'next/image';
import useData from '@/hooks/useData';
import { pathNewsById } from '@/lib/endpoint';
import { getApiUrl } from '@/lib/services';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Container from '@/components/fragments/main/Container';
import Markdown from 'react-markdown';

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();

  const { data, error, isLoading } = useData(pathNewsById({ id: params.id }));

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <div className="p-3">
        <Button
          onClick={() => router.back()}
          variant="outline"
          className="justify-start gap-3 px-3"
        >
          <ArrowLeftIcon /> Kembali
        </Button>
      </div>

      <div className="flex flex-col w-full max-w-4xl gap-6 p-3 mx-auto">
        <div className="w-full h-[200px] lg:h-[400px]">
          {data.data.attributes.image.data ? (
            <Image
              src={getApiUrl(data.data.attributes.image.data?.attributes.url)}
              alt=""
              width={400}
              height={400}
              priority
              className="object-cover w-full h-full rounded-xl"
            />
          ) : null}
        </div>

        <div>
          <h1 className="text-2xl font-medium">
            {data.data.attributes.title ? data.data.attributes.title : '-'}
          </h1>
          <p>
            {data.data.attributes.description
              ? data.data.attributes.description
              : '-'}
          </p>
        </div>
        <hr />
        <div>
          <Markdown className="space-y-3">
            {data.data.attributes.content ? data.data.attributes.content : '-'}
          </Markdown>
        </div>
        <div className="pl-3 border-l-2">
          <p className="font-medium">Tags</p>
          <p className="text-sm">
            {data.data.attributes.tags ? data.data.attributes.tags : '-'}
          </p>
        </div>
      </div>
    </Container>
  );
}
