'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
  BusIcon,
  CompassIcon,
  HomeIcon,
  HotelIcon,
  NewspaperIcon,
  UtensilsIcon,
} from 'lucide-react';
import Container from './Container';

const items = [
  { name: 'Beranda', href: '/beranda', icon: HomeIcon },
  { name: 'Objek Wisata', href: '/direktori/objek-wisata', icon: CompassIcon },
  { name: 'Transportasi', href: '/direktori/transportasi', icon: BusIcon },
  { name: 'Akomodasi', href: '/direktori/akomodasi', icon: HotelIcon },
  { name: 'Kuliner', href: '/direktori/kuliner', icon: UtensilsIcon },
  { name: 'Berita', href: '/berita', icon: NewspaperIcon },
];

export default function NavMenuDesktop() {
  const path = usePathname();
  const router = useRouter();

  return (
    <Container className="border-b bg-secondary max-lg:hidden">
      <div className="flex w-full px-3 h-14">
        {items?.map((item, index) => (
          <div
            key={index}
            className={`${
              path === item.href ? 'border-destructive' : 'border-none'
            } border-b-2 flex-1 py-1.5 h-full`}
          >
            <div
              onClick={() => router.push(item.href)}
              className={`${
                path === item.href ? '' : 'hover:bg-destructive/5 rounded-xl'
              } flex items-center justify-center gap-3 w-full h-full cursor-pointer select-none`}
            >
              <div>
                <item.icon size={20} />
              </div>
              <span className="text-sm font-medium">{item.name}</span>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
