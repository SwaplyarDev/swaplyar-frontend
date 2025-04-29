'use server';
import { BlogPostCardProps } from '@/types/blogs/blog';

export async function fetchBlogBySlug(slug: string): Promise<BlogPostCardProps | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/blogs/${slug}`, {
      method: 'GET',
      cache: 'no-store',
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
