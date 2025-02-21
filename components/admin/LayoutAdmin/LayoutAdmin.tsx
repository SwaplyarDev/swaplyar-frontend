'use client';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

const LauyOutAdmin = () => {
  const path = usePathname();
  const { data: session } = useSession();
  // Mapeo de rutas a nombres legibles
  const pathMap: Record<string, string> = {
    '/admin/transactions': 'Operación de Transacciones',
    '/admin/users': 'Gestión de Usuarios',
    '/admin/reports': 'Reportes',
    '/admin/settings': 'Configuración',
  };

  const sectionName = pathMap[path] || 'Panel de Administración';

  const userName = session?.user.name;
  const name = `Nombre de Usuario (${userName})`;

  return (
    <section className="px-16 py-2 text-xl font-normal">
      SwaplyAr / {sectionName} / {name}
    </section>
  );
};

export default LauyOutAdmin;
