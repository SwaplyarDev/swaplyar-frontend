import { useEffect } from 'react';
import { fetchBlogs } from '@/components/ui/fetchBlogs/fetchBlogs';
import useBlogStore from '@/store/useBlogStore';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const useFetchBlogs = (currentPage: number, searchTerm: string, setTotalPages: (pages: number) => void) => {
  const { setBlogs } = useBlogStore();

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const data = await fetchBlogs(currentPage, searchTerm, BASE_URL!);
        setBlogs(data.blogsPerPage);
        setTotalPages(data.meta.totalPages);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    getBlogs();
  }, [currentPage, searchTerm, setBlogs, setTotalPages]);
};
