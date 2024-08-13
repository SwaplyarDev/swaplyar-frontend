// /auth/login

import { LoginForm } from '@/components/auth/auth-form-login';
import { titleFont } from '@/components/ui/config/fonts';
import FlyerTrabajo from '@/components/FlyerTrabajo/FlyerTrabajo';

export default function LoginPage() {
  return (
    <>
      {/* <h1 className={ `${ titleFont.className } text-4xl mb-5` }>Ingresar</h1> */}

      <LoginForm />
      <FlyerTrabajo imageSrc="/images/centro-ayuda.png">
        <></>
      </FlyerTrabajo>
    </>
  );
}
