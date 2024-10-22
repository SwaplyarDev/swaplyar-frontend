// SelectCountry.tsx
'use client';

import { useEffect, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import clsx from 'clsx';
import { FieldErrors, UseFormSetValue } from 'react-hook-form';

type CountryOption = {
  value: string; // Sigla del país
  label: string; // Nombre del país y código de área
  callingCode: string; // Código de área
};

type SelectCountryProps = {
  errors: FieldErrors;
  setValue: UseFormSetValue<any>;
  setCurrentCountry: any;
  register: any;
};

export default function SelectCountry({
  errors,
  setValue,
  setCurrentCountry,
  register
}: SelectCountryProps) {
  const [countryOptions, setCountryOptions] = useState<CountryOption[]>([]);
  const [countryValues, setCountryValues] = useState<CountryOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<SingleValue<CountryOption>>(null);

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
            value: country.cca2, // Usar la sigla del país (ej. 'AR')
            label: `${callingCode ? callingCode : 'Sin código'} (${country.cca2})`, // Mostrar código de área y sigla
            callingCode: callingCode,
          };
        });
        const options2: CountryOption[] = countries.map((country: any) => {
          const callingCode = country.idd?.root
            ? `${country.idd.root}${country.idd.suffixes?.[0] || ''}`
            : '';
          return {
            value: country.cca2, // Usar la sigla del país (ej. 'AR')
            label: `${country.cca2}`, // Mostrar código de área y sigla
            callingCode: callingCode,
          };
        });
        setCountryOptions(options);
        setCountryValues(options2);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <>
      <label
        htmlFor="phone"
        className={clsx(
          errors.country ? 'text-red-500' : 'text-gray-900 dark:text-gray-300',
        )}
      >
        Telefono
      </label>
      <div className='flex gap-1'>
        <Select
          id="country"
          options={countryOptions}
          value={countryValues.find(option => option.value === selectedOption?.value) || null}
          onChange={(option) => setSelectedOption(option)} // Establecer la opción seleccionada
          // Formatear las opciones para mostrar país + código de área en la lista
          formatOptionLabel={({ label }: CountryOption) => (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{label}</span>
            </div>
          )}
          isClearable
          isSearchable
          classNamePrefix="custom-select"
          className={clsx(
            'rounded border border-[#6b7280] bg-gray-200 py-px text-gray-900 dark:bg-gray-700 dark:text-white',
            errors.country
              ? 'mb-0 border-red-500'
              : 'mb-5 hover:border-blue-600',
          )}
          getOptionLabel={(option: CountryOption) => option.value}
          getOptionValue={(option: CountryOption) => option.value}
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
            placeholder: (provided) => ({
              ...provided,
              color: 'gray',
              opacity: 0.7,
            }),
          }}
        />
        <p>{selectedOption?.callingCode}</p>
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
      </div>
      {errors.phone && (
        <p className="mb-5 text-sm text-red-500">
          • {errors.phone.message as string}
        </p>
      )}
    </>
  );
}
