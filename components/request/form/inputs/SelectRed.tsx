import IconArbitrum from '@/components/ui/IconsRed/IconArbitrum';
import IconBnb from '@/components/ui/IconsRed/IconBnb';
import IconOptimism from '@/components/ui/IconsRed/IconOptimism';
import IconTron from '@/components/ui/IconsRed/IconTron';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import React, { useState } from 'react';
import Select, { components } from 'react-select';
import clsx from 'clsx';

type FieldError = {
  message: string;
};

type SelectRedProps = {
  selectedRed: string | undefined;
  setSelectedRed: (option: string | undefined) => void;
  errors: { [key: string]: FieldError } | {}; // Tipado explícito
  blockAll: boolean;
};

const options = [
  {
    value: 'arbitrum',
    label: 'Arbitrum One',
    image: <IconArbitrum />,
  },
  {
    value: 'bnb',
    label: 'BNB Chain (BEP-20)',
    image: <IconBnb />,
  },
  {
    value: 'tron',
    label: 'Tron (TRC20)',
    image: <IconTron />,
  },
  {
    value: 'optimism',
    label: 'Optimism',
    image: <IconOptimism />,
  },
];

const CustomOption = (props: any) => (
  <components.Option {...props} className={clsx(props.className, 'flex items-center gap-2')}>
    {props.data.image}
    {props.label}
  </components.Option>
);

const CustomSingleValue = (props: any) => (
    <components.SingleValue {...props} className="flex items-center gap-2">
      {props.data.image}
      {props.data.label}
    </components.SingleValue>
  );

const SelectRed: React.FC<SelectRedProps> = ({
  selectedRed,
  setSelectedRed,
  errors,
  blockAll,
}) => {
  const fieldName = 'red_selection';
  const errorMessage = (errors as { [key: string]: FieldError })[fieldName]
    ?.message;
  const [isFocused, setIsFocused] = useState(false);
  const { isDark } = useDarkTheme();
  return (
    <>
      <label
        htmlFor={fieldName}
        className={clsx(
          errorMessage ? 'text-red-500' : 'text-gray-900 dark:text-gray-300',
        )}
      >
        Selecciona una Red
      </label>
      <Select
        isDisabled={blockAll}
        id={fieldName}
        onFocus={() => setIsFocused(true)} // Activa el enfoque
        onBlur={() => setIsFocused(false)}
        value={options.find((option) => option.value === selectedRed)}
        options={options}
        onChange={(option) => {
          setSelectedRed(option?.value || undefined);
          setIsFocused(false);
        }}
        components={{ Option: CustomOption, SingleValue: CustomSingleValue  }}
        isSearchable={false}
        placeholder="Selecciona una red"
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
            display: 'flex',
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

export default SelectRed;
