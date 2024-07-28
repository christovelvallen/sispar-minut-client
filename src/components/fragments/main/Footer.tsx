import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoYoutube,
} from 'react-icons/io5';
import Container from './Container';

export default function Footer() {
  return (
    <Container className="px-3 py-6 bg-secondary text-secbg-secondary-foreground">
      <div className="flex flex-wrap justify-between pt-6">
        <div className="w-full mb-6 md:w-1/4 md:mb-0">
          <Image
            src={'/assets/logo.png'}
            alt="logo"
            width={100}
            height={100}
            priority
            className="size-[60px] mb-4"
          />
          <h5 className="mb-4 font-bold uppercase">DISPAR MINUT</h5>
          <p className="mb-4 text-sm">
            Jln. Kantor Bupati, Sukur, Kec. Airmadidi, Kabupaten Minahasa Utara,
            Sulawesi Utara, Indonesia
          </p>
        </div>

        <div className="w-full mb-6 md:w-1/4 md:mb-0">
          <h5 className="mb-4 font-bold">Menu:</h5>
          <ul className="list-none">
            <li className="mb-2">
              <Link
                href="/direktori/objek-wisata"
                className="text-sm hover:underline"
              >
                Objek Wisata
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href="/direktori/transportasi"
                className="text-sm hover:underline"
              >
                Transportasi
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href="/direktori/akomodasi"
                className="text-sm hover:underline"
              >
                Akomodasi
              </Link>
            </li>
            <li className="mb-2">
              <Link
                href="/direktori/kuliner"
                className="text-sm hover:underline"
              >
                Kuliner
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/berita" className="text-sm hover:underline">
                Berita
              </Link>
            </li>
          </ul>
        </div>

        <div className="w-full mb-6 md:w-1/4 md:mb-0">
          <h5 className="mb-4 font-bold">Ikuti kami:</h5>
          <div className="flex gap-1">
            <Button size="icon" variant="outline">
              <IoLogoFacebook size={18} />
            </Button>
            <Button size="icon" variant="outline">
              <IoLogoYoutube size={18} />
            </Button>
            <Button size="icon" variant="outline">
              <IoLogoInstagram size={18} />
            </Button>
          </div>
        </div>
      </div>

      <div className="pt-4 mt-8 text-center border-t">
        <p>&copy; 2024 SISPAR MINUT. All rights reserved.</p>
      </div>
    </Container>
  );
}
