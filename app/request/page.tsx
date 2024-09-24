// /app/request/page.tsx

import { RequestRegisterForm } from '@/components/request/form/requestRegister';
import { PaypalToArs } from '@/components/request/Info/paypalToArs';

const RequestPage = () => {
  return (
    <div
      className="flex flex-col-reverse items-center justify-center p-10 lg:flex-row lg:gap-8"
    >
      <RequestRegisterForm />
      <PaypalToArs/>
    </div>
  );
};

export default RequestPage;
