import Image from 'next/image';
import { solicitudImage } from '@/utils/assets/imgDatabaseCloudinary';

interface IProps {
  userHave3Discount: undefined | boolean;
}

export default function UserVerifiedWithoutTransactions({ userHave3Discount }: IProps) {
  return (
    <div className="flex flex-col items-center gap-4 xs:flex-row xs:gap-0">
      {userHave3Discount ? (
        <p className="text-base font-light font-textFont max-w-[150px] md-phone:max-w-[400px] lg:max-w-[170px] content-center">
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
      ) : (
        <p className="text-base font-light font-textFont max-w-[150px] md-phone:max-w-[400px] lg:max-w-[170px] content-center">
          La recompensa de
          <span className="font-semibold text-custom-blue-800 dark:text-custom-whiteD"> Verificación Premium </span>
          de
          <span className="text-[21px] font-bold text-custom-blue-800 dark:text-custom-whiteD"> $5 USD </span>
          se aplica automáticamente en tu solicitud.
        </p>
      )}

      <div className="overflow-hidden max-h-[145px]">
        <Image
          src={solicitudImage}
          alt="Rewards Character"
          width={197}
          height={145}
          className="object-fill"
        />
      </div>
    </div>
  );
}
