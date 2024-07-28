'use server';

import { cookies } from 'next/headers';

export const getCookies = async () => {
  const cookieStore = cookies();
  const API_TOKEN = cookieStore.get('token')?.value;
  const USER_ID = cookieStore.get('userId')?.value;

  return {
    API_TOKEN,
    USER_ID,
  };
};

export const setCookies = async ({
  name,
  value,
}: {
  name: string;
  value: string;
}) => {
  cookies().set(name, value);
};

export const deleteCookies = async ({ name }: { name: string }) => {
  cookies().delete(name);
};
