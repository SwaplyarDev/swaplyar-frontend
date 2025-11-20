import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { MdOutlineEmail } from "react-icons/md";
import { useProfileStore } from '@/store/useProfileStore';

type EmailCardProps = {
  setShow: (show: boolean) => void;
};

const EmailCard = ({ setShow }: EmailCardProps) => {
  const { isDark } = useDarkTheme();
  const userProfile = useProfileStore((state) => state.userProfile);

  return (
    <section >
      <div className="flex items-center justify-between text-custom-grayD-800 dark:text-custom-whiteD">
        <h2 className="mb-3 text-[24px] font-normal">Correo Electrónico</h2>
        <MdOutlineEmail className="w-[27px] h-[27px] " />
      </div>
      <div className="mt-2 p-3 flex items-center justify-between ">
        <p className="text-[16px] text-custom-grayD-800 dark:text-custom-whiteD">{userProfile?.email}</p>
        <p className='italic text-xs max-w-80'>Todos los Email se enviaran al correo electrónico con el que te registraste</p>
      </div>
    </section>
  );
};

export default EmailCard;
