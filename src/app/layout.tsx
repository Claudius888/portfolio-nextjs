import type { Metadata } from 'next';
// import { Inter } from "next/font/google";
import './globals.css';
import 'lenis/dist/lenis.css';
import localFont from 'next/font/local';
import { Toaster } from 'sonner';
// const inter = Inter({ subsets: ["latin"] });

const satoshi = localFont({
  src: [
    {
      path: '../../public/fonts/Satoshi-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Satoshi-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Satoshi-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Satoshi-Black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-satoshi',
});

export const metadata: Metadata = {
  title: 'Josh Portfolio',
  description: "Let's Explore",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='dark'>
      <body className={`${satoshi.variable}`}>
      {/* <meta name="color-scheme" content="only dark"/> */}
        
          <Toaster />
          {children}
      </body>
    </html>
  );
}
