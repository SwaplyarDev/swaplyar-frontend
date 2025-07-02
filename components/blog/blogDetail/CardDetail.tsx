'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import CardContent from './CardContent';
import { fetchBlogBySlug } from '@/actions/blogs/blogById.action';
import { BlogPostCardProps } from '@/types/blogs/blog';
import LoadingGif from '@/components/ui/LoadingGif/LoadingGif';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import AnimatedBlurredCircles from '@/components/ui/animations/AnimatedBlurredCircles';

function CardDetail() {
  const { isDark } = useDarkTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [blogData, setBlogData] = useState<BlogPostCardProps | null>(null);
  const slugParam = useParams().slug;
  const slug = Array.isArray(slugParam) ? slugParam[0] : slugParam;

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
      <div className="relative flex h-screen w-full items-center justify-center">
        <AnimatedBlurredCircles tope="top-[0px]" />
        <div className="relative z-10">
          <LoadingGif color={isDark ? '#ebe7e0' : '#012c8a'} size="100px" />
        </div>
      </div>
    );
  }

  if (!blogData) {
    return (
      <div className="relative min-h-screen">
        <AnimatedBlurredCircles tope="top-[0px]" />
        <div className="relative z-10">
          <p className="p-6 text-center text-gray-500">Blog no encontrado.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <AnimatedBlurredCircles tope="top-[0px]" />
      <div className="relative z-10">
        <CardContent {...blogData} />
      </div>
    </div>
  );
}

export default CardDetail;
