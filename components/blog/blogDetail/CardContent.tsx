// /components/info/blog/blogDetail/CardContent.tsx

'use client';

import Image from 'next/image';
import { BlogPostCardProps } from '@/types/blogs/blog';
import useBlogStore from '@/store/useBlogStore';
import { useEffect, useState } from 'react';
import { fetchBlogs } from '@/actions/blogs/blogs.actions';
import SkeletonLoader from '@/components/ui/SkeletonLoader/SkeletonLoader';

interface CardContentProps {
  blogData: BlogPostCardProps;
}

const renderList = (array: any[]) => {
  return (
    <ul className="list-disc pl-5">
      {array.map((item) => (
        <li key={item.item_id} id={item.item_id}>
          <a href={`#${item.item_id}`} className="hover:text-buttonsExtraLigth hover:underline">
            {item.dsc_item}
          </a>
        </li>
      ))}
    </ul>
  );
};

const renderListBlog = (array: any[]) => {
  return (
    <ul className="list-disc pl-5">
      {array.map((item) => (
        <li key={item.item_id} id={item.item_id}>
          <span className="font-semibold">{item.dsc_item}</span>
          {item.sub_items && item.sub_items.length > 0 && (
            <ul className="list-decimal pl-5">
              {item.sub_items.map((subItem: any) => (
                <li key={subItem.subItem_id} id={subItem.subItem_id}>
                  <span className="font-semibold">{subItem.title}</span> {subItem.dsc_subItem}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

const CardContent: React.FC<CardContentProps> = ({ blogData }) => {
  const [randomBlog, setRandomBlog] = useState<BlogPostCardProps | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoaded(true);

      try {
        const allBlogs = await fetchBlogs(1, '');
        if (allBlogs && allBlogs.blogsPerPage.length > 0) {
          let firstBlog = allBlogs.blogsPerPage[0];
          setRandomBlog(firstBlog);
          if (blogData.id === firstBlog.blog_id && allBlogs.blogsPerPage[1]) {
            setRandomBlog(allBlogs.blogsPerPage[1]);
          }
        }
      } catch (error) {
        console.error('Error al obtener el blog:', error);
      } finally {
        setIsLoaded(false);
      }
    };

    fetchData();
  }, [blogData]);

  return (
    <main className="mx-auto w-full max-w-screen-phone px-4 xs-mini-phone2:max-w-screen-tablet md:max-w-screen-desktop md:px-8 lg:px-4">
      <div className="mx-auto flex max-w-[975px] flex-col gap-7 pb-5 pt-10">
        <p className="font-textFont text-lg">
          El tiempo de lectura estimado para este artículo es de <span className="font-bold">4 a 5 minutos</span>
        </p>
        <div className="flex flex-col gap-1.5">
          <p className="font-textFont text-lg">{blogData.create_at}</p>
          <p className="font-textFont text-lg font-bold text-buttonsLigth dark:text-darkText">SwaplyAr</p>
        </div>
      </div>
      <div className="flex gap-5">
        <div className="w-full max-w-[286px]">
          <div className="sticky top-32 flex flex-col gap-4">
            <h2 className="font-textFont text-xl font-semibold">Contenido:</h2>
            {blogData.subtitulos && blogData.subtitulos.length > 0 && (
              <ul className="list-disc pl-5 font-textFont">
                {blogData.subtitulos.map((sub, index) => (
                  <li key={sub.subtitulo_id}>
                    <a href={`#${sub.subtitulo_id}`} className="hover:text-buttonsExtraLigth hover:underline">
                      {sub.subtitulo}
                    </a>
                    {sub.items && sub.items.length > 0 && renderList(sub.items)}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="flex w-full flex-col gap-7">
          <div className="flex w-full flex-col gap-4">
            <h1 className="p-2.5 font-titleFont text-4xl font-semibold text-buttonsLigth dark:text-darkText">
              {blogData.title}
            </h1>
            <Image
              src={blogData.url_image}
              alt={blogData.title}
              width={500}
              height={286}
              className="h-[286px] w-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-6">
            {blogData.subtitulos &&
              blogData.subtitulos.length > 0 &&
              blogData.subtitulos.map((sub, index) => (
                <div key={sub.subtitulo_id} id={sub.subtitulo_id} className="scroll-mt-32 font-textFont">
                  <p className="font-semibold">{sub.subtitulo}</p>
                  <p>{sub.dsc_subtitulo}</p>
                  {sub.items && sub.items.length > 0 && renderListBlog(sub.items)}
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="w-full max-w-[425px] rounded-2xl p-2">
          {isLoaded || !randomBlog ? (
            <div className="w-full animate-pulse overflow-hidden rounded-lg border border-gray-300 bg-white shadow-lg">
              <div className="h-40 w-full bg-gray-300"></div>
              <div className="space-y-3 p-4">
                <div className="h-6 w-full rounded bg-gray-300"></div>
                <div className="h-4 w-3/4 rounded bg-gray-300"></div>
                <div className="h-4 w-5/6 rounded bg-gray-300"></div>
                <div className="mt-4 h-4 w-2/3 rounded bg-gray-300"></div>
              </div>
            </div>
          ) : (
            <Image src={randomBlog.url_image} alt={randomBlog.title} width={500} height={286} />
          )}
        </div>
        <div></div>
      </div>
    </main>
  );
};

export default CardContent;
