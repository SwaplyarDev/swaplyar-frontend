import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { FieldError, SelectLabelsProps } from '@/types/request/request';
import React from 'react';
import Select from 'react-select';

const SelectLabel: React.FC<SelectLabelsProps> = ({
  selectedOption,
  setSelectedOption,
  errors,
  blockAll,
  fieldName,
  options,
}) => {
  const errorMessage = (errors as { [key: string]: FieldError })[fieldName]?.message;
  const { isDark } = useDarkTheme();

  return (
    <>
      <label htmlFor={fieldName} className="hidden">
        Selecciona una opcion
      </label>
      <Select
        id={fieldName}
        options={options}
        value={options.find((option) => option.value === selectedOption)}
        onChange={(option) => setSelectedOption(option?.value)}
        isDisabled={blockAll}
        placeholder="Selecciona una opción"
        className="h-5 text-xs"
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
            maxHeight: '16px',
            minHeight: 'inherit',
            margin: '0px 0px 5px 0px',
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
          valueContainer: (provided) => ({
            ...provided,
            padding: '0px 0px 0px 3px',
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
            padding: '0px',
            margin: '0px',
            '& input': {
              font: 'inherit',
              color: 'inherit',
              userSelect: 'text',
              cursor: 'pointer',
              border: 'none',
              boxShadow: 'none',
              padding: '0px',
              margin: '0px',
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
            color: '#ebe7e0',
          }),
        }}
      />
      {errorMessage && <p className="text-sm text-red-500">• {errorMessage}</p>}
    </>
  );
};

export default SelectLabel;
