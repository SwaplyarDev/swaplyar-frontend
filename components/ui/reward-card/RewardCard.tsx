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
}: RewardCardProps) {
  return (
    <div
      className={clsx(
        'box-border flex w-full transform flex-col items-center rounded md:justify-between lg2:flex-col',
        className,
      )}
    >
      <Image
        className="w-[332px] object-cover drop-shadow-light dark:drop-shadow-darkmode lg2:w-[385px]"
        src={imageSrc}
        alt={imageAlt}
        width={350}
        height={350}
      />
      <div className="max-w-[332px] lg2:max-w-[385px]">
        <h3 className="self-start text-[28px]">{title}</h3>
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
