export default function DatoDestinatario() {
  return (
    <article className="inline-flex flex-col items-start justify-center gap-2">
      <p className="lightText text-xl font-semibold">Datos del Destinatario</p>
      <article className="h-[0px] w-[217.01px] border border-[#979797]"></article>
      <article className="flex h-[39px] flex-col items-start justify-start gap-px self-stretch">
        <p className="lightText self-stretch text-base font-normal">Nombre y Apellidos</p>
        <article className="self-stretch text-base font-normal">data.receiver.first_name</article>
      </article>
      <article className="h-[0px] w-[217.01px] border border-[#979797]"></article>
      <article className="flex h-[38px] flex-col items-start justify-start self-stretch">
        <p className="lightText self-stretch text-base font-normal">Email a realizar el Pago</p>
        <p className="lightText self-stretch text-base font-normal">data.payment_method.sender.details.email_account</p>
      </article>
    </article>
  );
}
