// /components/request/requestRegister.tsx

'use client';

import clsx from 'clsx';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import { requestRegister } from '@/actions/request/action.requestRegister';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

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
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [countryOptions, setCountryOptions] = useState<CountryOption[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const countries = await response.json();
        const options: CountryOption[] = countries.map((country: any) => {
          const callingCode = country.idd?.root
            ? `${country.idd.root}${country.idd.suffixes?.[0] || ''}`
            : '';
          return {
            value: country.name.common,
            label: `${country.name.common} (${callingCode ? callingCode : 'Sin código'})`,
            callingCode: callingCode,
          };
        });
        setCountryOptions(options);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  console.log(selectedCountry);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage('');
    setLoading(true);

    console.log('Datos del formulario:', data);

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

    const fullPhoneNumber = `${selectedCountry?.callingCode} ${phone}`;

    const formData = new FormData();
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
          Formulario de Solicitud de Transferencia Bancaria
        </h2>

        <label
          htmlFor="first_name"
          className={clsx(
            errors.first_name ? 'text-red-500' : 'text-gray-900 dark:text-gray-300',
          )}
        >
          Nombre
        </label>
        <input
          className={clsx(
            'rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
            errors.first_name ? 'mb-0 border-red-500' : 'mb-5 hover:border-blue-600',
          )}
          type="text"
          {...register('first_name', { required: 'El nombre es obligatorio' })}
        />
        {errors.first_name && (
          <p className="mb-5 text-sm text-red-500">• {errors.first_name.message}</p>
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
          {...register('last_name', { required: 'El apellido es obligatorio' })}
        />
        {errors.last_name && (
          <p className="mb-5 text-sm text-red-500">
            • {errors.last_name.message}
          </p>
        )}

        <label
          htmlFor="country"
          className={clsx(
            errors.country
              ? 'text-red-500'
              : 'text-gray-900 dark:text-gray-300',
          )}
        >
          País
        </label>
        <Select
          id="country"
          options={countryOptions}
          value={selectedCountry}
          onChange={(option) => {
            setSelectedCountry(option);
            setValue('country', option?.value ?? '');
          }}
          isClearable
          isSearchable
          classNamePrefix="custom-select"
          className={clsx(
            'rounded border border-[#6b7280] bg-gray-200 py-px text-gray-900 dark:bg-gray-700 dark:text-white',
            errors.country
              ? 'mb-0 border-red-500'
              : 'mb-5 hover:border-blue-600',
          )}
          placeholder="Selecciona un país"
          theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              primary25: 'rgba(59, 130, 246, 0.1)',
              primary: 'rgb(59, 130, 246)',
              neutral0: 'rgb(255, 255, 255)',
              neutral20: 'rgb(209, 213, 219)',
              neutral30: 'rgba(209, 213, 219, 0.5)',
              neutral50: 'rgba(255, 255, 255, 0.5)',
            },
          })}
          styles={{
            control: (provided) => ({
              ...provided,
              border: 'none',
              boxShadow: 'none',
              backgroundColor: 'transparent',
            }),
            menu: (provided) => ({
              ...provided,
              backgroundColor: 'rgb(209, 213, 219)',
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isSelected
                ? 'rgb(59, 130, 246)'
                : state.isFocused
                  ? 'rgba(59, 130, 246, 0.1)'
                  : 'rgb(209, 213, 219)',
              color: state.isSelected ? 'white' : 'rgb(59, 130, 246)',
              padding: '5px 10px',
              cursor: 'pointer',
              userSelect: 'text',
              '&:hover': {
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
              },
            }),
            singleValue: (provided) => ({
              ...provided,
              color: 'text-gray-900 dark:text-white',
              userSelect: 'text',
            }),
            input: (provided) => ({
              ...provided,
              color: 'inherit',
              background: 'none',
              boxShadow: 'none',
              '& input': {
                font: 'inherit',
                color: 'inherit',
                userSelect: 'text',
                border: 'none',
                boxShadow: 'none',
              },
            }),
            clearIndicator: (provided) => ({
              ...provided,
              color: 'inherit',
            }),
          }}
        />
        {errors.country && (
          <p className="mb-5 text-sm text-red-500">
            • {errors.country.message}
          </p>
        )}

        <label
          htmlFor="phone"
          className={clsx(
            errors.phone
              ? 'text-red-500'
              : 'text-gray-900 dark:text-gray-300',
          )}
        >
          Teléfono
        </label>
        <input
          className={clsx(
            'rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
            errors.phone
              ? 'mb-0 border-red-500'
              : 'mb-5 hover:border-blue-600',
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
            • {errors.phone.message}
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
          {...register('amount_sent', { required: 'El monto enviado es obligatorio' })}
        />
        {errors.amount_sent && (
          <p className="mb-5 text-sm text-red-500">
            • {errors.amount_sent.message}
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
          {...register('amount_received', { required: 'El monto recibido es obligatorio' })}
        />
        {errors.amount_received && (
          <p className="mb-5 text-sm text-red-500">
            • {errors.amount_received.message}
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
          {...register('identifier', { required: 'El identificador es obligatorio' })}
        />
        {errors.identifier && (
          <p className="mb-5 text-sm text-red-500">
            • {errors.identifier.message}
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
          {...register('payment_method', { required: 'El método de pago es obligatorio' })}
        />
        {errors.payment_method && (
          <p className="mb-5 text-sm text-red-500">
            • {errors.payment_method.message}
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
          {...register('document', { required: 'El número de documento es obligatorio' })}
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
          {...register('type_of_document', { required: 'El tipo de documento es obligatorio' })}
        />
        {errors.type_of_document && (
          <p className="mb-5 text-sm text-red-500">
            • {errors.type_of_document.message}
          </p>
        )}

        <label
          htmlFor="email"
          className={clsx(
            errors.email
              ? 'text-red-500'
              : 'text-gray-900 dark:text-gray-300',
          )}
        >
          Email
        </label>
        <input
          className={clsx(
            'rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
            errors.email
              ? 'mb-0 border-red-500'
              : 'mb-5 hover:border-blue-600',
          )}
          type="email"
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
            • {errors.email.message}
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
          {...register('proof_of_payment', { required: 'El comprobante de pago es obligatorio' })}
        />
        {errors.proof_of_payment && (
          <p className="mb-5 text-sm text-red-500">
            • {errors.proof_of_payment.message}
          </p>
        )}

        <label
          htmlFor="note"
          className={clsx(
            errors.note
              ? 'text-red-500'
              : 'text-gray-900 dark:text-gray-300',
          )}
        >
          Nota (Opcional)
        </label>
        <textarea
          className={clsx(
            'rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
            errors.note
              ? 'mb-0 border-red-500'
              : 'mb-5 hover:border-blue-600',
          )}
          {...register('note')}
        />
        {errors.note && (
          <p className="mb-5 text-sm text-red-500">
            • {errors.note.message}
          </p>
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
