// /auth/login-register
import { Metadata } from 'next';
import AuthForm from '@/components/auth/auth-form';
import FlyerTrabajo from '@/components/FlyerTrabajo/FlyerTrabajo';

export const metadata: Metadata = {
  title: 'Accedé o Registrate en SwaplyAr | Simplifica tus Finanzas',
  description:
    'Entrá a tu cuenta de SwaplyAr y realiza tus transacciones digitales de forma rápida y segura con beneficios. Inicio de sesión y Registro protegido para tu tranquilidad',
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
