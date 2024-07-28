import HeaderMobile from '@/components/fragments/admin/HeaderMobile';
import NavMenuDesktop from '@/components/fragments/admin/NavMenuDesktop';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <NavMenuDesktop />
      <div className="flex-1 w-full">
        <HeaderMobile />
        {children}
      </div>
    </div>
  );
}
