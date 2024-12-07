import { BlogPost } from '@/types/blogs/blog';
import { useEffect, useState } from 'react';

export const useRandomImages = (blogs: BlogPost[]) => {
  const [randomImages, setRandomImages] = useState<string[]>([]);

  useEffect(() => {
    if (Array.isArray(blogs)) {
      const images = blogs.map((el) => el.url_image);
      setRandomImages(images);
    }
  }, [blogs]);

  return randomImages;
};
