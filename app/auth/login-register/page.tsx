// /auth/login-register
import { Metadata } from 'next';
import AuthForm from '@/components/auth/auth-form';
import FlyerTrabajo from '@/components/FlyerTrabajo/FlyerTrabajo';

export const metadata: Metadata = {
  title: 'Accedé a tu Cuenta SwaplyAr | Inicio de Sesión Seguro',
  description:
    'Entrá a tu cuenta de SwaplyAr y realiza tus transacciones digitales de forma rápida y segura con beneficios. Inicio de sesión protegido para tu tranquilidad',
};

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
