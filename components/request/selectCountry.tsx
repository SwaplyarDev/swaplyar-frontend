// SelectCountry.tsx
'use client';

import { useEffect, useState } from 'react';
import Select from 'react-select';
import clsx from 'clsx';
import { FieldErrors, UseFormSetValue } from 'react-hook-form';

type CountryOption = {
  value: string;
  label: string;
  callingCode: string;
};

type SelectCountryProps = {
  errors: FieldErrors;
  setValue: UseFormSetValue<any>;
  setCurrentCountry: any;
};

export default function SelectCountry({
  errors,
  setValue,
  setCurrentCountry,
}: SelectCountryProps) {
  const [countryOptions, setCountryOptions] = useState<CountryOption[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(
    null,
  );

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

  return (
    <>
      <label
        htmlFor="country"
        className={clsx(
          errors.country ? 'text-red-500' : 'text-gray-900 dark:text-gray-300',
        )}
      >
        País
      </label>
      <Select
        id="country"
        options={countryOptions}
        value={selectedCountry}
        onChange={(option) => {
          setCurrentCountry(option);
          setSelectedCountry(option);
          setValue('country', option?.value ?? '');
        }}
        isClearable
        isSearchable
        classNamePrefix="custom-select"
        className={clsx(
          'rounded border border-[#6b7280] bg-gray-200 py-px text-gray-900 dark:bg-gray-700 dark:text-white',
          errors.country ? 'mb-0 border-red-500' : 'mb-5 hover:border-blue-600',
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
          • {errors.country.message as string}
        </p>
      )}
    </>
  );
}
