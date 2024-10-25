// @ts-ignore
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
      <div className="border-4 border-[#012C8A] rounded-[20px] overflow-hidden">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Slide ${index + 1}`} className="w-full h-60 object-cover" />
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
            border: 2px solid #012C8A;
          }
          .slick-dots li.slick-active button {
            background: #012C8A;
          }
        `}</style>
      </div>
    );
};
export default ImageCarousel;