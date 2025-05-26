'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import CardContent from './CardContent';
import { fetchBlogBySlug } from '@/actions/blogs/blogById.action';
import { BlogPostCardProps } from '@/types/blogs/blog';
import LoadingGif from '@/components/ui/LoadingGif/LoadingGif';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';

function CardDetail() {
  const { isDark } = useDarkTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [blogData, setBlogData] = useState<BlogPostCardProps | null>(null);
  const slugParam = useParams().slug;
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;
  console.log(slug);

  useEffect(() => {
    if (!slug) return console.error('error al obtener slug');
    const fetchData = async () => {
      try {
        const data = await fetchBlogBySlug(slug);
        setBlogData(data);
      } catch (error) {
        console.error('Error al obtener el blog:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingGif color={isDark ? '#ebe7e0' : '#012c8a'} size="100px" />
      </div>
    );
  }
  if (!blogData) {
    return <p className="p-6 text-center text-gray-500">Blog no encontrado.</p>;
  }

  return <CardContent {...blogData} />;
}

export default CardDetail;
