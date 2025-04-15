// /components/info/blog/blogDetail/CardContent.tsx

'use client';

import Image from 'next/image';
import { BlogPostCardProps, CardContentProps } from '@/types/blogs/blog';
import { useCallback, useEffect, useState } from 'react';
import { fetchBlogs } from '@/actions/blogs/blogs.actions';
import CardBlogOption from './CardBlogOption';
import { cardInfoBlog } from '@/utils/assets/imgDatabaseCloudinary';
import { footerLinks } from '@/components/footer/footerLinks';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProgressBar from '@/components/ui/ProgressBar/ProgressBar';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { dataBlogs } from '@/data/dataBlogs';
import { set } from 'date-fns';
import { get } from 'http';
import { gifImage } from '@/utils/assets/img-database';
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

function CardContent({ data }: CardContentProps) {
  const { isDark } = useDarkTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const indexBlog = dataBlogs.findIndex((blog) => blog.slug === data.slug);
  const sideBar = data?.sections.sidebar.content;
  const mainContent = data?.sections.mainContent.content;

  const getRandomBlog = useCallback(() => {
    if (dataBlogs.length <= 1) return null;

    const seed = data.slug.length;
    const otherBlogs = dataBlogs.filter((blog) => blog.slug !== data.slug);

    if (otherBlogs.length === 0) return null;

    const randomIndex = Math.floor((seed * 9301 + 49297) % otherBlogs.length);
    return otherBlogs[randomIndex];
  }, [data.slug]);

  const randomBlog = getRandomBlog();
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

  return (
    <>
      <div className="sticky top-28 flex w-full flex-col items-center sm:top-36">
        <div className="rounded-2xl border-2 border-buttonsLigth bg-custom-whiteD-100 p-2 dark:border-custom-whiteD-100">
          <ProgressBar value={progress} width="300px" />
        </div>
      </div>

      <section className="m-auto mt-5 flex w-full max-w-[357px] flex-col overflow-x-hidden px-4 md:mt-12 md:max-w-[729px] lg:mt-0 lg:max-w-[1368px]">
        <div className="ml-[200px] mt-[100px] hidden flex-col lg:flex lg:max-w-full">
          <p className="">
            {highlightText('El tiempo de lectura estimado para este artículo es de **4 a 5 minutos**')}
          </p>
          <div className="mt-[20px]">
            <p>16 Noviembre 2024</p>
            <p className={!isDark ? 'font-bold text-[#012A8E]' : 'font-bold text-[#EBE7E0]'}>SwaplyAr</p>
          </div>
        </div>
        <div className="mx-auto flex w-full flex-col justify-center gap-4 lg:flex-row">
          {/* SideBar */}
          <article className="hidden h-[756px] w-[286px] flex-col gap-5 lg:ml-1 lg:flex">
            <h4 className="font-semibold">Contenido: </h4>
            <ul className="list-disc pl-5">
              {(sideBar as string[]).map((content, index) =>
                Array.isArray(content) ? (
                  <ul key={`${index}-sub`} className="list-disc pl-5">
                    {content.map((text, idx) => (
                      <li key={`${index}-${idx}`}>{text}</li>
                    ))}
                  </ul>
                ) : (
                  <li key={index}>{content}</li>
                ),
              )}
            </ul>
          </article>
          {/* Main Content */}
          <main className="flex w-full max-w-[357px] flex-col gap-5 md:max-w-[680px] lg:max-w-[897px]">
            <h1 className={!isDark ? 'text-center text-4xl text-[#012A8E]' : 'text-center text-4xl text-[#EBE7E0]'}>
              {data.title}
            </h1>
            <Image className="mx-auto" src={data.image} width={898} height={286} alt={data.title} />
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
                      {content.text.map((item: string, idx: number) => {
                        return Array.isArray(item) ? (
                          <ul key={idx} className="list-disc pl-5">
                            {item.map((subItem, subIdx) => {
                              return Array.isArray(subItem) ? (
                                <ul>
                                  {subItem.map((subSubitem: string, idx: number) => (
                                    <li className="ml-5 list-disc" key={idx}>
                                      {highlightText(subSubitem)}
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <li key={subIdx}>{highlightText(subItem)}</li>
                              );
                            })}
                          </ul>
                        ) : (
                          <li key={idx}>{highlightText(item)}</li>
                        );
                      })}
                    </ol>
                  ) : null;
                }
                return null;
              })}
            </section>
          </main>
        </div>
        <div className="mb-[70px] mt-20 flex flex-col-reverse items-center justify-between gap-10 lg:flex-row">
          <CardBlogOption isLoaded={isLoaded} blog={randomBlog} />
          <div className="relative ml-[120px] hidden w-full max-w-[500px] sm:block lg:ml-0">
            <Image
              src={cardInfoBlog}
              alt="cardImage"
              width={500}
              height={262}
              className="h-[262px] w-auto object-cover"
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
      </section>
      <div
        className="mt-12 flex h-[272px] w-full flex-col items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${gifImage})` }}
      >
        <div className="max-w-[90%] text-center font-textFont text-[21px] font-extrabold leading-loose text-darkText md:max-w-[600px]">
          Mantente al día
        </div>
        <div className="max-w-[90%] text-center font-textFont text-[21px] font-extrabold leading-loose text-darkText md:max-w-[600px]">
          Regístrate para recibir novedades en tu correo electrónico
        </div>

        <div className="mt-4 inline-flex h-[46px] w-[300px] items-center justify-center gap-2.5 rounded-[50px] bg-darkText px-3.5 py-3">
          <div className="font-titleFont text-base font-semibold text-lightText">Suscribete</div>
        </div>
      </div>
    </>
  );
}

export default CardContent;
