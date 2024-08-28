// components/InfoBlock/InfoBlock.tsx

'use client';

import Image from 'next/image';

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
    <div className="flex max-w-3xl flex-col items-center p-8 md:flex-row">
      <div className="info-image-container mb-4 w-full md:mb-0 md:mr-8 md:w-1/2">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={750}
          height={750}
          className="rounded-lg"
        />
      </div>
      <div className="info-content-container w-full md:w-1/2">
        <div className="flex flex-col items-start">
          <h2 className="dark-title mb-4 text-2xl font-semibold">{title}</h2>
        </div>
        <div className="info-content pl-2">
          {contentNode ? (
            contentNode
          ) : (
            <p
              className=" font-light dark:font-extralight"
              dangerouslySetInnerHTML={{ __html: content || '' }}
            ></p>
          )}
        </div>
      </div>
    </div>
  );
}
