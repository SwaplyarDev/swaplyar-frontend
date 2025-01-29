// app/components/FlyerTrabajo.tsx
'use client';
import Link from 'next/link';
import { useDarkTheme } from '../ui/theme-Provider/themeProvider';
import { motion } from 'motion/react';
import clsx from 'clsx';

interface FlyerTrabajoProps {
  title?: string;
  description?: string;
  nameButton?: string;
  imageSrc: string;
}

export default function FlyerTrabajo({ title, description, nameButton, imageSrc }: FlyerTrabajoProps) {
  const backgroundImage = `url(${imageSrc})`;
  const { isDark } = useDarkTheme();

  return (
    <div className={`relative mb-20 mt-40 h-[272px] w-full bg-cover bg-center bg-repeat`} style={{ backgroundImage }}>
      <div className={clsx('flex h-full w-full items-center justify-center', title ? 'bg-black bg-opacity-30' : '')}>
        <div className="flex flex-col items-center gap-4 overflow-hidden py-4 text-center font-textFont text-[21px] font-extrabold text-darkText">
          {title && <h2>{title}</h2>}
          {description && (
            <>
              <div className="mask-gradient-popup w-full lg:hidden">
                <motion.p
                  animate={{ x: ['100%', '-100%'] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  className="min-w-max"
                >
                  {description}
                </motion.p>
              </div>
              <p className="hidden w-full lg:block">{description}</p>
            </>
          )}
          {nameButton && (
            <Link
              href={'/info/how-to-use'}
              className={`ease rounded-[50px] bg-buttonsLigth px-[14px] py-3 font-titleFont font-semibold text-darkText transition-colors duration-300 ${isDark ? 'buttonSecondDark bg-darkText text-lightText' : 'text buttonSecond'} `}
            >
              {nameButton}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
