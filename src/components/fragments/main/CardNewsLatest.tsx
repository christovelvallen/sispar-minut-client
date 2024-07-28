'use client';

import Image from 'next/image';
import { getApiUrl } from '@/lib/services';
import { useRouter } from 'next/navigation';

export default function CardNewsLatest({ data }: { data: any }) {
  const router = useRouter();

  if (data.data === null) {
    return null;
  }

  return (
    <>
      <div
        onClick={() => router.push(`/details/berita/${data?.data[0].id}`)}
        className="w-full h-[400px] cursor-pointer relative rounded-lg overflow-hidden"
      >
        <Image
          src={getApiUrl(data?.data[0]?.attributes.image.data?.attributes.url)}
          alt=""
          width={200}
          height={200}
          priority
          className="object-cover w-full h-full transition-all hover:scale-105"
        />

        <div className="absolute left-0 bottom-0 w-full py-3 px-4 grid grid-cols-1 items-center bg-gray-950/50 text-white h-[100px]">
          <p className="text-xl font-bold leading-tight text-red-500">
            Berita Terbaru
          </p>
          <p className="text-2xl font-bold leading-tight line-clamp-2">
            {data?.data[0]?.attributes.title}
          </p>
        </div>
      </div>
    </>
  );
}
