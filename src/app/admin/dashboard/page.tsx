'use client';

import {
  BusIcon,
  CompassIcon,
  HotelIcon,
  NewspaperIcon,
  UtensilsIcon,
} from 'lucide-react';
import CardHero from '@/components/fragments/main/CardHero';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import useData from '@/hooks/useData';

export default function Page() {
  const router = useRouter();

  const newsData = useData('/api/news-posts');
  const directoryData = useData('/api/directories?populate=*');

  if (newsData.isLoading || directoryData.isLoading) {
    return <p>Loading...</p>;
  }

  const getTotal = (name: string) => {
    const data = directoryData.data?.data?.filter(
      (item: any) => item.attributes.name === name
    );

    return data[0]?.attributes.directory_posts?.data.length;
  };

  const totalWisata = getTotal('objek-wisata');
  const totalAkomodasi = getTotal('akomodasi');
  const totalKuliner = getTotal('kuliner');
  const totalTranposrtasi = getTotal('transportasi');

  return (
    <div className="p-3 lg:p-6">
      <div className="pb-3">
        <Button onClick={() => router.push('/beranda')} variant="outline">
          Kembali ke website
        </Button>
      </div>

      <CardHero
        title="Admin Panel"
        description="Sistem Informasi Pariwisata Kabupaten Minahasa Utara"
        imgUrl="/assets/draw-objek-wisata.svg"
      />

      <div className="pt-6 pb-12">
        <h1 className="text-xl font-bold max-lg:text-center">Statistik data</h1>
        <div className="grid grid-cols-1 gap-3 mt-6 lg:grid-cols-3">
          <div className="flex flex-col items-center justify-center w-full max-w-xs gap-3 p-3 mx-auto border shadow-sm rounded-xl">
            <CompassIcon size={60} />
            <p className="font-medium">Objek Wisata</p>
            <p className="text-2xl font-bold">{totalWisata}</p>
          </div>
          <div className="flex flex-col items-center justify-center w-full max-w-xs gap-3 p-3 mx-auto border shadow-sm rounded-xl">
            <BusIcon size={60} />
            <p className="font-medium">Transportasi</p>
            <p className="text-2xl font-bold">{totalTranposrtasi}</p>
          </div>
          <div className="flex flex-col items-center justify-center w-full max-w-xs gap-3 p-3 mx-auto border shadow-sm rounded-xl">
            <HotelIcon size={60} />
            <p className="font-medium">Akomodasi</p>
            <p className="text-2xl font-bold">{totalAkomodasi}</p>
          </div>
          <div className="flex flex-col items-center justify-center w-full max-w-xs gap-3 p-3 mx-auto border shadow-sm rounded-xl">
            <UtensilsIcon size={60} />
            <p className="font-medium">Kuliner</p>
            <p className="text-2xl font-bold">{totalKuliner}</p>
          </div>
          <div className="flex flex-col items-center justify-center w-full max-w-xs gap-3 p-3 mx-auto border shadow-sm rounded-xl">
            <NewspaperIcon size={60} />
            <p className="font-medium">Berita</p>
            <p className="text-2xl font-bold">{newsData.data?.data?.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
