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
  body: string;
  url_image: string;
  created_at: string;
}

const BlogPostCard: React.FC<BlogPostProps> = ({ blog_id, title, body, url_image, created_at, category }) => {
  const title2 = title || '';
  const slug = slugify(title2, { lower: true, strict: true });

  const formattedDate = created_at ? new Date(created_at) : null;
  const displayDate =
    formattedDate && !isNaN(formattedDate.getTime()) ? formattedDate.toLocaleDateString() : 'Fecha inválida';

  return (
    <Link href={`es/blog/blogDetail?slug=${encodeURIComponent(slug)}&id=${encodeURIComponent(blog_id)}`}>
      <div className="flex h-[443px] w-full max-w-[350px] transform flex-col overflow-hidden rounded-[16px] border border-[#012A8E] bg-white shadow-md shadow-black/25 transition-transform dark:border-inputDark dark:bg-[#323232]">
        <Image
          src={url_image}
          className="h-[198px] w-full rounded-tl-3xl rounded-tr-3xl object-cover p-3"
          alt={title}
          width={300}
          height={160}
        />

        <div className="flex flex-grow flex-col p-4">
          <p className="font-roboto mb-2 text-[12px] font-normal leading-[18px] text-black dark:text-darkText">
            {category}
          </p>
          <h3 className="font-roboto mb-2 text-[18px] font-semibold leading-[27px] text-black dark:text-darkText">
            {title}
          </h3>
          <p className="font-roboto mb-4 line-clamp-3 min-h-[72px] text-[16px] font-light leading-[24px] text-black dark:text-darkText">
            {body}
          </p>
          <div className="mt-auto flex items-center justify-between border-t border-gray-300 pt-2 text-sm text-blue-500">
            <div className="flex items-center">
              <p className="text-[#969696]">Más información</p>
              <FontAwesomeIcon icon={faArrowRight} className="ml-2 text-[#969696]" />
            </div>
            <p className="text-sm text-gray-500">{displayDate}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogPostCard;
