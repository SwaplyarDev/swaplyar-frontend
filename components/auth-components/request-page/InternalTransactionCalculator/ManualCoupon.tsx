// import Image from 'next/image';
// import { coupon } from '@/utils/assets/imgDatabaseCloudinary';

// export default function ManualCouponInput() {
//   return (
//     <div className="flex flex-col items-center ">
//       <p className="text-center text-xs text-lightText dark:text-darkText mb-1">Ingrese su Cupón</p>
//       <div className="relative w-[180px]">
//         <Image
//           src={coupon}
//           alt="Cupón"
//           width={16}
//           height={16}
//           className="absolute left-3 top-1/2 -translate-y-1/2 transition-transform duration-100 hover:scale-110"
//         />
//         <input
//           type="text"
//           className="w-full rounded-2xl border border-violet-600 bg-white p-2 pl-8 text-sm text-lightText dark:bg-darkText focus:outline-none focus:ring-0 focus:ring-transparent focus-visible:ring-0 focus:border-violet-600"
//           placeholder="Código de cupón"
//         />
//       </div>
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { coupon } from '@/utils/assets/imgDatabaseCloudinary';
import { useRewardsStore } from '@/store/useRewardsStore';

export default function ManualCouponInput() {
  const [inputValue, setInputValue] = useState('');
  const [isLocked, setIsLocked] = useState(false); // 🔒 Para desactivar input al aplicar
  const setCouponInstance = useRewardsStore((state) => state.setCouponInstance);
  const markManualUsed = useRewardsStore((state) => state.markManualUsed);

  const markUsed = useRewardsStore((state) => state.markUsed);
  const used3USD = useRewardsStore((state) => state.used3USD);

  const handleApplyCoupon = () => {
    const code = inputValue.trim().toLowerCase();

    if (code === 'semana santa') {
      setCouponInstance('MANUAL'); // Aplica cupón manual
      // setCouponInstance('THREE'); // Aplica cupón
      markManualUsed();
      setIsLocked(true); // 🔒 Bloquea el input
    }
  };

  return (
    <div className="flex flex-col items-center">
      <p className="mb-1 text-center text-xs text-lightText dark:text-darkText">
        {isLocked ? 'Cupón aplicado' : 'Ingrese su Cupón'}
      </p>
      <div className="relative w-[180px]">
        <Image
          src={coupon}
          alt="Cupón"
          width={22}
          height={22}
          className="absolute left-3 top-1/2 -translate-y-1/2 transition-transform duration-100 hover:scale-110"
        />
        <input
          type="text"
          value={isLocked ? 'semana santa' : inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleApplyCoupon();
          }}
          disabled={isLocked}
          className={`w-full rounded-2xl border p-2 pl-10 text-[14px] uppercase text-violet-600 focus:border-violet-600 focus:shadow-none focus:outline-none focus:ring-0 focus:ring-transparent focus-visible:ring-0 ${
            isLocked
              ? 'border-violet-600 bg-white text-center font-bold uppercase text-violet-700 dark:bg-darkText dark:text-violet-400'
              : 'border-violet-600 bg-white text-lightText dark:bg-darkText'
          }`}
          placeholder="Código de cupón"
        />
      </div>
    </div>
  );
}
