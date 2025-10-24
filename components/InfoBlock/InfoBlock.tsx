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
        'flex max-w-6xl items-center justify-center gap-4 md:gap-2',
      )}
    >
      <div className="info-image-container mb-4 md:mb-0 flex w-full max-w-[692px] justify-center sm:max-w-[403px]">
        <div className="relative h-[400px] md:h-[350px] w-full overflow-hidden flex items-center justify-center">
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={387}
        height={350}
        className="h-full max-w-[692px] object-contain drop-shadow-light dark:drop-shadow-darkmode scale-90 md:scale-90"
      />
    </div>
      </div>
      <div className="info-content-container flex w-full max-w-[355px] md:max-w-[680px] md:!max-w-[680px] flex-col gap-4">
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
