import React, { useState } from 'react';
import Select from 'react-select';
import clsx from 'clsx';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { FieldError, SelectBooleanProps } from '@/types/request/request';

const SelectBoolean: React.FC<SelectBooleanProps> = ({ selectedOption, setSelectedOption, errors, blockAll }) => {
  const fieldName = 'own_account';
  const errorMessage = (errors as { [key: string]: FieldError })[fieldName]?.message;
  const [isFocused, setIsFocused] = useState(false);
  const { isDark } = useDarkTheme();
  return (
    <>
      <label
        htmlFor={fieldName}
        className={clsx(errorMessage ? 'text-red-500' : 'text-gray-900 dark:text-gray-300', 'hidden')}
      >
        ¿Tienes cuenta propia?
      </label>
      <Select
        isDisabled={blockAll}
        id={fieldName}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        options={[
          { value: 'Si', label: 'Si' },
          { value: 'No', label: 'No' },
        ]}
        value={selectedOption !== undefined ? { value: selectedOption, label: selectedOption } : null}
        onChange={(option) => {
          setSelectedOption(option?.value || undefined);
          setIsFocused(false);
        }}
        placeholder="Selecciona una opción"
        classNamePrefix="custom-select"
        isSearchable={false}
        className={clsx(
          'h-[38px] w-full rounded border border-[#6B7280] bg-gray-200 px-[10px] text-gray-900 dark:bg-lightText dark:text-white',
          errorMessage && !isFocused
            ? 'border border-red-500 hover:border-blue-600 dark:hover:border-white'
            : isFocused
              ? 'border-blue-600 outline-none ring-1 ring-blue-600 ring-offset-blue-600 hover:border-blue-600 dark:hover:border-white'
              : 'hover:border-blue-600 dark:hover:border-white',
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
            left: '0 !important',
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
            display: 'none',
          }),
          dropdownIndicator: (provided) => ({
            ...provided,
            padding: '0 8px',
            color: isDark ? '#FFFFFF' : '#111827',
          }),
          indicatorSeparator: () => ({
            display: 'none',
          }),
          placeholder: (provided) => ({
            ...provided,
            color: '#6B7280',
          }),
        }}
      />
      {errorMessage && <p className="text-sm text-red-500">• {errorMessage}</p>}
    </>
  );
};

export default SelectBoolean;
