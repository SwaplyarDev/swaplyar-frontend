'use client';

type ButtonCustomProps = {
  setShowVerify?: (value: boolean) => void;
  className: string;
  title: string;
  onClick?: () => void;
  verifiedStatus: string;
  disabled?: boolean;
};

export const ButtonCustom: React.FC<ButtonCustomProps> = ({
  verifiedStatus,
  setShowVerify,
  className,
  title,
  onClick,
  disabled = false,
}) => {
  const isDisabled = verifiedStatus === 'PENDIENTE';
  return (
    <div
      className={`${className} ${isDisabled ? 'cursor-no-drop bg-buttonExpandDark' : 'bg-buttonsLigth'}`}
      onClick={!isDisabled ? (onClick ?? (() => setShowVerify?.(true))) : undefined}
    >
      <button type="button" className={` ${isDisabled && 'cursor-no-allowed'}`} disabled={isDisabled}>
        {title}
      </button>
    </div>
  );
};
