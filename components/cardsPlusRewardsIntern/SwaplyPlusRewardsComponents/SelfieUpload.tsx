import React from 'react';
import CardVerify from './CardVerify';
import InfoIcon from '@/components/ui/InfoIcon/InfoIcon';

type Props = {
  selfieFile: File | null;
  onSelfieChange: (file: File | null) => void;
  onInfoClick?: () => void;
};

const SelfieUpload: React.FC<Props> = ({ selfieFile, onSelfieChange, onInfoClick }) => (
  <div className="relative mx-auto max-w-[428px] justify-center">
    <div className="absolute right-0 mt-2 hidden cursor-pointer xs:block" onClick={onInfoClick}>
      <InfoIcon />
    </div>

    <h2 className="mt-[6px] text-[18px] font-normal">Selfie & ID</h2>
    <p className="mx-auto text-[14px]">
      Sube una selfie sosteniendo tu pasaporte, ID u otro documento oficial en tus manos (con detalles personales
      claramente visibles).
    </p>
    <div className="mt-[6px] flex justify-center gap-10">
      <CardVerify text="FOTO" imgDoc={selfieFile} onFileChange={onSelfieChange} />
    </div>
  </div>
);

export default SelfieUpload;
