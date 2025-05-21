import { star } from '@/utils/assets/imgDatabaseCloudinary';

interface IProps {
  stars: number;
  quantity: number;
}

export default function UncompleteRewardText({ stars, quantity }: IProps) {
  return (
    <p className="text-base font-light">
      Haz completado
      <b className="text-lg font-semibold"> {stars}/5 </b>
      solicitudes exitosas y acumulado
      <b className="text-lg font-semibold"> {quantity}/500 USD</b>.
      <br />
      <br />
      Cuando alcances la meta, recibirás
      <span className="text-[21px] font-bold text-custom-blue-800 dark:text-custom-whiteD"> $10 USD </span>
      de
      <span className="text-[21px] font-bold text-custom-blue-800 dark:text-custom-whiteD"> Plus Rewards </span>
      <br />
      <span className="text-sm">
        tu regalo se activará automáticamente. <b className="font-bold">¡Sigue avanzando!</b>
      </span>
    </p>
  );
}
