// import Image from 'next/image';
// import React, { useState } from 'react';

// export default function Icono({ iconoPath, texto }: { iconoPath: string; texto: string; index: number }) {
//   const [hoverState, setHoverState] = useState(false);

//   return (
//     <div className="flex-1/6 relative flex justify-center">
//       <div
//         onClick={() => setHoverState(!hoverState)}
//         className={`${
//           hoverState ? 'mask-icon w-[212px]' : 'flex-1/6 flex items-center justify-center'
//         } h-full bg-amber-600`}
//       >
//         {' '}
//         {!hoverState ? <Image src={iconoPath} alt={texto} width={51} height={50} /> : ''}{' '}
//       </div>
//       {hoverState ? (
//         <div
//           className={`absolute top-[60px] flex h-[50px] w-[192px] flex-row items-center justify-start rounded-[100px] bg-blue-800 px-[4px] text-white`}
//         >
//           <Image src={iconoPath} alt={texto} width={51} height={50} /> <span>{texto}</span>
//         </div>
//       ) : (
//         ''
//       )}
//     </div>
//   );
// }

import Image from 'next/image';
import React from 'react';

type IconoProps = {
  iconoPath: string;
  texto: string;
  activo: boolean;
  onClick: () => void;
};

export default function Icono({ iconoPath, texto, activo, onClick }: IconoProps) {
  return (
    <div className="flex-1/6 relative flex justify-center">
      <div
        onClick={onClick}
        className={`h-full cursor-pointer ${
          activo ? 'mask-icon w-[212px]' : 'flex-1/6 flex items-center justify-center'
        } bg-amber-600`}
      >
        {!activo && <Image src={iconoPath} alt={texto} width={51} height={50} />}
      </div>

      {activo && (
        <div className="absolute top-[60px] flex h-[50px] w-[192px] flex-row items-center justify-start rounded-[100px] bg-blue-800 px-[4px] text-white">
          <Image src={iconoPath} alt={texto} width={51} height={50} />
          <span className="ml-2">{texto}</span>
        </div>
      )}
    </div>
  );
}
