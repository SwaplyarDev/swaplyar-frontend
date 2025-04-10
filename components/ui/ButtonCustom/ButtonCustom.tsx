'use client';

type ButtonCustomProps = {
  setShowVerify: (value: boolean) => void;
  className: string;
  title: string;
};

export const ButtonCustom: React.FC<ButtonCustomProps> = ({ setShowVerify, className, title }) => {
  return (
    <div id="submit-25456" className={`${className}`} onClick={() => setShowVerify(true)}>
      <button
        id="submit-25456"
        className={
          'rounded-3sm h-[40px] w-[177px] rounded-[40px] bg-buttonsLigth font-titleFont font-semibold text-white'
        }
      >
        {title}
      </button>
    </div>
  );
};
