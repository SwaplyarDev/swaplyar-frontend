import ShortButton from '@/components/ui/NewButtons/ShortButton';
import { VerifyButton } from '../VerifyButton';

export default function VerifyAccount() {
  return (
    <div className="flex w-full flex-col items-center gap-[11px]">
      <p className="text-center text-base font-light">
        <span className="text-lg font-semibold">Aún no has verificado tu cuenta.</span>
        <br />
        Verifícala ahora y obtén
        <span className="text-lg font-semibold text-custom-blue-800 dark:text-custom-whiteD"> $5 USD </span>
        adicionales en tu solicitud.
      </p>
      {/*modificar button por el shortbutton    */}
      <ShortButton 
        text="Verificar ahora"
        href='/es/auth/plus-rewards'
        fondoOscuro={true}
      />
    </div>
  );
}
