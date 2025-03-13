// /auth/login-register
import AuthForm from '@/components/auth/auth-form';
import FlyerTrabajo from '@/components/FlyerTrabajo/FlyerTrabajo';
import { Metadata } from 'next';
import { CentroDeAyuda } from '@/utils/assets/img-database';

export const metadata: Metadata = {
  title: 'Inicia Sesión o Regístrate en SwaplyAr | Accede a Beneficios',
  description:
    'Inicia sesión o regístrate en SwaplyAr para realizar transacciones seguras y obtener beneficios exclusivos de nuestro programa de fidelización',
};

export default function LoginPage() {
  return (
    <>
      <AuthForm />
      <FlyerTrabajo href="" imageSrc={CentroDeAyuda} />
    </>
  );
}
