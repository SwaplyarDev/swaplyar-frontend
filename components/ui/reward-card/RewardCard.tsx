// /components/reward-card/RewardCard.tsx

'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

interface RewardCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  desriptionNode?: React.ReactNode;
  linkText: string;
  linkHref: string;
  className: string;
  customImageWidth?: number;
  customTextWidth?: {
    mobile: number;
    tablet: number;
    desktop: number;
  };
}

function RewardCard({
  imageSrc,
  imageAlt,
  title,
  description,
  desriptionNode,
  linkText,
  linkHref,
  className,
  customImageWidth,
  customTextWidth,
}: RewardCardProps) {
  const textWidthClasses = customTextWidth 
    ? `w-[${customTextWidth.mobile}px] md:w-[${customTextWidth.tablet}px] lg:w-[${customTextWidth.desktop}px]`
    : '';
  return (
    <div
      className={clsx(
        'box-border flex transform flex-col items-center rounded md:justify-between lg2:flex-col w-full',
        className,
      )}
    >
      <Image
        className="object-cover drop-shadow-light dark:drop-shadow-darkmode flex-shrink-0 md:mb-0 lg:mb-0"
        src={imageSrc}
        alt={imageAlt}
        width={350}
        height={350}
        style={{ width: customImageWidth ? `${customImageWidth}px` : '303px' }}
      />
      <div className="flex flex-col gap-3 text-center w-full mt-4 md:mt-0 lg:text-left md:flex-1 md:ml-4">
        <h3 className="text-3xl">{title}</h3>
        <p className={`font-light ${textWidthClasses}`}>
          {description}
          <Link
            href={linkHref}
            className="text-buttonsLigth transition duration-300 ease-in-out hover:text-blue-700 dark:text-sky-500 dark:hover:text-sky-600"
          >
            {linkText}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RewardCard;
