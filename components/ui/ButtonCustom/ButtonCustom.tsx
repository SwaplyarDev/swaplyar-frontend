'use client';

type ButtonCustomProps = {
  setShowVerify?: (value: boolean) => void;
  className: string;
  title: string;
  onClick?: () => void;
  verifiedStatus: string;
};

export const ButtonCustom: React.FC<ButtonCustomProps> = ({
  verifiedStatus,
  setShowVerify,
  className,
  title,
  onClick,
}) => {
  const isDisabled = verifiedStatus === 'pendiente';
  return (
    <div
      className={`${className} ${isDisabled ? 'cursor-no-drop bg-buttonExpandDark' : 'bg-buttonsLigth'}`}
      onClick={!isDisabled ? (onClick ?? (() => setShowVerify?.(true))) : undefined}
    >
      <button type="button" className={` ${isDisabled && 'cursor-no-drop'}`} disabled={isDisabled}>
        {title}
      </button>
    </div>
  );
};
