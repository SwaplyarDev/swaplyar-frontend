import React, { useEffect, useState } from 'react';
import AlertIcon from '@/components/ui/AlertIcon/AlertIcon';
import ModalDni from './ModalDni';
import { useSession } from 'next-auth/react';
import Swal from 'sweetalert2';
import { plusRewardsActions } from '@/actions/plusRewards/plusRewards.actions';
import LoadingGif from '@/components/ui/LoadingGif/LoadingGif';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import Arrow from '@/components/ui/Arrow/Arrow';
import DniUpload from '../SwaplyPlusRewardsComponents/DniUpload';
import SelfieUpload from '../SwaplyPlusRewardsComponents/SelfieUpload';

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
  const { isDark } = useDarkTheme();

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
    formData.append('document_front', frontFile);
    formData.append('document_back', backFile);
    formData.append('selfie_image', selfieFile);

    const result = await plusRewardsActions(formData, session?.accessToken || '');
    if (result.success) {
      Swal.fire({
        icon: 'success',
        background: '#ffffff00',
        showConfirmButton: false,
        timer: 1000,
      });
      setIsLoading(false);
      setTimeout(() => {
        setShowVerify(false);
      }, 1000);
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
        className={`relative m-2 flex h-[96%] max-h-[770px] w-[595px] max-w-[592px] flex-col overflow-y-auto rounded-2xl bg-[#FFFFFB] px-[16px] py-[30px] dark:bg-[#4b4b4b] sm:px-0 ${ShowModalDni && 'bg-opacity-100'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="mb-4 mt-[-20px] w-full text-[32px] sm:px-4 sm:text-[36px]">Verificación</h1>
        <button
          className="absolute right-0 top-3 mr-3 text-[22px]"
          onClick={() => {
            setShowVerify(false);
          }}
        >
          X
        </button>

        <div className="flex justify-center gap-[7px] text-[#CE1818]">
          <AlertIcon />
          <div className="flex-col justify-center">
            <h2 className="text-[14px] font-semibold sm:text-[18px]">TU CUENTA NO ESTA VERIFICADA</h2>
            <h3 className="text-[12px] sm:text-[14px]">Necesitas cargar la documenta para la verificación</h3>
          </div>
        </div>
        <hr className="mb-1 mt-3 border-t-2 border-custom-blue dark:border-[#FAFAFA] xs:mx-[52px]" />

        <DniUpload
          frontFile={frontFile}
          backFile={backFile}
          onFrontChange={handleFrontFileChange}
          onBackChange={handleBackFileChange}
          onInfoClick={() => setShowModalDni(1)}
        />

        <hr className="mb-1 mt-3 border-t-2 border-custom-blue dark:border-[#FAFAFA] xs:mx-[52px]" />

        <SelfieUpload
          selfieFile={selfieFile}
          onSelfieChange={handleSelfieFileChange}
          onInfoClick={() => setShowModalDni(2)}
        />

        <hr className="mb-1 mt-3 border-t-2 border-custom-blue dark:border-[#FAFAFA] xs:mx-[52px]" />
        <div className="mt-[12px] flex flex-col items-center justify-end gap-3">
          {isLoading ? (
            <LoadingGif color={isDark ? '#ebe7e0' : '#012c8a'} size="42px" />
          ) : (
            <button
              className={`relative h-[39px] w-[194px] rounded-[40px] font-titleFont font-semibold text-white ${
                frontFile && backFile && selfieFile
                  ? 'bg-custom-blue ring-offset-[#FAFAFA] hover:ring-2 hover:ring-[#012A8E] hover:ring-offset-2 dark:bg-[#FAFAFA] dark:text-[#252526] dark:ring-offset-[#4B4B4B] hover:dark:ring-[#EBE7E0]'
                  : 'cursor-not-allowed bg-[#90B0FE] opacity-70 dark:bg-[#FAFAFA] dark:text-[#252526]'
              } `}
              onClick={handleSubmit}
            >
              Enviar
            </button>
          )}
        </div>
        <div className="mt-2 flex items-center justify-center sm:order-1 sm:hidden">
          <button
            type="button"
            onClick={() => {
              setShowVerify(false);
            }}
            className={`group relative m-1 flex h-[40px] min-w-[40px] max-w-[90px] items-center justify-center gap-1 rounded-3xl border border-buttonsLigth px-3 py-1 text-sm font-light text-buttonsLigth hover:bg-transparent dark:border-darkText dark:text-darkText dark:hover:bg-transparent`}
          >
            <div className="relative h-4 w-4 overflow-hidden">
              <div className="absolute left-0 transition-all ease-in-out group-hover:left-1">
                <Arrow color={isDark ? '#ebe7e0' : '#012c8a'} />
              </div>
            </div>
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalVerify;
