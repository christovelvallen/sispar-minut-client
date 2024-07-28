'use client';

import Image from 'next/image';
import ToggleTheme from '../main/ToggleTheme';
import NavMenuMobile from './NavMenuMobile';
import { useRouter } from 'next/navigation';

export default function HeaderMobile() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between p-3 border-b lg:hidden">
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
        <div
          onClick={() => router.push('/admin/dashboard')}
          className="flex flex-col cursor-pointer select-none"
        >
          <span className="font-bold leading-tight line-clamp-1">
            ADMIN PANEL
          </span>
          <span className="text-[10px] font-bold leading-tight line-clamp-1">
            SISPAR Kab. Minahasa Utara
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <ToggleTheme />
      </div>
    </div>
  );
}
