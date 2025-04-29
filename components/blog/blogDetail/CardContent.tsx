// /components/info/blog/blogDetail/CardContent.tsx

'use client';

import Image from 'next/image';
import { BlogPostCardProps, Content } from '@/types/blogs/blog';
import { useCallback, useEffect, useState } from 'react';
import { fetchBlogs } from '@/actions/blogs/blogs.actions';
import CardBlogOption from './CardBlogOption';
import { cardInfoBlog } from '@/utils/assets/imgDatabaseCloudinary';
import { footerLinks } from '@/components/footer/footerLinks';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProgressBar from '@/components/ui/ProgressBar/ProgressBar';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { gifImage } from '@/utils/assets/img-database';

// Funcion para evaluar si es un string
function isString(value: unknown): value is string {
  return typeof value === 'string' || value instanceof String;
}
// Funcion para colocar texto en negrita
// coloca en negrita a todo texto que este entre **
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
interface MenuItem {
  title: string;
  level: number;
  children?: MenuItem[];
}
/**
 * Funcion que recibe un texto continuo y lo convierte en una lista
 * Recibe los renglones que tengan # son titulos de listas y - cada item de la lista
 * */
function parseContinuousTextToMenu(text: string): MenuItem[] {
  const normalizedText = text
    .replace(/(\s*-\s*)/g, '\n- ')
    .replace(/(\s*#\s*)/g, '\n# ')
    .trim();
  const lines = normalizedText.split('\n').filter((line) => line.trim() !== '');
  const menuStack: { item: MenuItem; level: number }[] = [];
  const rootItems: MenuItem[] = [];
  let currentLevel = 0;
  for (const line of lines) {
    const isTitle = line.trim().startsWith('#');
    const isListItem = line.trim().startsWith('-');

    const indentMatch = line.match(/^\s*/);
    const indentLevel = indentMatch ? indentMatch[0].length / 2 : 0;

    const level = isTitle ? 0 : indentLevel + 1;
    const title = line.replace(/^[\s#-]*/, '').trim();

    const newItem: MenuItem = {
      title,
      level,
    };
    if (menuStack.length === 0) {
      rootItems.push(newItem);
      menuStack.push({ item: newItem, level });
      continue;
    }
    while (menuStack.length > 0 && menuStack[menuStack.length - 1].level >= level) {
      menuStack.pop();
    }
    if (menuStack.length > 0) {
      const parent = menuStack[menuStack.length - 1].item;
      if (!parent.children) {
        parent.children = [];
      }
      parent.children.push(newItem);
    } else {
      rootItems.push(newItem);
    }

    menuStack.push({ item: newItem, level });
  }

  return rootItems;
}

function CardContent(data: BlogPostCardProps) {
  const { isDark } = useDarkTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  console.log(data);
  const [randomBlog, setRandomBlog] = useState<BlogPostCardProps | null>(null);
  console.log(data);

  // Se convierte la informacion que me llega de la API en un formato que pueda ser utilizado como array
  const sideBar = parseContinuousTextToMenu(data.side_bar);

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
  useEffect(() => {
    const fetchData = async () => {
      setIsLoaded(true);
      try {
        const allBlogs = await fetchBlogs(1, '');
        if (allBlogs && allBlogs.blogsPerPage.length > 0) {
          const otherBlogs = allBlogs.blogsPerPage.filter((blog) => blog.blog_id !== data.blog_id);
          if (otherBlogs.length > 0) {
            const randomIndex = Math.floor(Math.random() * otherBlogs.length);
            setRandomBlog(otherBlogs[randomIndex]);
          } else {
            setRandomBlog(null);
          }
        }
      } catch (error) {
        console.error('Error al obtener el blog:', error);
      } finally {
        setIsLoaded(false);
      }
    };

    fetchData();
  }, [data.blog_id]);
  return (
    <>
      <div className="sticky top-28 flex w-full flex-col items-center sm:top-36">
        <div className="rounded-2xl border-2 border-buttonsLigth bg-custom-whiteD-100 p-2 dark:border-custom-whiteD-100">
          <ProgressBar value={progress} width="300px" />
        </div>
      </div>

      <section className="m-auto mt-12 flex w-full max-w-[357px] flex-col overflow-x-hidden px-4 md:mt-12 md:max-w-[729px] lg:mt-0 lg:max-w-[1368px]">
        <div className="ml-[200px] mt-[50px] hidden flex-col lg:flex lg:max-w-full">
          <p className="">
            {highlightText('El tiempo de lectura estimado para este artículo es de **4 a 5 minutos**')}
          </p>
          <div className="mt-[20px]">
            <p>16 Noviembre 2024</p>
            <p className={!isDark ? 'font-bold text-custom-blue' : 'font-bold text-custom-whiteD'}>SwaplyAr</p>
          </div>
        </div>
        <div className="mx-auto flex w-full flex-col justify-center gap-4 lg:flex-row">
          <article className="hidden h-[756px] w-[286px] flex-col gap-5 lg:ml-1 lg:flex">
            <h2 className="font-semibold">Contenido:</h2>
            <ul className="list-disc pl-5">
              {sideBar.map((item, index) => (
                <li className="list-disc" key={index}>
                  {item.title}
                  {item.children && (
                    <ul>
                      {item.children.map((child, childIndex) => (
                        <li className="list-disc" key={childIndex}>
                          {child.title}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </article>
          <section className="flex w-full max-w-[357px] flex-col gap-5 md:max-w-[680px] lg:max-w-[897px]">
            <h1
              className={
                !isDark
                  ? 'text-center text-[40px] font-semibold text-custom-blue'
                  : 'text-center text-[40px] font-semibold text-custom-whiteD'
              }
            >
              {data.title}
            </h1>
            <Image
              className="mx-auto h-[286px] w-[898px] object-cover"
              src={data.image || '/images/paypalenarg.png'}
              width={898}
              height={286}
              alt="Blog Image "
            />

            <article className="flex flex-col gap-3">
              {Array.isArray(data.content_elements) &&
                data.content_elements[0]?.content?.map((item: Content, index: number) => {
                  /* Validaciones segun tipo de style name (normal ,subtitle, ol , ul) */
                  if (item.style?.style_name === 'normal') {
                    return <p key={index}>{item.text}</p>;
                  } else if (item.style?.style_name === 'subtitle') {
                    return <h2 key={index}>{highlightText(item.text as string)}</h2>;
                  } else if (item.style?.style_name === 'ul') {
                    let list = parseContinuousTextToMenu(item.text as string);
                    return (
                      <ul key={index}>
                        {Array.isArray(list) &&
                          list.map((item, index) => (
                            <li key={index} className="list-disc">
                              {highlightText(item.title)}
                              {item.children && (
                                <ul key={index + 'ul'}>
                                  {item.children.map((child, childIndex) => (
                                    <li className="list-disc" key={childIndex}>
                                      {highlightText(child.title as string)}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          ))}
                      </ul>
                    );
                  } else if (item?.style?.style_name === 'ol') {
                    let list = parseContinuousTextToMenu(item.text as string);
                    return (
                      <ol key={index}>
                        {Array.isArray(list) &&
                          list.map((item, index) => (
                            <li key={index} className="list-decimal">
                              {highlightText(item.title)}
                              {item.children && (
                                <ol key={index + 'ol'}>
                                  {item.children.map((child, childIndex) => (
                                    <li className="list-decimal" key={childIndex}>
                                      {highlightText(child.title as string)}
                                    </li>
                                  ))}
                                </ol>
                              )}
                            </li>
                          ))}
                      </ol>
                    );
                  }
                })}
            </article>
          </section>
        </div>
        <section className="mb-[70px] mt-20 flex flex-col-reverse items-center justify-between gap-10 lg:flex-row">
          <CardBlogOption isLoaded={isLoaded} blog={randomBlog} />
          <div className="lg :ml-0 relative ml-[120px] hidden w-full max-w-[500px] sm:block">
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
        </section>
      </section>
      <section
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
      </section>
    </>
  );
}

export default CardContent;
