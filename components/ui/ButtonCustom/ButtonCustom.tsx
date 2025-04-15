'use client';

type ButtonCustomProps = {
  setShowVerify?: (value: boolean) => void;
  className: string;
  title: string;
};

export const ButtonCustom: React.FC<ButtonCustomProps> = ({ setShowVerify, className, title }) => {
  return (
    <div id="submit-25456" className={`${className}`} onClick={() => setShowVerify?.(true)}>
      <button id="submit-25456" className={''}>
        {title}
      </button>
    </div>
  );
};
