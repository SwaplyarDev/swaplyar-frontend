import React, { useState } from 'react';
import { ButtonCustom } from '@/components/ui/ButtonCustom/ButtonCustom';

const CardVerify = ({ text, onFileChange }: { text: string; onFileChange: (file: File | null) => void }) => {
  const [file, setFile] = useState<File | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);
    onFileChange(selectedFile); // Llamamos al callback para pasar el archivo al componente padre
  };
  return (
    <form className="inline-block text-center">
      <h2 className="w-auto text-[18px] font-normal">{text}</h2>

      <div className="border-1 flex w-auto flex-col rounded-[16px] border-[#90B0FE] bg-[#FFFFF8] p-[10px]">
        <p className="text-[8px] text-[#012A8E]">arrastra el archivo aquí o</p>
        <div className="box-border rounded-[40px] border-[2px] border-transparent p-[2px] hover:border-2 hover:border-buttonsLigth">
          <ButtonCustom
            className="rounded-3sm flex h-[34px] w-[124px] cursor-pointer justify-center rounded-[40px] bg-buttonsLigth font-titleFont font-semibold text-white"
            title="Subir"
            onClick={() => document.getElementById(`${text}-file-input`)?.click()} // Abrir el input al hacer click en el botón
          />
          <input
            type="file"
            id={`${text}-file-input`}
            className="hidden"
            accept="image/png, image/jpg, image/jpeg, application/pdf"
            onChange={handleFileChange} // Manejamos el archivo cuando cambia
          />
        </div>
        <p className="text-[8px] text-[#012A8E]">formatos de archivo: PNG, JPG, PDF</p>
        <p className="text-green-600">imagen subida con éxito</p>
      </div>
    </form>
  );
};

export default CardVerify;
