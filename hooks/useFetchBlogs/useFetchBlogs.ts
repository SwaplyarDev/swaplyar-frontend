import { useEffect, useCallback } from 'react';
import useBlogStore from '@/store/useBlogStore';
import { fetchBlogs, filterBlogs } from '@/actions/blogs/blogs.actions';
import { UseFetchBlogsProps } from '@/types/blogs/blog';

const useFetchBlogs = ({ currentPage, searchTerm }: UseFetchBlogsProps) => {
  const { setBlogs, setIsLoading, setTotalPages } = useBlogStore();

  useEffect(() => {
    console.log('currentPage:', currentPage, 'searchTerm:', searchTerm);
    if (searchTerm === '') {
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
    } else {
      const fetchAndSetFilteredBlogs = async () => {
        setIsLoading(true);
        try {
          const data = await filterBlogs(searchTerm, currentPage);
          console.log(data);
          if (data.blogsPerPage) {
            setBlogs(data.blogsPerPage);
            setTotalPages(data.meta.totalPages);
          }
        } catch (error) {
          console.error('Error fetching filtered blogs:', error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchAndSetFilteredBlogs();
    }
  }, [currentPage, searchTerm, setBlogs, setIsLoading]);
};

export default useFetchBlogs;
