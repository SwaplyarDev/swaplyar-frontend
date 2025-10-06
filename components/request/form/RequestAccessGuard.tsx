'use client';
// lo que hace este componente es proteger la ruta /request para que solo se pueda acceder a ella si se ha navegado desde la página /home
//si accesoPermitido no está en sessionStorage, redirige a /home
//si se navega hacia atrás, elimina accesoPermitido de sessionStorage y redirige a /home

import { useRouter } from 'next/navigation';
import { useEffect, useState, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const RequestAccessGuard = ({ children }: Props) => {
  const [validAccess, setValidAccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const accesoPermitido = sessionStorage.getItem('accesoPermitido');

    if (!accesoPermitido) {
      router.replace('/es/inicio');
    } else {
      setValidAccess(true);
    }

    const handleRouteChange = () => {
      sessionStorage.removeItem('accesoPermitido');
    };

    window.addEventListener('beforeunload', handleRouteChange);
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', () => {
      sessionStorage.removeItem('accesoPermitido');
      router.replace('/es/inicio');
    });

    return () => {
      window.removeEventListener('beforeunload', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [router]);

  if (!validAccess) return null;

  return <>{children}</>;
};

export default RequestAccessGuard;
