import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { useSession } from 'next-auth/react';
import { WhatsApp } from '@mui/icons-material';
import { useWhatsAppFormStore } from '../../store/WhatsAppFormStore';

type WhatsAppCardProps = {
  setShow: (show: boolean) => void;
};

const WhatsAppCard = ({ setShow }: WhatsAppCardProps) => {
  const { isDark } = useDarkTheme();

  const { data: session } = useSession();
  const { phone } = useWhatsAppFormStore();

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="mb-3 sm:px-6 px-2 text-[28px] sm:text-[36px]">WhatsApp</h2>
        <WhatsApp className="mr-[20px]" />
      </div>
      <div className="mt-2 flex items-center justify-between">
        <p className="text-[16px] sm:text-[20px] sm:px-6 px-2">{(phone || session?.user.profile?.phone) ?? '-'}</p>
        <button className={`h-6 text-[16px] font-light text-[#0148F4] dark:hover:text-[#E1E1E1] hover:text-[#2A68FE] dark:text-[#C8C8C8] hover:font-normal mr-6`} onClick={() => setShow(true)} >
          Editar
        </button>
      </div>
    </>
  );
};

export default WhatsAppCard;
