'use client';

import clsx from 'clsx';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

type RecibeInfoProps = {
  errors: FieldErrors;
  register: UseFormRegister<any>;
};

export default function ReceiverInfo({ register, errors }: RecibeInfoProps) {
  return (
    <>
      <label
        htmlFor="receiver_name"
        className={clsx(
          errors.receiver_name
            ? 'text-red-500'
            : 'text-gray-900 dark:text-gray-300',
        )}
      >
        Nombre de quien va a recibir la transaccion
      </label>
      <input
        className={clsx(
          'rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
          errors.receiver_name
            ? 'mb-0 border-red-500'
            : 'mb-5 hover:border-blue-600',
        )}
        type="text"
        {...register('receiver_name', { required: 'El nombre es obligatorio' })}
      />
      {errors.receiver_name && (
        <p className="mb-5 text-sm text-red-500">
          • {errors.receiver_name.message as string}
        </p>
      )}
      <label
        htmlFor="receiver_last_name"
        className={clsx(
          errors.receiver_last_name
            ? 'text-red-500'
            : 'text-gray-900 dark:text-gray-300',
        )}
      >
        Apellido de quien va a recibir la transaccion
      </label>
      <input
        className={clsx(
          'rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
          errors.receiver_last_name
            ? 'mb-0 border-red-500'
            : 'mb-5 hover:border-blue-600',
        )}
        type="text"
        {...register('receiver_last_name', {
          required: 'El apellido es obligatorio',
        })}
      />
      {errors.receiver_last_name && (
        <p className="mb-5 text-sm text-red-500">
          • {errors.receiver_last_name.message as string}
        </p>
      )}
      <label
        htmlFor="receiver_identifier"
        className={clsx(
          errors.receiver_identifier
            ? 'text-red-500'
            : 'text-gray-900 dark:text-gray-300',
        )}
      >
        Dni de quien va a recibir la transaccion
      </label>
      <input
        className={clsx(
          'rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
          errors.document
            ? 'mb-0 border-red-500'
            : 'mb-5 hover:border-blue-600',
        )}
        type="text"
        {...register('receiver_identifier', {
          required: 'El número de documento es obligatorio',
        })}
      />
      {errors.receiver_identifier && (
        <p className="mb-5 text-sm text-red-500">
          • {errors.receiver_identifier.message as string}
        </p>
      )}
      <label
        htmlFor="transaction_destination"
        className={clsx(
          errors.transaction_destination
            ? 'text-red-500'
            : 'text-gray-900 dark:text-gray-300',
        )}
      >
        CVU de quien va a recibir la transaccion
      </label>
      <input
        className={clsx(
          'rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
          errors.transaction_destination
            ? 'mb-0 border-red-500'
            : 'mb-5 hover:border-blue-600',
        )}
        type="text"
        {...register('transaction_destination', {
          required: 'El apellido es obligatorio',
        })}
      />
      {errors.transaction_destination && (
        <p className="mb-5 text-sm text-red-500">
          • {errors.transaction_destination.message as string}
        </p>
      )}
    </>
  );
}
