import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { useSession } from 'next-auth/react';
import { useInfoPersonalFormStore } from '../../store/InfoPersonalFormStore';

type InfoCardProps = {
  setShow: (show: boolean) => void;
};

type InfoRowProps = {
  label: string;
  value?: string | null;
  editable?: boolean;
  onEdit?: () => void;
  className?: string;
};

const InfoRow = ({ label, value = '-', editable, onEdit, className = '' }: InfoRowProps) => (
  <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center  ${className}`}>
    <p className="text-[20px] sm:text-[20px]">{label}</p>
    <div className="flex items-center justify-end text-[16px] sm:text-[20px] text-right">
      {value}
      {editable && (
        <button
          className="ml-6 h-6 text-[16px] font-light text-[#0148F4] dark:hover:text-[#E1E1E1] hover:text-[#2A68FE] dark:text-[#C8C8C8] hover:font-normal"
          onClick={onEdit}
        >
          Editar
        </button>
      )}
    </div>
  </div>
);

const InfoCard = ({ setShow }: InfoCardProps) => {
  const { data: session } = useSession();
  const profile = session?.user.profile;
  const { alias } = useInfoPersonalFormStore();

  return (
    <>
      <h2 className="mb-3 sm:px-6 px-1 text-[28px] sm:text-[36px]">Información Personal</h2>
      <div className="flex flex-col sm:gap-y-1 gap-y-3 sm:px-6 px-4">
        <InfoRow label="Nombre Legal" value={session?.user.fullName} />
        <InfoRow label="Nacionalidad" value={profile?.nationality ?? '-'} />
        <InfoRow label="N° de Documento" value={profile?.identification ?? '-'} />
        <InfoRow label="Fecha de Nacimiento" value={profile?.birthday ?? '-'} />
        {/* ambos editables se editan desde el mismo modal */}
        <InfoRow
          label="Apodo"
          value={alias || profile?.nickName || '-'}
          editable
          onEdit={() => setShow(true)}
          className="sm:mt-[15px]"
        />
        <InfoRow
          label="Ubicación"
          value={alias || profile?.location || '-'}
          editable
          onEdit={() => setShow(true)}
          className="sm:mt-[15px]"
        />
      </div>
    </>
  );
};

export default InfoCard;
