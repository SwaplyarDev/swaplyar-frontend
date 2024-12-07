import { BlogPostCardProps } from '@/types/blogs/blog';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function fetchBlogById(id: string): Promise<BlogPostCardProps | null> {
  try {
    const response = await fetch(`${BASE_URL}/v1/blogs/id/${id}`, {
      method: 'GET',
      cache: 'no-store', // Evita el caché para obtener datos actualizados.
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}
