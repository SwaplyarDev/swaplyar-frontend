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
        'relative flex w-full items-center min-h-[70px] sm:min-h-[80px] md:min-h-[100px] lg:h-full dark:border-custom-whiteD',
      )}
    >
      <input
        type="text"
        className="inputChangeAutofill h-full w-full border-0 bg-transparent py-1 md:py-2 text-end text-[28px] sm:text-[2.8rem] text-custom-grayD focus:border-inherit focus:placeholder-transparent dark:placeholder-custom-whiteD focus:shadow-none focus:outline-none focus:ring-0 dark:text-custom-whiteD sm:text-end"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />

      <fieldset
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
      </fieldset>
    </div>
  );
};