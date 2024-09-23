'use client';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { useRequestTransactionStore } from '@/store/useResquestTransaction';

type payerOptions = {
  transactionId: string;
  first_name: string;
  last_name: string;
  email: string;
  sendAmount: number;
  sendCurrency: string;
  payment_method: string;
  identifier: string;
};

type PayerInfoProps = {
  errors: FieldErrors;
  register: UseFormRegister<any>;
};

export default function PayerInfo({ register, errors }: PayerInfoProps) {
  const [payer, setPayer] = useState<payerOptions>({
    transactionId: '',
    first_name: '',
    last_name: '',
    email: '',
    sendAmount: 0,
    sendCurrency: '',
    payment_method: '',
    identifier: '',
  });

  const { receiveAmountStore } = useRequestTransactionStore();

  useEffect(() => {
    const storedClient = localStorage.getItem('payer');

    if (storedClient) {
      const client = JSON.parse(storedClient);
      setPayer(client);
    }
  }, []);

  return (
    <>
      <label
        htmlFor="first_name"
        className={clsx(
          errors.first_name
            ? 'text-red-500'
            : 'text-gray-900 dark:text-gray-300',
        )}
      >
        Nombre
      </label>
      <input
        className={clsx(
          'rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
          errors.first_name
            ? 'mb-0 border-red-500'
            : 'mb-5 hover:border-blue-600',
        )}
        type="text"
        value={payer.first_name}
        {...register('first_name', { required: 'El nombre es obligatorio' })}
      />
      {errors.first_name && (
        <p className="mb-5 text-sm text-red-500">
          • {errors.first_name.message as string}
        </p>
      )}

      <label
        htmlFor="last_name"
        className={clsx(
          errors.last_name
            ? 'text-red-500'
            : 'text-gray-900 dark:text-gray-300',
        )}
      >
        Apellido
      </label>
      <input
        className={clsx(
          'rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
          errors.last_name
            ? 'mb-0 border-red-500'
            : 'mb-5 hover:border-blue-600',
        )}
        type="text"
        value={payer.last_name}
        {...register('last_name', { required: 'El apellido es obligatorio' })}
      />
      {errors.last_name && (
        <p className="mb-5 text-sm text-red-500">
          • {errors.last_name.message as string}
        </p>
      )}
      <label
        htmlFor="amount_sent"
        className={clsx(
          errors.amount_sent
            ? 'text-red-500'
            : 'text-gray-900 dark:text-gray-300',
        )}
      >
        Monto Enviado
      </label>
      <input
        className={clsx(
          'rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
          errors.amount_sent
            ? 'mb-0 border-red-500'
            : 'mb-5 hover:border-blue-600',
        )}
        type="number"
        value={payer.sendAmount}
        {...register('amount_sent', {
          required: 'El monto enviado es obligatorio',
        })}
      />
      {errors.amount_sent && (
        <p className="mb-5 text-sm text-red-500">
          • {errors.amount_sent.message as string}
        </p>
      )}

      <label
        htmlFor="amount_received"
        className={clsx(
          errors.amount_received
            ? 'text-red-500'
            : 'text-gray-900 dark:text-gray-300',
        )}
      >
        Monto Recibido
      </label>
      <input
        className={clsx(
          'rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
          errors.amount_received
            ? 'mb-0 border-red-500'
            : 'mb-5 hover:border-blue-600',
        )}
        type="number"
        value={receiveAmountStore}
        {...register('amount_received', {
          required: 'El monto recibido es obligatorio',
        })}
      />
      {errors.amount_received && (
        <p className="mb-5 text-sm text-red-500">
          • {errors.amount_received.message as string}
        </p>
      )}

      <label
        htmlFor="identifier"
        className={clsx(
          errors.identifier
            ? 'text-red-500'
            : 'text-gray-900 dark:text-gray-300',
        )}
      >
        Identificador de Transacción
      </label>
      <input
        className={clsx(
          'rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
          errors.identifier
            ? 'mb-0 border-red-500'
            : 'mb-5 hover:border-blue-600',
        )}
        type="text"
        value={payer.identifier}
        {...register('identifier', {
          required: 'El identificador es obligatorio',
        })}
      />
      {errors.identifier && (
        <p className="mb-5 text-sm text-red-500">
          • {errors.identifier.message as string}
        </p>
      )}

      <label
        htmlFor="payment_method"
        className={clsx(
          errors.payment_method
            ? 'text-red-500'
            : 'text-gray-900 dark:text-gray-300',
        )}
      >
        Método de Pago
      </label>
      <input
        className={clsx(
          'rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
          errors.payment_method
            ? 'mb-0 border-red-500'
            : 'mb-5 hover:border-blue-600',
        )}
        type="text"
        value={payer.payment_method}
        {...register('payment_method', {
          required: 'El método de pago es obligatorio',
        })}
      />
      {errors.payment_method && (
        <p className="mb-5 text-sm text-red-500">
          • {errors.payment_method.message as string}
        </p>
      )}
      <label
        htmlFor="email"
        className={clsx(
          errors.email ? 'text-red-500' : 'text-gray-900 dark:text-gray-300',
        )}
      >
        Email
      </label>
      <input
        className={clsx(
          'rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
          errors.email ? 'mb-0 border-red-500' : 'mb-5 hover:border-blue-600',
        )}
        type="email"
        value={payer.email}
        {...register('email', {
          required: 'El correo electrónico es obligatorio',
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: 'Introduce un correo electrónico válido',
          },
        })}
      />
      {errors.email && (
        <p className="mb-5 text-sm text-red-500">
          • {errors.email.message as string}
        </p>
      )}
    </>
  );
}
