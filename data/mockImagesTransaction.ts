import {
  WiseUsdDarkImg,
  WiseEurImg,
  WiseUsdImg,
  WiseEurDarkImg,
  PayoneerEurDarkImg,
  PayoneerEurImg,
  PayoneerUsdImg,
  PayoneerUsdDarkImg,
  PaypalImg,
  PaypalDarkImg,
  PixImg,
  TetherDarkImg,
  TetherImg,
  BankImg,
  BankDarkImg,
  PixDarkImg,
} from '@/utils/assets/imgDatabaseCloudinary';

interface MockImages {
  image: string;
  type?: string;
  name: string;
  id: number;
}

export const MockImagesTransLight: MockImages[] = [
  {
    image: WiseUsdImg,
    name: 'wise',
    type: 'usd',
    id: 1,
  },
  {
    image: PayoneerUsdImg,
    name: 'payoneer',
    type: 'usd',
    id: 2,
  },
  {
    image: WiseEurImg,
    name: 'wise eur',
    type: 'eur',
    id: 3,
  },
  {
    image: PayoneerEurImg,
    name: 'payoneer eur',
    type: 'eur',
    id: 4,
  },
  {
    image: TetherImg,
    name: 'crypto',
    id: 5,
  },
  {
    image: PaypalImg,
    name: 'paypal',
    id: 6,
  },
  {
    image: PixImg,
    name: 'pix',
    id: 7,
  },
  {
    image: BankImg,
    name: 'ars',
    id: 8,
  },
];

export const MockImagesTransDark: MockImages[] = [
  {
    image: WiseUsdDarkImg,
    name: 'wise',
    type: 'usd',
    id: 1,
  },
  {
    image: PayoneerUsdDarkImg,
    name: 'payoneer',
    type: 'usd',
    id: 2,
  },
  {
    image: WiseEurDarkImg,
    name: 'wise eur',
    type: 'eur',
    id: 3,
  },
  {
    image: PayoneerEurDarkImg,
    name: 'payoneer eur',
    type: 'eur',
    id: 4,
  },
  {
    image: TetherDarkImg,
    name: 'crypto',
    id: 5,
  },
  {
    image: PaypalDarkImg,
    name: 'paypal',
    id: 6,
  },
  {
    image: PixDarkImg,
    name: 'pix',
    id: 7,
  },
  {
    image: BankDarkImg,
    name: 'ars',
    id: 8,
  },
];
