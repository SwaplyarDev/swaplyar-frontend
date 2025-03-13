'use client';
import { SwaplyArLogoComplete } from '@/utils/assets/imgDatabaseCloudinary';
import Image from 'next/image';
import Switch from '../ui/top-menu/switch';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useState } from 'react';
import {
  centroDeAyuda,
  cerrarSesion,
  cuentasAsociadas,
  historialTransacciones,
  montana,
  plusRewards,
} from '@/utils/assets/img-database';
import { solicitud } from '@/utils/assets/img-database';

const NavbarInternal = () => {
  const [drawerMenu, setDrawerMenu] = useState(false);

  //Hook dark mode

  return (
    <div className="">
      <div className="mx-8 flex h-16 items-center justify-between xs:mx-10 md:mx-80">
        <Image src={SwaplyArLogoComplete} alt="Cambiar saldo online" width={200} height={100} />
        {/* mensaje usuario */}
        <Switch />
      </div>
      <div className="relative flex h-16 items-center justify-between gap-24 bg-nav-blue md:justify-evenly">
        <Image src={montana} width={127} height={127} alt="" className="absolute left-[339px] top-1" />
        <div className="flex items-center gap-3">
          <div className="relative inset-0 top-6 h-24 w-24 rounded-full bg-gradient-to-r from-[#012A8E] to-[#B614FF] p-[4px] dark:from-[#EBE7E0] dark:to-[#56D6DC]">
            <Image
              src={''}
              alt="Foto perfil Usuario"
              className="h-full w-full overflow-hidden rounded-full bg-white dark:bg-black"
            />
          </div>
          <p className="hidden xs:block">Nombre Usuario</p>
        </div>
        <div className="justify-arround flex gap-16">
          <div className="mt-6 hidden md:block">
            <div className="flex">
              <img src={solicitud} alt="" />
              <img src={historialTransacciones} alt="" />
              <img src={plusRewards} alt="" />
              <img src={cuentasAsociadas} alt="" />
              <img src={centroDeAyuda} alt="" />
            </div>
          </div>
          <button onClick={() => setDrawerMenu(!drawerMenu)} className="hidden xs:block md:hidden">
            <GiHamburgerMenu className="size-8 text-lightText dark:text-darkText" />
          </button>
          <button className="block pl-10 xs:hidden md:block">
            <img src={cerrarSesion} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavbarInternal;
