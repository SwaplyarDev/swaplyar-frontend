import { Button } from '@mui/material';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { useSession } from 'next-auth/react';

type InfoCardProps = {
  setShow: (show: boolean) => void;
};

const InfoCard = ({ setShow }: InfoCardProps) => {
  const { isDark } = useDarkTheme();

  const { data: session } = useSession();

  return (
    <div
      className={`mb-4 w-[75%] max-w-[796px] rounded-2xl ${isDark ? 'bg-[#4B4B4B]' : 'bg-white text-black shadow-xl'} p-4 md-tablet:w-full`}
    >
      <h2 className="mb-3 text-lg">Informacion Personal</h2>

      <div className="grid grid-cols-2 gap-y-2">
        <p className="">Nombre Legal</p>
        <p className="text-right">{session?.user.fullName}</p>

        <p className="">Nacionalidad</p>
        <p className="text-right">{session?.user.id}</p>

        <p className="">N° de Documento</p>
        <p className="text-right">{session?.user.identification}</p>

        <p className="">Fecha de Nacimiento</p>
        <p className="text-right">{session?.user.birthDate}</p>

        <p className="">Apodo</p>
        <div className="flex items-center justify-end gap-2 text-right">
          {session?.user.fullName}
          <Button onClick={() => setShow(true)} className="h-6 px-2 text-xs text-gray-400">
            Editar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
