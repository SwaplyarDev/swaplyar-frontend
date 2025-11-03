import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { CountryOption, FieldError, SelectCodeCountryProps } from '@/types/request/request';
import { defaultCountryOptions } from '@/utils/defaultCountryOptions';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';

const SelectCountry: React.FC<SelectCodeCountryProps> = ({
  selectedCodeCountry,
  setSelectedCodeCountry,
  errors,
  classNames,
  maxHeightModal = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const fieldName = 'calling_code';
  const errorMessage = (errors as { [key: string]: FieldError })[fieldName]?.message;
  const [countryOptions, setCountryOptions] = useState<CountryOption[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isDark } = useDarkTheme();

  useEffect(() => {
    const fetchCountries = async () => {
      setCountryOptions(defaultCountryOptions);

      if (!selectedCodeCountry) {
        const defaultOption = defaultCountryOptions.find((option) => option.callingCode === '+54');
        setSelectedCodeCountry(defaultOption);
      }
      return;
    };

    fetchCountries();
  }, [selectedCodeCountry, setSelectedCodeCountry]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className=''>
      <button
        className={`
          ${classNames} 
          flex items-center justify-between gap-1 rounded-lg w-full bg-transparent py-2 font-textFont focus:outline-none
          ${isDark ? 'text-custom-whiteD-200' : 'text-custom-dark'}
        `}

        onClick={() => setIsOpen(!isOpen)}
        type="button"
        disabled={selectedCodeCountry?.label === undefined}
      >
        <span>{`${selectedCodeCountry?.label === undefined ? 'Cargando...' : selectedCodeCountry?.value}`}</span>
        <ChevronDown className={cn('h-5 w-5 transition-transform', { 'rotate-180': isOpen })} />
        <span>{`${selectedCodeCountry?.label === undefined ? '' : selectedCodeCountry?.callingCode}`}</span>
      </button>
      {isOpen && (
        <motion.ul
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className={`scrollable-list absolute top-full z-10 mt-2 w-full ${maxHeightModal ? "max-h-32" : "max-h-40"} overflow-y-auto py-4 ${isDark ? 'bg-custom-grayD-900' : 'bg-custom-whiteD'} rounded-[32px]`}
        >
          {countryOptions.map((country, index) => (
            <li
              key={index}
              className={cn(
                'flex cursor-pointer justify-between px-3 mx-1 my-1 rounded-xl font-textFont leading-5 transition-colors duration-150',
                isDark 
                  ? 'text-custom-grayD-300 hover:bg-custom-grayD-800 hover:text-white'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-white',
                {
                  [isDark ? 'bg-custom-grayD-800' : 'bg-custom-whiteD-500']: selectedCodeCountry?.callingCode === country.callingCode,
                }
              )}
              onClick={() => {
                setSelectedCodeCountry(country);
                setIsOpen(false);
              }}
            >
              <span>{country.country}</span>
              <span>{country.callingCode}</span>
            </li>
          ))}
        </motion.ul>
      )}
      {errorMessage && <p className="mt-1 text-sm text-errorColor">{errorMessage}</p>}
    </div>
  );
};

export default SelectCountry;