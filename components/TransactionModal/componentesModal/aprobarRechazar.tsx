import { useState } from 'react';
export default function AprobarRechazar() {
  const [selected, setSelected] = useState<'aprobar' | 'stop' | 'rechazar' | null>(null);

  const handleClick = (button: 'aprobar' | 'stop' | 'rechazar') => {
    setSelected((prev) => (prev === button ? null : button));
  };
  return (
    <article className="inline-flex items-center justify-start self-stretch">
      <article className="inline-flex w-[382px] flex-col items-start justify-center gap-2.5 py-2.5">
        <article className="flex h-[59px] flex-col items-center justify-start gap-2 self-stretch">
          <article className="flex h-6 flex-col items-center justify-start gap-2 self-stretch">
            <h2 className="lightText titleFont self-stretch text-xl font-medium">Aprobar/Rechazar Solicitud</h2>
          </article>
          <article className="inline-flex items-center justify-start gap-4 self-stretch">
            {/* BOTONES */}
            <article
              className={`inline-flex w-[110px] flex-col items-center justify-center gap-2.5 rounded-lg px-2.5 py-1 ${
                selected === 'aprobar'
                  ? 'bg-[#0b5300] text-[#ebe7e0] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]'
                  : 'bg-[#d3d3d3]'
              }`}
              onClick={() => handleClick('aprobar')}
            >
              <button className="titleFont titleFont self-stretch text-center text-base font-normal">Aprobar</button>
            </article>
            <article
              className={`inline-flex w-[110px] flex-col items-center justify-center gap-2.5 rounded-lg border-2 px-2.5 py-1 ${
                selected === 'stop'
                  ? 'border-[#cd1818] font-extrabold text-[#cd1818] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]'
                  : 'border-[#d3d3d3]'
              }`}
              onClick={() => handleClick('stop')}
            >
              {/*  */}
              <button className="titleFont self-stretch text-center text-base">STOP</button>
            </article>
            <article
              className={`inline-flex w-[110px] flex-col items-center justify-center gap-2.5 rounded-lg px-2.5 py-1 ${
                selected === 'rechazar'
                  ? 'bg-[#cd1818] text-[#ebe7e0] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]'
                  : 'bg-[#d3d3d3]'
              }`}
              onClick={() => handleClick('rechazar')}
            >
              <button className="titleFont titleFont self-stretch text-center text-base font-normal">Rechazar</button>
            </article>
          </article>
        </article>
      </article>
      {selected === 'rechazar' && (
        <article>
          <div className="inline-flex h-[81px] w-[375px] flex-col items-start justify-start gap-1">
            <div className="inline-flex items-center justify-center gap-2.5 self-stretch px-2.5">
              <div className="shrink grow basis-0 font-['Inter'] text-xs font-normal leading-none text-[#252526]">
                Motivo del Rechazo
              </div>
            </div>
            <div className="inline-flex h-[41px] items-center justify-start gap-2.5 self-stretch rounded-lg border border-[#252526] bg-white py-2 pl-[9px] pr-2.5">
              <div className="shrink grow basis-0 font-['Inter'] text-base font-normal leading-none text-[#252526]">
                La Transferencia no se encuentra registrada en la cuenta
              </div>
            </div>
            <div className="inline-flex items-center justify-center gap-2.5 self-stretch px-2.5"></div>
          </div>
        </article>
      )}
      {selected === 'stop' && (
        <article className="flex items-start justify-start gap-2">
          <article className="inline-flex h-[81px] w-[375px] flex-col items-start justify-start gap-1">
            <article className="inline-flex items-center justify-center gap-2.5 self-stretch px-2.5">
              <p className="titleFont titleFont shrink grow basis-0 text-xs font-normal leading-none">STOP</p>
            </article>
            <article className="inline-flex items-center justify-center gap-2.5 self-stretch px-2.5">
              <p className="titleFont titleFont shrink grow basis-0 text-xs font-normal leading-none">
                Si los datos de la operación no coinciden (por ejemplo, si el monto es mayor o menor al acordado),
                comunícate con el solicitante para resolverlo antes de continuar.
              </p>
            </article>
          </article>
        </article>
      )}
    </article>
  );
}
