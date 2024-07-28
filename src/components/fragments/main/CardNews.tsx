'use client';

import { useRouter } from 'next/navigation';
import { getApiUrl } from '@/lib/services';
import Image from 'next/image';

export default function CardNews({ item }: { item: any }) {
  const router = useRouter();

  const convertDate = (value: string) => {
    const dateObject = new Date(value);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return dateObject.toLocaleDateString('id-ID', options);
  };

  return (
    <div
      onClick={() => router.push(`/details/berita/${item.id}`)}
      className="flex gap-3 p-3 border rounded-xl"
    >
      <div className="size-[100px] lg:size-[200px] rounded-lg overflow-hidden">
        <Image
          src={getApiUrl(item.attributes.image.data?.attributes.url)}
          alt=""
          width={200}
          height={200}
          priority
          className="object-cover w-full h-full transition-all hover:scale-105"
        />
      </div>

      <div className="flex-1">
        <p className="pb-1 text-xs lg:text-sm text-foreground/50">
          {convertDate(item.attributes.createdAt)}
        </p>

        <h3 className="text-base font-semibold leading-tight cursor-pointer lg:text-2xl line-clamp-2 hover:text-primary lg:pr-32">
          {item.attributes.title}
        </h3>

        <p className="pt-1 text-sm leading-tight lg:pr-32 lg:pt-3 line-clamp-2 lg:line-clamp-3 lg:text-base">
          {item.attributes.description ? item.attributes.description : '-'}
        </p>
      </div>
    </div>
  );
}
