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
