'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ParamsType = {
  title: string;
  path: string;
};

export default function Breadcrumb({ title, path }: ParamsType) {
  const router = useRouter();

  return (
    <div>
      <div>
        <Button
          onClick={() => router.back()}
          variant="light"
          className="justify-start gap-3 px-0"
        >
          <ArrowLeftIcon /> Kembali
        </Button>
      </div>
      <div className="pt-3">
        <p className="text-sm text-muted-foreground">{path}</p>
        <p className="pt-1 text-3xl font-bold">{title}</p>
      </div>
    </div>
  );
}
