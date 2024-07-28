'use client';

import { getApiUrl } from '@/lib/services';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function CardDirectory({ item }: { item: any }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/details/direktori/${item.id}`)}
      className="max-w-[300px] hover:shadow-2xl hover:text-primary cursor-pointer w-full shadow-sm border rounded-xl flex flex-col overflow-hidden"
    >
      <div className="w-full h-[200px]">
        <Image
          src={getApiUrl(item.attributes.image.data?.attributes.url)}
          alt=""
          width={200}
          height={200}
          priority
          className="object-cover w-full h-full transition-all hover:scale-105"
        />
      </div>
      <div className="p-3">
        <p className="text-lg font-medium leading-tight line-clamp-2">
          {item.attributes.title}
        </p>
        <p className="text-sm font-medium text-muted-foreground line-clamp-1">
          {item.attributes.address}
        </p>
      </div>
    </div>
  );
}
