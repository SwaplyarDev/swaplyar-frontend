'use client';

import Image from 'next/image';
import './shadow.css';

interface InfoBlockProps {
  title: string;
  imageSrc: string;
  imageAlt: string;
  content?: string;
  contentNode?: React.ReactNode;
}

export default function InfoBlock({
  title,
  imageSrc,
  imageAlt,
  content,
  contentNode,
}: InfoBlockProps) {
  return (
    <div className="mb-12 mt-16 flex w-full max-w-4xl flex-col items-center justify-center md:flex-row">
      <div className="info-image-container mb-4 flex w-[90%] justify-center md:mb-0 md:mr-8 md:w-1/2">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={350}
          height={350}
          className="drop-shadow-light dark:drop-shadow-darkmode md:ml-16"
        />
      </div>
      <div className="info-content-container w-[90%] md:w-1/2">
        <div className="flex flex-col items-center md:items-start">
          <h2 className="dark-title mb-4 text-center text-3xl text-gray-blue dark:text-white md:text-left md:text-4xl">
            {title}
          </h2>
        </div>
        <div className="info-content px-2 md:px-0 text-left text-xl text-gray-blue dark:text-white ">
          {contentNode ? (
            contentNode
          ) : (
            <p
              className="text-gray-700 dark:text-white"
              dangerouslySetInnerHTML={{ __html: content || '' }}
            ></p>
          )}
        </div>
      </div>
    </div>
  );
}
