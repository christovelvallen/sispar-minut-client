'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { userLogin } from '@/lib/services';
import { useState } from 'react';
import { setCookies } from '@/lib/cookies';
import { useRouter } from 'next/navigation';
import { RotateCwIcon } from 'lucide-react';

const formSchema = z.object({
  identifier: z.string(),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});

export default function Page() {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [reloadSubmit, setReloadSubmit] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setReloadSubmit(true);

    const res = await userLogin({
      identifier: values.identifier,
      password: values.password,
    });

    if (res.data === null) {
      setError(true);
      setErrorMessage(res.error.message);
      setReloadSubmit(false);
      return;
    }

    await setCookies({ name: 'userId', value: res.user.id });
    await setCookies({ name: 'token', value: res.jwt });

    setError(false);
    setErrorMessage('');
    setReloadSubmit(false);
    router.replace('/admin/dashboard');
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="flex flex-col w-full max-w-md gap-3 p-6 mx-auto border rounded-xl">
        <h1 className="text-2xl font-bold text-center">Masuk ke admin panel</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3 mt-3"
          >
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      required
                      placeholder="Email"
                      className="py-5"
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      required
                      placeholder="Password"
                      className="py-5"
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />
            {error && <p className="text-sm text-red-500">{errorMessage}</p>}
            <Button
              disabled={reloadSubmit ? true : false}
              type="submit"
              size="lg"
              className="mt-3"
            >
              <RotateCwIcon
                className={`${
                  reloadSubmit ? '' : 'hidden'
                } mr-2 h-4 w-4 animate-spin`}
              />
              Masuk
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
