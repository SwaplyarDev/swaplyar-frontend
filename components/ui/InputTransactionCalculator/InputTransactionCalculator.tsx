import clsx from 'clsx';

interface InputTransactionCalculatorProps {
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

export const InputTransactionCalculator: React.FC<InputTransactionCalculatorProps> = ({
  id,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div
      className={clsx(
        'relative flex w-full items-center min-h-[82px] md:min-h-[90px] lg:h-full dark:border-custom-whiteD',
      )}
    >
      <input
        type="text"
        className="inputChangeAutofill h-full w-full border-0 bg-transparent py-1 md:py-2 text-end text-2xl sm:text-[2.8rem] text-custom-grayD focus:border-inherit focus:placeholder-transparent dark:placeholder-custom-whiteD focus:shadow-none focus:outline-none focus:ring-0 dark:text-custom-whiteD sm:text-end"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />

      <fieldset
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-b-none rounded-tl-2xl rounded-tr-2xl border-y-2 border-b-0 border-l-2 border-r-2 border-custom-blue-800 dark:border-gray-200 sm:rounded-bl-2xl sm:rounded-br-none sm:rounded-tr-none sm:border-b-2 sm:border-r-0"
      >
      </fieldset>
    </div>
  );
};
