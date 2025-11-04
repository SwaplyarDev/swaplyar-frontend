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
  customImageSpacing?: boolean;
  customImageWidth?: number;
  customImageAlign?: 'left' | 'center' | 'right';
  customContentWidth?: number;
  customGap?: number;
  customImageContainerWidth?: number;
  verticalLayout?: boolean;
}

export default function InfoBlock({
  title,
  imageSrc,
  imageAlt,
  content,
  contentNode,
  position = false,
  customImageSpacing = false,
  customImageWidth,
  customImageAlign = 'center',
  customContentWidth,
  customGap,
  customImageContainerWidth,
  verticalLayout = false,
}: InfoBlockProps) {
  return (
    <div
      className={clsx(
        verticalLayout ? 'flex-col' : position ? 'flex-col sm:flex-row-reverse' : 'flex-col sm:flex-row',
        'flex max-w-6xl items-center justify-center',
        !customGap && 'gap-4 md:gap-2',
        customGap && 'md:gap-4 lg:gap-4',
      )}
      style={customGap ? { gap: `${customGap}px` } : {}}
    >
      <div className={`info-image-container ${customImageSpacing ? 'mb-0' : 'mb-4 md:mb-0'} flex ${customImageContainerWidth ? `w-[358px] xs-mini-phone:w-[358px] sm:w-[${customImageContainerWidth}px] flex-shrink-0` : 'w-full max-w-[358px] xs-mini-phone:max-w-[358px] sm:max-w-[692px] justify-center lg:max-w-[403px]'} ${!customImageContainerWidth ? 'justify-center' : ''}`}>
        <div className={`relative ${customImageSpacing ? 'h-auto' : 'h-[400px] md:h-[350px]'} ${customImageContainerWidth ? `w-[358px] xs-mini-phone:w-[358px] sm:w-[${customImageContainerWidth}px]` : 'w-full'} ${customImageSpacing ? 'overflow-visible' : 'overflow-hidden'} flex items-center ${customImageAlign === 'left' ? 'justify-start' : customImageAlign === 'right' ? 'justify-end' : 'justify-center'}`}>
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={customImageWidth || (customImageSpacing ? 258: 387)}
        height={ customImageSpacing ? 350:350}
        className={`${customImageWidth ? `w-[${customImageWidth}px] h-[350px] flex-shrink-0` : customImageSpacing ? 'w-[258px] h-[350px]' : 'h-full max-w-[692px]'} object-contain drop-shadow-light dark:drop-shadow-darkmode ${customImageSpacing ? '' : 'scale-90 md:scale-90'}`}
      />
    </div>
      </div>
      <div className={`info-content-container flex ${customContentWidth ? `w-[358px] xs-mini-phone:w-[358px] sm:max-w-[${customContentWidth}px]` : customImageSpacing ? 'w-[358px] xs-mini-phone:w-[358px] sm:max-w-[742px] md:max-w-[400px] lg:max-w-[450px]' : 'w-[358px] xs-mini-phone:w-[358px] sm:max-w-[355px] md:max-w-[400px] lg:max-w-[450px]'} flex-col gap-4`}>
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
