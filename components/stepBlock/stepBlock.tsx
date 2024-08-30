'use client';

import Image from 'next/image';
import { BsCaretRightFill } from 'react-icons/bs';

interface StepBlockProps {
  title: string;
  imageSrc: string;
  imageAlt: string;
  content?: string;
  contentNode?: React.ReactNode;
}

export default function StepBlock({
  title,
  imageSrc,
  imageAlt,
  content,
  contentNode,
}: StepBlockProps) {
  return (
    <main className="flex max-w-screen-xl flex-col items-center p-8 lg:flex-row">
      <section className="info-image-container mb-4 w-full md:w-1/2 lg:mb-0 lg:mr-8">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={750}
          height={750}
          className="rounded-lg"
        />
      </section>
      <section className="info-content-container w-full lg:w-1/2">
        <span className="flex flex-col items-start">
          <h2 className="dark-title mb-4 flex items-center text-2xl font-semibold lg:text-3xl">
            {' '}
            <BsCaretRightFill className="hidden sm:block" />
            {title}
          </h2>
        </span>

        <article className="info-content pl-2">
          {contentNode ? (
            contentNode
          ) : (
            <p
              className="text-pretty font-light dark:font-extralight lg:text-xl"
              dangerouslySetInnerHTML={{ __html: content || '' }}
            ></p>
          )}
        </article>
      </section>
    </main>
  );
}
