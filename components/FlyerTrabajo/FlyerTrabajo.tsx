// app/components/FlyerTrabajo.tsx
'use client';
import Link from 'next/link';
import { useDarkTheme } from '../ui/theme-Provider/themeProvider';
import { motion } from 'motion/react';
import clsx from 'clsx';
import { useSize } from '@/hooks/useSize';

interface FlyerTrabajoProps {
  title?: string;
  description?: string;
  nameButton?: string;
  imageSrc: string;
  href: string;
}

export default function FlyerTrabajo({ title, description, nameButton, imageSrc, href }: FlyerTrabajoProps) {
  const backgroundImage = `url(${imageSrc})`;
  const { isDark } = useDarkTheme();
  const { size } = useSize();

  return (
    <div className={`relative mb-20 mt-40 h-[272px] w-full bg-cover bg-center bg-repeat`} style={{ backgroundImage }}>
      <div className={clsx('flex h-full w-full items-center justify-center', title ? 'bg-black bg-opacity-30' : '')}>
        <div className="flex flex-col items-center gap-4 overflow-hidden py-4 text-center font-textFont text-[21px] font-extrabold text-darkText">
          {title && <h2>{title}</h2>}
          {description && (
            <>
              <div className="mask-gradient-popup flex w-full overflow-hidden lg:hidden">
                <motion.p
                  initial={
                    size >= 0 && size <= 390
                      ? { x: '40%' }
                      : size > 390 && size <= 490
                        ? { x: '50%' }
                        : size > 490 && size <= 590
                          ? { x: '60%' }
                          : size > 590 && size <= 670
                            ? { x: '70%' }
                            : size > 670 && size <= 770
                              ? { x: '80%' }
                              : size > 770 && size <= 870
                                ? { x: '90%' }
                                : size > 870 && { x: '100%' }
                  }
                  animate={{ x: '-100%' }}
                  transition={{ duration: 25, repeat: Infinity, repeatType: 'loop', ease: 'linear' }}
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
              href={href}
              className={`ease rounded-[50px] bg-buttonsLigth px-[14px] py-3 font-titleFont text-base font-semibold text-darkText transition-colors duration-300 ${isDark ? 'buttonSecondDark bg-darkText text-lightText' : 'text buttonSecond'} `}
            >
              {nameButton}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
