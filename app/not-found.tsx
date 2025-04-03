import NotFoundComponent from '@/components/error/errorComponent';
import Footer from '@/components/footer/Footer';
import { TopMenu } from '@/components/ui/top-menu/TopMenu';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ups, lo sentimos. Página no encontrada |  SwaplyAr',
  description:
    'Lo sentimos, la página que buscas no existe. Volvé al inicio o usa el Centro de Ayuda para encontrar lo que necesitas en SwaplyAr. Por errores ¡notifícalo!',
};

export default function NotFoundPage() {
  return (
    <>
      <TopMenu />
      <NotFoundComponent />
      <Footer />
    </>
  );
}
