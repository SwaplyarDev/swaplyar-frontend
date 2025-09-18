import { Instagram } from '@mui/icons-material';

type Props = {
  socialNetworks: { type: string; username: string }[];
  onEdit: () => void;
};

const SocialNetworkCard = ({ socialNetworks, onEdit }: Props) => {
  return (
    <>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="mb-3 sm:px-6 px-2 text-[28px] sm:text-[36px]">Red Social</h2>
        <Instagram className="mr-[20px] h-[50px] w-[50px]" />
      </div>

      {socialNetworks.map((network, index) => (
        <div key={`social-${index}`} className="flex justify-between">
          <p className="mb-2 sm:px-6 px-2 text-[18px] sm:text-[20px]">
            {network.type.charAt(0).toUpperCase() + network.type.slice(1)}
          </p>
          <p className="sm:px-6 px-4 text-[16px] sm:text-[20px]">@{network.username}</p>
        </div>
      ))}

      <div className="px-5 text-end">
        <button className="h-6 font-light text-[16px] text-[#0148F4] dark:hover:text-[#E1E1E1] hover:text-[#2A68FE] dark:text-[#C8C8C8] hover:font-normal mr-1" onClick={onEdit}>
          Editar
        </button>
      </div>
    </>
  );
};

export default SocialNetworkCard;
