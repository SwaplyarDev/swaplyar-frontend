import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { useProfileStore } from '@/store/useProfileStore';
import { InfoRow } from './InfoRow';

type InfoCardProps = {
  setShow: (show: boolean) => void;
};

const InfoCard = ({ setShow }: InfoCardProps) => {
  const userProfile = useProfileStore((state) => state.userProfile);
  const alias = useProfileStore((state) => state.alias);

  return (
    <>
      <h2 className="mb-3 text-2xl font-normal text-custom-grayD-800 dark:text-custom-whiteD">Información Personal</h2>
      <div className="flex flex-col sm:gap-y-1 font-normal gap-y-3 p-3">
        <InfoRow label="Nombre Legal" value={`${userProfile?.firstName || ''} ${userProfile?.lastName || ''}`.trim()} />
        <InfoRow label="Nacionalidad" value={'-'} />
        <InfoRow label="N° de Documento" value={userProfile?.identification ?? '-'} />
        <InfoRow label="Fecha de Nacimiento" value={userProfile?.birthday ?? '-'} />
        {/* ambos editables se editan desde el mismo modal */}
        <InfoRow
          label="Apodo"
          value={alias || userProfile?.nickName || '-'}
          editable
          onEdit={() => setShow(true)}
        />
      </div>
    </>
  );
};

export default InfoCard;
