// /components/request/requestRegister.tsx

'use client';

import clsx from 'clsx';
import SelectCountry from './selectCountry';
import PayerInfo from './payerInfo';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { requestRegister } from '@/actions/request/action.requestRegister';

type FormInputs = {
  first_name: string;
  last_name: string;
  amount_sent: string;
  amount_received: string;
  phone: string;
  identifier: string;
  payment_method: string;
  document: string;
  email: string;
  proof_of_payment: FileList;
  note: string;
  country: string;
  type_of_document: string;
};

type CountryOption = {
  value: string;
  label: string;
  callingCode: string;
};

export const RequestRegisterForm = () => {
  const [_errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [currentCountry, setCurrentCountry] = useState<CountryOption | null>(
    null,
  );
  const [currentDate, setCurrentDate] = useState<string>('');
  const [transactionId, setTransactionId] = useState<string>('');
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>();

  useEffect(() => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    setCurrentDate(`${day}/${month}/${year}`);

    const storedClient = localStorage.getItem('payer');
    if (storedClient) {
      const client = JSON.parse(storedClient);
      setTransactionId(client.transactionId);
    }
  }, []);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage('');
    setLoading(true);

    console.log('Datos del formulario:', data);
    localStorage.removeItem('payer');
    const {
      first_name,
      last_name,
      amount_sent,
      amount_received,
      phone,
      identifier,
      payment_method,
      document,
      email,
      proof_of_payment,
      note,
      country,
      type_of_document,
    } = data;

    const fullPhoneNumber = `${currentCountry?.callingCode} ${phone}`;

    const formData = new FormData();
    formData.append('date', currentDate);
    formData.append('transactionId', transactionId);
    formData.append('first_name', first_name || '');
    formData.append('last_name', last_name || '');
    formData.append('amount_sent', amount_sent || '');
    formData.append('amount_received', amount_received || '');
    formData.append('phone', fullPhoneNumber || '');
    formData.append('identifier', identifier || '');
    formData.append('payment_method', payment_method || '');
    formData.append('document', document || '');
    formData.append('email', email || '');
    formData.append('type_of_document', type_of_document || '');

    if (proof_of_payment && proof_of_payment.length > 0) {
      formData.append('comprobante', proof_of_payment[0]);
    } else {
      console.warn('No se ha proporcionado un archivo de comprobante');
    }

    formData.append('note', note || '');
    formData.append('country', country || '');

    const entries = formData.entries();
    let entry = entries.next();
    while (!entry.done) {
      console.log(`${entry.value[0]}: ${entry.value[1]}`);
      entry = entries.next();
    }

    try {
      const resp = await requestRegister(formData);

      setLoading(false);

      if (!resp.ok) {
        setErrorMessage(resp.message);
        return;
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setErrorMessage('Ha ocurrido un error al enviar la solicitud.');
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-transparent">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex min-h-screen w-full max-w-xs flex-col justify-center rounded-lg bg-white p-8 shadow-md dark:bg-gray-800 xs:max-w-lg"
      >
        <h2 className="mb-5 text-center text-2xl font-bold text-gray-900 dark:text-white">
          Formulario de Solicitud de Transferencia Bancaria {currentDate}
        </h2>

        <PayerInfo errors={errors} register={register} />

        <SelectCountry
          errors={errors}
          setValue={setValue}
          setCurrentCountry={setCurrentCountry}
        />

        <label
          htmlFor="phone"
          className={clsx(
            errors.phone ? 'text-red-500' : 'text-gray-900 dark:text-gray-300',
          )}
        >
          Teléfono
        </label>
        <input
          className={clsx(
            'rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
            errors.phone ? 'mb-0 border-red-500' : 'mb-5 hover:border-blue-600',
          )}
          type="tel"
          {...register('phone', {
            required: 'El número de teléfono es obligatorio',
            pattern: {
              value: /^\d{10,14}$/,
              message: 'Introduce un número válido de entre 10 y 14 dígitos',
            },
          })}
        />
        {errors.phone && (
          <p className="mb-5 text-sm text-red-500">
            • {errors.phone.message as string}
          </p>
        )}

        <label
          htmlFor="document"
          className={clsx(
            errors.document
              ? 'text-red-500'
              : 'text-gray-900 dark:text-gray-300',
          )}
        >
          Número de Documento
        </label>
        <input
          className={clsx(
            'rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
            errors.document
              ? 'mb-0 border-red-500'
              : 'mb-5 hover:border-blue-600',
          )}
          type="text"
          {...register('document', {
            required: 'El número de documento es obligatorio',
          })}
        />
        {errors.document && (
          <p className="mb-5 text-sm text-red-500">
            • {errors.document.message}
          </p>
        )}

        <label
          htmlFor="type_of_document"
          className={clsx(
            errors.type_of_document
              ? 'text-red-500'
              : 'text-gray-900 dark:text-gray-300',
          )}
        >
          Tipo de Documento
        </label>
        <input
          className={clsx(
            'rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
            errors.type_of_document
              ? 'mb-0 border-red-500'
              : 'mb-5 hover:border-blue-600',
          )}
          type="text"
          {...register('type_of_document', {
            required: 'El tipo de documento es obligatorio',
          })}
        />
        {errors.type_of_document && (
          <p className="mb-5 text-sm text-red-500">
            • {errors.type_of_document.message}
          </p>
        )}
        <label
          htmlFor="proof_of_payment"
          className={clsx(
            errors.proof_of_payment
              ? 'text-red-500'
              : 'text-gray-900 dark:text-gray-300',
          )}
        >
          Comprobante de Pago
        </label>
        <input
          className={clsx(
            'rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
            errors.proof_of_payment
              ? 'mb-0 border-red-500'
              : 'mb-5 hover:border-blue-600',
          )}
          type="file"
          {...register('proof_of_payment', {
            required: 'El comprobante de pago es obligatorio',
          })}
        />
        {errors.proof_of_payment && (
          <p className="mb-5 text-sm text-red-500">
            • {errors.proof_of_payment.message}
          </p>
        )}

        <label
          htmlFor="note"
          className={clsx(
            errors.note ? 'text-red-500' : 'text-gray-900 dark:text-gray-300',
          )}
        >
          Nota (Opcional)
        </label>
        <textarea
          className={clsx(
            'rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
            errors.note ? 'mb-0 border-red-500' : 'mb-5 hover:border-blue-600',
          )}
          {...register('note')}
        />
        {errors.note && (
          <p className="mb-5 text-sm text-red-500">• {errors.note.message}</p>
        )}

        <SendButton pending={loading} />
      </form>
    </div>
  );
};

function SendButton({ pending }: { pending: boolean }) {
  return (
    <button
      type="submit"
      className={clsx({
        'btn-primary': !pending,
        'btn-disabled': pending,
        btnAuthForm: true,
      })}
      disabled={pending}
    >
      {pending ? 'Enviando...' : 'Enviar solicitud'}
    </button>
  );
}
