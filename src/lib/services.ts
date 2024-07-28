import axios from 'axios';
import { getCookies } from './cookies';

export const getApiUrl = (endpoint: string) => {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${endpoint}`;
};

export const fetcher = async (endpoint: string) => {
  try {
    return await axios
      .get(getApiUrl(endpoint))
      .then((response) => response.data)
      .catch((err) => err.response.data);
  } catch (error) {
    console.log(error);
  }
};

export const userLogin = async ({
  identifier,
  password,
}: {
  identifier: string;
  password: string;
}) => {
  try {
    return await axios
      .post(
        getApiUrl('/api/auth/local'),
        {
          identifier,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => response.data)
      .catch((err) => err.response.data);
  } catch (error) {
    console.log(error);
  }
};

export const createPost = async ({
  title,
  description,
  address,
  location,
  price_rates,
  opening_hours,
  publish,
  images,
  directoryId,
}: {
  title: string | null;
  description: string | null;
  address: string | null;
  location: string | null;
  price_rates: string | null;
  opening_hours: string | null;
  publish: boolean;
  images: any;
  directoryId: number;
}) => {
  const { API_TOKEN, USER_ID } = await getCookies();

  try {
    let imageIds: any[] = [];

    if (images.length > 0) {
      const formData = new FormData();
      const fileArray = Array.from(images);
      fileArray.forEach((file: any) => {
        formData.append('files', file.file);
      });

      const resImages = await axios.post(getApiUrl('/api/upload'), formData, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      imageIds = resImages.data.map((file: any) => file.id);
    }

    const resPost = await axios.post(
      getApiUrl('/api/directory-posts'),
      {
        data: {
          title,
          description,
          address,
          location,
          price_rates,
          opening_hours,
          publish,
          image: imageIds,
          directory: [directoryId],
          author: [USER_ID],
        },
      },
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return resPost.data;
  } catch (error) {
    console.error('Error creating post:', error);
  }
};

export const updatePost = async ({
  title,
  description,
  address,
  location,
  price_rates,
  opening_hours,
  publish,
  directoryId,
  idPost,
  imageData,
  imageId,
}: {
  title: string | null;
  description: string | null;
  address: string | null;
  location: string | null;
  price_rates: string | null;
  opening_hours: string | null;
  publish: boolean;
  directoryId: number;
  idPost: number;
  imageData?: any;
  imageId?: number;
}) => {
  const { API_TOKEN, USER_ID } = await getCookies();

  try {
    let imageIds: any[] = [imageId];

    if (imageData.length > 0) {
      const formData = new FormData();
      const fileArray = Array.from(imageData);
      fileArray.forEach((file: any) => {
        formData.append('files', file.file);
      });

      const resImages = await axios.post(getApiUrl('/api/upload'), formData, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      imageIds = resImages.data.map((file: any) => file.id);
    }

    const resPost = await axios.put(
      getApiUrl(`/api/directory-posts/${idPost}`),
      {
        data: {
          title,
          description,
          address,
          location,
          price_rates,
          opening_hours,
          publish,
          image: imageIds,
          directory: [directoryId],
          author: [USER_ID],
        },
      },
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return resPost.data;
  } catch (error) {
    console.error('Error creating post:', error);
  }
};

export const deletePost = async (endpoint: string) => {
  const { API_TOKEN } = await getCookies();

  try {
    return await axios
      .delete(getApiUrl(endpoint), {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => response.data)
      .catch((err) => err.response.data);
  } catch (error) {
    console.log(error);
  }
};

export const createNewsPost = async ({
  title,
  description,
  content,
  tags,
  publish,
  images,
}: {
  title: string | null;
  description: string | null;
  content: string | null;
  tags: string | null;
  publish: boolean;
  images: any;
}) => {
  const { API_TOKEN, USER_ID } = await getCookies();

  try {
    let imageIds: any[] = [];

    if (images.length > 0) {
      const formData = new FormData();
      const fileArray = Array.from(images);
      fileArray.forEach((file: any) => {
        formData.append('files', file.file);
      });

      const resImages = await axios.post(getApiUrl('/api/upload'), formData, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      imageIds = resImages.data.map((file: any) => file.id);
    }

    const resPost = await axios.post(
      getApiUrl('/api/news-posts'),
      {
        data: {
          title,
          description,
          content,
          tags,
          publish,
          image: imageIds,
          author: [USER_ID],
        },
      },
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return resPost.data;
  } catch (error) {
    console.error('Error creating post:', error);
  }
};

export const updateNewsPost = async ({
  title,
  description,
  content,
  tags,
  publish,
  idPost,
  imageData,
  imageId,
}: {
  title: string | null;
  description: string | null;
  content: string | null;
  tags: string | null;
  publish: boolean;
  idPost: number;
  imageData?: any;
  imageId?: number;
}) => {
  const { API_TOKEN, USER_ID } = await getCookies();

  try {
    let imageIds: any[] = [imageId];

    if (imageData.length > 0) {
      const formData = new FormData();
      const fileArray = Array.from(imageData);
      fileArray.forEach((file: any) => {
        formData.append('files', file.file);
      });

      const resImages = await axios.post(getApiUrl('/api/upload'), formData, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      imageIds = resImages.data.map((file: any) => file.id);
    }

    const resPost = await axios.put(
      getApiUrl(`/api/news-posts/${idPost}`),
      {
        data: {
          title,
          description,
          content,
          tags,
          publish,
          image: imageIds,
          author: [USER_ID],
        },
      },
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return resPost.data;
  } catch (error) {
    console.error('Error creating post:', error);
  }
};
