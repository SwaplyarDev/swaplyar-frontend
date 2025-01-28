// /app/request/page.tsx
import StepperContainer from '@/components/request/form/StepperContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Formulario de Solicitud de Envío de Dinero | SwaplyAr',
  description:
    'Completa el formulario de envío de dinero con datos del remitente, destinatario y monto. SwaplyAr lo hace fácil, seguro y rápido.',
};

const RequestPage = () => {
  return (
    <div className="flex items-center justify-center px-5 py-10 xs-phone:px-10">
      <StepperContainer />
    </div>
  );
};

export default RequestPage;
