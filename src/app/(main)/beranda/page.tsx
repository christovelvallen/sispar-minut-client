'use client';

import { useRouter } from 'next/navigation';
import { BusIcon, CompassIcon, HotelIcon, UtensilsIcon } from 'lucide-react';
import Container from '@/components/fragments/main/Container';
import { Button } from '@/components/ui/button';

export default function Page() {
  const router = useRouter();

  return (
    <div>
      <div
        className={`bg-[url('/assets/banner.jpeg')] bg-cover bg-no-repeat bg-center w-full h-[500px] flex flex-col justify-center items-center overflow-hidden cursor-pointer p-3`}
      >
        <div className="grid items-center grid-cols-1 p-3 text-center text-white shadow bg-gray-950/20 rounded-2xl">
          <p className="text-2xl font-bold lg:text-4xl">
            Selamat Datang di Pusat Informasi Pariwisata <br /> Kabupaten
            Minahasa Utara
          </p>
        </div>
        <div className="mt-6">
          <Button
            onClick={() => router.push('/direktori/objek-wisata')}
            variant="secondary"
            size="lg"
            className="px-6"
          >
            Jelajahi
          </Button>
        </div>
      </div>

      <Container>
        <div className="px-3 py-12">
          <h1 className="text-3xl font-bold text-center">Direktori</h1>
          <div className="grid grid-cols-1 gap-3 mt-6 lg:grid-cols-4">
            <div className="flex flex-col items-center justify-center w-full max-w-xs gap-3 p-3 mx-auto border shadow-sm rounded-xl">
              <CompassIcon size={80} />
              <p className="text-lg font-medium">Objek Wisata</p>
              <Button
                onClick={() => router.push('/direktori/objek-wisata')}
                variant="outline"
              >
                Jelajahi
              </Button>
            </div>
            <div className="flex flex-col items-center justify-center w-full max-w-xs gap-3 p-3 mx-auto border shadow-sm rounded-xl">
              <BusIcon size={80} />
              <p className="text-lg font-medium">Transportasi</p>
              <Button
                onClick={() => router.push('/direktori/transportasi')}
                variant="outline"
              >
                Jelajahi
              </Button>
            </div>
            <div className="flex flex-col items-center justify-center w-full max-w-xs gap-3 p-3 mx-auto border shadow-sm rounded-xl">
              <HotelIcon size={80} />
              <p className="text-lg font-medium">Akomodasi</p>
              <Button
                onClick={() => router.push('/direktori/akomodasi')}
                variant="outline"
              >
                Jelajahi
              </Button>
            </div>
            <div className="flex flex-col items-center justify-center w-full max-w-xs gap-3 p-3 mx-auto border shadow-sm rounded-xl">
              <UtensilsIcon size={80} />
              <p className="text-lg font-medium">Kuliner</p>
              <Button
                onClick={() => router.push('/direktori/kuliner')}
                variant="outline"
              >
                Jelajahi
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
