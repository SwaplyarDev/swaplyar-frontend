import React from 'react';
import Link from 'next/link';
import Arrow from '@/components/ui/Arrow/Arrow';
import { useVerificationStore } from '@/store/useVerificationStore';

type AplicationProps = {
  className: string;
  text1: string;
  text2: string;
  colorSVG: string;
};

const AplicationStateCard: React.FC<AplicationProps> = ({ className, text1, text2, colorSVG }) => {
  const { status: verifiedStatus } = useVerificationStore();

  const isPending = verifiedStatus === 'PENDIENTE';

  return (
    <div className={`w-full ${className}`}>
      <div className="relative mx-auto flex h-[160px] w-full max-w-[1200px] items-start justify-between px-4 sm:px-8">
        <div className="absolute bottom-0 left-0 sm:left-8">
          <Link
            href="/"
            className={`group relative m-1 flex items-center justify-center gap-1 rounded-3xl px-3 py-1 text-sm font-light hover:bg-transparent sm:text-base ${
              isPending ? 'text-[#252526]' : 'text-[#EBE7E0]'
            }`}
          >
            <div className="relative h-4 w-4 overflow-hidden">
              <div className="absolute left-0 mr-2 transition-all ease-in-out group-hover:left-1">
                <Arrow color={isPending ? '#252526' : '#EBE7E0'} />
              </div>
            </div>
            Volver al Home
          </Link>
        </div>
        <div className="ml-auto flex h-full w-full max-w-[750px] flex-col items-end justify-between text-right">
          <h2 className="text-[26px] sm:text-[28px] md:text-[32px] lg:text-[38px]">{text1}</h2>
          {text2 && <p className="max-w-[500px] text-xs font-light sm:text-base">{text2}</p>}
          <p className="mb-2.5 text-xs font-medium underline sm:text-base">¡No dudes en contactarnos!</p>
        </div>
      </div>
    </div>
  );
};

export default AplicationStateCard;
