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
    <div className="m-4 max-w-sm transform rounded  p-6 ">
      <Image src={imageSrc} alt={imageAlt} width={210} height={150} />
      <h3 className="mt-4 text-xl font-bold">{title}</h3>
      <p className="mt-2">
        <strong>{description}</strong>{' '}
        <a href={linkHref} className="text-buttonsLigth transition duration-300 ease-in-out hover:text-blue-700 dark:text-sky-500 dark:hover:text-sky-600">
          {linkText}
        </a>
        .
      </p>
    </div>
  );
}

export default RewardCard;
