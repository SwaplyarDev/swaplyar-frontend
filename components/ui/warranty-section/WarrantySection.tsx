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
    <div className="rs-wrapper-v4 flex flex-col space-y-6 items-center justify-center md:flex-row w-full max-w-screen-lg">
      <div className="container-text md:mr-8 md:w-[68%]">
        <h1 className=' font-semibold text-3xl lg:text-5xl mb-2'>{title}</h1>
        {contentNode ? contentNode : <p className=' text-3xl '>{text}</p>}
      </div>
      <div className="flex-shrink-0 h-1/2 md:w-[32%] md:h-auto">
        <Image
          className="hero-img h-96 w-auto  drop-shadow-light dark:drop-shadow-darkmode"
          src={imageSrc}
          alt={imageAlt}
          width={750}
          height={750}
        />
      </div>
    </div>
  );
};

export default GuaranteeSection;
