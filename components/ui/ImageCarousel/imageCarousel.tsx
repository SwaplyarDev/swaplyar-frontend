// @ts-ignore
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';

const ImageCarousel: React.FC<{ images: string[] }> = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dotsClass: 'slick-dots slick-thumb',
  };

  return (
    <div className="overflow-hidden rounded-[20px] border-4 border-[#012C8A]">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <Image
              src={image}
              alt={`Slide ${index + 1}`}
              className="h-60 w-full object-cover"
            />
          </div>
        ))}
      </Slider>
      <style jsx>{`
        .slick-dots {
          bottom: 10px;
        }
        .slick-dots li {
          width: 20px;
          height: 20px;
        }
        .slick-dots li button {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: white;
          border: 2px solid #012c8a;
        }
        .slick-dots li.slick-active button {
          background: #012c8a;
        }
      `}</style>
    </div>
  );
};
export default ImageCarousel;
