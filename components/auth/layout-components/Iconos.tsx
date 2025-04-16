'use client';

import Icono from './Icono';

const iconos = [
  { texto: 'Solicitud', iconoPath: 'public/images/icono_solicitud.svg' },
  { texto: 'Transacciones', iconoPath: '/images/icono_transacciones.svg' },
  { texto: 'Plus Rewards', iconoPath: '/images/icono_plus.svg' },
  { texto: 'Cuentas', iconoPath: '/images/icono_cuentas.svg' },
  { texto: 'Centro de Ayuda', iconoPath: '/images/icono_ayuda.svg' },
];

export default function Iconos() {
  return (
    <div className="">
      <div className="z-40 flex h-[64px] w-[600px] flex-row justify-center overflow-visible">
        {iconos.map((el, index) => (
          <div key={index} className="flex-1/6 relative flex justify-center">
            <Icono iconoPath={el.iconoPath} texto={el.texto} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
}
