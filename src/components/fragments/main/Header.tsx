'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Container from './Container';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import ToggleTheme from './ToggleTheme';
import NavMenuMobile from './NavMenuMobile';
import NavMenuDesktop from './NavMenuDesktop';
export default function Header() {
  const router = useRouter();

  return (
    <div>
      <Container>
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-3">
            <NavMenuMobile />
            <Image
              src={'/assets/logo.png'}
              alt="logo"
              width={100}
              height={100}
              priority
              className="size-[40px]"
            />
            <div className="flex flex-col select-none max-lg:hidden">
              <span className="text-sm font-bold leading-tight">
                Sistem Informasi Pariwisata
              </span>
              <span className="text-sm font-bold leading-tight">
                Kabupaten Minahasa Utara
              </span>
            </div>
            <div className="flex flex-col select-none lg:hidden">
              <span className="font-bold leading-tight">SISPAR</span>
              <span className="text-[10px] font-bold leading-tight">
                Kab. Minahasa Utara
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ToggleTheme />
            <Separator orientation="vertical" className="h-5 max-lg:hidden" />
            <Button
              onClick={() => router.push('/admin/dashboard')}
              className="max-lg:hidden"
            >
              Masuk
            </Button>
          </div>
        </div>
      </Container>
      <NavMenuDesktop />
    </div>
  );
}
