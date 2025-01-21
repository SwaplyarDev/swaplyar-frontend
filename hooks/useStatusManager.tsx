import { useState } from 'react';

function useStatusManager() {
  const [statuses, setStatuses] = useState<string[]>([]);

  const addStatus = (status: string) => {
    if (!statuses.includes(status)) {
      setStatuses((prev) => [...prev, status]);
      console.log(`Estado "${status}" agregado.`);
    } else {
      console.log(`Estado "${status}" ya existe.`);
    }
  };

  const getStatuses = () => [...statuses];

  return { statuses, addStatus, getStatuses };
}

export default useStatusManager;
