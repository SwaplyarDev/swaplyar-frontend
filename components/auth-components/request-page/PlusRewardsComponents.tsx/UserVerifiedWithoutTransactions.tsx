import Image from 'next/image';
import { solicitudImage } from '@/utils/assets/imgDatabaseCloudinary';

export default function UserVerifiedWithoutTransactions() {
  return (
    <div className="flex items-center">
      <p className="min-w-[170px] text-base font-light">
        La recompensa de
        <span className="font-semibold text-custom-blue-800 dark:text-custom-whiteD"> Bienvenida Express </span>
        de
        <span className="text-[21px] font-bold text-custom-blue-800 dark:text-custom-whiteD"> $3 USD </span>y la
        recompensa de
        <span className="font-semibold text-custom-blue-800 dark:text-custom-whiteD"> Verificación Premium </span>
        de
        <span className="text-[21px] font-bold text-custom-blue-800 dark:text-custom-whiteD"> $5 USD </span>
        se aplica automáticamente en tu solicitud.
      </p>

      <Image
        src={solicitudImage}
        alt="Rewards Character"
        width={395}
        height={290}
        className="object-cover xs-mini-phone:w-[220px] md-phone:w-[240px] lg:w-[260px]"
      />
    </div>
  );
}
