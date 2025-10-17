'use client';

import Image from 'next/image';
import './shadow.css';
import clsx from 'clsx';

interface InfoBlockProps {
  title: string;
  imageSrc: string;
  imageAlt: string;
  content?: string;
  contentNode?: React.ReactNode;
  position?: boolean;
}

export default function InfoBlock({
  title,
  imageSrc,
  imageAlt,
  content,
  contentNode,
  position = false,
}: InfoBlockProps) {
  return (
    <div
      className={clsx(
        position ? 'flex-col sm:flex-row-reverse' : 'flex-col sm:flex-row',
        'flex max-w-4xl items-center justify-center gap-4',
      )}
    >
      <div className="info-image-container mb-4 flex w-full max-w-[331px] justify-center sm:max-w-[487px]">
        <div className="relative h-[400px] w-full overflow-hidden flex items-center justify-center">
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={387}
        height={350}
        className="h-full w-auto object-contain drop-shadow-light dark:drop-shadow-darkmode scale-90"
      />
    </div>
      </div>
      <div className="info-content-container flex w-full max-w-[433px] flex-col gap-4">
        <h2 className="text-start font-textFont text-4xl text-custom-grayD dark:text-custom-whiteD">{title}</h2>
        <div className="info-content text-left text-base text-custom-grayD dark:text-custom-whiteD">
          {contentNode ? (
            contentNode
          ) : (
            <p
              className="font-textFont text-base font-light text-custom-grayD dark:text-custom-whiteD"
              dangerouslySetInnerHTML={{ __html: content || '' }}
            ></p>
          )}
        </div>
      </div>
    </div>
  );
}
