'use client';

import Image from 'next/image';
import { BlogPostCardProps, Content } from '@/types/blogs/blog';
import { useEffect, useState } from 'react';
import { fetchBlogs } from '@/actions/blogs/blogs.actions';
import CardBlogOption from './CardBlogOption';
import { cardInfoBlog, paypalEnArg } from '@/utils/assets/imgDatabaseCloudinary';
import { footerLinks } from '@/components/footer/footerLinks';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProgressBar from '@/components/ui/ProgressBar/ProgressBar';
import { useDarkTheme } from '@/components/ui/theme-Provider/themeProvider';
import { gifImage } from '@/utils/assets/img-database';
import slugify from 'slugify';
import ButtonBack from '../ButtonBack/ButtonBack';

// Funcion para evaluar si es un string
function isString(value: unknown): value is string {
  return typeof value === 'string' || value instanceof String;
}

// Funcion para colocar texto en negrita
// coloca en negrita a todo texto que este entre **
export function highlightText(text: string, withId?: boolean) {
  if (isString(text)) {
    const parts = text.split(/(\*\*.*?\*\*)/);
    return (
      Array.isArray(parts) &&
      parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <span
            key={i}
            style={{ fontWeight: '600' }}
            id={withId ? slugify(part.slice(2, -2), { lower: true, strict: true }) : undefined}
          >
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
  console.log('blogs', data);
  const [randomBlog, setRandomBlog] = useState<BlogPostCardProps | null>(null);
  const [hasTopPopup, setHasTopPopup] = useState(false);

  // Se convierte la informacion que me llega de la API en un formato que pueda ser utilizado como array
  const sideBar = parseContinuousTextToMenu(data.side_bar);

  useEffect(() => {
    const updatePopupVisibility = () => {
      const isVisible = !JSON.parse(sessionStorage.getItem('isClosed') || 'false');
      setHasTopPopup(isVisible);
    };

    const handleVisibilityChange = () => updatePopupVisibility();

    updatePopupVisibility();

    window.addEventListener('storage', handleVisibilityChange);
    window.addEventListener('topPopupVisibilityChange', handleVisibilityChange);

    return () => {
      window.removeEventListener('storage', handleVisibilityChange);
      window.removeEventListener('topPopupVisibilityChange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const articleElement = document.querySelector('article[data-article-content]');

      if (!articleElement) return;

      const articleRect = articleElement.getBoundingClientRect();
      const articleTop = articleRect.top + window.pageYOffset;
      const articleHeight = articleRect.height;

      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;

      const startReadingPoint = articleTop - windowHeight + 150;

      const endReadingPoint = articleTop + articleHeight - windowHeight + 200;

      let progressValue = 0;

      if (scrollTop <= 10) {
        progressValue = 0;
      } else if (scrollTop > startReadingPoint) {
        if (scrollTop >= endReadingPoint) {
          progressValue = 100;
        } else {
          const totalReadingDistance = endReadingPoint - startReadingPoint;
          const currentReadingDistance = scrollTop - startReadingPoint;
          progressValue = (currentReadingDistance / totalReadingDistance) * 100;
        }
      } else {
        progressValue = 0;
      }

      setProgress(Math.max(0, Math.min(100, progressValue)));
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
    console.log(slugify('¿Qué es Payoneer?', { lower: true, strict: true }));
    fetchData();
  }, [data.blog_id]);

  // Funcion para convertir fecha tipo AÑO-MES-DIA en DIA de MES del AÑO
  function convertirFecha(date: string): string {
    const [year, month, day] = date.split('-');

    const months: { [key: string]: string } = {
      '01': 'enero',
      '02': 'febrero',
      '03': 'marzo',
      '04': 'abril',
      '05': 'mayo',
      '06': 'junio',
      '07': 'julio',
      '08': 'agosto',
      '09': 'septiembre',
      '10': 'octubre',
      '11': 'noviembre',
      '12': 'diciembre',
    };

    const monthName = months[month];

    return `${day} de ${monthName} del ${year}`;
  }

  return (
    <main className="font-textFont">
      <div
        className={`fixed left-0 right-0 z-50 flex justify-center transition-all duration-300 ease-in-out ${
          hasTopPopup
            ? 'top-[calc(62px+44px)] md:top-[calc(64px+44px)] lg:top-[calc(72px+44px)] min-[1280px]:top-[calc(80px+44px)]'
            : 'top-[72px] md:top-[72px] lg:top-[72px] min-[1280px]:top-[80px]'
        } ${progress > 0 ? 'opacity-100' : 'opacity-0'}`}
      >
        <ProgressBar value={progress} width="100%" />
      </div>

      <section className="m-auto mt-3 flex w-full max-w-[90%] flex-col overflow-x-hidden px-4 transition-all duration-300 ease-in-out sm:max-w-[95%] sm:px-6 md:mt-5 md:max-w-[768px] md:px-8 lg:max-w-[900px] lg:px-10 min-[1280px]:mt-0 min-[1280px]:max-w-[1200px] min-[1280px]:px-4">
        <div className="mt-2 flex w-full max-w-full items-center justify-between px-0 transition-all duration-300 ease-in-out md:mt-1 lg:mt-5 lg:px-0">
          <div className="flex-shrink-0 transition-all duration-300 ease-in-out">
            <ButtonBack />
          </div>

          <div className="hidden flex-1 whitespace-nowrap text-center opacity-0 transition-all duration-500 ease-in-out lg:block lg:opacity-100">
            {highlightText(
              `El tiempo de lectura estimado para este artículo es de **${data.reading_time[0]} a ${data.reading_time[2]}** **minutos** `,
            )}
          </div>

          <div className="flex flex-col items-end transition-all duration-300 ease-in-out">
            <div className="text-sm font-semibold transition-all duration-300 ease-in-out md:text-base lg:text-lg">
              <p>{convertirFecha(data.date)}</p>
            </div>
            <div className="block transition-all duration-300 ease-in-out lg:hidden">
              <p
                className={`text-sm transition-colors duration-300 ease-in-out ${!isDark ? 'font-bold text-custom-blue' : 'font-bold text-custom-whiteD'}`}
              >
                SwaplyAr
              </p>
            </div>
          </div>
        </div>

        <div className="-mt-4 mb-5 hidden justify-end px-4 opacity-0 transition-all duration-500 ease-in-out lg:flex lg:px-0 lg:opacity-100">
          <div className="min-w-[150px] text-right transition-all duration-300 ease-in-out">
            <p
              className={`text-sm transition-colors duration-300 ease-in-out ${!isDark ? 'font-bold text-custom-blue' : 'font-bold text-custom-whiteD'}`}
            >
              SwaplyAr
            </p>
          </div>
        </div>

        <div className="mx-auto flex w-full flex-col justify-center gap-4 transition-all duration-500 ease-in-out min-[1280px]:flex-row min-[1280px]:gap-8">
          <article className="hidden h-auto w-full flex-col gap-5 overflow-hidden transition-all duration-500 ease-in-out min-[1280px]:ml-1 min-[1280px]:flex min-[1280px]:h-[756px] min-[1280px]:w-[286px] min-[1280px]:opacity-100">
            <h2 className="font-semibold transition-all duration-300 ease-in-out">Contenido:</h2>
            <ul className="list-disc pl-5 transition-all duration-300 ease-in-out">
              {sideBar.map((item, index) => (
                <li
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(slugify(item.title, { lower: true, strict: true }));
                    if (el) {
                      const yOffset = -130;
                      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                  }}
                  style={{ cursor: 'pointer' }}
                  className="list-disc transition-all duration-200 ease-in-out hover:text-custom-blue"
                  key={index}
                >
                  {item.title}

                  {item.children && (
                    <ul className="transition-all duration-300 ease-in-out">
                      {item.children.map((child, childIndex) => (
                        <li
                          onClick={(e) => {
                            e.preventDefault();
                            const el = document.getElementById(slugify(child.title, { lower: true, strict: true }));
                            if (el) {
                              const yOffset = -130;
                              const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                              window.scrollTo({ top: y, behavior: 'smooth' });
                            }
                          }}
                          style={{ cursor: 'pointer' }}
                          className="ml-5 list-disc transition-all duration-200 ease-in-out hover:text-custom-blue"
                          key={childIndex}
                        >
                          {child.title}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </article>

          <section className="mt-4 flex w-full flex-col gap-4 transition-all duration-300 ease-in-out sm:mt-6 sm:gap-5 md:mt-8 md:gap-6 lg:gap-8">
            <h1
              className={`text-center font-semibold transition-all duration-300 ease-in-out ${
                !isDark ? 'text-custom-blue' : 'text-custom-whiteD'
              } text-[24px] sm:text-[26px] md:text-[28px] lg:text-[32px] min-[1280px]:text-[40px]`}
            >
              {data.title}
            </h1>

            <Image
              className="mx-auto h-[160px] w-full object-cover transition-all duration-300 ease-in-out sm:h-[180px] md:h-[200px] lg:h-[240px] min-[1280px]:h-[286px]"
              src={data.image || paypalEnArg}
              width={898}
              height={286}
              alt="Blog Image"
            />

            <article
              data-article-content
              className="flex w-full flex-col gap-3 transition-all duration-300 ease-in-out sm:gap-4 md:gap-5 lg:gap-6"
            >
              {Array.isArray(data.content_elements) &&
                data.content_elements[0]?.content?.map((item: Content, index: number) => {
                  if (item.style?.style_name === 'normal') {
                    return (
                      <p
                        key={index}
                        className="w-full text-sm transition-all duration-300 ease-in-out sm:text-base md:text-base lg:text-lg"
                      >
                        {highlightText(item.text as string)}
                      </p>
                    );
                  } else if (item.style?.style_name === 'subtitle') {
                    return (
                      <h2
                        key={index}
                        className="w-full text-lg font-semibold transition-all duration-300 ease-in-out sm:text-xl md:text-xl lg:text-2xl"
                      >
                        {highlightText(item.text as string, true)}
                      </h2>
                    );
                  } else if (item.style?.style_name === 'ul') {
                    let list = parseContinuousTextToMenu(item.text as string);
                    return (
                      <ul key={index} className="w-full transition-all duration-300 ease-in-out">
                        {Array.isArray(list) &&
                          list.map((item, index) => (
                            <li
                              key={index}
                              className="ml-5 list-disc text-sm transition-all duration-300 ease-in-out sm:text-base md:text-base lg:text-lg"
                            >
                              {highlightText(item.title, true)}
                              {item.children && (
                                <ul key={index + 'ul'} className="transition-all duration-300 ease-in-out">
                                  {item.children.map((child, childIndex) => (
                                    <li
                                      className="ml-5 list-disc transition-all duration-300 ease-in-out"
                                      key={childIndex}
                                    >
                                      {highlightText(child.title as string, true)}
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
                      <ol key={index} className="w-full transition-all duration-300 ease-in-out">
                        {Array.isArray(list) &&
                          list.map((item, index) => (
                            <li
                              key={index}
                              className="ml-5 list-decimal text-sm transition-all duration-300 ease-in-out sm:text-base md:text-base lg:text-lg"
                            >
                              {highlightText(item.title, true)}
                              {item.children && (
                                <ol key={index + 'ol'} className="transition-all duration-300 ease-in-out">
                                  {item.children.map((child, childIndex) => (
                                    <li
                                      className="ml-5 list-disc transition-all duration-300 ease-in-out"
                                      key={childIndex}
                                    >
                                      {highlightText(child.title as string, true)}
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

        <section className="mb-[70px] mt-12 flex flex-col-reverse items-center justify-between gap-6 transition-all duration-500 ease-in-out sm:mt-16 sm:gap-8 md:mt-20 md:gap-10 lg:gap-12 min-[1280px]:flex-row min-[1280px]:gap-10">
          <CardBlogOption isLoaded={isLoaded} blog={randomBlog} />

          <div className="relative ml-0 hidden w-full max-w-[400px] transition-all duration-500 ease-in-out sm:ml-[60px] sm:block sm:max-w-[450px] md:ml-[80px] md:max-w-[480px] lg:ml-[100px] lg:max-w-[500px] xl:ml-[120px]">
            <Image
              src={cardInfoBlog}
              alt="cardImage"
              width={500}
              height={262}
              className="h-auto w-full object-cover transition-all duration-300 ease-in-out"
            />
            <div className="absolute left-[68px] top-[33px] flex w-[240px] flex-col gap-4">
              <p className="text-center font-textFont text-xl font-semibold text-lightText">
                Si este artículo te resultó útil, ¡compártelo con tu comunidad! Etiquétanos @SwaplyAr y cuéntanos qué
                opinas.
              </p>
              <div className="flex justify-between transition-opacity duration-300 ease-in-out">
                {footerLinks.social.map(({ href, icon, label }) => (
                  <Link
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={`SwaplyAr en ${label}`}
                    className="transition-all duration-300 ease-in-out hover:scale-110 hover:opacity-75"
                  >
                    <FontAwesomeIcon
                      icon={icon}
                      className="text-2xl text-lightText transition-all duration-300 ease-in-out sm:text-3xl md:text-3xl lg:text-4xl"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </section>

      <section
        className="mt-12 flex h-[200px] w-full flex-col items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat transition-all duration-300 ease-in-out sm:h-[220px] md:h-[240px] lg:h-[260px] xl:h-[272px]"
        style={{ backgroundImage: `url(${gifImage})` }}
      >
        <div className="max-w-[90%] text-center font-textFont text-[16px] font-extrabold leading-loose text-darkText transition-all duration-300 ease-in-out sm:text-[18px] md:max-w-[600px] md:text-[19px] lg:text-[20px] xl:text-[21px]">
          Mantente al día
        </div>
        <div className="max-w-[90%] text-center font-textFont text-[16px] font-extrabold leading-loose text-darkText transition-all duration-300 ease-in-out sm:text-[18px] md:max-w-[768px] md:text-[19px] lg:text-[20px] xl:text-[21px]">
          Regístrate para recibir novedades en tu correo electrónico
        </div>

        <div className="mt-4 inline-flex h-[40px] w-[250px] items-center justify-center gap-2.5 rounded-[50px] bg-darkText px-3.5 py-3 transition-all duration-300 ease-in-out hover:scale-105 sm:h-[42px] sm:w-[270px] md:h-[44px] md:w-[290px] lg:h-[46px] lg:w-[300px]">
          <div className="font-titleFont text-sm font-semibold text-lightText transition-all duration-300 ease-in-out sm:text-base md:text-base lg:text-base">
            Suscribete
          </div>
        </div>
      </section>
    </main>
  );
}

export default CardContent;
