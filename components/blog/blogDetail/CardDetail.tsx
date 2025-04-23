// /components/info/blog/blogDetail/CardDetail.tsx

'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import CardContent from './CardContent';
import { fetchBlogById } from '@/actions/blogs/blogById.action';
import { BlogPostCardProps } from '@/types/blogs/blog';
import LoadingGif from '@/components/ui/LoadingGif/LoadingGif';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';

function CardDetail() {
  const { isDark } = useDarkTheme();
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const slug = searchParams.get('slug');
  const [blogData, setBlogData] = useState<BlogPostCardProps | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const data = await fetchBlogById('07iutjs2mv97');
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

  return <CardContent {...blogData} />;
}

/*   const slug = useSearchParams().get('slug');
  const blog = dataBlogs
    .map((blog) => ({
      title: blog.title || '',
      image: blog.image || '',
      slug: blog.slug,

      sections: {
        sidebar: {
          content: blog.sections?.sidebar?.content,
        },
        mainContent: {
          content: blog.sections.mainContent.content.map((item) => ({
            text: item?.text,
            style: item?.style,
          })),
        },
      },
    }))
    .find((blog) => blog.slug === slug) as CardContentProps['data'];
  /*   if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingGif color={isDark ? '#ebe7e0' : '#012c8a'} size="100px" />
      </div>
    );
  } */

/*   if (!blog) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <LoadingGif color={isDark ? '#ebe7e0' : '#012c8a'} size="100px" />
        <p className="text-center text-gray-500">Blog not found</p>
      </div>
    );
  } */

/*   return <CardContent data={blog} />;
} */

export default CardDetail;
