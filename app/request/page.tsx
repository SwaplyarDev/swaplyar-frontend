// /app/request/page.tsx
'use client';

import { RequestRegisterForm } from '@/components/request/form/requestRegister';
import { useEffect, useState } from 'react';

import Ars from '@/components/request/Info/ars/ars';

import PayoneerEUR from '@/components/request/Info/payoneer/payoneerEUR';
import PayoneerUSD from '@/components/request/Info/payoneer/payoneerUSD';

import PaypalEUR from '@/components/request/Info/paypal/paypalEUR';
import PaypalUSD from '@/components/request/Info/paypal/paypalUSD';

import WiseEUR from '@/components/request/Info/wise/wiseEUR';
import WiseUSD from '@/components/request/Info/wise/wiseUSD';

const RequestPage = () => {
  const [payerBank, setPayerBank] = useState<string>('');

  useEffect(() => {
    const data = localStorage.getItem('');
    if (data) {
      const bank = JSON.parse(data);
      setPayerBank(bank);
    }
  }, []);

  return (
    <div className="flex flex-col-reverse items-center justify-center p-10 lg:flex-row lg:gap-8">
      <RequestRegisterForm />

      {/* {payerBank === 'PayPal' && <PaypalUSD />}
      {payerBank === 'Ars' && <Ars />}
      {payerBank === 'PayoneerEUR' && <PayoneerEUR />}
      {payerBank === 'PayoneerUSD' && <PayoneerUSD />}
      {payerBank === 'PaypalEUR' && <PaypalEUR />}
      {payerBank === 'PaypalUSD' && <PaypalUSD />}
      {payerBank === 'WiseEUR' && <WiseEUR />}
      {payerBank === 'WiseUSD' && <WiseUSD />}  */}
      <Ars/>
    </div>
  );
};

export default RequestPage;
