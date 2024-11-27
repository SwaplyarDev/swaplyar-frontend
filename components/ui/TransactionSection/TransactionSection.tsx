// components/TransactionSection.tsx
import SystemSelect from '@/components/Transaction/SystemSelect/SystemSelect';
import { System } from '@/types/data';
import { InputTransactionCalculator } from '../InputTransactionCalculator/InputTransactionCalculator';

interface TransactionSectionProps {
  systems: System[];
  selectedSystem: System | null;
  onSystemSelect: (system: System) => void;
  showOptions: boolean;
  toggleSelect: () => void;
  value: string;
  onChange: (value: string) => void;
  label: string;
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
  label,
  isSending,
}) => {
  return (
    <div className="relative flex w-full max-w-lg flex-col-reverse items-end text-blue-800 dark:text-darkText sm:flex-row-reverse">
      <SystemSelect
        systems={systems}
        selectedSystem={selectedSystem}
        onSystemSelect={onSystemSelect}
        label={label}
        inputId={`${isSending ? 'send' : 'receive'}InputUniqueID`}
        isSending={isSending}
        showOptions={showOptions}
        toggleSelect={toggleSelect}
      />

      <div className="absolute top-0 mt-20 w-full flex-col justify-center px-6 xs:mt-[7.6rem] sm:right-0 sm:top-[inherit] sm:mr-64 sm:mt-0 sm:flex sm:h-[7.4rem] sm:w-0 sm:px-0">
        <div className="bg h-[1px] w-full bg-blue-800 dark:bg-gray-200 sm:h-24 sm:w-[2px]"></div>
      </div>

      <InputTransactionCalculator
        id={`${isSending ? 'send' : 'receive'}InputUniqueID`}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        placeholder="0"
        label={label}
      />
    </div>
  );
};

export default TransactionSection;
