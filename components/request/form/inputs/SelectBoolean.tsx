import React, { useState } from 'react';
import { FieldErrors, UseFormSetValue } from 'react-hook-form';
import Select, { SingleValue, MultiValue, StylesConfig } from 'react-select';
import clsx from 'clsx';

interface Option {
  value: string;
  label: string;
}

const options: Option[] = [
  { value: 'si', label: 'Sí' },
  { value: 'no', label: 'No' },
];

type SelectBooleanProps = {
  errors: FieldErrors;
  setValue: UseFormSetValue<any>;
  setCurrentCountry: any;
  register: any;
  setSelectedOption: (option: Option | null) => void;
  selectedOption: Option | null;
};

const SelectBoolean = ({
  errors,
  setValue,
  setCurrentCountry,
  register,
  setSelectedOption,
  selectedOption,
}: SelectBooleanProps) => {
  // Cambiamos el tipo de la función handleChange
  // const handleChange = (
  //   newValue: SingleValue<Option> | MultiValue<Option>,
  //   actionMeta: any, // Puedes tipar esto más específicamente si lo deseas
  // ) => {
  //   console.log('Opción seleccionada:', newValue);
  // };

  return (
    <>
      <label
        htmlFor="own_account"
        className={clsx(
          errors.own_account ? 'text-red-500' : 'text-gray-900 dark:text-gray-300',
        )}
      ></label>
      <Select
        id="own_account"
        options={options}
        value={selectedOption}
        onChange={(option) => {
          setSelectedOption(option);
          setValue('own_account', option?.value);
        }}
        placeholder="Selecciona una opción"
        classNamePrefix="custom-select"
        isSearchable={false}
        className={clsx(
          'dark:bg- h-[38px] w-full rounded border bg-gray-200 text-gray-900 focus:border-blue-600 dark:bg-lightText dark:text-white',
          errors.own_account
            ? 'border-red-500'
            : 'border-[#6B7280] hover:border-blue-600 dark:hover:border-white',
        )}
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
            cursor: 'pointer',
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
            cursor: 'pointer',
            '& input': {
              font: 'inherit',
              color: 'inherit',
              userSelect: 'text',
              cursor: 'pointer',
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
            color: '#6B7280',
          }),
        }}
      />
      {errors.own_account && (
        <p className="mb-5 text-sm text-red-500">
          • {errors.own_account.message as string}
        </p>
      )}
    </>
  );
};

export default SelectBoolean;
