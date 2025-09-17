import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { Email } from '@mui/icons-material';
import { useSession } from 'next-auth/react';

const EmailCard = () => {
  const { isDark } = useDarkTheme();

  const { data: session } = useSession();

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="mb-3 sm:px-6 px-2 text-[28px] sm:text-[36px] md:text-[36px]">Correo Electrónico</h2>
        <Email className="h-[50px] w-[50px] mr-[20px]" />
      </div>
      <div className="mt-2 flex items-center justify-between">
        <p className="text-[16px] sm:text-[20px] sm:px-6 px-2">{session?.user.email}</p>
      </div>
    </>
  );
};

export default EmailCard;
