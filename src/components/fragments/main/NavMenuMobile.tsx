'use client';

import { useRouter } from 'next/navigation';
import {
  BusIcon,
  CompassIcon,
  HomeIcon,
  HotelIcon,
  MenuIcon,
  NewspaperIcon,
  UtensilsIcon,
} from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

const items = [
  { name: 'Beranda', href: '/beranda', icon: HomeIcon },
  { name: 'Objek Wisata', href: '/direktori/objek-wisata', icon: CompassIcon },
  { name: 'Transportasi', href: '/direktori/transportasi', icon: BusIcon },
  { name: 'Akomodasi', href: '/direktori/akomodasi', icon: HotelIcon },
  { name: 'Kuliner', href: '/direktori/kuliner', icon: UtensilsIcon },
  { name: 'Berita', href: '/berita', icon: NewspaperIcon },
];

export default function NavMenuMobile() {
  const router = useRouter();

  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <MenuIcon size={28} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader className="text-left">
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription>{''}</SheetDescription>
          </SheetHeader>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3 pl-3 border-l">
              {items?.map((item, index) => (
                <SheetClose key={index} asChild>
                  <Button
                    onClick={() => router.push(item.href)}
                    type="submit"
                    variant="ghost"
                    className="justify-start gap-3 pl-0 pr-3"
                  >
                    <div>
                      <item.icon size={20} />
                    </div>
                    <span className="text-sm font-medium">{item.name}</span>
                  </Button>
                </SheetClose>
              ))}
            </div>
            <Button onClick={() => router.push('/admin/dashboard')}>
              Masuk
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
