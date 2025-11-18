// /components/ui/warranty-section/WarrantySection.tsx

import Image from 'next/image';

interface GuaranteeSectionProps {
  title: string;
  text?: string;
  imageSrc: string;
  imageAlt: string;
  contentNode?: React.ReactNode;
}

const GuaranteeSection: React.FC<GuaranteeSectionProps> = ({ title, text, imageSrc, imageAlt, contentNode }) => {
  return (
    <>
      <div className="rs-wrapper-v4 hidden w-full max-w-screen-lg flex-row items-center justify-center space-y-6 text-lightText dark:text-darkText md:flex">
        <div className="container-text mr-8 w-[65%] h-[338px] flex flex-col justify-center">
          <h1 className="mb-2 text-pretty text-left font-titleFont text-3xl font-semibold lg:text-5xl">{title}</h1>
          {contentNode ? contentNode : <p className="text-pretty text-xl">{text}</p>}
        </div>
        <div className="h-auto flex-shrink-0">
          <Image
            className="hero-img h-[338px] w-auto drop-shadow-light dark:drop-shadow-darkmode"
            src={imageSrc}
            alt={imageAlt}
            width={750}
            height={750}
          />
        </div>
      </div>
      <div className="rs-wrapper-v4 flex w-full max-w-screen-lg flex-col items-center justify-center space-y-8 md:hidden">
        <h1 className="mb-2 text-pretty text-center font-titleFont text-3xl font-semibold lg:text-5xl">{title}</h1>
        <Image
          className="hero-img h-[338px] w-auto drop-shadow-light dark:drop-shadow-darkmode"
          src={imageSrc}
          alt={imageAlt}
          width={750}
          height={750}
        />
        {contentNode ? contentNode : <p className="text-pretty font-textFont text-xl">{text}</p>}
      </div>
    </>
  );
};

export default GuaranteeSection;
