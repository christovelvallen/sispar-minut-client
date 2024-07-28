'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import ImageUploading from 'react-images-uploading';
import Image from 'next/image';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RotateCwIcon, XIcon } from 'lucide-react';
import { createPost } from '@/lib/services';

const formSchema = z.object({
  title: z.string().min(3, {
    message: 'Tidak boleh kosong!',
  }),
  description: z.string().min(3, {
    message: 'Tidak boleh kosong!',
  }),
  address: z.string().min(3, {
    message: 'Tidak boleh kosong!',
  }),
  location: z.string(),
  price_rates: z.string(),
  opening_hours: z.string(),
  status: z.boolean(),
  image: z.any().array().nonempty({
    message: 'Tidak boleh kosong!',
  }),
});

type InputType = {
  control: any;
  name: string;
  title: string;
};

const InputText = ({ control, name, title }: InputType) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="p-3 border rounded-xl">
          <FormLabel>{title}</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage className="text-xs text-red-500" />
        </FormItem>
      )}
    />
  );
};

const InputTextArea = ({ control, name, title }: InputType) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="p-3 border rounded-xl">
          <FormLabel>{title}</FormLabel>
          <FormControl>
            <Textarea {...field} className="resize-none min-h-[150px]" />
          </FormControl>
          <FormMessage className="text-xs text-red-500" />
        </FormItem>
      )}
    />
  );
};

const InputStatus = ({ control, name, title }: InputType) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="p-3 border rounded-xl">
          <FormLabel>{title}</FormLabel>
          <FormControl>
            <div className="flex items-center space-x-3">
              <Switch
                id="status"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <Label htmlFor="status">
                {field.value ? 'Publish' : 'Unpublish'}
              </Label>
            </div>
          </FormControl>
          <FormMessage className="text-xs text-red-500" />
        </FormItem>
      )}
    />
  );
};

const InputImage = ({ control, name, title }: InputType) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="p-3 border rounded-xl">
          <FormLabel>{title}</FormLabel>
          <FormControl>
            <ImageUploading
              multiple
              value={field.value}
              onChange={(e: any) => field.onChange(e)}
              maxNumber={1}
              dataURLKey="data_url"
            >
              {({ imageList, onImageUpload, onImageRemove }) => (
                <div className="flex flex-col gap-3">
                  {imageList.length > 0 ? (
                    imageList.map((image, index) => (
                      <div
                        key={index}
                        className="size-[100px] relative overflow-hidden border rounded-xl"
                      >
                        <Image
                          src={image['data_url']}
                          alt=""
                          width={100}
                          height={100}
                          priority
                          className="object-cover w-full h-full"
                        />
                        <XIcon
                          onClick={() => onImageRemove(index)}
                          className="absolute text-red-500 top-1 right-1"
                        />
                      </div>
                    ))
                  ) : (
                    <div className="flex">
                      <div
                        onClick={onImageUpload}
                        className="px-4 py-1.5 text-sm font-medium border rounded-md shadow-sm text-primary cursor-pointer select-none"
                      >
                        Upload
                      </div>
                    </div>
                  )}
                </div>
              )}
            </ImageUploading>
          </FormControl>
          <FormMessage className="text-xs text-red-500" />
        </FormItem>
      )}
    />
  );
};

export default function DataForm({ categoryId }: { categoryId: number }) {
  const [reloadSubmit, setReloadSubmit] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      address: '',
      location: '',
      price_rates: '',
      opening_hours: '',
      status: true,
      image: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setReloadSubmit(true);
    await createPost({
      title: values.title,
      description: values.description,
      address: values.address,
      location: values.location,
      price_rates: values.price_rates,
      opening_hours: values.opening_hours,
      publish: values.status,
      images: values.image,
      directoryId: categoryId,
    });
    setReloadSubmit(false);
    router.back();
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <InputText control={form.control} name="title" title="Nama*" />
          <InputTextArea
            control={form.control}
            name="description"
            title="Deksripsi*"
          />

          <div className="grid items-start grid-cols-2 gap-3 max-lg:grid-cols-1">
            <InputTextArea
              control={form.control}
              name="address"
              title="Alamat*"
            />
            <InputTextArea
              control={form.control}
              name="location"
              title="Lokasi"
            />
          </div>

          <div className="grid items-start grid-cols-2 gap-3 max-lg:grid-cols-1">
            <InputText
              control={form.control}
              name="price_rates"
              title="Tarif harga"
            />
            <InputText
              control={form.control}
              name="opening_hours"
              title="Jam buka"
            />
          </div>

          <div className="grid items-start grid-cols-2 gap-3 max-lg:grid-cols-1">
            <InputImage control={form.control} name="image" title="Gambar*" />
            <InputStatus control={form.control} name="status" title="Status*" />
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => form.reset()}
              variant="outline"
              size="lg"
              className="text-red-500"
            >
              Reset
            </Button>
            <Button
              disabled={reloadSubmit ? true : false}
              type="submit"
              size="lg"
            >
              <RotateCwIcon
                className={`${
                  reloadSubmit ? '' : 'hidden'
                } mr-2 h-4 w-4 animate-spin`}
              />
              Simpan
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}