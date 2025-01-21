'use client';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { payerOptions } from '@/types/request/request';

type PayerInfoProps = {
  errors: FieldErrors;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
};

export default function PayerInfo({ register, errors, setValue }: PayerInfoProps) {
  const [amounts, setAmounts] = useState<payerOptions>({
    sendAmount: 0,
    sendCurrency: '',
    recibeAmount: 0,
    recibeCurrency: '',
  });

  useEffect(() => {
    const storedClient = localStorage.getItem('payer');
    const storedSendAmount = localStorage.getItem('sendAmount');
    const storedSendCurrency = localStorage.getItem('selectedSendingSystem');
    const storedReciveAmount = localStorage.getItem('receiveAmount');
    const storedReciveCurrency = localStorage.getItem('selectedReceivingSystem');

    if (storedClient) {
      const client = JSON.parse(storedClient);
      setValue('sender_first_name', client.first_name);
      setValue('sender_last_name', client.last_name);
      setValue('transfer_code', client.identifier);
      setValue('sender_email', client.email);
    }

    if (storedSendCurrency && storedReciveCurrency && storedSendAmount && storedReciveAmount) {
      const preSendCurrency = JSON.parse(storedSendCurrency);
      const preReciveCurrency = JSON.parse(storedReciveCurrency);

      const preAmounts = {
        sendAmount: parseInt(storedSendAmount),
        recibeAmount: parseInt(storedReciveAmount),
        sendCurrency: preSendCurrency.coin as string,
        recibeCurrency: preReciveCurrency.coin as string,
      };

      setAmounts((prevAmounts) => {
        if (
          prevAmounts.sendAmount !== preAmounts.sendAmount ||
          prevAmounts.recibeAmount !== preAmounts.recibeAmount ||
          prevAmounts.sendCurrency !== preAmounts.sendCurrency ||
          prevAmounts.recibeCurrency !== preAmounts.recibeCurrency
        ) {
          setValue('amount_sent', preAmounts.sendAmount);
          setValue('amount_received', preAmounts.recibeAmount);
          setValue('currency_sent', preAmounts.sendCurrency);
          setValue('currency_received', preAmounts.recibeCurrency);
          setValue('payment_bank', preSendCurrency.name);
          setValue('reciver_bank', preReciveCurrency.name);
          return preAmounts;
        }
        return prevAmounts;
      });
    }
  }, [setValue]);

  return (
    <>
      <label
        htmlFor="sender_first_name"
        className={clsx(errors.sender_first_name ? 'text-red-500' : 'text-gray-900 dark:text-gray-300')}
      >
        Nombre
      </label>
      <input
        className={clsx(
          'rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
          errors.sender_first_name ? 'mb-0 border-red-500' : 'mb-5 hover:border-blue-600',
        )}
        type="text"
        {...register('sender_first_name', {
          required: 'El nombre es obligatorio',
        })}
      />
      {errors.sender_first_name && (
        <p className="mb-5 text-sm text-red-500">• {errors.sender_first_name.message as string}</p>
      )}

      <label
        htmlFor="sender_last_name"
        className={clsx(errors.sender_last_name ? 'text-red-500' : 'text-gray-900 dark:text-gray-300')}
      >
        Apellido
      </label>
      <input
        className={clsx(
          'rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
          errors.last_name ? 'mb-0 border-red-500' : 'mb-5 hover:border-blue-600',
        )}
        type="text"
        {...register('sender_last_name', {
          required: 'El apellido es obligatorio',
        })}
      />
      {errors.sender_last_name && (
        <p className="mb-5 text-sm text-red-500">• {errors.sender_last_name.message as string}</p>
      )}
      <label
        htmlFor="amount_sent"
        className={clsx(errors.amount_sent ? 'text-red-500' : 'text-gray-900 dark:text-gray-300')}
      >
        Monto Enviado
      </label>
      <input
        className={clsx(
          'rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
          errors.amount_sent ? 'mb-0 border-red-500' : 'mb-5 hover:border-blue-600',
        )}
        type="number"
        value={amounts.sendAmount}
        {...register('amount_sent', {
          required: 'El monto enviado es obligatorio',
        })}
      />
      {errors.amount_sent && <p className="mb-5 text-sm text-red-500">• {errors.amount_sent.message as string}</p>}

      <label
        htmlFor="amount_received"
        className={clsx(errors.amount_received ? 'text-red-500' : 'text-gray-900 dark:text-gray-300')}
      >
        Monto Recibido
      </label>
      <input
        className={clsx(
          'rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
          errors.amount_received ? 'mb-0 border-red-500' : 'mb-5 hover:border-blue-600',
        )}
        type="number"
        value={amounts.recibeAmount}
        {...register('amount_received', {
          required: 'El monto recibido es obligatorio',
        })}
      />
      {errors.amount_received && (
        <p className="mb-5 text-sm text-red-500">• {errors.amount_received.message as string}</p>
      )}

      <label
        htmlFor="transfer_code"
        className={clsx(errors.transfer_code ? 'text-red-500' : 'text-gray-900 dark:text-gray-300')}
      >
        Identificador de Transacción
      </label>
      <input
        className={clsx(
          'rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
          errors.transfer_code ? 'mb-0 border-red-500' : 'mb-5 hover:border-blue-600',
        )}
        type="text"
        {...register('transfer_code', {
          required: 'El identificador es obligatorio',
        })}
      />
      {errors.transfer_code && <p className="mb-5 text-sm text-red-500">• {errors.transfer_code.message as string}</p>}
      <label
        htmlFor="sender_email"
        className={clsx(errors.sender_email ? 'text-red-500' : 'text-gray-900 dark:text-gray-300')}
      >
        Email
      </label>
      <input
        className={clsx(
          'rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
          errors.sender_email ? 'mb-0 border-red-500' : 'mb-5 hover:border-blue-600',
        )}
        type="email"
        {...register('sender_email', {
          required: 'El correo electrónico es obligatorio',
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: 'Introduce un correo electrónico válido',
          },
        })}
      />
      {errors.sender_email && <p className="mb-5 text-sm text-red-500">• {errors.sender_email.message as string}</p>}
    </>
  );
}
