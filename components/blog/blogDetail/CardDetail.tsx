// /components/info/blog/blogDetail/CardDetail.tsx

'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import CardContent from './CardContent';
import { fetchBlogById } from '@/actions/blogs/blogById.action';
import { BlogPostCardProps } from '@/types/blogs/blog';
import LoadingGif from '@/components/ui/LoadingGif/LoadingGif';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { dataBlogs } from '@/data/dataBlogs';
import { content } from 'flowbite-react/tailwind';
import { pl } from 'date-fns/locale';

function CardDetail() {
  const { isDark } = useDarkTheme();
  const [isLoading, setIsLoading] = useState(true);
  const slug = useSearchParams().get('slug');
  const blog = dataBlogs.find((blog) => blog.slug === slug);
  /*   if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingGif color={isDark ? '#ebe7e0' : '#012c8a'} size="100px" />
      </div>
    );
  } */

  if (!blog) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingGif color={isDark ? '#ebe7e0' : '#012c8a'} size="100px" />
        <p className="text-center text-gray-500">Blog not found</p>
      </div>
    );
  }

  return <CardContent data={blog} />;
}

export default CardDetail;
