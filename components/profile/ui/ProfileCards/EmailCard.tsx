import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { MdOutlineEmail } from "react-icons/md";
import { useSession } from 'next-auth/react';

type EmailCardProps = {
  setShow: (show: boolean) => void;
};

const EmailCard = ({ setShow }: EmailCardProps) => {
  const { isDark } = useDarkTheme();
  // siempre trae el email actualizado desde la sesión
  const { data: session } = useSession();

  return (
    <section className='sm:px-6 px-4 '>
      <div className="flex items-center justify-between">
        <h2 className="mb-3 text-[24px] font-normal">Correo Electrónico</h2>
        <MdOutlineEmail className="w-[27px] h-[27px] " />
      </div>
      <div className="mt-2  flex items-center justify-between ">
        <p className="text-[16px] ">{session?.user.email}</p>
       
      </div>
    </section>
  );
};

export default EmailCard;
