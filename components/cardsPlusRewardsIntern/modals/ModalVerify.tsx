import React, { useEffect, useState } from 'react';
import CardVerify from '@/components/cardsPlusRewardsIntern/SwaplyPlusRewardsComponents/CardVerify';
import InfoIcon from '@/components/ui/InfoIcon/InfoIcon';
import AlertIcon from '@/components/ui/AlertIcon/AlertIcon';
import ModalDni from './ModalDni';
import { useSession } from 'next-auth/react';
import Swal from 'sweetalert2';
import { plusRewardsActions } from '@/actions/plusRewards/plusRewards.actions';

export type ModalProps = {
  showVerify: boolean;
  setShowVerify: React.Dispatch<React.SetStateAction<boolean>>;
  verifiedStatus: string;
};

const ModalVerify: React.FC<ModalProps> = ({ showVerify, setShowVerify }) => {
  const { data: session } = useSession();
  const [ShowModalDni, setShowModalDni] = useState(0);
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFrontFileChange = (file: File | null) => setFrontFile(file);
  const handleBackFileChange = (file: File | null) => setBackFile(file);
  const handleSelfieFileChange = (file: File | null) => setSelfieFile(file);

  useEffect(() => {
    // Bloquea el scroll del body al montar
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';

    // Vuelve a activar el scroll al desmontar
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleSubmit = async () => {
    if (!frontFile || !backFile || !selfieFile) {
      Swal.fire({
        icon: 'warning',
        text: 'por favor sube todas las imagenes',

        customClass: { popup: 'text-white' },

        background: '#ffffff00',
        showConfirmButton: false,
        timer: 1000,
      });
      return;
    }
    setIsLoading(true);

    const formData = new FormData();
    formData.append('frontImage', frontFile);
    formData.append('backImage', backFile);
    formData.append('selfieImage', selfieFile);

    const result = await plusRewardsActions(formData, session?.decodedToken.token || '');
    if (result.success) {
      Swal.fire({
        icon: 'success',
        background: '#ffffff00',
        showConfirmButton: false,
        timer: 1000,
      });
      setIsLoading(false);
    } else {
      Swal.fire({
        icon: 'error',
        background: '#ffffff00',
        showConfirmButton: false,
        timer: 1000,
      });
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-textFont text-[16px]"
      onClick={() => {
        setShowVerify(false);
      }}
    >
      {!!ShowModalDni && (
        <div className="absolute z-20 h-full w-full">
          <ModalDni ShowModalDni={ShowModalDni} setShowModalDni={setShowModalDni} />
        </div>
      )}

      <div
        className={`relative m-2 flex h-auto max-h-[670px] w-[595px] max-w-[592px] flex-col overflow-y-auto rounded-2xl bg-[#FFFFFB] px-[16px] py-[30px] sm:px-0 ${ShowModalDni && 'bg-opacity-100'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="w-full px-[23px] text-[32px] font-light sm:text-[36px]">Verificación</h1>
        <button
          className="absolute right-0 top-0 mr-3 text-[32px]"
          onClick={() => {
            setShowVerify(false);
          }}
        ></button>

        <div className="flex justify-center gap-[7px] text-[#CE1818]">
          <AlertIcon />
          <div className="flex-col justify-center">
            <h2 className="text-[18px] font-semibold">TU CUENTA NO ESTA VERIFICADA</h2>
            <h3 className="text-[12px]">Necesitas cargar la documenta para la verificación</h3>
          </div>
        </div>
        <hr className="mx-[32px] mb-1 mt-3 border-t-2 border-custom-blue xs:mx-[52px]" />

        <div className="relative mx-auto max-w-[428px] justify-center">
          <div className="absolute right-0 hidden xs:block" onClick={() => setShowModalDni(1)}>
            <InfoIcon />
          </div>

          <h2 className="mt-[6px] text-[18px] font-normal">Prueba de Identidad</h2>
          <p className="mx-auto text-[14px]">
            Sube una foto de tu pasaporte, licencia o identificación oficial emitida por el gobierno.
          </p>
          <div className="mt-[6px] flex flex-col items-center justify-center gap-[10px] sm:flex-row sm:gap-10">
            <CardVerify text={'FRENTE'} imgDoc={frontFile} onFileChange={handleFrontFileChange} />
            <div className="hidden sm:block">
              <svg xmlns="http://www.w3.org/2000/svg" width="2" height="112" viewBox="0 0 2 112" fill="none">
                <path d="M1 1.96301L1 110.037" stroke="#012A8E" stroke-width="2" stroke-linecap="round" />
              </svg>
            </div>

            <CardVerify text={'DORSO'} imgDoc={backFile} onFileChange={handleBackFileChange} />
          </div>
        </div>
        <hr className="mx-[32px] mb-1 mt-3 border-t-2 border-custom-blue xs:mx-[52px]" />

        <div className="relative mx-auto max-w-[428px] justify-center">
          <div className="absolute right-0 hidden xs:block" onClick={() => setShowModalDni(2)}>
            {' '}
            <InfoIcon />
          </div>

          <h2 className="mt-[6px] text-[18px] font-normal">Selfie & ID</h2>
          <p className="mx-auto text-[14px]">
            Sube una selfie sosteniendo tu pasaporte, ID u otro documento oficial en tus manos (con detalles personales
            claramente visibles).
          </p>
          <div className="mt-[6px] flex justify-center gap-10">
            <CardVerify text={'FOTO'} imgDoc={selfieFile} onFileChange={handleSelfieFileChange} />
          </div>
        </div>

        <hr className="mx-[32px] mb-1 mt-3 border-t-2 border-custom-blue xs:mx-[52px]" />
        <div className="mt-[12px] flex flex-col items-center justify-end gap-3">
          <button
            className={`relative h-[39px] w-[194px] rounded-[40px] font-titleFont font-semibold text-white ${frontFile && backFile && selfieFile ? 'bg-custom-blue' : 'bg-[#90B0FE]'} ${isLoading ? 'cursor-not-allowed opacity-70' : ''}`}
            onClick={handleSubmit}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <svg className="h-5 w-5 animate-spin text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              </div>
            ) : (
              'Enviar'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalVerify;
