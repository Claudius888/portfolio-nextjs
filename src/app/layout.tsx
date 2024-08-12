import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import 'lenis/dist/lenis.css'
import localFont from 'next/font/local'


// const inter = Inter({ subsets: ["latin"] });

const satoshi = localFont({
  src: [
    {
      path: '../../public/fonts/Satoshi-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Satoshi-Medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Satoshi-Bold.woff',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Satoshi-Black.woff',
      weight: '900',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-satoshi',
})


export const metadata: Metadata = {
  title: "Josh Portfolio",
  description: "Let's Explore",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${satoshi.variable}`}>{children}</body>
    </html>
  );
}
