'use client';

import Image from 'next/image';
import Link from 'next/link';
import slugify from 'slugify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface BlogPostProps {
  blog_id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  body?: String;
  date?: string;
  slug: string;
}
function convertDate(date: string) {
  const listDate = date.split('-').reverse();
  return `${listDate[0]}/${listDate[1]}/${listDate[2]}`;
}

const BlogPostCard: React.FC<BlogPostProps> = ({ blog_id, title, description, image, category, date, slug }) => {
  return (
    <Link href={`blog/${slug}`} className="flex h-full w-full">
      <div className="flex h-full w-full flex-col overflow-hidden rounded-[16px] border border-custom-blue bg-white shadow-md shadow-black/25 transition-transform hover:scale-[1.02] dark:border-inputDark dark:bg-[#323232]">
        <div className="relative h-0 w-full pb-[56.25%]">
          {' '}
          <Image
            src={image}
            className="absolute left-0 top-0 h-full w-full object-cover p-3"
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="flex flex-grow flex-col p-4">
          <p className="font-roboto mb-2 text-xs font-normal text-black dark:text-darkText md:text-sm">{category}</p>
          <h3 className="font-roboto mb-2 line-clamp-2 text-lg font-semibold text-black dark:text-darkText md:text-xl">
            {title}
          </h3>
          <p className="font-roboto mb-4 line-clamp-3 text-sm font-light text-black dark:text-darkText md:text-base">
            {description}
          </p>
          <div className="mt-auto border-t border-gray-300 pt-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center">
                <p className="text-sm text-[#969696] md:text-base">Más información</p>
                <FontAwesomeIcon icon={faArrowRight} className="ml-2 text-[#969696]" />
              </div>
              <p className="text-sm text-[#969696] md:text-base">{date ? convertDate(date) : 'Fecha no disponible'}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogPostCard;
