import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { useSession } from 'next-auth/react';
import { FaWhatsapp } from "react-icons/fa";
import { useWhatsAppFormStore } from '../../store/WhatsAppFormStore';
import clsx from 'clsx';

type WhatsAppCardProps = {
  setShow: (show: boolean) => void;
};

const WhatsAppCard = ({ setShow }: WhatsAppCardProps) => {
  const { isDark } = useDarkTheme();

  // store ya contiene el teléfono actualizado, en profile hay un useEffect que lo sincroniza al cargar
  const { phone } = useWhatsAppFormStore();
  console.log(typeof (phone), "phone");

  return (
    <>
      <section className='sm:px-6 px-4 '>
        <div className="flex items-center justify-between">
          <h2 className="mb-3 text-[24px] font-normal">WhatsApp</h2>
          <FaWhatsapp className={clsx("w-[27px] h-[27px]", isDark ? 'text-white-400' : 'text-white-500')} />
        </div>
        <div className="mt-2 flex items-center justify-between">
          <p className={`${phone ? "font-normal" : "font-semibold"} `}>{phone ? phone : "-"}</p>
          <button
            className="text-[16px] transition-all font-light hover:font-semibold hover:underline dark:hover:text-[#E1E1E1]  hover:text-[#2A68FE] dark:text-[#C8C8C8] "
            onClick={() => setShow(true)}
          >
            Editar
          </button>
        </div>
      </section>

    </>
  );
};

export default WhatsAppCard;
