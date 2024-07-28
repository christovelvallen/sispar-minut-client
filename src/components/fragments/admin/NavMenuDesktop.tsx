'use client';

import { Button } from '@/components/ui/button';
import {
  BusIcon,
  CompassIcon,
  HotelIcon,
  NewspaperIcon,
  UtensilsIcon,
} from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import CardAdmin from './CardAdmin';

const items = [
  {
    title: 'Direktori',
    menus: [
      {
        name: 'Objek Wisata',
        href: '/admin/direktori/objek-wisata',
        icon: CompassIcon,
      },
      {
        name: 'Akomodasi',
        href: '/admin/direktori/akomodasi',
        icon: HotelIcon,
      },
      {
        name: 'Transportasi',
        href: '/admin/direktori/transportasi',
        icon: BusIcon,
      },
      { name: 'Kuliner', href: '/admin/direktori/kuliner', icon: UtensilsIcon },
    ],
  },
  {
    title: 'Postingan',
    menus: [{ name: 'Berita', href: '/admin/berita', icon: NewspaperIcon }],
  },
];

export default function NavMenuDesktop() {
  const router = useRouter();
  const path = usePathname();

  return (
    <div className="sticky top-0 left-0 w-full h-screen max-w-xs border-r bg-secondary max-lg:hidden">
      <div className="flex flex-col w-full h-full">
        <div className="flex items-center gap-3 p-3 border-b">
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
            <span className="font-bold leading-tight">ADMIN PANEL</span>
            <span className="text-[10px] font-bold leading-tight">
              SISPAR Kab. Minahasa Utara
            </span>
          </div>
        </div>

        <div className="flex flex-col h-full gap-3 p-6 overflow-auto">
          {items?.map((item, index) => (
            <div key={index}>
              <p className="text-sm font-medium">{item.title}</p>
              <div className="flex flex-col mt-1.5 border-l">
                {item.menus?.map((menu, index) => (
                  <div key={index}>
                    <Button
                      onClick={() => router.push(menu.href)}
                      variant="ghost"
                      className={`${
                        path === menu.href ? '' : 'text-muted-foreground'
                      } justify-start gap-3 font-medium px-3 hover:font-semibold hover:text-foreground`}
                    >
                      <menu.icon size={18} />
                      <div>{menu.name}</div>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 border-t">
          <CardAdmin />
        </div>
      </div>
    </div>
  );
}
