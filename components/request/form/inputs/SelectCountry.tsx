import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { CountryOption, FieldError, SelectCodeCountryProps } from '@/types/request/request';
import { defaultCountryOptions } from '@/utils/defaultCountryOptions';
const NEXT_PUBLIC_REST_COUNTRIES_API_URL = process.env.NEXT_PUBLIC_REST_COUNTRIES_API_URL;

const SelectCountry: React.FC<SelectCodeCountryProps> = ({
  selectedCodeCountry,
  setSelectedCodeCountry,
  errors,
  blockAll,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const fieldName = 'calling_code';
  const errorMessage = (errors as { [key: string]: FieldError })[fieldName]?.message;
  const [countryOptions, setCountryOptions] = useState<CountryOption[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      if (!NEXT_PUBLIC_REST_COUNTRIES_API_URL) {
        console.error('Missing REST Countries API URL. Using default options.');
        setCountryOptions(defaultCountryOptions);

        // Solo establecer el valor por defecto si no hay uno seleccionado
        if (!selectedCodeCountry) {
          const defaultOption = defaultCountryOptions.find((option) => option.callingCode === '+54');
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

        // Si no hay país seleccionado, usar `+54`
        if (!selectedCodeCountry) {
          const defaultOption = options.find((option) => option.callingCode === '+54');
          setSelectedCodeCountry(defaultOption);
        }
      } catch (error) {
        console.error('Error fetching countries:', error, 'Using default options.');
        setCountryOptions(defaultCountryOptions);

        // Solo asignar `+54` si no hay país seleccionado
        if (!selectedCodeCountry) {
          const defaultOption = defaultCountryOptions.find((option) => option.callingCode === '+54');
          setSelectedCodeCountry(defaultOption);
        }
      }
    };

    fetchCountries();
  }, [setSelectedCodeCountry]);

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
        className="flex items-center justify-between gap-1 rounded-lg bg-transparent py-2 pl-4 font-textFont text-lightText focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        disabled={selectedCodeCountry?.label === undefined || blockAll}
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
          className="scrollable-list absolute top-16 z-10 mt-2 max-h-64 w-full overflow-y-auto border border-custom-grayD-300 bg-custom-whiteD shadow-lg"
        >
          {countryOptions.map((country, index) => (
            <li
              key={index}
              className={cn('flex cursor-pointer justify-between px-4 py-2 font-textFont hover:bg-gray-200', {
                'bg-gray-100': selectedCodeCountry?.callingCode === country.callingCode,
              })}
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
