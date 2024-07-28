import Footer from '@/components/fragments/main/Footer';
import Header from '@/components/fragments/main/Header';
import Higlights from '@/components/fragments/main/Higlights';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      {children}
      <Higlights />
      <Footer />
    </div>
  );
}
