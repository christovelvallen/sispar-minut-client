'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import useData from '@/hooks/useData';
import { EllipsisIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CardAdmin() {
  const router = useRouter();

  const { data, error, isLoading } = useData('/api/users');

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <Avatar className="border bg-background">
          <AvatarFallback className="bg-background">A</AvatarFallback>
        </Avatar>
        <div
          onClick={() => router.push('/admin/pengaturan')}
          className="cursor-pointer select-none"
        >
          <p className="text-sm font-medium leading-tight">Admin</p>
          <p className="text-sm leading-tight line-clamp-1">
            {isLoading ? '-' : data[0]?.username || '-'}
          </p>
        </div>
      </div>
      <div>
        <Button
          onClick={() => router.push('/admin/pengaturan')}
          variant="ghost"
          size="icon"
          className="text-muted-foreground"
        >
          <EllipsisIcon />
        </Button>
      </div>
    </div>
  );
}
