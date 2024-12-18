// /components/request/form/inputs/SelectCodeCountry.tsx

import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Select from 'react-select';
import { CountryOption, FieldError, SelectCodeCountryProps } from '@/types/request/request';
const NEXT_PUBLIC_REST_COUNTRIES_API_URL = process.env.NEXT_PUBLIC_REST_COUNTRIES_API_URL;

const SelectCodeCountry: React.FC<SelectCodeCountryProps> = ({
  selectedCodeCountry,
  setSelectedCodeCountry,
  errors,
  blockAll,
}) => {
  const fieldName = 'calling_code';
  const errorMessage = (errors as { [key: string]: FieldError })[fieldName]?.message;
  const { isDark } = useDarkTheme();
  const [countryOptions, setCountryOptions] = useState<CountryOption[]>([]);
  const [countryValues, setCountryValues] = useState<CountryOption[]>([]);

  useEffect(() => {
    console.log('NEXT_PUBLIC_REST_COUNTRIES_API_URL:  ', NEXT_PUBLIC_REST_COUNTRIES_API_URL);
    const fetchCountries = async () => {
      if (!NEXT_PUBLIC_REST_COUNTRIES_API_URL) {
        console.error('Missing REST Countries API URL');
        return;
      }
      try {
        const response = await fetch(NEXT_PUBLIC_REST_COUNTRIES_API_URL);
        const countries = await response.json();
        console.log('countries:  ', countries);
        const options: CountryOption[] = countries.map((country: any) => {
          const callingCode = country.idd?.root ? `${country.idd.root}${country.idd.suffixes?.[0] || ''}` : '';
          return {
            value: country.cca2, // Usar la sigla del país (ej. 'AR')
            label: `${callingCode ? callingCode : 'Sin código'} (${country.cca2})`, // Mostrar código de área y sigla
            callingCode: callingCode,
            country: country.name.common,
          };
        });
        const options2: CountryOption[] = countries.map((country: any) => {
          const callingCode = country.idd?.root ? `${country.idd.root}${country.idd.suffixes?.[0] || ''}` : '';
          return {
            value: country.cca2, // Usar la sigla del país (ej. 'AR')
            label: `${country.cca2}`, // Mostrar código de área y sigla
            callingCode: callingCode,
            country: country.name.common,
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
        htmlFor={fieldName}
        className={clsx(errorMessage ? 'text-red-500' : 'text-gray-900 dark:text-gray-300', 'hidden')}
      >
        Selecciona un código de país
      </label>
      <Select
        id={fieldName}
        options={countryOptions}
        value={countryValues.find((option) => option.value === selectedCodeCountry?.value) || null}
        onChange={(option) => setSelectedCodeCountry(option as CountryOption)}
        isSearchable
        isDisabled={blockAll}
        classNamePrefix="custom-select"
        className={clsx('ml-[10px] w-full max-w-24 rounded py-px text-gray-900 dark:text-white')}
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
            color: isDark ? '#FFFFFF' : '#111827',
            cursor: 'pointer',
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
      {errorMessage && <p className="mt-1 text-sm text-red-500">{errorMessage}</p>}
    </>
  );
};

export default SelectCodeCountry;
