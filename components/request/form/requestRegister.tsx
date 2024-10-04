// /components/request/requestRegister.tsx

'use client';

import clsx from 'clsx';
import SelectCountry from './inputs/selectCountry';
import PayerInfo from './inputs/payerInfo';
import ReceiverInfo from './inputs/receiverInfo';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { requestRegister } from '@/actions/request/action.requestRegister';
import Swal from 'sweetalert2';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import Image from 'next/image';

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
  const { isDark } = useDarkTheme();

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

    // Limpiar datos del localStorage
    localStorage.removeItem('payer');
    localStorage.removeItem('sendAmount');
    localStorage.removeItem('selectedSendingSystem');
    localStorage.removeItem('receiveAmount');
    localStorage.removeItem('selectedReceivingSystem');

    const fullPhoneNumber = `${currentCountry?.callingCode} ${data.phone}`;

    const transaction = {
      transaction: {
        sender: {
          first_name: data.sender_first_name || '',
          last_name: data.sender_last_name || '',
          identification: data.document || '',
          phone_number: fullPhoneNumber || '',
          email: data.sender_email || '',
          bank_account: {
            email_account: data.sender_email || '',
            payment_method: data.payment_bank || '',
            number_account: data.transfer_code || '',
          },
        },
        receiver: {
          first_name: data.receiver_first_name || '',
          last_name: data.receiver_last_name || '',
          bank_account: {
            email_account: data.receiver_email || '',
            payment_method: data.reciver_bank || '',
            number_account: data.transaction_destination || '',
          },
        },
        transfer: {
          transfer_code: transactionId || '',
          country_transaction: data.country || '',
          message: data.note || '',
        },
        amounts: {
          amount_sent: data.amount_sent || 0,
          currency_sent: data.currency_sent || '',
          amount_received: data.amount_received || 0,
          currency_received: data.currency_received || '',
        },
        proof_of_payment: {
          img_transaction: await convertToBase64(data.proof_of_payment),
        },
      },
    };

    try {
      console.log(transaction);
      const resp = await requestRegister(transaction);

      if (resp.ok) {
        await Swal.fire({
          title: '¡Transacción realizada!',
          html: `
            <p><b>La transacción se ha realizado correctamente.</b></p>
          `,
          icon: 'success',
          confirmButtonText: 'Aceptar',
          background: isDark ? 'rgb(69 69 69)' : '#ffffff',
          color: isDark ? '#ffffff' : '#000000',
          customClass: {
            confirmButton:
              'bg-[#0070ba] rounded-[23px] h-[45px] min-w-[150px] text-white border-none px-5 py-2.5 cursor-pointer hover:filter hover:brightness-95',
            container: 'custom-sw-container',
          },
          allowOutsideClick: true,
        }).then(() => {
          window.location.href = '/';
        });
      } else {
        setErrorMessage(resp.message);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setErrorMessage('Ha ocurrido un error al enviar la solicitud.');
    } finally {
      setLoading(false);
    }
  };

  const convertToBase64 = (fileList: FileList): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (fileList && fileList.length > 0) {
        const file = fileList[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          resolve(reader.result as string);
        };
        reader.onerror = (error) => {
          reject(error);
        };
      } else {
        resolve('');
      }
    });
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

        {loading ? (
          <button
            disabled
            className="flex h-12 w-full items-center justify-center gap-2 rounded bg-gray-400 px-4 text-lg font-semibold text-white hover:bg-gray-500"
          >
            <Image
              src="/gif/cargando.gif"
              width={20}
              height={20}
              alt="loading"
              className="mb-0.5 mr-1"
            />{' '}
            Enviando...
          </button>
        ) : (
          <button
            type="submit"
            className="flex h-12 w-full justify-center rounded bg-blue-500 px-4 text-lg font-semibold text-white hover:bg-blue-600"
          >
            Enviar Solicitud
          </button>
        )}

        {_errorMessage && (
          <p className="mt-5 text-center text-red-500">{_errorMessage}</p>
        )}
      </form>
    </div>
  );
};

export default RequestRegisterForm;
