import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Swal from 'sweetalert2';
import { CheckCircle } from 'lucide-react';

// Actions & hooks
import { plusRewardsActions } from '@/actions/plusRewards/plusRewards.actions';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';

// UI Components
import ModalDni from './ModalDni';
import DniUpload from '../SwaplyPlusRewardsComponents/DniUpload';
import SelfieUpload from '../SwaplyPlusRewardsComponents/SelfieUpload';

// 🔹 lucide-react
import {
  AlertTriangle,
  ArrowLeft,
  Info,
  ShieldCheck,
  X as CloseIcon,
} from 'lucide-react';
import ButtonBack from '@/components/ui/ButtonBack/ButtonBack';
import ButtonAuth from '@/components/auth/AuthButton';

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

export type ModalProps = {
  showVerify: boolean;
  setShowVerify: React.Dispatch<React.SetStateAction<boolean>>;
  verifiedStatus: string;
  memberCode?: string;   
};

type UploadItemProps = {
  title: string;
  description: string;
  imageSrc: string;
  hasFile: boolean;
  onUpload: (file: File) => void;
};

/* -------------------------------------------------------------------------- */
/*                              UPLOAD ITEM UI                                */
/* -------------------------------------------------------------------------- */

const UploadItem = ({
  title,
  description,
  imageSrc,
  onUpload,
  hasFile,
}: UploadItemProps) => {
  return (
    <div
      className="
        flex flex-col sm:flex-row
        items-start sm:items-center
        justify-between
        gap-4
        rounded-2xl
        bg-[#E5E6E8] dark:bg-custom-grayD-900
        px-4 py-4
      "
    >
      <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 w-full">

        <div className="flex h-[80px] w-[80px] items-center justify-center rounded-full bg-[#F2F2F2] dark:bg-custom-grayD-800 shrink-0">
          <img
            src={imageSrc}
            alt={title}
            className="h-[48px] w-[48px] object-contain"
            draggable={false}
          />
        </div>

        <div className="text-center sm:text-left w-full">
          <p className="text-sm font-bold text-[#1A1A1A] dark:text-custom-whiteD">{title}</p>

          <p className="text-sm text-gray-600 dark:text-custom-whiteD-800 leading-snug">
            {description}
          </p>

          {hasFile && (
            <div className="mt-1 flex sm:justify-start justify-center items-center gap-1 text-xs font-medium text-green-600 dark:text-custom-green">
              <CheckCircle className="h-4 w-4" />
              Imagen subida correctamente
            </div>
          )}
        </div>
      </div>

      <label className="cursor-pointer w-full sm:w-auto flex justify-center sm:justify-end">
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={(e) =>
            e.target.files?.[0] && onUpload(e.target.files[0])
          }
        />

        <div
          className="
            flex items-center justify-center
            h-[34px] min-w-[141px]
            rounded-full
            px-[14px] py-[12px]
            text-[14px] font-semibold leading-none
            transition-colors
            bg-[#012A8E] hover:bg-[#0239B0]
            dark:bg-buttonsLigthDark dark:hover:bg-custom-blue-400
            text-white dark:text-gray-700
          "
        >
          {hasFile ? 'Reemplazar' : 'Subir'}
        </div>
      </label>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                                MAIN MODAL                                  */
/* -------------------------------------------------------------------------- */

const ModalVerify: React.FC<ModalProps> = ({ showVerify, setShowVerify }) => {
  const { data: session, update } = useSession();
  const { isDark } = useDarkTheme();

  const [ShowModalDni, setShowModalDni] = useState(0);
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFrontFileChange = (file: File | null) => setFrontFile(file);
  const handleBackFileChange = (file: File | null) => setBackFile(file);
  const handleSelfieFileChange = (file: File | null) => setSelfieFile(file);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleSubmit = async () => {
    if (!frontFile || !backFile || !selfieFile) return;

    setIsLoading(true);

    const formData = new FormData();
    formData.append('document_front', frontFile);
    formData.append('document_back', backFile);
    formData.append('selfie_image', selfieFile);

    try {
      const result = await plusRewardsActions(
        formData,
        session?.accessToken || ''
      );

      if (result.success) {
        setTimeout(() => {
          setShowVerify(false);
        }, 1000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 font-textFont text-[16px]"
      onClick={() => setShowVerify(false)}
    >
      {!!ShowModalDni && (
        <div className="absolute z-20 h-full w-full">
          <ModalDni
            ShowModalDni={ShowModalDni}
            setShowModalDni={setShowModalDni}
          />
        </div>
      )}

      <div
        className="
          relative m-3 w-full max-w-[700px] max-h-[90vh]
          rounded-2xl bg-[#FFFFFB] dark:bg-custom-grayD-900
          shadow-lg flex flex-col
        "
        onClick={(e) => e.stopPropagation()}
      >

        <header className="relative flex flex-col gap-3 px-6 pt-6 pb-4">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-2">
              <ButtonBack
                onClick={() => setShowVerify(false)}
                className='p-0 m-0'
              />

              <div className="inline-flex items-center gap-2 rounded-full bg-red-50 dark:bg-custom-grayD-800 px-3 py-1 text-xs font-medium text-red-600 dark:text-errorTextColorDark w-fit">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                No verificado
              </div>
            </div>

            <h1 className="text-[20px] sm:text-[24px] font-semibold text-[#012A8E] dark:text-custom-whiteD text-right">
              Verificación de identidad
            </h1>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-6 pb-6 pt-4 space-y-6">

        <section className="flex gap-3 rounded-2xl border border-[#FFD89A] bg-[#FFF6E5] px-4 py-3 border-b
  dark:border-[rgba(147,55,13,1)]
  dark:bg-[rgba(147,55,13,0.9)]">

  <AlertTriangle className="h-5 w-5 text-[#F59E0B] dark:text-custom-yellow" />

  <div>
    <p className="text-sm font-semibold text-[#B45309] dark:text-custom-whiteD">
      TU CUENTA NO ESTA VERIFICADA
    </p>

    <p className="text-xs text-[#92400E] dark:text-custom-whiteD-800">
      Sube tus documentos para completar la verificación.
    </p>
  </div>
</section>


          <section className="flex items-center gap-2 rounded-md px-3 py-2 pt-4 text-xs sm:text-sm text-gray-600 dark:text-custom-whiteD-800 border-t border-gray-200 dark:border-custom-grayD-700">
            <Info className="h-4 w-4 text-[#012A8E] dark:text-custom-whiteD" />
            <p>
              Si tienes dudas, consulta los{' '}
              <span
                className="font-semibold text-[#012A8E] dark:text-custom-whiteD cursor-pointer hover:underline"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowModalDni(1);
                }}
              >
                ejemplos de cómo subir la documentación
              </span>.
            </p>
          </section>

          <section className="rounded-2xl border border-gray-200 dark:border-custom-grayD-700 bg-gray-50 dark:bg-custom-grayD-800 px-4 sm:px-6 py-5 space-y-4">
            <UploadItem
              title="FRENTE:"
              description="Sube una foto de tu documento."
              imageSrc="/images/frente.png"
              onUpload={handleFrontFileChange}
              hasFile={!!frontFile}
            />

            <UploadItem
              title="DORSO:"
              description="Sube una foto de tu documento."
              imageSrc="/images/dorso.png"
              onUpload={handleBackFileChange}
              hasFile={!!backFile}
            />

            <UploadItem
              title="Selfie + documento:"
              description="Sube una selfie con tu documento visible."
              imageSrc="/images/selfie+documento.png"
              onUpload={handleSelfieFileChange}
              hasFile={!!selfieFile}
            />
          </section>

          <hr className="border-gray-200 dark:border-custom-grayD-700" />

          <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-2 text-xs text-gray-500 dark:text-custom-whiteD-800 max-w-[320px]">
              <ShieldCheck className="mt-[2px] h-4 w-4 text-[#012A8E] dark:text-custom-whiteD" />
              <p>
                Tus datos están protegidos y se usan solo para verificar tu identidad.
              </p>
            </div>

            <ButtonAuth
              label="Enviar para revisión"
              onClick={handleSubmit}
              loading={isLoading}
              disabled={!(frontFile && backFile && selfieFile)}
              isDark={isDark}
              className="min-w-[200px] text-[12px] leading-[16px] sm:text-[20px] sm:leading-[24px]"
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default ModalVerify;
