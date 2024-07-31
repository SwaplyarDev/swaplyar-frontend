import { RegisterForm } from '@/components/auth/auth-form-register';
import { titleFont } from '@/components/config/fonts';

export default function NewAccountPage() {
  return (
    <>

      {/* <h1 className={ `${ titleFont.className } text-4xl mb-5` }>Nueva cuenta</h1> */}

      <RegisterForm/>
    </>
  );
}