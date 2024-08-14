'use client';
import { useEffect, useState } from 'react';
import { motion, useWillChange } from 'framer-motion';
import { opacity, slidefromDown, slideUp } from './anim';

const pathDict: { [key: string]: string } = {
  '/contact': 'Contact',
  '/': 'Home',
};

export default function Transition({ pathname }: { pathname: string }) {
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);


  const initialPath = `M0 ${dimension.height} L${dimension.width} ${
    dimension.height
  } L${dimension.width} 0 Q${dimension.width / 2} 0 0 0 L 0 ${
    dimension.height
  }`;

  const targetPath = `M0 ${dimension.height} L${dimension.width} ${
    dimension.height
  } L${dimension.width} 0 Q${dimension.width / 2} 100 0 0 L 0 ${dimension.height}`;

  const fillpath = `M0 0 L${dimension.width} 0 L${dimension.width} ${
    dimension.height
  } Q${dimension.width / 2} ${dimension.height + 300} 0 ${
    dimension.height
  }  L0 0`;

  const curve = {
    initial: {
      d: initialPath,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
    enter: {
      d: targetPath,
      transition: { duration: 0.8, delay: 0.2},
    },
    exit: {
        d: initialPath,
        transition: { duration: 0.2},
      },
  };

  const willChange = useWillChange();
  //   const pathnameTransition = pathname.replace('/', '').charAt(0).toUpperCase()

  return (
    <motion.div
      variants={slideUp}
      initial='initial'
      exit='exit'
      className='h-[100vh] w-[100vw] flex items-center justify-center fixed z-50'
    >
      {dimension.width > 0 && (
        <>
          <motion.p
            variants={opacity}
            initial='initial'
            animate='enter'
            style={{ willChange }}
            className='flex text-white text-5xl items-center absolute z-10'
          >
            {/* <span className='block w-3 h-3 bg-white rounded-[50%] mr-3'></span> */}
            {pathDict[pathname]}
          </motion.p>

          {/* <svg className='absolute bottom-0 w-full h-[calc(100%_+_300px]'>

          </svg> */}

          <motion.svg
            className='absolute w-full h-[100%]'
            animate='animate'
            exit='exit'
            initial='initial'
            variants={slidefromDown}
          >
            <motion.path
              variants={curve}
              initial='initial'
              animate='enter'
                exit='exit'
              className='fill-[#141516]'
            ></motion.path>
          </motion.svg>
        </>
      )}
    </motion.div>
  );
}
