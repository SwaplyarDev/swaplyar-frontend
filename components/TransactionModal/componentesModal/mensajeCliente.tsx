export default function MensajeCliente() {
  return (
    <div>
      <label className="absolute left-[40px] top-[331px] h-[66px] w-[812px] overflow-hidden rounded-lg border border-black">
        <article className="absolute left-[801px] top-[48px] h-[0px] w-2.5 origin-top-left rotate-[143.13deg] border border-black"></article>
        <article className="absolute left-[801px] top-[45px] h-[0px] w-[15px] origin-top-left rotate-[143.13deg] border border-black"></article>
        <input type="text" className="h-full w-full border-none px-3 py-2 outline-none" placeholder="Enter text here" />
      </label>
      <h2 className="lightText titleFont absolute left-[46px] top-[312px] text-base font-semibold">
        Mensaje del Cliente
      </h2>
    </div>
  );
}
