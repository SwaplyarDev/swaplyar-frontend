import { useState } from 'react';
import { CustomButton } from './ui/comoponenteboton';

export default function DiscrepanciaResulta() {
  const [selectedYesNo2, setSelectedYesNo2] = useState<'si' | 'no' | null>(null);

  return (
    <article className="inline-flex w-[217px] flex-col items-center justify-start gap-2">
      <p className="lightText titleFont self-stretch text-xl font-medium">Discrepancia Resuelta</p>

      <article className="inline-flex items-center justify-center gap-4 self-stretch">
        <CustomButton
          text="SI"
          onClick={() => setSelectedYesNo2(selectedYesNo2 === 'si' ? null : 'si')}
          className={`w-[55px] flex-col items-center justify-center gap-2.5 rounded-lg px-2.5 py-1 ${
            selectedYesNo2 === 'si'
              ? 'bg-[#0b5300] text-base font-medium text-[#ebe7e0] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]'
              : 'bg-[#d3d3d3]'
          }`}
        />

        <CustomButton
          text="NO"
          onClick={() => setSelectedYesNo2(selectedYesNo2 === 'no' ? null : 'no')}
          className={`w-[55px] flex-col items-center justify-center gap-2.5 rounded-lg px-2.5 py-1 ${
            selectedYesNo2 === 'no'
              ? 'bg-[#cd1818] text-base font-medium text-[#ebe7e0] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]'
              : 'bg-[#d3d3d3]'
          }`}
        />
      </article>
    </article>
  );
}
