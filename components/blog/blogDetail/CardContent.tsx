// /components/info/blog/blogDetail/CardContent.tsx

'use client';

import Image from 'next/image';
import { BlogPostCardProps } from '@/types/blogs/blog';
import useBlogStore from '@/store/useBlogStore';
import { useEffect, useState } from 'react';
import { fetchBlogs } from '@/actions/blogs/blogs.actions';
import SkeletonLoader from '@/components/ui/SkeletonLoader/SkeletonLoader';
import CardBlogOption from './CardBlogOption';
import { cardInfoBlog } from '@/utils/assets/imgDatabaseCloudinary';
import { footerLinks } from '@/components/footer/footerLinks';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProgressBar from '@/components/ui/ProgressBar/ProgressBar';

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
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

      const progressValue = (scrollTop / scrollHeight) * 100;
      setProgress(progressValue);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <main className="relative mx-auto w-full max-w-screen-phone px-4 xs-mini-phone2:max-w-screen-tablet md:max-w-screen-desktop md:px-8 lg:px-4">
      <div className="sticky top-28 flex w-full flex-col items-center sm:top-36">
        <div className="rounded-2xl border-2 border-buttonsLigth bg-custom-whiteD-100 p-2 dark:border-custom-whiteD-100">
          <ProgressBar value={progress} width="300px" />
        </div>
      </div>
      <div className="mx-auto hidden max-w-[975px] flex-col gap-7 pb-5 pt-10 lg:flex">
        <p className="font-textFont text-lg">
          El tiempo de lectura estimado para este artículo es de <span className="font-bold">4 a 5 minutos</span>
        </p>
        <div className="flex flex-col gap-1.5">
          <p className="font-textFont text-lg">{blogData.create_at}</p>
          <p className="font-textFont text-lg font-bold text-buttonsLigth dark:text-darkText">SwaplyAr</p>
        </div>
      </div>
      <div className="flex gap-5">
        <div className="hidden w-full max-w-[286px] lg:block">
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
        <div className="flex w-full flex-col gap-7 sm:mt-20 lg:mt-0">
          <div className="flex w-full flex-col gap-4">
            <h1 className="p-2.5 text-center font-titleFont text-4xl font-semibold text-buttonsLigth dark:text-darkText lg:text-start">
              {blogData.title}
            </h1>
            <Image
              src={blogData.url_image}
              alt={blogData.title}
              width={500}
              height={286}
              className="mx-auto h-[214px] object-cover sm-tablet:w-full sm-tablet:px-20 lg:h-[286px] lg:px-0"
            />
          </div>
          <div className="flex flex-col gap-6" id="blog-content">
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
      <div className="mb-[70px] mt-20 flex flex-col-reverse items-center justify-between gap-10 lg:flex-row">
        <CardBlogOption isLoaded={isLoaded} randomBlog={randomBlog} />
        <div className="relative ml-[120px] hidden w-full max-w-[500px] sm:block lg:ml-0">
          <Image
            src={cardInfoBlog}
            alt="cardImage"
            width={500}
            height={262}
            className="h-[262px] w-full object-cover"
          />
          <div className="absolute left-[68px] top-[33px] flex w-[240px] flex-col gap-4">
            <p className="text-center font-textFont text-xl font-semibold text-lightText">
              Si este artículo te resultó útil, ¡compártelo con tu comunidad! Etiquétanos @SwaplyAr y cuéntanos qué
              opinas.
            </p>
            <div className="flex justify-between">
              {footerLinks.social.map(({ href, icon, label }) => (
                <Link
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={`SwaplyAr en ${label}`}
                  className="transition-opacity duration-200 hover:opacity-75"
                >
                  <FontAwesomeIcon icon={icon} className="text-4xl text-lightText" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CardContent;
