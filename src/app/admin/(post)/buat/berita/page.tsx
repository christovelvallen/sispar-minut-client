'use client';

import Breadcrumb from '@/components/fragments/admin/Breadcrumb';
import PostForm from '@/components/fragments/admin/PostForm';

export default function Page() {
  return (
    <div className="flex flex-col gap-3 p-3 lg:p-6">
      <Breadcrumb title="Buat data baru" path="/ Postingan / Berita" />
      <div className="flex flex-col gap-3">
        <PostForm />
      </div>
    </div>
  );
}
