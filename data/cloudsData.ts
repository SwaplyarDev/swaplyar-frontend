import nube1 from '@/public/images/nube1.svg';
import nube2 from '@/public/images/nube2.svg';

export interface ICloud {
  class: string;
  src: string;
  alt: string;
}

export const cloudsData: ICloud[] = [
  {
    class: '-left-[500px] top-60 md:-left-52 md:top-60 w-[629px] h-[451px] min-w-[629px]',
    src: nube2,
    alt: 'Nube 2',
  },
  {
    class: '-left-[500px] top-[500px] md:-left-72 md:top-[500px] w-[612px] h-[438px] min-w-[612px]',
    src: nube2,
    alt: 'Nube 2',
  },
  {
    class: '-left-[500px] top-0 md:-left-60 md:top-0 w-[669px] h-[399px] min-w-[669px]',
    src: nube1,
    alt: 'Nube 1',
  },
  {
    class: '-right-72 top-72 md:-right-20 md:top-72 w-[371px] h-[266px] min-w-[371px]',
    src: nube2,
    alt: 'Nube 2',
  },
  {
    class: '-right-96 top-0 md:-right-56 md:top-0 w-[559px] h-[400px] min-w-[559px]',
    src: nube2,
    alt: 'Nube 2',
  },
  {
    class: '-right-96 top-[460px] md:-right-60 md:top-[460px] w-[471px] h-[281px] min-w-[471px]',
    src: nube1,
    alt: 'Nube 1',
  },
];
