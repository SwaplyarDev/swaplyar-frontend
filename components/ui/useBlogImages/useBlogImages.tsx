import { useEffect } from 'react';

export const useBlogImages = (
  blogs: { url_image: string }[] | null,
  setImages: React.Dispatch<React.SetStateAction<string[]>>,
  previousBlogs: { url_image: string }[] | null,
) => {
  useEffect(() => {
    if (Array.isArray(blogs) && blogs !== previousBlogs) {
      const extractedImages = blogs.map((el) => el.url_image);
      setImages(extractedImages);
    }
  }, [blogs, previousBlogs, setImages]);
};
