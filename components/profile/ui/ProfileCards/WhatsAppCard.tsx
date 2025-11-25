import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { FaWhatsapp } from "react-icons/fa";
import { useProfileStore } from '@/store/useProfileStore';

type WhatsAppCardProps = {
  setShow: (show: boolean) => void;
};

const WhatsAppCard = ({ setShow }: WhatsAppCardProps) => {
  const { isDark } = useDarkTheme();
  const phone = useProfileStore((state) => state.phone);

  return (
    <>
      <section >
        <div className="flex items-center justify-between text-custom-grayD-800 dark:text-custom-whiteD">
          <h2 className="text-[24px] font-normal">WhatsApp</h2>
          <FaWhatsapp className="w-[27px] h-[27px] " />
        </div>
        <div className="flex items-center justify-between p-3">
          <p className={`text-custom-grayD-800 dark:text-custom-whiteD ${phone ? "font-normal" : "font-semibold"} `}>{phone ? phone : "-"}</p>
          <div className='flex gap-3'>
            <p className='italic text-sm max-w-80'>Se notificara mediante WhatsApp o correo electrónico si requerimos alguna información adicional</p>
          <button
            className="text-[16px] transition-all font-light hover:font-semibold hover:underline dark:hover:text-[#E1E1E1]  hover:text-[#2A68FE] dark:text-[#C8C8C8] "
            onClick={() => setShow(true)}
          >
            Editar
          </button>
          </div>
        </div>
      </section>

    </>
  );
};

export default WhatsAppCard;
