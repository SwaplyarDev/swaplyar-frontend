import React from 'react';
import Swal from 'sweetalert2';
import Arrow from '../Arrow/Arrow';
import { IButtonAlertBackProps } from './types';

export const ButtonAlertBack: React.FC<IButtonAlertBackProps> = ({ isDark }: IButtonAlertBackProps) => {
  return (
    <button
      onClick={() => Swal.close()}
      className={`group relative m-1 flex h-[46px] min-w-[48px] max-w-[110px] items-center justify-center gap-2 rounded-3xl border border-buttonsLigth p-3 font-textFont text-lg font-light text-buttonsLigth hover:bg-transparent dark:border-darkText dark:text-darkText dark:hover:bg-transparent`}
    >
      <div className="relative h-5 w-5 overflow-hidden">
        <div className="absolute left-0 transition-all ease-in-out group-hover:left-1">
          <Arrow color={isDark ? '#ebe7e0' : '#012c8a'} />
        </div>
      </div>
      <p className="hidden xs:inline-block">Volver</p>
    </button>
  );
};

export default ButtonAlertBack;
