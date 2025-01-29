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
          .map((link) => ` <strong><LinkWithHover href="${link.link}">${link.name}</LinkWithHover></strong>`)
          .join(', ');
      } else {
        content += ` <strong><LinkWithHover href="${item.links.link}">${item.links.name}</LinkWithHover></strong>`;
      }
    }
    return content;
  });

  return (
    <main className="relative flex w-full flex-col items-center justify-center gap-20 py-10">
      <AnimatedBlurredCircles tope="top-[-150px]" />
      <section
        className="flex-col items-center justify-center gap-12 md:max-w-[42.1rem] lg:max-w-[49.1rem]"
        style={{ margin: currentMargin }}
      >
        <h1 className="mb-2 text-center font-titleFont text-[38px] font-bold md:text-[40px]">
          Seguridad y Confianza en cada transacción
        </h1>
        <section className="flex flex-col items-center justify-items-center gap-5 md:flex-row">
          <p className="font-textFont text-base leading-relaxed">{TextWarranty[0].text}</p>

          <Image
            className="drop-shadow-light dark:drop-shadow-darkmode"
            src={Garantizamos}
            alt={'Garantizamos'}
            width={331}
            height={380}
          />
        </section>
        <section className="mx-auto mb-6 mt-12 w-full max-w-screen-md md:mb-24 md:mt-24">
          <CardWarranty cardsData={cardsData} />
        </section>

        <section className="mx-auto mb-6 mt-12 flex w-full flex-col items-center gap-5 text-left text-lightText dark:text-darkText md:flex-row">
          <Image
            className="drop-shadow-light dark:drop-shadow-darkmode"
            src={Ventajaalelegirswaplyar}
            alt={'Ventajas de elegir SwaplyAr'}
            width={331}
            height={335}
          />
          <article className="flex flex-col">
            <h1 className="mb-2 font-titleFont text-4xl font-bold">{TextWarranty[1].title}</h1>
            <p className="mb-4 font-textFont text-base leading-relaxed">
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
