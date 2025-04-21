// 'use client';

// import { useState } from 'react';
// import Icono from './Icono';

// const iconos = [
//   { texto: 'Solicitud', iconoPath: 'public/images/icono_solicitud.svg' },
//   { texto: 'Transacciones', iconoPath: '/images/icono_transacciones.svg' },
//   { texto: 'Plus Rewards', iconoPath: '/images/icono_plus.svg' },
//   { texto: 'Cuentas', iconoPath: '/images/icono_cuentas.svg' },
//   { texto: 'Centro de Ayuda', iconoPath: '/images/icono_ayuda.svg' },
// ];

// export default function Iconos() {
//   const [activo, setActivo] = useState(0);

//   return (
//     <div className="">
//       <div className="z-40 flex h-[64px] w-[600px] flex-row justify-center overflow-visible">
//         {iconos.map((el, index) => (
//           <div key={index} className="flex-1/6 relative flex justify-center">
//             <Icono iconoPath={el.iconoPath} texto={el.texto} index={index} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

'use client';
import { useState } from 'react';
import Icono from './Icono';
import {
  icono_solicitud,
  icono_cuentas,
  icono_transacciones,
  icono_plus,
  icono_ayuda,
} from '@/utils/assets/imgDatabaseCloudinary';

const iconos = [
  { texto: 'Solicitud', iconoPath: icono_solicitud },
  { texto: 'Transacciones', iconoPath: icono_transacciones },
  { texto: 'Plus Rewards', iconoPath: icono_plus },
  { texto: 'Cuentas', iconoPath: icono_cuentas },
  { texto: 'Centro de Ayuda', iconoPath: icono_ayuda },
];

export default function Iconos() {
  const [activoIndex, setActivoIndex] = useState<number | null>(null);

  return (
    <div className="z-40 flex h-[64px] flex-row justify-center">
      {iconos.map((el, index) => (
        <Icono
          key={index}
          iconoPath={el.iconoPath}
          texto={el.texto}
          activo={activoIndex === index}
          onClick={() => setActivoIndex(index)}
        />
      ))}
    </div>
  );
}
