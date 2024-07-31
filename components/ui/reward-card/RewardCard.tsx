// /components/reward-card/RewardCard.tsx

"use client";

import Image from 'next/image';

interface RewardCardProps {
    imageSrc: string;
    imageAlt: string;
    title: string;
    description: string;
    linkText: string;
    linkHref: string;
}

function RewardCard({ imageSrc, imageAlt, title, description, linkText, linkHref }: RewardCardProps) {
    return (
        <div className="bg-white dark:bg-gray-700 m-4 p-6 rounded shadow-md max-w-sm text-black dark:text-white transform transition-transform hover:scale-105 hover:bg-gray-200 dark:hover:bg-gray-600">
        <Image
            src={imageSrc}
            alt={imageAlt}
            width={210}
            height={150}
        />
        <h3 className="text-xl font-bold mt-4">{title}</h3>
        <p className="mt-2">
            <strong>{description}</strong> <a href={linkHref} className="text-blue-800">{linkText}</a>.
        </p>
        </div>
    );
}

export default RewardCard;
