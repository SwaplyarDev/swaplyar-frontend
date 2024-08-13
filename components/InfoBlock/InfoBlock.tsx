// components/InfoBlock/InfoBlock.tsx

"use client";

import Image from 'next/image';

interface InfoBlockProps {
    title: string;
    imageSrc: string;
    imageAlt: string;
    content?: string;
    contentNode?: React.ReactNode;
}

export default function InfoBlock({ title, imageSrc, imageAlt, content, contentNode }: InfoBlockProps) {
    return (
        <div className="flex items-center flex-col mt-16 mb-12 md:flex-row w-4/5 "> 
            <div className="info-image-container mb-4 md:mb-0 md:mr-8 w-full md:w-1/2"> 
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    width={350} 
                    height={350} 
                    className="md:ml-16"
                />
            </div>
            <div className="info-content-container w-full md:w-1/2"> 
                <div className="flex flex-col items-start">
                    <h2 className="dark-title text-4xl mb-4 text-gray-blue">{title}</h2>
                </div>
                <div className="info-content text-xl text-gray-blue ">
                    {contentNode ? contentNode : <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: content || '' }}></p>}
                </div>
            </div>
        </div>
    );
}
