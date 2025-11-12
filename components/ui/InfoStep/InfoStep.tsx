import React, { FC } from 'react';
import InfoIcon from '../InfoIcon/InfoIcon';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';

interface InfoStepProps {
  step: number;
}

const InfoStep: FC<InfoStepProps> = ({ step }) => {
  const { isDark } = useDarkTheme();
  
  if (step !== 2 && step !== 3) return null;

  return (
    <button type="button" className="group relative">
      <div className="relative w-5 h-5 sm:w-[30px] sm:h-[30px] rounded-full">
        <InfoIcon className="w-full h-full relative z-0" />
        <div
          className={`{
            absolute inset-0
            ${isDark ? '' : 'bg-[#FAFAFA]'}
            skew-x-[50deg]
            scale-[1.6] sm:scale-[1.3]
            -translate-x-2
            transition-transform duration-500 ease-in-out
            group-hover:translate-x-[-150%] group-hover:translate-y-[150%]
            z-10
            pointer-events-none}`}          
          style={{
            filter: 'blur(2px)',
            maskImage: 'radial-gradient(ellipse at center, black 70%, black 85%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 70%, black 85%, transparent 100%)'
          }}
        />
      </div>
      <div className="z-50 invisible absolute -right-5 bottom-full mb-2 w-max max-w-[287px] scale-90 rounded-2xl bg-buttonsLigth p-[10px] text-sm text-white opacity-0 transition-all duration-300 ease-in-out group-hover:visible group-hover:scale-100 group-hover:opacity-100 mini-phone:right-0 dark:bg-custom-grayD-700">
        <p className="text-center font-textFont text-xs font-light text-darkText dark:text-lightText">
          {step === 2 ? (
            <>
              🚨 <span className="font-bold">Importante:</span> Es importante que sepas que los pagos llegarán a la
              cuenta destinataria a nombre de nuestro proveedor, y no a nombre de <b>SwaplyAr</b>.
            </>
          ) : (
            <>
              🚨 <span className="font-bold">Importante:</span> Para agilizar tu solicitud, asegúrate de subir
              correctamente tu comprobante. Un error en este paso puede retrasar el proceso.
            </>
          )}
        </p>
      </div>
    </button>
  );
};

export default InfoStep;