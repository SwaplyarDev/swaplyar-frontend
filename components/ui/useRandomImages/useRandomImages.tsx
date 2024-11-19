import { useEffect, useState } from 'react';
import {BlogPost}  from '@/app/types'; // Define el tipo `BlogPost` si aún no lo tienes

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