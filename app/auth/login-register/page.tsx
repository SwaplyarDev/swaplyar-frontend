// /auth/login-register
import AuthForm from '@/components/auth/auth-form';
import FlyerTrabajo from '@/components/FlyerTrabajo/FlyerTrabajo';
import { constructMetadata } from '@/components/seo/SeoComp';

export const metadata = constructMetadata({
  title: 'Inicia Sesión o Regístrate en SwaplyAr | Accede a Beneficios',
  description:
    'Inicia sesión o regístrate en SwaplyAr para realizar transacciones seguras y obtener beneficios exclusivos de nuestro programa de fidelización',
});

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
