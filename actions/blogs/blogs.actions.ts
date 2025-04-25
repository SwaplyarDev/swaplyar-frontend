'use server';

import { BlogResponse } from '@/types/blogs/blog';

export const fetchBlogs = async (page: number, searchTerm: string): Promise<BlogResponse> => {
  let url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/blogs?page=${page}`; // URL base para la API de blogs
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
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(`Failed to fetch blogs. Error: ${error.message}`);
  }
};

export const filterBlogs = async (searchTerm: string): Promise<BlogResponse> => {
  console.log('search', encodeURIComponent(searchTerm));

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/blogs/${encodeURIComponent(searchTerm)}`, {
      method: 'GET',
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch blogs: ${response.status} ${response.statusText}`);
    }

    const data: BlogResponse = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(`Failed to fetch blogs. Error: ${error.message}`);
  }
};
