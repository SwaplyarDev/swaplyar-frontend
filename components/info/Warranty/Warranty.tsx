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
    <main className="relative flex w-full flex-col items-center justify-center gap-20 py-10 mt-[34px]">
      <AnimatedBlurredCircles tope="top-[-150px]" />
      <section
        className="flex-col items-center justify-center gap-12 w-[927px]"
        style={{ margin: currentMargin }}
      >
        <h1 className="text-center font-titleFont text-[38px] font-medium md:text-[40px] w-[796px]">
          Seguridad y confianza en cada transacción
        </h1>
        <section className="mt-[30px] flex flex-col items-center justify-between  md:flex-row">
          <div className="w-[478px] h-[144px]">
            <p className="font-textFont text-base font-light leading-relaxed w-[388px] h-[144px] ml-[90px]">{TextWarranty[0].text}</p>
          </div>

          <Image
            className="drop-shadow-light dark:drop-shadow-darkmode mr-[90px]"
            src={Garantizamos}
            alt={'Garantizamos'}
            width={338}
            height={384}
          />
        </section>
        <section className="mx-auto mt-10  w-full max-w-screen-md ">
          <CardWarranty cardsData={cardsData} />
        </section>

        <section className="mx-auto mt-10 mb-[-30px] w-[862px] flex w-full flex-col items-center gap-5 text-left text-lightText dark:text-darkText md:flex-row">
          <Image
            className="drop-shadow-light dark:drop-shadow-darkmode w-[454px] h-[400px]"
            src={Ventajaalelegirswaplyar}
            alt={'Ventajas de elegir SwaplyAr'}
            width={454}
            height={400}
          />
          <article className="mt-10 flex flex-col w-[388px]">
            <h2 className="font-textFont text-4xl">{TextWarranty[1].title}</h2>
            <p className="mt-10 font-textFont text-base font-light leading-relaxed md:mt-0">
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
