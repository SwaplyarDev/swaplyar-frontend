// /auth/login-register

import AuthForm from '@/components/auth/auth-form';
import FlyerTrabajo from '@/components/FlyerTrabajo/FlyerTrabajo';

export default function LoginPage() {
  return (
    <>
      <AuthForm />
      <FlyerTrabajo imageSrc="/images/centro-ayuda.png">
        <></>
      </FlyerTrabajo>
    </>
  );
}
