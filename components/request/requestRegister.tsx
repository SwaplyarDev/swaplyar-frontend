// /components/request/requestRegister.tsx

'use client';

import clsx from 'clsx';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import { requestRegister } from '@/actions/request/action.requestRegister';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

type FormInputs = {
  name: string;
  surname: string;
  whatsappNumber: string;
  cbuAlias: string;
  cuil: string;
  email: string;
  comprobante: FileList;
  note: string;
  country: string;
};

type CountryOption = {
  value: string;
  label: string;
  callingCode: string;
};

export const RequestRegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [countryOptions, setCountryOptions] = useState<CountryOption[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(
    null,
  );

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
            label: `${country.name.common} (${callingCode ? `${callingCode}` : 'Sin código'})`,
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

    // Verifica que todos los datos estén presentes
    console.log('Datos del formulario:', data);

    const {
      name,
      surname,
      whatsappNumber,
      cbuAlias,
      cuil,
      email,
      comprobante,
      note,
      country,
    } = data;

    // Combina el callingCode con el whatsappNumber
    const fullWhatsappNumber = `${selectedCountry?.callingCode} ${whatsappNumber}`;

    // Crea el FormData y añade los campos
    const formData = new FormData();
    formData.append('name', name || '');
    formData.append('surname', surname || '');
    formData.append('whatsappNumber', fullWhatsappNumber || '');
    formData.append('cbuAlias', cbuAlias || '');
    formData.append('cuil', cuil || '');
    formData.append('email', email || '');

    // Verifica que comprobante tenga al menos un archivo antes de añadirlo
    if (comprobante && comprobante.length > 0) {
      formData.append('comprobante', comprobante[0]);
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
          htmlFor="name"
          className={clsx(
            errors.name ? 'text-red-500' : 'text-gray-900 dark:text-gray-300',
          )}
        >
          Nombre
        </label>
        <input
          className={clsx(
            'rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
            errors.name ? 'mb-0 border-red-500' : 'mb-5 hover:border-blue-600',
          )}
          type="text"
          {...register('name', { required: 'El nombre es obligatorio' })}
        />
        {errors.name && (
          <p className="mb-5 text-sm text-red-500">• {errors.name.message}</p>
        )}

        <label
          htmlFor="surname"
          className={clsx(
            errors.surname
              ? 'text-red-500'
              : 'text-gray-900 dark:text-gray-300',
          )}
        >
          Apellido
        </label>
        <input
          className={clsx(
            'rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
            errors.surname
              ? 'mb-0 border-red-500'
              : 'mb-5 hover:border-blue-600',
          )}
          type="text"
          {...register('surname', { required: 'El apellido es obligatorio' })}
        />
        {errors.surname && (
          <p className="mb-5 text-sm text-red-500">
            • {errors.surname.message}
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
              '& input:focus': {
                border: 'none',
                boxShadow: 'none',
              },
            }),
          }}
        />
        {errors.country && (
          <p className="mb-5 text-sm text-red-500">
            • {errors.country.message}
          </p>
        )}

        <label
          htmlFor="whatsappNumber"
          className={clsx(
            errors.whatsappNumber
              ? 'text-red-500'
              : 'text-gray-900 dark:text-gray-300',
          )}
        >
          Número de WhatsApp
        </label>
        <input
          className={clsx(
            'rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
            errors.whatsappNumber
              ? 'mb-0 border-red-500'
              : 'mb-5 hover:border-blue-600',
          )}
          type="text"
          {...register('whatsappNumber', {
            required: 'El número de WhatsApp es obligatorio',
            validate: (value) => {
              // Eliminar espacios y comprobar que solo contiene números
              const cleanedValue = value.replace(/\s+/g, '');
              return (
                /^[0-9]+$/.test(cleanedValue) || 'Solo se permiten números'
              );
            },
            setValueAs: (value) => {
              // Eliminar espacios y devolver el valor limpio
              return value.replace(/\s+/g, '');
            },
          })}
        />
        {errors.whatsappNumber && (
          <p className="mb-5 text-sm text-red-500">
            • {errors.whatsappNumber.message}
          </p>
        )}

        <label
          htmlFor="cbuAlias"
          className={clsx(
            errors.cbuAlias
              ? 'text-red-500'
              : 'text-gray-900 dark:text-gray-300',
          )}
        >
          CBU o Alias
        </label>
        <input
          className={clsx(
            'rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
            errors.cbuAlias
              ? 'mb-0 border-red-500'
              : 'mb-5 hover:border-blue-600',
          )}
          type="text"
          {...register('cbuAlias', { required: 'CBU o Alias es obligatorio' })}
        />
        {errors.cbuAlias && (
          <p className="mb-5 text-sm text-red-500">
            • {errors.cbuAlias.message}
          </p>
        )}

        <label
          htmlFor="cuil"
          className={clsx(
            errors.cuil ? 'text-red-500' : 'text-gray-900 dark:text-gray-300',
          )}
        >
          CUIL
        </label>
        <input
          className={clsx(
            'rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
            errors.cuil ? 'mb-0 border-red-500' : 'mb-5 hover:border-blue-600',
          )}
          type="text"
          {...register('cuil', { required: 'El CUIL es obligatorio' })}
        />
        {errors.cuil && (
          <p className="mb-5 text-sm text-red-500">• {errors.cuil.message}</p>
        )}

        <label
          htmlFor="email"
          className={clsx(
            errors.email ? 'text-red-500' : 'text-gray-900 dark:text-gray-300',
          )}
        >
          Correo electrónico
        </label>
        <input
          className={clsx(
            'rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
            errors.email ? 'mb-0 border-red-500' : 'mb-5 hover:border-blue-600',
          )}
          type="email"
          {...register('email', {
            required: 'El correo electrónico es obligatorio',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'El formato del correo electrónico es inválido',
            },
          })}
        />
        {errors.email && (
          <p className="mb-5 text-sm text-red-500">• {errors.email.message}</p>
        )}

        <label
          htmlFor="comprobante"
          className={clsx(
            errors.comprobante
              ? 'text-red-500'
              : 'text-gray-900 dark:text-gray-300',
          )}
        >
          Comprobante
        </label>
        <input
          className={clsx(
            'rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
            errors.comprobante
              ? 'mb-0 border-red-500'
              : 'mb-5 hover:border-blue-600',
          )}
          type="file"
          {...register('comprobante', {
            required: 'El comprobante es obligatorio',
          })}
        />
        {errors.comprobante && (
          <p className="mb-5 text-sm text-red-500">
            • {errors.comprobante.message}
          </p>
        )}

        <label
          htmlFor="note"
          className={clsx(
            errors.note ? 'text-red-500' : 'text-gray-900 dark:text-gray-300',
          )}
        >
          Nota
        </label>
        <textarea
          className={clsx(
            'rounded border bg-gray-200 px-5 py-2 text-gray-900 dark:bg-gray-700 dark:text-white',
            errors.note ? 'mb-0 border-red-500' : 'mb-5 hover:border-blue-600',
          )}
          {...register('note')}
        ></textarea>
        {errors.note && (
          <p className="mb-5 text-sm text-red-500">• {errors.note.message}</p>
        )}

        {errorMessage && (
          <div className="mb-5 flex w-full rounded border-2 border-red-500 bg-transparent p-4">
            <ErrorOutlineIcon className="text-red-500" />
            <div className="ml-2">
              <p className="text-base text-red-500">Error</p>
              <p className="text-sm font-light text-red-500">{errorMessage}</p>
            </div>
          </div>
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
