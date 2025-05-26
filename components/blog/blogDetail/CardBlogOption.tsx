import Image from 'next/image';
import React from 'react';
import { BlogPostCardProps } from '@/types/blogs/blog';
import slugify from 'slugify';
import Link from 'next/link';

interface CardBlogOptionProps {
  isLoaded: boolean;
  blog: BlogPostCardProps | null;
}

const CardBlogOption = ({ isLoaded, blog }: CardBlogOptionProps) => {
  return (
    <article className="w-full max-w-[425px]">
      {isLoaded || !blog ? (
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
        <Link
          href={`${blog.slug}`}
          className="flex flex-col gap-4 rounded-2xl border-2 border-buttonsLigth bg-custom-whiteD-100 p-2 text-lightText dark:border-custom-whiteD-100"
        >
          <Image
            src={blog.image}
            alt={blog.title}
            width={500}
            height={286}
            className="max-h-[181px] w-full rounded-xl object-cover"
          />
          <section className="flex flex-col items-center gap-2">
            <div>
              <p className="font-textFont text-xl font-bold">{blog.title}</p>

              <p className="font-roboto min mb-4 line-clamp-3 text-[16px] font-light leading-[24px] text-black dark:text-darkText">
                {blog.description}
              </p>
            </div>
            <button
              className={`buttonSecond relative flex h-[48px] w-[200px] items-center justify-center rounded-3xl border border-buttonsLigth bg-buttonsLigth p-3 font-textFont font-semibold text-white`}
            >
              Leer más
            </button>
          </section>
        </Link>
      )}
    </article>
  );
};

export default CardBlogOption;
