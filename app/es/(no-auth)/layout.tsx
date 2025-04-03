import Footer from '@/components/footer/Footer';
import { TopMenu } from '@/components/ui/top-menu/TopMenu';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <TopMenu />
      {children}
      <Footer />
    </>
  );
}
