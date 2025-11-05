// components/TransactionSection.tsx
import SystemSelect from '@/components/Transaction/SystemSelect/SystemSelect';
import { System } from '@/types/data';
import { InputTransactionCalculator } from '../InputTransactionCalculator/InputTransactionCalculator';
import { useDarkTheme } from '../theme-Provider/themeProvider';

interface TransactionSectionProps {
  systems: System[];
  selectedSystem: System | null;
  onSystemSelect: (system: System) => void;
  showOptions: boolean;
  toggleSelect: () => void;
  value: string;
  onChange: (value: string) => void;
  isSending: boolean;
}

const TransactionSection: React.FC<TransactionSectionProps> = ({
  systems,
  selectedSystem,
  onSystemSelect,
  showOptions,
  toggleSelect,
  value,
  onChange,
  isSending
}) => {
  const { isDark } = useDarkTheme();
  
  return (
      <div
        className={`
          relative border-[1px] sm:border-1  flex w-full 
          max-sm:max-h-[70px] md:min-h-[100px] flex-row-reverse items-end 
          text-custom-blue-800 dark:text-darkText sm:flex-row-reverse rounded-2xl
          ${isDark ? 'bg-darkBackground border-whiteD text-whiteD' : 'border-custom-blue-800'}
        `}
      >

      <div className='max-sm:order-2 w-full h-full'>
        <SystemSelect
          systems={systems}
          selectedSystem={selectedSystem}
          onSystemSelect={onSystemSelect}
          inputId={`${isSending ? 'send' : 'receive'}InputUniqueID`}
          isSending={isSending}
          showOptions={showOptions}
          toggleSelect={toggleSelect}
        />
      </div>
      <div className='max-sm:order-1 w-full h-full'>
        <InputTransactionCalculator
          id={`${isSending ? 'send' : 'receive'}InputUniqueID`}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
          placeholder="0"
        />
      </div>
      <div className="absolute max-sm:hidden sm:top-[50%] md:top-[55%] lg:top-1/2 left-5 right-5 -translate-y-1/2 h-[2px] sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 md:-translate-y-10 sm:w-[1px] sm:h-[calc(100%-30px)] md:h-[calc(100%-27px)] lg:h-[calc(100%-20px)] sm:right-auto bg-custom-blue-800 dark:bg-custom-whiteD"></div>
    </div>
  );
};

export default TransactionSection;