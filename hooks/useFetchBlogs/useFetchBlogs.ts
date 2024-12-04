import { useEffect, useCallback } from 'react';
import useBlogStore from '@/store/useBlogStore';
import { fetchBlogs } from '@/actions/fetchBlogs/fetchBlogs.actions';
import { UseFetchBlogsProps } from '@/types/blogs/blog';

const useFetchBlogs = ({ currentPage, searchTerm, setTotalPages }: UseFetchBlogsProps) => {
  const { setBlogs } = useBlogStore();

  const fetchAndSetBlogs = useCallback(async () => {
    try {
      const data = await fetchBlogs(currentPage, searchTerm);
      setBlogs(data.blogsPerPage);
      setTotalPages(data.meta.totalPages);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  }, [currentPage, searchTerm, setBlogs, setTotalPages]);

  useEffect(() => {
    fetchAndSetBlogs();
  }, [fetchAndSetBlogs]);
};

export default useFetchBlogs;
