'use server';

import { BlogResponse } from '@/types/blogs/blog';

export const fetchBlogs = async (page: number, searchTerm: string): Promise<BlogResponse> => {
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  if (!BASE_URL) {
    throw new Error('Backend URL is not defined.');
  }

  let url = `${BASE_URL}/v1/blogs?page=${page}`;
  if (searchTerm) {
    url += `&search=${encodeURIComponent(searchTerm)}`;
  }

  const response = await fetch(url, {
    method: 'GET',
    cache: 'no-store', // Evita el caché para obtener datos actualizados.
  });

  if (!response.ok) {
    console.error(`Error fetching blogs: ${response.statusText}`);
    throw new Error(`Failed to fetch blogs: ${response.status}`);
  }

  const data: BlogResponse = await response.json();
  return data;
};
