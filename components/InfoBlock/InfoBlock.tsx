// components/InfoBlock/InfoBlock.tsx

"use client";

import Image from 'next/image';

interface InfoBlockProps {
    title: string;
    imageSrc: string;
    imageAlt: string;
    content: string;
}

export default function InfoBlock({ title, imageSrc, imageAlt, content }: InfoBlockProps) {
    return (
        <div className="flex items-center flex-col md:flex-row p-8 max-w-3xl"> 
        <div className="info-image-container mb-4 md:mb-0 md:mr-8 w-full md:w-1/2"> 
            <Image
            src={imageSrc}
            alt={imageAlt}
            width={750} 
            height={750} 
            className="rounded-lg shadow-md"
            />
        </div>
        <div className="info-content-container w-full md:w-1/2"> 
            <div className="flex flex-col items-start">
            <h2 className="dark-title text-2xl font-semibold mb-4">{title}</h2>
            </div>
            <div className="info-content pl-2">
                <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: content }}></p>
            </div>
        </div>
        </div>
    );
}
