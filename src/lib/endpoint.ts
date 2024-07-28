// endpoint path

export const pathDirectory = ({
  pageIndex,
  pageSize,
}: {
  pageIndex: number;
  pageSize: number;
}) => {
  return `/api/directory-posts?pagination[page]=${pageIndex}&pagination[pageSize]=${pageSize}&sort=createdAt:desc&populate=*`;
};

export const pathDirectoryPosts = ({
  pageIndex,
  category,
  pageSize,
}: {
  category: string;
  pageIndex: number;
  pageSize: number;
}) => {
  return `/api/directory-posts?pagination[page]=${pageIndex}&pagination[pageSize]=${pageSize}&filters[directory][name][$eq]=${category}&filters[publish][$eq]=true&sort=createdAt:desc&populate=*`;
};

export const pathDirectoryAllPost = ({
  pageIndex,
  category,
  pageSize,
}: {
  category: string;
  pageIndex: number;
  pageSize: number;
}) => {
  return `/api/directory-posts?pagination[page]=${pageIndex}&pagination[pageSize]=${pageSize}&filters[directory][name][$eq]=${category}&sort=createdAt:desc&populate=*`;
};

export const pathDirectoryCategory = ({ category }: { category: string }) => {
  return `/api/directories?filters[name][$eq]=${category}`;
};

export const pathDirectoryById = ({ id }: { id: string }) => {
  return `/api/directory-posts/${id}?populate=*`;
};

export const pathNewsPosts = ({
  pageIndex,
  pageSize,
}: {
  pageIndex: number;
  pageSize: number;
}) => {
  return `/api/news-posts?pagination[page]=${pageIndex}&pagination[pageSize]=${pageSize}&filters[publish][$eq]=true&sort=createdAt:desc&populate=*`;
};

export const pathNewsAllPosts = ({
  pageIndex,
  pageSize,
}: {
  pageIndex: number;
  pageSize: number;
}) => {
  return `/api/news-posts?pagination[page]=${pageIndex}&pagination[pageSize]=${pageSize}&sort=createdAt:desc&populate=*`;
};

export const pathNewsById = ({ id }: { id: string }) => {
  return `/api/news-posts/${id}?populate=*`;
};

export const pathNewsLatest = () => {
  return `/api/news-posts?sort=createdAt:desc&populate=*`;
};
