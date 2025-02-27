import { useEffect, useCallback } from 'react';
import useBlogStore from '@/store/useBlogStore';
import { fetchBlogs } from '@/actions/blogs/blogs.actions';
import { UseFetchBlogsProps } from '@/types/blogs/blog';

const useFetchBlogs = ({ currentPage, searchTerm, setTotalPages }: UseFetchBlogsProps) => {
  const { setBlogs, blogs, setIsLoading, isLoading } = useBlogStore();

  useEffect(() => {
    const fetchAndSetBlogs = async () => {
      setIsLoading(true);
      try {
        const data = await fetchBlogs(currentPage, searchTerm);
        if (data.blogsPerPage) {
          setBlogs(data.blogsPerPage);
          setTotalPages(data.meta.totalPages);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAndSetBlogs();
  }, [currentPage, searchTerm, setTotalPages]);
};

export default useFetchBlogs;
