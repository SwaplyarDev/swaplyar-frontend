// /components/about-us/AboutUs.tsx
'use client';
import Image from 'next/image';
import CardWarranty from '@/components/ui/cards/card-warranty/card-warranty';
import { TextWarranty, cardsData } from '@/data/mockWarranty';
import { useMargins } from '@/context/MarginProvider';
import { ResponsiveMarginHook } from '@/hooks/ResponsiveMarginHook';
import AnimatedBlurredCircles from '@/components/ui/animations/AnimatedBlurredCircles';
import { Garantizamos, Ventajaalelegirswaplyar } from '@/utils/assets/imgDatabaseCloudinary';

const Warranty = () => {
  const { margins } = useMargins();
  const currentMargin = ResponsiveMarginHook(margins);

  const combinedText = TextWarranty.slice(-2).map((item) => {
    let content = item.text;
    if (item.links) {
      if (Array.isArray(item.links)) {
        content += item.links
          .map((link) => ` <u><LinkWithHover href="${link.link}">${link.name}</LinkWithHover></u>`)
          .join(', ');
      } else {
        content += ` <u><LinkWithHover href="${item.links.link}">${item.links.name}</LinkWithHover></u>`;
      }
    }
    return content;
  });

  return (
    <main className="relative flex w-full flex-col items-center justify-center gap-20 py-10 mt-[10px] md:mt-[5px] lg:mt-[40px]">
      <AnimatedBlurredCircles tope="top-[-150px]" />
      <section
        className="flex-col items-center justify-center gap-12 w-full max-w-[358px] md:max-w-[704px] lg:max-w-[927px] "
        style={{ margin: currentMargin }}
      >
        <h1 className="text-center font-titleFont text-[32px] font-medium md:text-[40px] w-full lg:px-16 ">
          Seguridad y confianza en cada transacción
        </h1>
        <section className="mt-[30px] flex flex-col items-center justify-between md:flex-row">
          <div className="w-full max-w-[358px] md:max-w-[371px] lg:max-w-[478px] h-auto md:h-[144px]">
            <p className="font-textFont text-base font-light leading-relaxed w-full max-w-[358px] md:max-w-[355px] md:text-left lg:max-w-[388px] mx-auto md:mx-0 lg:ml-[90px]">{TextWarranty[0].text}</p>
          </div>

          <Image
            className="drop-shadow-light dark:drop-shadow-darkmode md:mr-[90px] lg:mr-[90px] w-[300px] md:w-[333px] lg:w-[338px] mx-auto md:mx-0"
            src={Garantizamos}
            alt={'Garantizamos'}
            width={338}
            height={384}
          />
        </section>
        <section className="mx-auto mt-10  w-full max-w-screen-md ">
          <CardWarranty cardsData={cardsData} />
        </section>

        <section className="mx-auto mt-10 mb-[-30px] max-w-[358px] md:max-w-[704px] lg:max-w-[927px] flex w-full flex-col items-center gap-5 md:gap-0 lg:gap-5 text-left text-lightText dark:text-darkText md:flex-row md:justify-between lg:justify-start">
          <Image
            className="drop-shadow-light dark:drop-shadow-darkmode w-[358px] md:w-[331px] lg:w-[454px] h-[300px] md:h-[300px] lg:h-[400px] object-contain"
            src={Ventajaalelegirswaplyar}
            alt={'Ventajas de elegir SwaplyAr'}
            width={454}
            height={400}
          />
          <article className="mt-10 md:mt-0 flex flex-col w-full max-w-[358px] md:max-w-[360px] lg:max-w-[388px]">
            <h2 className="font-textFont text-[30px] leading-tight">{TextWarranty[1].title}</h2>
            <p className="mt-0 mb-4 font-textFont text-base font-light leading-relaxed md:mt-0 md:max-w-[360px] ">
              {combinedText.map((text, index) => (
                <span key={index} dangerouslySetInnerHTML={{ __html: text }} />
              ))}
            </p>
          </article>
        </section>
      </section>
    </main>
  );
};

export default Warranty;
