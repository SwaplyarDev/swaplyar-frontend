import HelpCenterPage from '@/components/info/helpCenterPage/HelpCenterPage';
import React from 'react';
import { constructMetadata } from '@/components/seo/SeoComp';

export const metadata = constructMetadata({
  title: 'Centro de Ayuda SwaplyAr | Soluciones y Respuestas Rápidas',
  description:
    'Cancela, busca o edita una transacción en el Centro de Ayuda de SwaplyAr. ¿Necesitas comunicarte con atención al cliente? ¡Contáctanos y resolveremos tus dudas!',
});

const page = () => {
  return (
    <div>
      <HelpCenterPage />
    </div>
  );
};

export default page;
