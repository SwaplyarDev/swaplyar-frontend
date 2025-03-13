// /components/info/blog/blogDetail/CardDetail.tsx

'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import CardContent from './CardContent';
import { fetchBlogById } from '@/actions/blogs/blogById.action';
import { BlogPostCardProps } from '@/types/blogs/blog';
import LoadingGif from '@/components/ui/LoadingGif/LoadingGif';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';

const CardDetail: React.FC = () => {
  const searchParams = useSearchParams();
  const { isDark } = useDarkTheme();
  const id = searchParams.get('id');
  const slug = searchParams.get('slug');
  const [blogData, setBlogData] = useState<BlogPostCardProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const data = await fetchBlogById(id);
        setBlogData(data);
      } catch (error) {
        console.error('Error al obtener el blog:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, slug]);

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

  return <CardContent blogData={blogData} />;
};

export default CardDetail;
