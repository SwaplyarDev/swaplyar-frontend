import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { Email } from '@mui/icons-material';
import { useSession } from 'next-auth/react';

type EmailCardProps = {
  setShow: (show: boolean) => void;
};

const EmailCard = ({ setShow }: EmailCardProps) => {
  const { isDark } = useDarkTheme();
// siempre trae el email actualizado desde la sesión
  const { data: session } = useSession();

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="mb-3 sm:px-6 px-2 text-[28px] sm:text-[36px] md:text-[36px]">Correo Electrónico</h2>
        <Email className="h-[50px] w-[50px] mr-[20px]" />
      </div>
      <div className="mt-2 flex items-center justify-between">
        <p className="text-[16px] sm:text-[20px] sm:px-6 px-2">{session?.user.email}</p>
        <button
          className={`h-6 text-[16px] font-light text-[#0148F4] dark:hover:text-[#E1E1E1] hover:text-[#2A68FE] dark:text-[#C8C8C8] hover:font-normal mr-6`}
          onClick={() => setShow(true)}
        >
          Editar
        </button>
      </div>
    </>
  );
};

export default EmailCard;
