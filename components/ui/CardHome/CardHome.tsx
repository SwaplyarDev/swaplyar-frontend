import Image from 'next/image';
import React from 'react';

interface CardHomeProps {
  icon: string;
  name: string;
  description: string;
  date: string;
}

const CardHome = ({ icon, name, description, date }: CardHomeProps) => {
  return (
    <article className="flex h-[542px] w-[358px] flex-col items-center gap-7 rounded-2xl border-2 border-buttonsLigth bg-buttonsLigthDark p-5 dark:border-custom-whiteD dark:bg-custom-grayD-500">
      <div className="flex flex-col items-center gap-3">
        <div className="h-[140px] w-[140px] rounded-full">
          <Image src={icon} alt={name} width={140} height={140} />
        </div>
        <div className="h-[42px] w-full"></div>
        <p className="font-textFont text-base font-light text-custom-grayD">{name}</p>
        <p className="font-textFont text-base font-light text-custom-grayD">{description}</p>
      </div>
      <p className="w-full text-end font-textFont text-base font-light text-custom-grayD">{date}</p>
    </article>
  );
};

export default CardHome;
