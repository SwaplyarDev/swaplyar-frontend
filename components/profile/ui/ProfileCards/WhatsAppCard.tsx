import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { useSession } from 'next-auth/react';
import { WhatsApp } from '@mui/icons-material';
import { Button } from '@mui/material';

type WhatsAppCardProps = {
  setShow: (show: boolean) => void;
};

const WhatsAppCard = ({ setShow }: WhatsAppCardProps) => {
  const { isDark } = useDarkTheme();

  const { data: session } = useSession();

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-lg">WhatsApp</h2>
        <WhatsApp className="h-[50px] w-[50px]" />
      </div>
      <div className="mt-2 flex items-center justify-between">
        <p className="">{session?.user.phone}</p>
        <Button onClick={() => setShow(true)} className="h-6 px-2 text-xs text-gray-400">
          Editar
        </Button>
      </div>
    </>
  );
};

export default WhatsAppCard;
