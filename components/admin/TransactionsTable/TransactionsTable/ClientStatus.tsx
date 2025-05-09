type ClientStatusProps = {
  status: string | null;
};

const ClientStatus = ({ status }: ClientStatusProps) => {
  const statuses = [
    {
      id: 'editar',
      colorClass: 'bg-amber-800',
      outlineClass: 'outline outline-1 outline-offset-2 outline-orange-500',
      label: 'Editar',
      description: 'El cliente solicitó editar la solicitud',
    },
    {
      id: 'cancelar',
      colorClass: 'bg-red-600',
      outlineClass: 'outline outline-1 outline-offset-2 outline-red-600',
      label: 'Cancelar',
      description: 'El cliente solicitó la cancelación y el reembolso',
    },
  ];

  const statusMap = statuses.find((s) => s.id === status);
  if (!statusMap) return null;

  return (
    <div
      key={statusMap.id}
      className={`cursor-pointer p-1 transition-all duration-300 ${`${statusMap.colorClass} ${statusMap.colorClass.replace('bg-', 'text-')} bg-opacity-10 shadow-sm`}`}
    >
      <div className="mb-1 flex items-center gap-2">
        <span className={`h-3 w-3 rounded-full ${statusMap.colorClass} ${statusMap.outlineClass}`}></span>
        <span className="font-medium">{statusMap.label}</span>
      </div>
    </div>
  );
};

export default ClientStatus;
