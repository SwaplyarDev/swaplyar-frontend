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
    <div className="rs-wrapper-v4 my-8 flex flex-col items-center md:flex-row md:items-start">
      <div className="container-text md:mr-8">
        <h1>{title}</h1>
        {contentNode ? contentNode : <p>{text}</p>}
      </div>
      <div className="flex-shrink-0">
        <Image
          className="hero-img"
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
