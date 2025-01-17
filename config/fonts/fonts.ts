// config/fonts.ts

import { Roboto, Open_Sans } from 'next/font/google';

// Roboto font
export const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
});

// Open Sans font
export const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700', '800'],
});
