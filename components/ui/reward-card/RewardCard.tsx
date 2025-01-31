// /components/reward-card/RewardCard.tsx

'use client';

import Image from 'next/image';

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
  /**/
  return (
    <div className="m-4 box-border flex w-full max-w-sm transform rounded p-6 xs:max-w-2xl xl:max-w-sm">
      <div className={`${className} block items-center xs:flex xl:block`}>
        <Image className="w-auto" src={imageSrc} alt={imageAlt} width={210} height={150} />
        <div>
          <h3 className="mt-4 text-[28px] font-normal">{title}</h3>
          <p className="mt-2">
            {description}
            <a
              href={linkHref}
              className="text-buttonsLigth transition duration-300 ease-in-out hover:text-blue-700 dark:text-sky-500 dark:hover:text-sky-600"
            >
              {linkText}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RewardCard;
