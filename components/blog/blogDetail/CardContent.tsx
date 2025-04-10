// /components/info/blog/blogDetail/CardContent.tsx

'use client';

import Image from 'next/image';
import { BlogPostCardProps, CardContentProps } from '@/types/blogs/blog';
import { useEffect, useState } from 'react';
import { fetchBlogs } from '@/actions/blogs/blogs.actions';
import CardBlogOption from './CardBlogOption';
import { cardInfoBlog } from '@/utils/assets/imgDatabaseCloudinary';
import { footerLinks } from '@/components/footer/footerLinks';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProgressBar from '@/components/ui/ProgressBar/ProgressBar';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
function isString(value: unknown): value is string {
  return typeof value === 'string' || value instanceof String;
}

export function highlightText(text: string) {
  if (isString(text)) {
    const parts = text.split(/(\*\*.*?\*\*)/);
    return (
      Array.isArray(parts) &&
      parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <span key={i} style={{ fontWeight: '700' }}>
            {part.slice(2, -2)}
          </span>
        ) : (
          part
        ),
      )
    );
  }
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
    <ul className="list-disc">
      {array.map((item) => (
        <li key={item.item_id} id={item.item_id}>
          <span className="font-semibold">{item.dsc_item}</span>
          {item.sub_items && item.sub_items.length > 0 && (
            <ul className="list-decimal pl-5">
              {item.sub_items.map((subItem: any) => (
                <li key={subItem.subItem_id} id={subItem.subItem_id}>
                  <span className="font-semibold">{subItem.title}</span>{' '}
                  <span className="font-light">{subItem.dsc_subItem}</span>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

function CardContent({ data }: CardContentProps) {
  const { isDark } = useDarkTheme();
  const [randomBlog, setRandomBlog] = useState<BlogPostCardProps | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const sideBar = data?.sections.sidebar.content;
  const mainContent = data?.sections.mainContent.content;
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

      const progressValue = Math.min((scrollTop / scrollHeight) * 100, 100);

      setProgress((prev) => (prev >= 100 ? 100 : progressValue));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /*    useEffect(() => {
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
  }, [blogData]);  */

  return (
    <section className="m-auto flex w-[1366px] flex-col">
      <div className="ml-[181px] mt-[100px]">
        <p className="">{highlightText('El tiempo de lectura estimado para este artículo es de **4 a 5 minutos**')}</p>
        <div className="mt-[20px]">
          <p>16 Noviembre 2024</p>
          <p className={!isDark ? 'font-bold text-[#012A8E]' : 'font-bold text-[#EBE7E0]'}>SwaplyAr</p>
        </div>
      </div>
      <div className="flex gap-10">
        {/* SideBar */}
        <article className="mt-[50px] flex h-[756px] w-[286px] flex-col gap-5">
          <h4 className="font-semibold">Contenido: </h4>
          <ul className="list-disc pl-5">
            {sideBar.map((content: string | string[], index: number) => {
              if (Array.isArray(content)) {
                return (
                  <ul key={index} className="list-disc pl-5">
                    {content.map((text: string, idx: number) => (
                      <li key={idx}>
                        <a href="">{text}</a>
                      </li>
                    ))}
                  </ul>
                );
              } else {
                return (
                  <li key={index}>
                    <a href="">{content}</a>
                  </li>
                );
              }
            })}
          </ul>
        </article>
        {/* Main Content */}
        <main className="flex w-[897px] flex-col gap-5">
          <h1 className={!isDark ? 'text-center text-4xl text-[#012A8E]' : 'text-center text-4xl text-[#EBE7E0]'}>
            {data.title}
          </h1>
          <Image className="mx-auto" src={data.image} width={898} height={286} alt="Imagen del blog" />
          <section className="flex flex-col gap-3">
            {mainContent.map((content: { text: string | string[]; style: string }, index: number) => {
              if (content.style === 'normal') {
                return (
                  <p key={index} className="mb-4">
                    {highlightText(content.text as string)}
                  </p>
                );
              } else if (content.style === 'subtitle') {
                return (
                  <h2 key={index} className="">
                    {highlightText(content.text as string)}
                  </h2>
                );
              } else if (content.style === 'ul') {
                if (Array.isArray(content.text)) {
                  return (
                    <ul key={index} className="list-disc pl-5">
                      {content.text.map((item: string, idx: number) => {
                        return Array.isArray(item) ? (
                          <ul key={idx} className="list-disc pl-5">
                            {item.map((subItem, subIdx) => (
                              <li key={subIdx}>{highlightText(subItem)}</li>
                            ))}
                          </ul>
                        ) : (
                          <li key={idx}>{highlightText(item)}</li>
                        );
                      })}
                    </ul>
                  );
                }
              } else if (content.style === 'ol') {
                return Array.isArray(content.text) ? (
                  <ol className="list-decimal pl-5">
                    {content.text.map((item: string, index: number) => (
                      <li key={index}>{highlightText(item)}</li>
                    ))}
                  </ol>
                ) : null;
              }
              return null;
            })}
          </section>
        </main>
      </div>
    </section>
  );
}

export default CardContent;
