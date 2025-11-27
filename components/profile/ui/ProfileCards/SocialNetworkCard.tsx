import { FaInstagram } from "react-icons/fa";
import { useProfileStore } from '@/store/useProfileStore';

type Props = {
  onEdit: () => void;
};

const SocialNetworkCard = ({ onEdit }: Props) => {
  const socialNetworks = useProfileStore((state) => state.socialAccounts);

  return (
    <section>
      <div className="flex items-center justify-between text-custom-grayD-800 dark:text-custom-whiteD">
        <h2 className="text-[24px] font-normal">Red Social</h2>
        <FaInstagram className="w-[27px] h-[27px] " />
      </div>
      <div className="w-full flex items-center justify-between p-3">

        {socialNetworks.length > 0 ? (
          <>
            <div className="flex flex-col w-full gap-2">
              {
                socialNetworks.map((network, index) => (
                  <div key={`social-${index}`} className="flex flex-col w-full justify-between text-custom-grayD-800 dark:text-custom-whiteD">
                    <p>
                      {network.type.charAt(0).toUpperCase() + network.type.slice(1)}
                    </p>
                    <div className="flex items-center gap-2.5">
                      <p>{network.username}</p>
                    </div>
                  </div>
                ))
              }
            </div>
            <p className='italic text-sm max-w-80'>Mantén tu red social registrada para enviarte promociones y beneficios exclusivos a nuestro clientes mediante MD privado </p>
          </>
        ) : (
          <div className="w-full flex items-between">
            <span>-</span>
            <span className='italic text-sm w-full text-end me-3'>Aun no tienes redes sociales vinculadas a tu cuenta</span>
          </div>
        )}
        <div className="flex justify-end">
          <button
            className="transition-all ms-2 font-light hover:font-semibold hover:underline dark:hover:text-[#E1E1E1]  hover:text-[#2A68FE] dark:text-[#C8C8C8] "
            onClick={onEdit}
          >
            {socialNetworks.length > 0 ? "Editar" : "Agregar"}
          </button>
        </div>

      </div>
    </section>

  );
};

export default SocialNetworkCard;
