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
import { Form } from 'react-hook-form';
import FormRequest from '@/components/request/form/FormRequest';

const RequestPage = () => {
  const [payerBank, setPayerBank] = useState<string>('');

  useEffect(() => {
    const data = localStorage.getItem('selectedSendingSystem');
    if (data) {
      const bank = JSON.parse(data);
      setPayerBank(bank.name);
    }
  }, []);

  return (
    <div className="flex flex-col-reverse items-center justify-center p-10 lg:flex-row lg:gap-8">
      <FormRequest/>
    </div>
  );
};

export default RequestPage;
