'use client';

type VerifyButtonProps = {
  setShowVerify: (value: boolean) => void;
  className: string;
  title: string;
};

export const VerifyButton: React.FC<VerifyButtonProps> = ({ setShowVerify, className, title }) => {
  return (
    <div id="submit-25456" className={`${className}`} onClick={() => setShowVerify(true)}>
      <button
        id="submit-25456"
        className={
          'rounded-3sm h-[40px] w-[177px] rounded-[40px] bg-buttonsLigth font-titleFont font-semibold text-white'
        }
      >
        <p>{title}</p>
      </button>
    </div>
  );
};
