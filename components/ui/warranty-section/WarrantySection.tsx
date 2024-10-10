// /components/ui/warranty-section/WarrantySection.tsx

import Image from 'next/image';

interface GuaranteeSectionProps {
  title: string;
  text?: string;
  imageSrc: string;
  imageAlt: string;
  contentNode?: React.ReactNode;
}

const GuaranteeSection: React.FC<GuaranteeSectionProps> = ({
  title,
  text,
  imageSrc,
  imageAlt,
  contentNode,
}) => {
  return (
    <>
      <div className="hidden rs-wrapper-v4 md:flex w-full max-w-screen-lg items-center justify-center space-y-6 flex-row">
        <div className="container-text mr-8 w-[65%]">
          <h1 className="mb-2 text-pretty text-3xl font-semibold text-left lg:text-5xl">
            {title}
          </h1>
          {contentNode ? (
            contentNode
          ) : (
            <p className="text-pretty text-xl">{text}</p>
          )}
        </div>
        <div className="flex-shrink-0 h-auto">
          <Image
            className="hero-img h-96 w-auto drop-shadow-light dark:drop-shadow-darkmode"
            src={imageSrc}
            alt={imageAlt}
            width={750}
            height={750}
          />
        </div>
      </div>
      <div className="md:hidden rs-wrapper-v4 flex w-full max-w-screen-lg flex-col items-center justify-center space-y-6">
          <h1 className="mb-2 text-pretty text-center text-3xl font-semibold lg:text-5xl">
            {title}
          </h1>
          <Image
            className="hero-img h-96 w-auto drop-shadow-light dark:drop-shadow-darkmode"
            src={imageSrc}
            alt={imageAlt}
            width={750}
            height={750}
          />
          {contentNode ? (
            contentNode
          ) : (
            <p className="text-pretty text-xl">{text}</p>
          )}
      </div>
    </>
  );
};

export default GuaranteeSection;
