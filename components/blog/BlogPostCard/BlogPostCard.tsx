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
}

const BlogPostCard: React.FC<BlogPostProps> = ({ blog_id, title, description, image, category }) => {
  const title2 = title || '';
  const slug = slugify(title2, { lower: true, strict: true });

  return (
    <Link
      href={`blog/blogDetail?slug=${encodeURIComponent(slug)}&id=${encodeURIComponent(blog_id)}`}
      className="flex h-full w-full items-center justify-center"
    >
      <div className="flex h-[443px] w-full max-w-[350px] transform flex-col overflow-hidden rounded-[16px] border border-[#012A8E] bg-white shadow-md shadow-black/25 transition-transform dark:border-inputDark dark:bg-[#323232]">
        <Image
          src={image}
          className="h-[198px] w-full rounded-tl-3xl rounded-tr-3xl object-cover p-3"
          alt={title}
          width={300}
          height={160}
        />

        <div className="flex w-[360px] flex-grow flex-col p-4">
          <p className="font-roboto mb-2 text-[12px] font-normal leading-[18px] text-black dark:text-darkText">
            {category}
          </p>
          <h3 className="font-roboto mb-2 text-[18px] font-semibold leading-[27px] text-black dark:text-darkText">
            {title}
          </h3>
          <p className="font-roboto min mb-4 line-clamp-3 text-[16px] font-light leading-[24px] text-black dark:text-darkText">
            {description}
          </p>
          <div className="mt-auto flex items-center justify-between border-t border-gray-300 pt-2 text-sm text-blue-500">
            <div className="flex items-center">
              <p className="text-[#969696]">Más información</p>
              <FontAwesomeIcon icon={faArrowRight} className="ml-2 text-[#969696]" />
            </div>
            {/*  <p className="text-sm text-gray-500">{displayDate}</p> */}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogPostCard;
