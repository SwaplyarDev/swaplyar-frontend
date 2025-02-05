// Aca se encuentra todo la parte de detalles de transaciones no consume api ni de esas cosas
export default function DetallesTransaccion() {
  return (
    <article className="absolute left-[23px] top-[100px] inline-flex w-[832.01px] items-center justify-center pb-10">
      {/* contenedor datos de solicitante  */}
      <article className="relative h-[165px] w-[832.01px]">
        <p className="lightText titleFont absolute left-[95px] top-0 text-xl font-semibold">Datos del Solicitante</p>
        <article className="absolute left-[108px] top-[25px] inline-flex h-[38px] w-[173px] flex-col items-start justify-start">
          <p className="lightText titleFont self-stretch">Nombre y Apellidos</p>
          <p className="lightText titleFont self-stretch">data.sender.first_name</p>
        </article>

        <article className="absolute left-[111px] top-[74px] inline-flex h-[38px] w-[159px] flex-col items-start justify-start">
          <p className="lightText titleFont self-stretch">Correo Electronico</p>
          <p className="lightText titleFont self-stretch">data.sender.email</p>
        </article>

        <article className="absolute left-[86px] top-[70px] h-[0px] w-[217.01px] border border-[#979797]"></article>
        <article className="absolute left-[86px] top-[120px] h-[0px] w-[217.01px] border border-[#979797]"></article>
        <article className="absolute left-[115px] top-[120px] inline-flex h-[39px] w-[159px] flex-col items-start justify-start">
          <p className="lightText titleFont self-stretch text-base font-normal">N° Telefonico</p>
          <p className="titleFont titleFont self-stretch text-base font-normal">data.sender.phone_number</p>
        </article>
        {/* esto se vuelve a repetir mas abajo en la solicitud 
                hay un componente llamado  datoDestinatario.tsx ahi esta la segunda parte */}
        <p className="lightText titleFont absolute left-[352px] top-0 text-xl font-semibold">Datos del Destinatario</p>
        <article className="absolute left-[347px] top-[28px] inline-flex h-[98px] w-[228px] flex-col items-start justify-start gap-px">
          <p className="lightText titleFont self-stretch text-base font-normal">Direccion USDT</p>
          <p className="titleFont titleFont self-stretch text-base font-normal">{/* {data.receiver.first_name} */}</p>

          <article className="h-[0px] w-[217.01px] border border-[#979797]"></article>
          <article className="flex h-[38px] flex-col items-start justify-start">
            <p className="lightText titleFont self-stretch text-base font-normal">RED</p>
            <p className="lightText titleFont w-[228px] text-base font-light">TRON (TRC-20)</p>
          </article>
        </article>
        <article className="absolute left-[615px] top-0 inline-flex h-[165px] w-[217.01px] flex-col items-center justify-start gap-[3px]">
          <article className="flex h-9 flex-col items-end justify-start">
            <p className="lightText titleFont self-stretch text-xl font-semibold">Datos del Pago</p>
            <p className="lightText titleFont self-stretch text-right text-[10px] font-normal">BILLETERA/MONEDA</p>
          </article>
          <article className="flex h-[38px] flex-col items-start justify-start">
            <p className="lightText titleFont self-stretch text-base font-normal">Monto a Transferir</p>
            <article className="inline-flex items-center justify-end gap-1">
              <p className="lightText titleFont text-base font-normal">450</p>
              <p className="lightText titleFont text-base font-normal">/</p>
              <article className="flex w-[71px] items-center justify-center">
                <p className="lightText titleFont text-base font-normal">Payoneer</p>
              </article>
              <p className="lightText titleFont text-base font-normal">/</p>
              <article className="flex h-[19px] w-8 items-center justify-center">
                <p className="lightText titleFont text-base font-normal">EUR</p>
              </article>
            </article>
          </article>
          <article className="mt-1 h-[0px] w-[217.01px] border border-[#979797]"></article>
          <article className="flex h-[38px] flex-col items-start justify-start">
            <p className="lightText titleFont self-stretch text-base font-normal">Monto a Recibir</p>
            <article className="inline-flex items-center justify-start gap-0.5">
              <p className="lightText titleFont text-base font-normal">387</p>
              <article className="lightText titleFont text-base font-normal">/</article>
              <article className="flex h-[19px] w-11 items-center justify-center">
                <p className="lightText titleFont text-base font-normal">USDT</p>
              </article>
              <p className="lightText titleFont text-base font-normal">/</p>
              <article className="flex h-[19px] w-11 items-center justify-center">
                <p className="lightText titleFont text-base font-normal">USDT</p>
              </article>
            </article>
          </article>
          <article className="mt-1 h-[0px] self-stretch border border-[#979797]"></article>
          <article className="flex h-[38px] flex-col items-start justify-start">
            <p className="lightText titleFont self-stretch text-base font-normal">Link del Comprobante</p>
            <p className="titleFont self-stretch text-base font-normal text-[#012a8d]">sdrg897ashf98sdfgn98......</p>
          </article>
        </article>
        <article className="absolute left-0 top-0 h-10 w-10 overflow-hidden" />
      </article>
    </article>
  );
}
