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
}: RewardCardProps) {
  return (
    <div
      className={clsx(
        'box-border flex transform flex-col items-center rounded md:justify-between lg2:flex-col w-[386px]',
        className,
      )}
    >
      <Image
        className="object-cover drop-shadow-light dark:drop-shadow-darkmode"
        src={imageSrc}
        alt={imageAlt}
        width={350}
        height={350}
        style={{ width: customImageWidth ? `${customImageWidth}px` : '386px' }}
      />
      <div style={{ maxWidth: '386px' }} className="text-center">
        <h3 className="text-[28px]">{title}</h3>
        <p className="font-light">
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
