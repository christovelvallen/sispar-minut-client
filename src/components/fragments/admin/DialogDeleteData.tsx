'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { deletePost } from '@/lib/services';
import { RotateCwIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';

type PropsType = {
  apiUrl: string;
};

export default function DialogDeleteData({ apiUrl }: PropsType) {
  const [reloadSubmit, setReloadSubmit] = useState(false);

  const onDelete = async () => {
    setReloadSubmit(true);
    await deletePost(apiUrl);
    setReloadSubmit(false);
    window.location.reload();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="icon" className="text-red-500 border">
          <TrashIcon size={18} />
        </Button>
      </AlertDialogTrigger>

      <div className="p-3">
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Apakah anda yakin ingin menghapus data ini?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini akan menghapus data secara permanen.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batalkan</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete}>
              <RotateCwIcon
                className={`${
                  reloadSubmit ? '' : 'hidden'
                } mr-2 h-4 w-4 animate-spin`}
              />{' '}
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </div>
    </AlertDialog>
  );
}
