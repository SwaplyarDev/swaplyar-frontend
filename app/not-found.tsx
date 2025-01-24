import NotFoundComponent from '@/components/error/errorComponent';
import { constructMetadata } from '@/components/seo/SeoComp';

export const metadata = constructMetadata({
  title: 'Ups, lo sentimos. Página no encontrada |  SwaplyAr',
  description:
    'Lo sentimos, la página que buscas no existe. Volvé al inicio o usa el Centro de Ayuda para encontrar lo que necesitas en SwaplyAr. Por errores ¡notifícalo!',
});
export default function NotFoundPage() {
  return (
    <>
      <NotFoundComponent />
    </>
  );
}
