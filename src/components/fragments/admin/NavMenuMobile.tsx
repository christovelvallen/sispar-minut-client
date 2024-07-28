'use client';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  BusIcon,
  CompassIcon,
  HotelIcon,
  MenuIcon,
  NewspaperIcon,
  UtensilsIcon,
} from 'lucide-react';
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

export default function NavMenuMobile() {
  const router = useRouter();
  const path = usePathname();

  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <MenuIcon size={28} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-secondary">
          <SheetHeader className="text-left">
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription>{''}</SheetDescription>
          </SheetHeader>

          <div className="flex flex-col gap-3 pt-3">
            {items?.map((item, index) => (
              <div key={index}>
                <p className="text-sm font-medium">{item.title}</p>
                <div className="flex flex-col mt-1.5 border-l">
                  {item.menus?.map((menu, index) => (
                    <SheetClose key={index} asChild>
                      <Button
                        onClick={() => router.push(menu.href)}
                        variant="ghost"
                        className={`${
                          path === menu.href ? '' : 'text-muted-foreground'
                        } justify-start gap-3 px-3 hover:font-semibold hover:text-foreground`}
                      >
                        <menu.icon size={18} />
                        <div>{menu.name}</div>
                      </Button>
                    </SheetClose>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 ">
            <CardAdmin />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
