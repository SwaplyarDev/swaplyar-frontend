const SkeletonTable = () => {
  return (
    <tbody>
      {Array.from({ length: 12 }).map((_, index) => (
        <tr key={index}>
          <td className={`pl-3`}>
            <span className="flex h-5 w-5 animate-pulse rounded-full bg-gray-300 outline outline-1 outline-offset-2 outline-gray-400"></span>
          </td>
          <td className={`animate-pulse border border-white bg-gray-300 px-4`}></td>
          <td className={`animate-pulse border border-white bg-gray-300 px-4`}></td>
          <td className={`animate-pulse border border-white bg-gray-300 px-4`}></td>
          <td className={`animate-pulse border border-white bg-gray-300 px-4`}></td>
          <td className={`animate-pulse border border-white bg-gray-300 px-4`}></td>
          <td className={`animate-pulse border border-white bg-gray-300 px-4`}></td>
          <td className={`animate-pulse border border-white bg-gray-300 px-4`}></td>
        </tr>
      ))}
    </tbody>
  );
};

export default SkeletonTable;
