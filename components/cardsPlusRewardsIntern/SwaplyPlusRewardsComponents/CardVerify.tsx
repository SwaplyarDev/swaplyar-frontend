import React from 'react';

const CardVerify = ({ text }: { text: string }) => {
  return (
    <form className="inline-block text-center">
      <h2 className="w-auto text-[18px] font-normal">{text}</h2>

      <div className="flex w-auto flex-col rounded-[16px] border-2 border-[#90B0FE] bg-[#FFFFF8] p-[10px]">
        <p className="text-[8px] text-[#012A8E]">arrastra el archivo aquí o</p>
        <button
          id="submit-25456"
          className={
            'rounded-3sm relative mx-auto my-[3px] h-[34px] w-[124px] rounded-[40px] border bg-buttonsLigth font-titleFont font-semibold text-white hover:bg-buttonsLigth'
          }
        >
          Subir
        </button>
        <p className="text-[8px] text-[#012A8E]">formatos de archivo: PNG, JPG, PDF</p>
      </div>
    </form>
  );
};

export default CardVerify;
