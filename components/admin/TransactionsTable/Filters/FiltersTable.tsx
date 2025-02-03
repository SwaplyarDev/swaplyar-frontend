const FiltersTable = () => {
  return (
    <section className="flex flex-col gap-2 divide-y-2 px-2">
      <h3>Status Swaply</h3>
      <div className="flex flex-col">
        <div className="flex flex-row items-center gap-2">
          <span
            className={`flex h-3 w-3 rounded-full bg-[#000C29] outline outline-1 outline-offset-2 outline-[#012A8E]`}
          ></span>{' '}
          En Proceso
        </div>
        <p className="text-xs">la transaccion sigue su curso</p>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row items-center gap-2">
          <span
            className={`flex h-3 w-3 rounded-full bg-[#530000] outline outline-1 outline-offset-2 outline-[#CE1818]`}
          ></span>{' '}
          Rechazada
        </div>
        <p className="text-xs">El cliente solicito la cancelacion y el Reembolso</p>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row items-center gap-2">
          <span
            className={`flex h-3 w-3 rounded-full bg-[#002C00] outline outline-1 outline-offset-2 outline-[#18CE18]`}
          ></span>{' '}
          Finalizado
        </div>
        <p className="text-xs">La solicitud fue finalizada con Exito</p>
      </div>
    </section>
  );
};

export default FiltersTable;
