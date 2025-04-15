import React from 'react';
import { ButtonCustom } from '@/components/ui/ButtonCustom/ButtonCustom';

const CardVerify = ({ text }: { text: string }) => {
  return (
    <form className="inline-block text-center">
      <h2 className="w-auto text-[18px] font-normal">{text}</h2>

      <div className="flex w-auto flex-col rounded-[16px] border-2 border-[#90B0FE] bg-[#FFFFF8] p-[10px]">
        <p className="text-[8px] text-[#012A8E]">arrastra el archivo aquí o</p>
        <div className="box-border rounded-[40px] border-[2px] border-transparent p-[2px] hover:border-2 hover:border-buttonsLigth">
          <ButtonCustom
            className="rounded-3sm flex h-[34px] w-[124px] cursor-pointer justify-center rounded-[40px] bg-buttonsLigth font-titleFont font-semibold text-white"
            title="Subir"
          />
        </div>
        <p className="text-[8px] text-[#012A8E]">formatos de archivo: PNG, JPG, PDF</p>
      </div>
    </form>
  );
};

export default CardVerify;
