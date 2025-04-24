'use client';

type ButtonCustomProps = {
  setShowVerify?: (value: boolean) => void;
  className: string;
  title: string;
  onClick?: () => void;
};

export const ButtonCustom: React.FC<ButtonCustomProps> = ({ setShowVerify, className, title, onClick }) => {
  return (
    <div className={`${className}`} onClick={onClick ?? (() => setShowVerify?.(true))}>
      <button type="button">{title}</button>
    </div>
  );
};
