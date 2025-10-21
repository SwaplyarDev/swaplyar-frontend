import { FaInstagram } from "react-icons/fa";
type Props = {
  socialNetworks: { type: string; username: string }[];
  onEdit: () => void;
};

const SocialNetworkCard = ({ socialNetworks, onEdit }: Props) => {
  return (
    <>
      <section className='sm:px-6 px-4 '>
        <div className="flex items-center justify-between">
          <h2 className="mb-3 text-[24px] font-normal">Red Social</h2>
          <FaInstagram className="w-[27px] h-[27px] " />
        </div>
        <div className="mt-2 w-full flex flex-col  items-center justify-between ">
          {socialNetworks.map((network, index) => (


            <div key={`social-${index}`} className="flex w-full justify-between">
              <p className="mb-2  text-[16px] ">
                {network.type.charAt(0).toUpperCase() + network.type.slice(1)}
              </p>
              <div className="flex items-center gap-2.5">

                <p className=" text-[16px]">@{network.username}</p>

              </div>
            </div>


          ))}
          <div className="w-full flex justify-end">
            <button
              className="w-10 transition-all text-[16px] font-light hover:font-semibold hover:underline dark:hover:text-[#E1E1E1]  hover:text-[#2A68FE] dark:text-[#C8C8C8] "
              onClick={onEdit}
            >
              Editar
            </button>
          </div>

        </div>
      </section>

    </>
  );
};

export default SocialNetworkCard;
