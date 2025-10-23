import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { useSession } from 'next-auth/react';
import { useInfoPersonalFormStore } from '../../store/InfoPersonalFormStore';
import { InfoRow } from './InfoRow';

type InfoCardProps = {
  setShow: (show: boolean) => void;
};




const InfoCard = ({ setShow }: InfoCardProps) => {
  const { data: session } = useSession();
  const profile = session?.user.profile;
  const location = profile?.location?.[0];
  const { alias } = useInfoPersonalFormStore();

  return (
    <>
      <h2 className="mb-3 text-[24px] sm:px-6 px-4 font-normal">Información Personal</h2>
      <div className="flex flex-col sm:gap-y-1 font-normal gap-y-3 sm:px-6 px-4">
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
          classNameValue='text-[24px] '
        />
        {/* <InfoRow
          label="Ubicación"
          value={
            location
              ? `${location.country}, ${location.department}`
              : "-"
          }
          editable
          onEdit={() => setShow(true)}
          className="sm:mt-[15px]"
        /> */}
      </div>
    </>
  );
};

export default InfoCard;
