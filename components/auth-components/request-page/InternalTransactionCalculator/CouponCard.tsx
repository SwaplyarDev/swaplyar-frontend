import { IconTrophy } from './IconTrophy';

interface Props {
  label?: string;
  amount: number;
  onRedeem?: () => void;
}

export default function CouponCard({ label, amount, onRedeem }: Props) {
  const getRewardMessage = () => {
    if (amount === 3) return 'Recompensa de Bienvenida Express';
    if (amount === 5) return 'Recompensa de Verificación Premium';
    if (amount === 8) return 'Recompensa de Bienvenida + Verificación';
    return `Recompensa de ${amount}USD`;
  };

  return (
    <div className="flex flex-col items-center">
      <p className="overflow-hidden text-ellipsis whitespace-nowrap text-center text-xs text-lightText dark:text-darkText">
        {getRewardMessage()}
      </p>
      <div
        className="flex h-[41px] min-w-[180px] max-w-[190px] items-center justify-center gap-4 rounded-2xl border border-[#FCC21B] bg-[#FFFFF8] px-[10px] py-2"
        onClick={onRedeem}
      >
        <IconTrophy className="transition-transform duration-100 hover:scale-110" />
        <p className="text-lg font-normal text-lightText">{label || `+${amount}USD`}</p>
      </div>
    </div>
  );
}
