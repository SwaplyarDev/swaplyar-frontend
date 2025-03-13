'use client';
import { SwaplyArLogoComplete } from '@/utils/assets/imgDatabaseCloudinary';
import Image from 'next/image';
import Switch from '../ui/top-menu/switch';

const NavbarInternal = () => {
  return (
    <div className="">
      <div className="mx-8 flex h-16 items-center justify-between xs:mx-80">
        <Image src={SwaplyArLogoComplete} alt="Cambiar saldo online" width={200} height={100} />
        {/* mensaje usuario */}
        <Switch />
      </div>
      <div className="relative flex h-16 items-center justify-evenly bg-blue-500">
        <div className="flex items-center gap-14">
          <div className="flex justify-center">
            <div className="relative top-7 h-28 w-28 rounded-full bg-red-600">
              <Image src={''} alt="Foto perfil Usuario" className="" />
            </div>
          </div>
          <p className="hidden xs:block">Nombre Usuario</p>
        </div>
        <div className="justify-arround flex gap-12">
          <div className="mt-10 hidden xs:block">solicitud transacciones plus rewards cuentas centro de ayuda</div>
          <button className="">Cerrar Sesion</button>
        </div>
      </div>
    </div>
  );
};

export default NavbarInternal;
