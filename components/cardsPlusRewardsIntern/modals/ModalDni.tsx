import React from 'react';
import Image from 'next/image';
import { swaplyPlusDNI, swaplyPlusDNI2 } from '@/utils/assets/imgDatabaseCloudinary';
interface ShowModalDniProos {
  ShowModalDni: number;
  className?: string;
  setShowModalDni?: React.Dispatch<React.SetStateAction<number>>;
}

const ModalDni: React.FC<ShowModalDniProos> = ({ ShowModalDni, className, setShowModalDni }) => {
  const stopAndSet = (e: any) => {
    e.stopPropagation();
    setShowModalDni?.(0);
  };
  return (
    <div className="absolute z-50 h-full w-full border-2 bg-black bg-opacity-50" onClick={(e) => stopAndSet(e)}>
      <Image
        src={ShowModalDni == 1 ? swaplyPlusDNI : swaplyPlusDNI2}
        alt="DNI verification example"
        width={300}
        height={200}
        className="absolute left-1/2 top-1/2 m-auto -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
};

export default ModalDni;
