import { ArrowRight, UserMinusIcon } from 'lucide-react';

type ManagementCardProps = {
  setShow: (show: boolean) => void;
};

const ManagementCard = ({ setShow }: ManagementCardProps) => {

  return (
    <section >
      <div className="flex items-center justify-between text-custom-grayD-800 dark:text-custom-whiteD">
        <h2 className="text-[24px] font-normal">Gestión de la cuenta</h2>
        <UserMinusIcon className="w-[27px] h-[27px] " />
      </div>
      <div className="p-3 flex items-center justify-between gap-2">
        <p className="text-[16px] text-custom-grayD-800 dark:text-custom-whiteD">Cierre de la cuenta</p>
        <div className='flex gap-2'>
          <p className='italic text-sm'>Cerrar tu cuenta es una acción permanente que no se puede deshacer</p>
          <button
            className="transition-all ms-2 font-light hover:font-semibold hover:underline dark:hover:text-[#E1E1E1]  hover:text-[#2A68FE] dark:text-[#C8C8C8] "
            onClick={() => setShow(true)}
          >
            <ArrowRight />
          </button>
        </div>

      </div>
    </section>
  );
};

export default ManagementCard;
