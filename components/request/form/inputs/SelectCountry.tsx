import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { CountryOption, FieldError, SelectCodeCountryProps } from '@/types/request/request';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { defaultCountryOptions } from '@/utils/defaultCountryOptions';
const NEXT_PUBLIC_REST_COUNTRIES_API_URL = process.env.NEXT_PUBLIC_REST_COUNTRIES_API_URL;

const SelectCountry: React.FC<SelectCodeCountryProps> = ({ setSelectedCodeCountry, errors, blockAll }) => {
  const [selectedCountry, setSelectedCountry] = useState<CountryOption>();
  const [isOpen, setIsOpen] = useState(false);
  const fieldName = 'calling_code';
  const errorMessage = (errors as { [key: string]: FieldError })[fieldName]?.message;
  const [countryOptions, setCountryOptions] = useState<CountryOption[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      if (!NEXT_PUBLIC_REST_COUNTRIES_API_URL) {
        console.error('Missing REST Countries API URL. Using default options.');
        setCountryOptions(defaultCountryOptions);
        if (!selectedCountry) {
          const defaultOption = defaultCountryOptions.find((option) => option.callingCode === '+54');
          setSelectedCountry(defaultOption);
          setSelectedCodeCountry(defaultOption);
        }
        return;
      }
      try {
        const response = await fetch(NEXT_PUBLIC_REST_COUNTRIES_API_URL);
        const countries = await response.json();
        const options: CountryOption[] = countries.map((country: any) => {
          const callingCode = country.idd?.root ? `${country.idd.root}${country.idd.suffixes?.[0] || ''}` : '';
          return {
            value: country.cca2,
            label: `${callingCode ? callingCode : 'Sin código'} (${country.cca2})`,
            callingCode,
            country: country.name.common,
          };
        });
        setCountryOptions(options);
        if (!selectedCountry) {
          const defaultOption = options.find((option) => option.callingCode === '+54');
          setSelectedCountry(defaultOption);
          setSelectedCodeCountry(defaultOption);
        }
      } catch (error) {
        console.error('Error fetching countries:', error, 'Using default options.');
        setCountryOptions(defaultCountryOptions);
        if (!selectedCountry) {
          const defaultOption = defaultCountryOptions.find((option) => option.callingCode === '+54');
          setSelectedCountry(defaultOption);
          setSelectedCodeCountry(defaultOption);
        }
      }
    };

    fetchCountries();
  }, [setSelectedCodeCountry]); // No incluir `selectedCountry` en dependencias para evitar bucles

  return (
    <div className="relative w-56">
      <button
        className="flex w-full items-center justify-between rounded-lg bg-transparent px-4 py-2 text-lightText focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        disabled={selectedCountry?.label === undefined || blockAll}
      >
        <span>{`${selectedCountry?.label === undefined ? 'Cargando...' : selectedCountry?.label}`}</span>
        <ChevronDown className={cn('h-5 w-5 transition-transform', { 'rotate-180': isOpen })} />
      </button>
      {isOpen && (
        <motion.ul
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="scrollable-list absolute z-10 mt-2 max-h-64 w-full overflow-y-auto rounded-lg border border-custom-grayD-300 bg-custom-whiteD shadow-lg"
        >
          {countryOptions.map((country, index) => (
            <li
              key={index}
              className={cn('cursor-pointer px-4 py-2 hover:bg-gray-200', {
                'bg-gray-100': selectedCountry?.callingCode === country.callingCode,
              })}
              onClick={() => {
                setSelectedCountry(country);
                setSelectedCodeCountry(country);
                setIsOpen(false);
              }}
            >
              {`${country.label}`}
            </li>
          ))}
        </motion.ul>
      )}
      {errorMessage && <p className="mt-1 text-sm text-errorColor">{errorMessage}</p>}
    </div>
  );
};

export default SelectCountry;
