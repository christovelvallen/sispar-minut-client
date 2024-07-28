'use client';

import { useEffect, useState } from 'react';
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
import { getApiUrl, updateNewsPost } from '@/lib/services';

const formSchema = z.object({
  title: z.string().min(3, {
    message: 'Tidak boleh kosong!',
  }),
  description: z.string().min(3, {
    message: 'Tidak boleh kosong!',
  }),
  content: z.string().min(3, {
    message: 'Tidak boleh kosong!',
  }),
  tags: z.string(),
  status: z.boolean(),
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

const InputContent = ({ control, name, title }: InputType) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="p-3 border rounded-xl">
          <FormLabel>{title}</FormLabel>
          <FormControl>
            <Textarea {...field} className="min-h-[250px]" />
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

const InputNewImage = ({ onChange }: { onChange: (e: any) => void }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    onChange(files);
  }, [files, onChange]);

  return (
    <div className="flex flex-col gap-3 p-3 border rounded-xl">
      <p className="text-sm font-medium">Gambar*</p>
      <ImageUploading
        multiple
        value={files}
        onChange={(e: any) => setFiles(e)}
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
      <p
        className={`${
          files.length > 0 ? 'hidden' : ''
        } text-xs font-medium text-red-500`}
      >
        Tidak boleh kosong!
      </p>
    </div>
  );
};

export default function PostFormEdit({ data }: { data: any }) {
  const [newImage, setNewImage] = useState(false);
  const [newImageData, setNewImageData] = useState([]);
  const [reloadSubmit, setReloadSubmit] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data?.attributes?.title || '',
      description: data?.attributes?.description || '',
      content: data?.attributes?.content || '',
      tags: data?.attributes?.tags || '',
      status: data?.attributes?.publish,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setReloadSubmit(true);
    await updateNewsPost({
      title: values.title,
      description: values.description,
      content: values.content,
      tags: values.tags,
      publish: values.status,
      idPost: data?.id,
      imageId: data?.attributes?.image?.data?.id,
      imageData: newImageData,
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
          <InputContent control={form.control} name="content" title="Konten*" />
          <InputText control={form.control} name="tags" title="Tags" />

          <div className="grid items-start grid-cols-2 gap-3 max-lg:grid-cols-1">
            {!newImage ? (
              <div className="flex flex-col gap-3 p-3 border rounded-xl">
                <p className="text-sm font-medium">Gambar*</p>
                <div className="size-[100px] relative overflow-hidden border rounded-xl">
                  <Image
                    src={getApiUrl(
                      data?.attributes?.image?.data?.attributes?.url
                    )}
                    alt=""
                    width={100}
                    height={100}
                    priority
                    className="object-cover w-full h-full"
                  />
                  <XIcon
                    onClick={() => setNewImage(true)}
                    className={`absolute text-red-500 top-1 right-1`}
                  />
                </div>
              </div>
            ) : (
              <InputNewImage onChange={(files) => setNewImageData(files)} />
            )}
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
              disabled={
                reloadSubmit || (newImage && newImageData.length === 0)
                  ? true
                  : false
              }
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
