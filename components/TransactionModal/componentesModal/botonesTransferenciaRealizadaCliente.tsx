import { useState } from 'react';

export default function TransferenciaRealizadaCliente() {
  const [selectedYesNo1, setSelectedYesNo1] = useState<'si' | 'no' | null>(null);
  const handleYesNoClick = (setter: React.Dispatch<React.SetStateAction<'si' | 'no' | null>>, button: 'si' | 'no') => {
    setter((prev) => (prev === button ? null : button)); // Alternar selección
  };
  return (
    <section className="textFont">
      <article className="flex flex-col items-center justify-center">
        <article className="flex h-[81px] flex-col items-center justify-start self-stretch">
          <article className="lightText titleFont text-center text-xl font-semibold">
            Transferencia Realizada al Ciente
          </article>
          <article className="flex items-center justify-start gap-4">
            <article
              className={`flex w-[55px] flex-col items-center justify-center gap-2.5 rounded-lg px-2.5 py-1 ${
                selectedYesNo1 === 'si'
                  ? 'bg-[#0b5300] text-[#ebe7e0] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]'
                  : 'bg-[#d3d3d3]'
              }`}
              onClick={() => handleYesNoClick(setSelectedYesNo1, 'si')}
            >
              <button className="self-stretch text-center text-base font-normal">SI</button>
            </article>
            <article
              className={`flex w-[55px] flex-col items-center justify-center gap-2.5 rounded-lg px-2.5 py-1 ${
                selectedYesNo1 === 'no'
                  ? 'bg-[#cd1818] text-[#ebe7e0] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]'
                  : 'bg-[#d3d3d3]'
              }`}
              onClick={() => handleYesNoClick(setSelectedYesNo1, 'no')}
            >
              <button className="titleFont titleFont self-stretch text-center text-base font-normal">NO</button>
            </article>
          </article>
        </article>
      </article>
      <div className="flex min-h-[81px] w-full items-center justify-start gap-2">
        <div
          className={`transition-opacity duration-300 ${
            selectedYesNo1 === 'si' ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <div className="flex items-center justify-start gap-2 bg-blue-500">
            <div className="flex h-[81px] w-[262px] flex-col items-center justify-center gap-1">
              <div className="flex items-center justify-center gap-2.5 self-stretch px-2.5">
                <div className="shrink grow basis-0 text-xs font-normal leading-none text-[#252526]">
                  ID de la Transferencia
                </div>
              </div>
              <div className="flex h-[41px] items-center justify-start gap-2.5 self-stretch rounded-lg border border-[#252526] bg-white py-2 pl-[9px] pr-2.5">
                <div className="shrink grow basis-0 text-base font-normal leading-none text-[#252526]">
                  er6e354ushr6u55sdfhdfy
                </div>
              </div>
            </div>
            <div className="h-[81px] w-[170px] flex-col items-start justify-start gap-1">
              <div className="flex items-center justify-center gap-2.5 self-stretch px-2.5">
                <div className="shrink grow basis-0 text-xs font-normal leading-none text-[#252526]">
                  Monto de la transferencia
                </div>
              </div>
              <div className="flex h-[41px] w-[170px] items-center justify-start gap-2.5 self-stretch rounded-lg border border-[#252526] bg-white pl-[9px] pr-2.5">
                <div className="shrink grow basis-0 text-[32px] font-normal leading-none text-[#252526]">343</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
