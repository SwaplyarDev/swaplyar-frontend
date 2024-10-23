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
  register,
}: SelectCountryProps) {
  const [countryOptions, setCountryOptions] = useState<CountryOption[]>([]);
  const [countryValues, setCountryValues] = useState<CountryOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<
    SingleValue<CountryOption>
  >({
    value: 'AR',
    label: 'AR',
    callingCode: '+54',
  });
  const [isFocused, setIsFocused] = useState(false);

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
      <div
        className={clsx(
          'flex items-center rounded border border-[#6B7280] bg-gray-200 dark:bg-lightText',
          errors.phone
            ? 'mb-0 border-red-500'
            : isFocused
              ? 'border-blue-600'
              : 'mb-5 hover:border-blue-600 dark:hover:border-white',
        )}
        onFocus={() => setIsFocused(true)} // Manejador de foco en el contenedor
        onBlur={() => setIsFocused(false)} // Manejador de desenfoque en el contenedor
        tabIndex={0} // Asegúrate de que el div pueda recibir el enfoque
      >
        <Select
          id="country"
          options={countryOptions}
          value={
            countryValues.find(
              (option) => option.value === selectedOption?.value,
            ) || null
          }
          onChange={(option) => setSelectedOption(option)}
          onFocus={() => setIsFocused(true)} // Agrega onFocus
          onBlur={() => setIsFocused(false)} // Agrega onBlur
          formatOptionLabel={({ label }: CountryOption) => (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{label}</span>
            </div>
          )}
          filterOption={(option, inputValue) => {
            const search = inputValue.toLowerCase();
            return (
              option.data.value.toLowerCase().includes(search) ||
              option.data.callingCode.includes(search)
            );
          }}
          isSearchable
          classNamePrefix="custom-select"
          className={clsx(
            'w-full max-w-24 rounded py-px text-gray-900 dark:text-white',
          )}
          getOptionLabel={(option: CountryOption) => option.value}
          getOptionValue={(option: CountryOption) => option.value}
          placeholder="AR"
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
            clearIndicator: () => ({
              display: 'none', // Ocultar la X
            }),
            dropdownIndicator: (provided) => ({
              ...provided,
              padding: '0 8px', // Asegura espacio para la flecha desplegable
            }),
            indicatorSeparator: () => ({
              display: 'none', // Elimina el separador vertical "|"
            }),
            placeholder: (provided) => ({
              ...provided,
              color: 'gray',
              opacity: 0.7,
            }),
          }}
        />

        <p className="flex h-full items-center justify-center">
          {selectedOption?.callingCode}
        </p>
        <input
          placeholder="Telefono"
          className="w-full border-none bg-transparent focus:border-none focus:outline-none focus:ring-0"
          type="tel"
          onFocus={() => setIsFocused(true)} // Agrega onFocus
          onBlur={() => setIsFocused(false)} // Agrega onBlur
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
