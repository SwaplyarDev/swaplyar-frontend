// /auth/login-register

import AuthForm from '@/components/auth/auth-form';
import FlyerTrabajo from '@/components/FlyerTrabajo/FlyerTrabajo';

export default function LoginPage() {
  return (
    <>
      {/* <h1 className={ `${ titleFont.className } text-4xl mb-5` }>Ingresar</h1> */}

      <AuthForm/>
      <FlyerTrabajo imageSrc="/images/centro-ayuda.png">
        <></>
      </FlyerTrabajo>
    </>
  );
}
