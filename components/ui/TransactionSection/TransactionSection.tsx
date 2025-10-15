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
  isSending,
}) => {
  return (
    <div className="relative flex w-full sm:min-h-[100px] flex-col-reverse items-end text-custom-blue-800 dark:text-darkText sm:flex-row-reverse">
      <SystemSelect
        systems={systems}
        selectedSystem={selectedSystem}
        onSystemSelect={onSystemSelect}
        inputId={`${isSending ? 'send' : 'receive'}InputUniqueID`}
        isSending={isSending}
        showOptions={showOptions}
        toggleSelect={toggleSelect}
      />

      <InputTransactionCalculator
        id={`${isSending ? 'send' : 'receive'}InputUniqueID`}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        placeholder="0"
      />

      <div className="absolute top-1/2 left-5 right-5 -translate-y-1/2 h-[2px] sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-[2px] sm:h-[calc(100%-20px)] sm:right-auto bg-custom-blue-800 dark:bg-gray-200"></div>
    </div>
  );
};

export default TransactionSection;
