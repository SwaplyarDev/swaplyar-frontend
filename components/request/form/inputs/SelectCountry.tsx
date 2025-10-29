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
  // add prop for god view in modal because this broke visual
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
    <div ref={dropdownRef}>
      <button
        // className="flex items-center justify-between gap-1 rounded-lg bg-transparent py-2 pl-4 font-textFont text-lightText focus:outline-none"
        className={`
          ${classNames} 
          flex items-center justify-between gap-1 rounded-lg bg-transparent py-2 font-textFont focus:outline-none
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
          className={`scrollable-list absolute ${maxHeightModal ? "top-10" : "top-16 "} z-10 mt-2 ${maxHeightModal ? "max-h-40" : "max-h-64"}  w-full overflow-y-auto border border-custom-grayD-300 bg-custom-whiteD shadow-lg`}
        >
          {countryOptions.map((country, index) => (
            <li
              key={index}
              className={cn(
                'flex cursor-pointer justify-between px-4 py-2 font-textFont hover:bg-buttonsLigth hover:text-darkText',
                {
                  'bg-gray-100': selectedCodeCountry?.callingCode === country.callingCode,
                },
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
