import React from 'react';
import CardVerify from './CardVerify';
import InfoIcon from '@/components/ui/InfoIcon/InfoIcon';

type Props = {
  frontFile: File | null;
  backFile: File | null;
  onFrontChange: (file: File | null) => void;
  onBackChange: (file: File | null) => void;
  onInfoClick?: () => void;
};

const DniUpload: React.FC<Props> = ({ frontFile, backFile, onFrontChange, onBackChange, onInfoClick }) => (
  <div className="relative mx-auto max-w-[428px] justify-center">
    <div className="absolute right-0 mt-2 hidden cursor-pointer xs:block" onClick={onInfoClick}>
      <InfoIcon />
    </div>

    <h2 className="mt-[6px] text-[18px] font-normal">Prueba de Identidad</h2>
    <p className="mx-auto text-[14px]">
      Sube una foto de tu pasaporte, licencia o identificación oficial emitida por el gobierno.
    </p>
    <div className="mt-[6px] flex flex-col items-center justify-center gap-[10px] min-[500px]:flex-row min-[500px]:gap-1">
      <CardVerify text="FRENTE" imgDoc={frontFile} onFileChange={onFrontChange} />
      <div className="hidden text-custom-blue dark:text-[#FAFAFA] min-[500px]:block">
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="112" viewBox="0 0 2 112" fill="none">
          <path d="M1 1.96301L1 110.037" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <CardVerify text="DORSO" imgDoc={backFile} onFileChange={onBackChange} />
    </div>
  </div>
);

export default DniUpload;
