interface Status {
  title: string;
  items: { color: string; outline: string; label: string; description: string }[];
}

const Status: React.FC<{ title: string; items: Status['items'] }> = ({ title, items }) => {
  return (
    <article className="flex flex-col divide-y-[1px] divide-black px-2">
      <h3 className="font-titleFont text-base font-normal">{title}</h3>
      {items.map((item, index) => (
        <article key={index} className="flex flex-col pb-1 pt-2">
          <div className="flex flex-row items-center gap-2 font-titleFont text-base font-normal">
            <span
              className={`flex h-3 w-3 rounded-full bg-[${item.color}] outline outline-1 outline-offset-2 outline-[${item.outline}]`}
            ></span>
            {item.label}
          </div>
          <p className="text-xs">{item.description}</p>
        </article>
      ))}
    </article>
  );
};

const StatusSection: React.FC = () => {
  const statuses: Status[] = [
    {
      title: 'Status SwaplyAr',
      items: [
        { color: '#000C29', outline: '#012A8E', label: 'En Proceso', description: 'La transacción sigue su curso' },
        {
          color: '#530000',
          outline: '#CE1818',
          label: 'Rechazada',
          description: 'El cliente solicitó la cancelación y el reembolso',
        },
        {
          color: '#002C00',
          outline: '#18CE18',
          label: 'Finalizado',
          description: 'La solicitud fue finalizada con éxito',
        },
      ],
    },
    {
      title: 'Status Cliente',
      items: [
        {
          color: '#6a3718',
          outline: '#ff6200',
          label: 'Editar',
          description: 'El cliente solicitó editar la solicitud',
        },
        {
          color: '#530000',
          outline: '#CE1818',
          label: 'Cancelar',
          description: 'El cliente solicitó la cancelación y el reembolso',
        },
      ],
    },
  ];

  return (
    <section className="flex w-[15%] flex-col gap-5">
      {statuses.map((status, index) => (
        <Status key={index} title={status.title} items={status.items} />
      ))}
    </section>
  );
};

export default StatusSection;
