import { useState } from 'react';
import { CustomButton } from './ui/comoponenteboton';
import InfoBox from './ui/InfoBox';
// Asegúrate de importar correctamente tu componente

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
            Transferencia Realizada al Cliente
          </article>
          <article className="flex items-center justify-start gap-4">
            <CustomButton
              text="SI"
              onClick={() => handleYesNoClick(setSelectedYesNo1, 'si')}
              className={`flex w-[55px] flex-col items-center justify-center gap-2.5 rounded-lg px-2.5 py-1 ${
                selectedYesNo1 === 'si'
                  ? 'bg-[#0b5300] text-[#ebe7e0] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]'
                  : 'bg-[#d3d3d3]'
              }`}
            />
            <CustomButton
              text="NO"
              onClick={() => handleYesNoClick(setSelectedYesNo1, 'no')}
              className={`flex w-[55px] flex-col items-center justify-center gap-2.5 rounded-lg px-2.5 py-1 ${
                selectedYesNo1 === 'no'
                  ? 'bg-[#cd1818] text-[#ebe7e0] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]'
                  : 'bg-[#d3d3d3]'
              }`}
            />
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
            <InfoBox title="ID de la Transferencia" value="er6e354ushr6u55sdfhdfy" />
            <InfoBox title="Monto de la transferencia" value={343} width="w-[170px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
