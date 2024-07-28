'use client';

import { useEffect, useState } from 'react';
import CardDirectory from '@/components/fragments/main/CardDirectory';
import InputSearch from '@/components/fragments/main/InputSearch';

export default function DirectoryListTemplate({ data }: { data: any[] }) {
  const [items, setItems] = useState<any[]>(data);
  const [search, setSearch] = useState<string>('');

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

  return (
    <>
      <InputSearch onChange={(e) => setSearch(e)} />
      {items.length !== 0 ? (
        <div className="flex flex-wrap justify-center gap-3">
          {items?.map((item: any, index: number) => (
            <CardDirectory key={index} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-center">data tidak ditemukan!</p>
      )}
    </>
  );
}
