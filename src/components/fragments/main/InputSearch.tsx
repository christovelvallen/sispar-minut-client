'use client';

import { Input } from '@/components/ui/input';

export default function InputSearch({
  onChange,
}: {
  onChange: (e: string) => void;
}) {
  return (
    <div className="flex w-full max-w-xl gap-1 p-3 mx-auto">
      <Input
        onChange={(e) => onChange(e.target.value)}
        type="search"
        placeholder="Cari disini..."
        className="w-full"
      />
    </div>
  );
}
