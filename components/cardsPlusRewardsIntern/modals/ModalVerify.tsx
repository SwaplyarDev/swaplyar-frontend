import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Swal from 'sweetalert2';
import { CheckCircle } from 'lucide-react';

// Actions & hooks
import { plusRewardsActions } from '@/actions/plusRewards/plusRewards.actions';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';

// UI Components
import LoadingGif from '@/components/ui/LoadingGif/LoadingGif';
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

/* -------------------------------------------------------------------------- */
/*                                    TYPES                                   */
/* -------------------------------------------------------------------------- */

export type ModalProps = {
  showVerify: boolean;
  setShowVerify: React.Dispatch<React.SetStateAction<boolean>>;
  verifiedStatus: string;
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
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-[#E5E6E8] px-4 py-4">

      {/* IZQUIERDA */}
      <div className="flex items-center gap-4">
        <div className="flex h-[80px] w-[80px] items-center justify-center rounded-full bg-[#F2F2F2]">
          <img
            src={imageSrc}
            alt={title}
            className="h-[48px] w-[48px] object-contain"
            draggable={false}
          />
        </div>

        {/* TEXTO + ESTADO */}
        <div className="max-w-[320px]">
          <p className="text-sm font-bold text-[#1A1A1A]">{title}</p>

          <p className="text-sm text-gray-600 leading-snug">
            {description}
          </p>

          {hasFile && (
            <div className="mt-1 flex items-center gap-1 text-xs font-medium text-green-600">
              <CheckCircle className="h-4 w-4" />
              Imagen subida correctamente
            </div>
          )}
        </div>
      </div>

      {/* DERECHA */}
      <label className="cursor-pointer">
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={(e) =>
            e.target.files?.[0] && onUpload(e.target.files[0])
          }
        />

        <div
          className={`
            flex items-center justify-center
            h-[34px] min-w-[141px]
            rounded-full
            px-[14px] py-[12px]
            text-[14px] font-semibold leading-none
            transition-colors
            ${hasFile
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-[#012A8E] hover:bg-[#0239B0]'
            }
            text-white
          `}
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

  /* ------------------------------- Side effects ------------------------------ */

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  /* --------------------------------- Submit ---------------------------------- */

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

    try {
      const result = await plusRewardsActions(
        formData,
        session?.accessToken || ''
      );

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
      }
    } catch (err) {
      if ((err as Error)?.message === 'Unauthorized') {
        const updated = await update();
        const newToken =
          (updated as any)?.accessToken || session?.accessToken || '';

        try {
          const retry = await plusRewardsActions(formData, newToken);

          if (retry.success) {
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

            return;
          }
        } catch {
          // fallback al error general
        }
      }

      Swal.fire({
        icon: 'error',
        background: '#ffffff00',
        showConfirmButton: false,
        timer: 1000,
      });

      setIsLoading(false);
    }
  };

  /* ---------------------------------- RENDER --------------------------------- */

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 font-textFont text-[16px]"
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
          rounded-2xl bg-[#FFFFFB] dark:bg-[#4b4b4b]
          shadow-lg flex flex-col
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* BOTÓN CERRAR */}
        <button
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          onClick={() => setShowVerify(false)}
        >
          <CloseIcon className="h-5 w-5" />
        </button>

        {/* HEADER */}
        <header className="relative px-6 pt-6 pb-4 mb-2">
          <div className="absolute left-6 top-6 flex flex-col items-start gap-2">
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50"
              onClick={() => setShowVerify(false)}
            >
              <ArrowLeft className="h-4 w-4 text-[#012A8E]" />
            </button>

            <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              No verificado
            </div>
          </div>

          <h1 className="text-center text-[20px] sm:text-[24px] font-semibold text-[#012A8E]">
            Verificación de identidad
          </h1>
        </header>

        {/* CUERPO */}
        <div className="flex-1 overflow-y-auto px-6 pb-6 pt-4 space-y-6">
          {/* WARNING */}
          <section className="flex gap-3 rounded-2xl border border-[#FFD89A] bg-[#FFF6E5] px-4 py-3">
            <AlertTriangle className="h-5 w-5 text-[#F59E0B]" />
            <div>
              <p className="text-sm font-semibold text-[#B45309]">
                TU CUENTA NO ESTA VERIFICADA
              </p>
              <p className="text-xs text-[#92400E]">
                Sube tus documentos para completar la verificación y disfrutar los beneficios de SwaplyAr.
              </p>
            </div>
          </section>

          {/* INFO */}
          <section className="flex items-center gap-2 rounded-md bg-white px-3 py-2 text-xs sm:text-sm text-gray-600 border border-gray-200">
            <Info className="h-4 w-4 text-[#012A8E]" />
            <p>
              Si tienes dudas, consulta los{' '}
              <span className="font-semibold">
                ejemplos de cómo subir la documentación
              </span>.
            </p>
          </section>

          {/* UPLOADS */}
          <section className="rounded-2xl border border-gray-200 bg-gray-50 px-4 sm:px-6 py-5 space-y-4">
            <UploadItem
              title="FRENTE:"
              description="Sube una foto de tu pasaporte, licencia o identificación oficial."
              imageSrc="/images/frente.png"
              onUpload={handleFrontFileChange}
              hasFile={!!frontFile}
            />

            <UploadItem
              title="DORSO:"
              description="Sube una foto de tu pasaporte, licencia o identificación oficial."
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

          <hr className="border-gray-200" />

          {/* FOOTER */}
          <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-2 text-xs text-gray-500 max-w-[320px]">
              <ShieldCheck className="mt-[2px] h-4 w-4 text-[#012A8E]" />
              <p>
                Tus datos están protegidos y se usan solo para verificar tu identidad.
              </p>
            </div>

            {isLoading ? (
              <LoadingGif
                color={isDark ? '#ebe7e0' : '#012c8a'}
                size="42px"
              />
            ) : (
              <button
                className={`
                  h-[48px] min-w-[200px] rounded-[999px] px-6
                  text-sm sm:text-base font-semibold text-white
                  ${frontFile && backFile && selfieFile
                    ? 'bg-[#012A8E] hover:bg-[#0239B0]'
                    : 'cursor-not-allowed bg-[#90B0FE] opacity-70'
                  }
                `}
                onClick={handleSubmit}
              >
                Enviar para revisión
              </button>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ModalVerify;
