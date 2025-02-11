import {
  WiseUsdDarkImg,
  WiseEurImg,
  WiseUsdImg,
  WiseEurDarkImg,
  PayoneerEurDarkImg,
  PayoneerEurImg,
  PayoneerUsdImg,
  PayoneerUsdDarkImg,
  PaypalLightImg,
  PaypalDarkImg,
  PixDarkImg,
  PixImg,
  TetherDarkImg,
  TetherImg,
  TransLightImg,
  TransDarkImg,
} from '@/utils/assets/img-database';

interface MockImages {
  image: string;
  name: string;
  id: number;
}

export const MockImagesTransLight: MockImages[] = [
  {
    image: WiseUsdImg,
    name: 'wise usd',
    id: 1,
  },
  {
    image: PayoneerUsdImg,
    name: 'payoneer',
    id: 2,
  },
  {
    image: WiseEurImg,
    name: 'wise eur',
    id: 3,
  },
  {
    image: PayoneerEurImg,
    name: 'payoneer eur',
    id: 4,
  },
  {
    image: TetherImg,
    name: 'crypto',
    id: 5,
  },
  {
    image: PaypalLightImg,
    name: 'paypal',
    id: 6,
  },
  {
    image: PixImg,
    name: 'pix',
    id: 7,
  },
  {
    image: TransLightImg,
    name: 'ars',
    id: 8,
  },
];
