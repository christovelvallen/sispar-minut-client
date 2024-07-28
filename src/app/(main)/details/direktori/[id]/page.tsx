'use client';

import Image from 'next/image';
import useData from '@/hooks/useData';
import { pathDirectoryById } from '@/lib/endpoint';
import { getApiUrl } from '@/lib/services';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Container from '@/components/fragments/main/Container';
import Link from 'next/link';

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();

  const { data, error, isLoading } = useData(
    pathDirectoryById({ id: params.id })
  );

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

      {data.data ? (
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
          <div className="pl-3 border-l-2">
            <p className="font-medium">Alamat</p>
            <p>
              {data.data.attributes.address
                ? data.data.attributes.address
                : '-'}
            </p>
          </div>
          <div className="pl-3 border-l-2">
            <p className="font-medium">Lokasi</p>
            {data.data.attributes.location ? (
              <Link
                href={data.data.attributes.location}
                className="underline text-primary text-wrap"
              >
                {data.data.attributes.location}
              </Link>
            ) : (
              <p>-</p>
            )}
          </div>
          <div className="pl-3 border-l-2">
            <p className="font-medium">Jam Buka</p>
            <p>
              {data.data.attributes.opening_hours
                ? data.data.attributes.opening_hours
                : '-'}
            </p>
          </div>
          <div className="pl-3 border-l-2">
            <p className="font-medium">Tarif Harga</p>
            <p>
              {data.data.attributes.price_rates
                ? data.data.attributes.price_rates
                : '-'}
            </p>
          </div>
        </div>
      ) : (
        <p className="p-3">data tidak ditemukan!</p>
      )}
    </Container>
  );
}
