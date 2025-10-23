import { IconTrophy } from "@/components/ui/IconTrophy/IconTrophy";


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
    <div className="flex flex-col items-center gap-1 min-w-[122px] sm:w-full">
      <p className="overflow-hidden text-ellipsis sm:whitespace-nowrap text-center text-[10px] sm:text-xs text-lightText dark:text-darkText">
        {getRewardMessage()}
      </p>
      <div
        className="inline-flex items-center dark:bg-custom-grayD-800 justify-center gap-2 rounded-2xl border border-[#FCC21B] bg-[#FFFFF8] px-3 py-1.5 w-full max-h-[35px] sm:max-h-[40px]"
        onClick={onRedeem}
      >
        <IconTrophy className="w-6 h-6 sm:h-7 sm:w-7 transition-transform duration-100 hover:scale-110" />
        <p className="text-base sm:text-lg font-normal dark:text-darkText text-lightText whitespace-nowrap">{label || `+${amount}USD`}</p>
      </div>
    </div>
  );
}
