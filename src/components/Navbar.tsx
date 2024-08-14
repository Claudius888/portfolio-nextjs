'use client';
import Link from 'next/link';

import { ArrowRight } from 'lucide-react';
import { HoverBorderGradient } from './HoverGradientBtn';

const Navbar = () => {
  return (
    <nav
      className='z-[100] h-[6rem] absolute inset-x-0 top-0 w-full
        px-7 md:px-60'
    >
      <>
        <div
          className='flex h-full  items-center justify-between flex-row'
        >
          <Link href='/' className='flex z-40 font-semibold text-white text-xl'>
            josh <span className='text-sky-700'>.dev</span>
          </Link>
            <Link
              href='/contact'
              className={
                'flex items-center gap-1 cursor-pointer text-white'
              }
            >
              <HoverBorderGradient
                containerClassName='rounded-full'
                as={'div'}
                className='bg-dark text-white flex items-center space-x-2'
              >
                <span className='h-8 w-[7rem] flex flex-row items-center justify-center'>
                Contact
                <ArrowRight className='ml-1.5 h-5 w-5' />
                </span>
              </HoverBorderGradient>
            </Link>
        </div>
        <hr className='border-white opacity-10 my-1' />
      </>
    </nav>
  );
};

export default Navbar;
