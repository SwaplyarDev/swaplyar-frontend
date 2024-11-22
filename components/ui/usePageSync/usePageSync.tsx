import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const usePageSync = (currentPage: number, setCurrentPage: (page: number) => void) => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const pageParam = parseInt(searchParams.get('page') || '1', 10);
    if (pageParam !== currentPage) {
      setCurrentPage(pageParam);
    }
  }, [searchParams, currentPage, setCurrentPage]);
};

export default usePageSync;
