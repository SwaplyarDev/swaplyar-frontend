'use server';

import { BlogResponse } from '@/types/blogs/blog';

export const fetchBlogs = async (page: number, searchTerm: string): Promise<BlogResponse> => {
  let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/blogs?page=${page}`;
  if (searchTerm) {
    url += `&search=${encodeURIComponent(searchTerm)}`;
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      cache: 'no-store', // Evita el caché para obtener datos actualizados.
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch blogs: ${response.status} ${response.statusText}`);
    }

    const data: BlogResponse = await response.json();
    console.log(data);
    return data;
  } catch (error: any) {
    throw new Error(`Failed to fetch blogs. Error: ${error.message}`);
  }
};
