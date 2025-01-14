import { useState, useEffect } from 'react';
import useBlogStore from '@/store/useBlogStore';

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const useBlogs = (currentPage: number, searchTerm: string) => {
  const { setBlogs } = useBlogStore();
  const [totalPages, setTotalPages] = useState<number>(0);
  const [data, setData] = useState<number | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        let url = `${NEXT_PUBLIC_BACKEND_URL}/v1/blogs?page=${currentPage}`;

        if (searchTerm) {
          url += `&search=${encodeURIComponent(searchTerm)}`;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        setBlogs(data.blogsPerPage);
        setData(data.meta.totalPages);
        setTotalPages(data.meta.totalPages);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, [currentPage, searchTerm, setBlogs]);

  return { totalPages, data };
};

export default useBlogs;
