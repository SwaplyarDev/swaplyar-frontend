// app/components/FlyerTrabajo.tsx
'use client';
import Link from 'next/link';
import { useDarkTheme } from '../ui/theme-Provider/themeProvider';
import { motion } from 'motion/react';
import clsx from 'clsx';
import { useSize } from '@/hooks/useSize';
import ShortButton from '../ui/NewButtons/ShortButton';

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
    <div className={`relative h-[140px] md:h-[220px] lg:h-[270px] w-full max-w-[100vw] bg-cover bg-center bg-repeat overflow-hidden`} style={{ backgroundImage }}>
      <div className={clsx('flex h-full w-full items-center justify-center', title ? 'bg-black bg-opacity-30' : '')}>
        <div className="flex flex-col items-center gap-4 overflow-hidden py-4 px-4 text-center font-textFont text-[21px] font-extrabold text-darkText max-w-full">
          {title && <h2>{title}</h2>}
          {description && (
            <>
              <div className="mask-gradient-popup flex w-full max-w-full overflow-hidden lg:hidden">
                <motion.p
                  initial={{ x: '100%' }}
                  animate={{ x: '-100%' }}
                  transition={{ duration: 25, repeat: Infinity, repeatType: 'loop', ease: 'linear' }}
                  className="min-w-max whitespace-nowrap"
                >
                  {description}
                </motion.p>
              </div>
              <p className="hidden w-full max-w-full lg:block px-4">{description}</p>
            </>
          )}
          {nameButton && (
            <ShortButton
              href={href}
              text={nameButton}
              transparent
              className="!h-[42px] !w-[220px] text-sm"
            />
          )}
        </div>
      </div>
    </div>
  );
}
