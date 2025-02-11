import clsx from 'clsx';

interface InputTransactionCalculatorProps {
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  label: string;
}

export const InputTransactionCalculator: React.FC<InputTransactionCalculatorProps> = ({
  id,
  value,
  onChange,
  placeholder,
  label,
}) => {
  return (
    <div
      className={clsx(
        'relative mt-[0.4rem] flex h-20 w-full items-center',
        id !== 'sendInputUniqueID' ? 'xs:h-32' : 'xs:h-[7.96rem]',
      )}
    >
      <input
        type="text"
        className="inputChangeAutofill h-full w-full border-0 bg-transparent py-2 text-end text-[2.8rem] text-custom-grayD focus:border-inherit focus:placeholder-transparent focus:shadow-none focus:outline-none focus:ring-0 dark:text-white sm:text-end"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />

      <fieldset
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-b-none rounded-tl-2xl rounded-tr-2xl border-y-2 border-b-0 border-l-2 border-r-2 border-custom-blue-800 dark:border-gray-200 sm:rounded-bl-2xl sm:rounded-br-none sm:rounded-tr-none sm:border-b-2 sm:border-r-0"
      >
        <legend className="mx-4 px-1 text-sm font-semibold text-custom-blue-800 dark:text-darkText">
          <span>{label}</span>
        </legend>
      </fieldset>
    </div>
  );
};
