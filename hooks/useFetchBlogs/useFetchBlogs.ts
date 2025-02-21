import { useEffect, useCallback } from 'react';
import useBlogStore from '@/store/useBlogStore';
import { fetchBlogs } from '@/actions/blogs/blogs.actions';
import { UseFetchBlogsProps } from '@/types/blogs/blog';

const useFetchBlogs = ({ currentPage, searchTerm, setTotalPages }: UseFetchBlogsProps) => {
  const { setBlogs, blogs } = useBlogStore();

  const fetchAndSetBlogs = useCallback(async () => {
    try {
      const data = await fetchBlogs(currentPage, searchTerm);
      if (blogs.length > 1) {
        setBlogs([]);
        setBlogs(data.blogsPerPage);
        setTotalPages(data.meta.totalPages);
      } else {
        setBlogs(data.blogsPerPage);
        setTotalPages(data.meta.totalPages);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  }, [currentPage, searchTerm, setBlogs, setTotalPages]);

  useEffect(() => {
    fetchAndSetBlogs();
  }, [fetchAndSetBlogs]);
};

export default useFetchBlogs;
