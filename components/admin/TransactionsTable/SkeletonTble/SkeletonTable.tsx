const SkeletonTable = () => {
  return (
    <table className="w-[80%]">
      <thead>
        <tr className="text-left">
          <th className="px-4 font-normal"></th>
          <th className="px-4 font-normal">Fecha</th>
          <th className="px-4 font-normal">Transaction ID</th>
          <th className="px-4 font-normal">Nombre/Email</th>
          <th className="px-4 font-normal">Billetera a recibir</th>
          <th className="px-4 font-normal">Destinatario</th>
          <th className="px-4 font-normal">Billetera a Pagar</th>
          <th className="px-4 font-normal"></th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 12 }).map((_, index) => (
          <tr key={index}>
            <td className={`pl-3`}>
              <span className="flex h-5 w-5 animate-pulse rounded-full bg-gray-300 outline outline-1 outline-offset-2 outline-gray-400"></span>
            </td>
            <td className={`h-8 animate-pulse border border-white bg-gray-300 px-4`}></td>
            <td className={`h-8 animate-pulse border border-white bg-gray-300 px-4`}></td>
            <td className={`h-8 animate-pulse border border-white bg-gray-300 px-4`}></td>
            <td className={`h-8 animate-pulse border border-white bg-gray-300 px-4`}></td>
            <td className={`h-8 animate-pulse border border-white bg-gray-300 px-4`}></td>
            <td className={`h-8 animate-pulse border border-white bg-gray-300 px-4`}></td>
            <td className={`h-8 animate-pulse border border-white bg-gray-300 px-4`}></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SkeletonTable;
