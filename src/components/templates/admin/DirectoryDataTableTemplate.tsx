'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { EyeIcon, PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';
import DialogDeleteData from '@/components/fragments/admin/DialogDeleteData';

export default function DirectoryDataTableTemplate({
  data,
  route,
}: {
  data: any[];
  route: { read: string; create: string; update: string };
}) {
  const [items, setItems] = useState<any[]>(data);
  const [search, setSearch] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    if (search === '') {
      setItems(data);
    } else {
      const res = data.filter((item) =>
        item.attributes.title.toLowerCase().includes(search.toLowerCase())
      );
      setItems(res);
    }
  }, [data, search]);

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
    <div className="flex flex-col w-full gap-3">
      <div className="flex items-center gap-3">
        <div>
          <Button
            onClick={() => router.push(route.create)}
            className="justify-start gap-2 px-3"
          >
            <PlusIcon size={18} />
            <span className="max-lg:hidden">Buat data baru</span>
          </Button>
        </div>
        <div className="flex-1">
          <Input
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            placeholder="Cari disini..."
            className="w-full"
          />
        </div>
      </div>

      <div className="w-full overflow-auto border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-3">No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items?.map((item: any, index) => (
              <TableRow key={item.id}>
                <TableCell className="pl-3">{++index}</TableCell>
                <TableCell>
                  <p className="line-clamp-1">{item.attributes.title}</p>
                </TableCell>
                <TableCell>
                  <p className="line-clamp-1">
                    {convertDate(item.attributes.createdAt)}
                  </p>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={`${
                      item.attributes.publish
                        ? 'text-green-500 border'
                        : 'text-red-500 border'
                    }`}
                  >
                    {item.attributes.publish ? 'Publish' : 'Unpublish'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-1">
                    <Button
                      onClick={() => router.push(`${route.read}/${item.id}`)}
                      variant="outline"
                      size="icon"
                      className="border"
                    >
                      <EyeIcon size={18} />
                    </Button>
                    <Button
                      onClick={() => router.push(`${route.update}/${item.id}`)}
                      variant="outline"
                      size="icon"
                      className="border"
                    >
                      <PencilIcon size={18} />
                    </Button>
                    <DialogDeleteData
                      apiUrl={`/api/directory-posts/${item.id}`}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
