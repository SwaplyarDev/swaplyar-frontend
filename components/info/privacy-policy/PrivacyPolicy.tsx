import React from 'react';
import AnimatedBlurredCircles from '@/components/ui/animations/AnimatedBlurredCircles';
import { sectionPrivacyPolicy } from '@/data/sectionPrivacyPolicy';
const PrivacyPolicy: React.FC = () => {
    return (
        <div className="relative mx-auto lg:mt-[55px] flex max-w-[1000px] flex-col items-center px-4 py-10 text-custom-grayD dark:text-darkText md:px-8 lg:px-4">
            <AnimatedBlurredCircles tope="top-[-1675px]" />
            <section className="flex flex-col items-center md:flex-row md:items-start lg:items-center">
                <h1 className="flex-1 text-center font-titleFont text-[38px] font-medium lg:text-[40px]">
                    Política de Privacidad
                </h1>

            </section>

            <section className="mt-[40px] w-full max-w-[1000px]">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-1">
        {sectionPrivacyPolicy.filter(Boolean).map((item, i) => {
            if (!item) return null;
            const divideTitle = (item.title ?? '').split('.');
            return (
                <div
                    key={i}
                    className="mt-6 rounded-lg bg-inputDark p-[10px] shadow-md dark:bg-[#4b4b4b] dark:text-darkText"
                >
                    {/* Título principal */}
                    <h2 className="font-textFont text-[28px]">
                        {divideTitle[0]}. <span className="text-4xl">{divideTitle[1] ?? ''}</span>
                    </h2>

                    {/* Render dinámico en orden exacto */}
                    {Array.isArray(item.blocks) && item.blocks.map((block: any, idx: number) => {
                        if (block.type === 'text') {
                            return (
                                <p
                                    key={idx}
                                    className="mt-4 font-textFont font-light"
                                    dangerouslySetInnerHTML={{ __html: block.value }}
                                />
                            );
                        }

                        if (block.type === 'subtitle') {
                            return (
                                <h3 key={idx} className="mt-4 font-textFont font-bold">
                                    {block.value}
                                </h3>
                            );
                        }

                        if (block.type === 'list') {
                            return (
                                <ul key={idx} className="list-disc pl-8 font-textFont font-light">
                                    {block.value.map((li: string | any, i: number) => (
                                        <li key={i} dangerouslySetInnerHTML={{ __html: typeof li === 'string' ? li : li.type === 'text' ? li.value : li }} />
                                    ))}
                                </ul>
                            );
                        }

                        return null;
                    })}
                </div>
            );
        })}
    </div>
</section>
</div>
);
};

export default PrivacyPolicy;








