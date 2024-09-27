// /components/request/requestRegister.tsx

'use client';

import clsx from 'clsx';
import SelectCountry from './inputs/selectCountry';
import PayerInfo from './inputs/payerInfo';
import ReceiverInfo from './inputs/receiverInfo';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { requestRegister } from '@/actions/request/action.requestRegister';

type FormInputs = {
  sender_first_name: string;
  sender_last_name: string;
  receiver_first_name: string;
  receiver_last_name: string;
  amount_sent: number;
  currency_sent: string;
  amount_received: number;
  currency_received: string;
  phone: string;
  receiver_email: string;
  transfer_code: string;
  transaction_destination: string;
  payment_bank: string;
  reciver_bank: string;
  document: string;
  sender_email: string;
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
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [currentCountry, setCurrentCountry] = useState<CountryOption | null>(
    null,
  );
  const [transactionId, setTransactionId] = useState<string>('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>();

  useEffect(() => {
    const storedClient = localStorage.getItem('payer');
    if (storedClient) {
      const client = JSON.parse(storedClient);
      setTransactionId(client.transactionId);
      setPaymentMethod(client.payment_method);
    }
  }, []);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage('');
    setLoading(true);

    // localStorage.removeItem('payer');
    const {
      sender_first_name,
      sender_last_name,
      amount_sent,
      currency_sent,
      amount_received,
      currency_received,
      phone,
      transfer_code,
      payment_bank,
      reciver_bank,
      document,
      sender_email,
      receiver_email,
      proof_of_payment,
      transaction_destination,
      note,
      country,
      type_of_document,
    } = data;

    const fullPhoneNumber = `${currentCountry?.callingCode} ${phone}`;

    const transactions = {
      sender_first_name: sender_first_name || '',
      sender_last_name: sender_last_name || '',
      sender_identification: document || '',
      sender_phone_number: fullPhoneNumber || '',
      sender_email: sender_email || '',
      receiver_first_name: '',
      receiver_last_name: '',
      transfer_code: transactionId || '',
      country_transaction: country || '',
      message: note || '',
    };
    // las peticiones del local storage se hacen en inputs/payerInfo en su use effect y se setean en el formulario tanto els montos, tipos de moneda y bancos
    const amounts = {
      amount_sent: amount_sent || 0,
      currency_sent: currency_sent || '',
      amount_received: amount_received || 0,
      currency_received: currency_received || '',
    };

    const sender_bank_accounts = {
      email_account: sender_email || '',
      payment_method: payment_bank || '',
      number_account: transfer_code || '',
    };

    const receiver_bank_accounts = {
      email_account: receiver_email || '',
      payment_method: reciver_bank || '',
      number_account: transaction_destination || '',
    };

    const formData = new FormData();

    formData.append('transactions', JSON.stringify(transactions));
    formData.append('amounts', JSON.stringify(amounts));
    formData.append(
      'sender_bank_accounts',
      JSON.stringify(sender_bank_accounts),
    );
    formData.append(
      'receiver_bank_accounts',
      JSON.stringify(receiver_bank_accounts),
    );

    if (proof_of_payment && proof_of_payment.length > 0) {
      formData.append('proof_of_payments', proof_of_payment[0]);
    } else {
      console.warn('No se ha proporcionado un archivo de comprobante');
    }

    const entries = formData.entries();
    let entry = entries.next();

    while (!entry.done) {
      console.log(`${entry.value[0]}: ${entry.value[1]}`); // Console.log par ver como se manda el formulario
      entry = entries.next();
    }

    // try {
    //   const resp = await requestRegister(formData);

    //   setLoading(false);

    //   if (!resp.ok) {
    //     setErrorMessage(resp.message);
    //     return;
    //   }
    // } catch (error) {
    //   console.error('Error en la solicitud:', error);
    //   setErrorMessage('Ha ocurrido un error al enviar la solicitud.');
    //   setLoading(false);
    // }
  };

  return (
    <div className="flex items-center justify-center bg-transparent">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-xs flex-col justify-center rounded-lg bg-white p-8 shadow-md dark:bg-gray-800 xs:max-w-lg"
      >
        <h2 className="mb-5 text-center text-2xl font-bold text-gray-900 dark:text-white">
          Formulario de Solicitud de Transferencia Bancaria mediante{' '}
          {paymentMethod}
        </h2>

        <PayerInfo errors={errors} register={register} setValue={setValue} />

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

        <ReceiverInfo errors={errors} register={register} />

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
