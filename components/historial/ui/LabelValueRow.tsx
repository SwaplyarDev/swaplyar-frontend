const labelClass = 'text-sm md:text-base text-custom-grayD-800 dark:text-white';
const valueClass = 'text-right text-sm md:text-base text-custom-grayD-800 dark:text-white';

const LabelValueRow = ({
  label,
  value,
  valueClassName = valueClass,
}: {
  label: string;
  value?: string;
  valueClassName?: string;
}) => (
  <>
    <div className={labelClass}>{label}</div>
    <div className={`${valueClassName}`}>
      <div className="overflow-x-auto whitespace-nowrap max-w-full inline-block lg:overflow-y-hidden">
        {value ?? 'No disponible'}
      </div>
    </div>
  </>
);

export default LabelValueRow;