"use client";

import Image from 'next/image';
import './shadow.css'


interface InfoBlockProps {
  title: string;
  imageSrc: string;
  imageAlt: string;
  content?: string;
  contentNode?: React.ReactNode;
}

export default function InfoBlock({ title, imageSrc, imageAlt, content, contentNode }: InfoBlockProps) {
  return (
    <div className="flex flex-col items-center justify-center mt-16 mb-12 md:flex-row w-full max-w-4xl"> 
      <div className="info-image-container mb-4 md:mb-0 md:mr-8 w-full md:w-1/2 flex justify-center"> 
      <Image
  src={imageSrc}
  alt={imageAlt}
  width={350} 
  height={350} 
  className="md:ml-16 drop-shadow-light dark:drop-shadow-darkmode"  
/>

      </div>
      <div className="info-content-container w-full md:w-1/2"> 
        <div className="flex flex-col items-center md:items-start">
          <h2 className="dark-title text-4xl mb-4 text-gray-blue dark:text-white text-center md:text-left">{title}</h2>
        </div>
        <div className="info-content text-xl text-gray-blue dark:text-white text-center md:text-left">
          {contentNode ? contentNode : <p className="text-gray-700 dark:text-white" dangerouslySetInnerHTML={{ __html: content || '' }}></p>}
        </div>
      </div>
    </div>
  );
}

