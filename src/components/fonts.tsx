import { Roboto } from 'next/font/google';

const myfont = Roboto({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-roboto',
});

export { myfont };