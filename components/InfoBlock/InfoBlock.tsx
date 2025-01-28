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

export default function InfoBlock({ title, imageSrc, imageAlt, content, contentNode }: InfoBlockProps) {
  return (
    <article className="mb-12 mt-16 flex max-w-4xl flex-col items-center justify-center">
      <div className="info-image-container mb-4 flex justify-center">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={350}
          height={350}
          className="drop-shadow-light dark:drop-shadow-darkmode"
        />
      </div>
      <div className="info-content-container w-full">
        <div className="flex flex-col items-center">
          <h2 className="dark-title mb-4 text-center font-titleFont text-3xl text-lightText dark:text-darkText">
            {title}
          </h2>
        </div>
        <div className="info-content text-left text-xl text-lightText dark:text-darkText">
          {contentNode ? (
            contentNode
          ) : (
            <p
              className="font-textFont text-lightText dark:text-darkText"
              dangerouslySetInnerHTML={{ __html: content || '' }}
            ></p>
          )}
        </div>
      </div>
    </article>
  );
}
