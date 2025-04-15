import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { Email } from '@mui/icons-material';
import { useSession } from 'next-auth/react';

const EmailCard = () => {
  const { isDark } = useDarkTheme();

  const { data: session } = useSession();

  return (
    <div
      className={`mx-4 mb-4 w-[75%] max-w-[796px] rounded-2xl ${isDark ? 'bg-[#4B4B4B]' : 'bg-white text-black shadow-xl'} p-4 md-tablet:w-full`}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg">Correo Electrónico</h2>
        <Email className="h-[50px] w-[50px]" />
      </div>
      <div className="mt-2 flex items-center justify-between">
        <p className="">{session?.decodedToken.email}</p>
      </div>
    </div>
  );
};

export default EmailCard;
