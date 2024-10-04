// /components/reward-card/RewardCard.tsx

'use client';

import Image from 'next/image';

interface RewardCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
}

function RewardCard({
  imageSrc,
  imageAlt,
  title,
  description,
  linkText,
  linkHref,
}: RewardCardProps) {
  return (
    <div className="m-4 max-w-sm transform rounded bg-white p-6 box-border sm:mb-8 xs:mb-4 shadow-md transition-transform hover:scale-105 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600">
      <Image src={imageSrc} alt={imageAlt} width={210} height={150} />
      <h3 className="mt-4 text-xl font-bold">{title}</h3>
      <p className="mt-2">
        <strong>{description}</strong>{' '}
        <a href={linkHref} className="text-blue-800">
          {linkText}
        </a>
        .
      </p>
    </div>
  );
}

export default RewardCard;
