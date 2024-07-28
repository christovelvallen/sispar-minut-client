'use client';

import Breadcrumb from '@/components/fragments/admin/Breadcrumb';
import { Button } from '@/components/ui/button';
import useData from '@/hooks/useData';
import { deleteCookies } from '@/lib/cookies';
import { RotateCwIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Page() {
  const [reloadSubmit, setReloadSubmit] = useState(false);
  const router = useRouter();

  const { data, error, isLoading } = useData('/api/users');

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleLogout = async () => {
    setReloadSubmit(true);
    await deleteCookies({ name: 'userId' });
    await deleteCookies({ name: 'token' });
    setReloadSubmit(false);
    router.replace('/beranda');
  };

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
    <div className="flex flex-col p-3 lg:p-6">
      <Breadcrumb title="Data Akun" path="/ Akun" />

      <div className="flex flex-col items-start gap-3 py-6">
        <div className="w-full max-w-sm p-3 bg-secondary rounded-xl">
          <p className="text-sm text-muted-foreground">Username</p>
          <p className="pl-2 mt-1 border-l-2">{data[0]?.username}</p>
        </div>
        <div className="w-full max-w-sm p-3 bg-secondary rounded-xl">
          <p className="text-sm text-muted-foreground">Email</p>
          <p className="pl-2 mt-1 border-l-2">{data[0]?.email}</p>
        </div>
        <div className="w-full max-w-sm p-3 bg-secondary rounded-xl">
          <p className="text-sm text-muted-foreground">Tanggal dibuat</p>
          <p className="pl-2 mt-1 border-l-2">
            {convertDate(data[0]?.createdAt)}
          </p>
        </div>
      </div>

      <div>
        <Button
          onClick={handleLogout}
          disabled={reloadSubmit ? true : false}
          variant="secondary"
          className="text-red-500"
        >
          <RotateCwIcon
            className={`${
              reloadSubmit ? '' : 'hidden'
            } mr-2 h-4 w-4 animate-spin`}
          />
          Keluar akun
        </Button>
      </div>
    </div>
  );
}
