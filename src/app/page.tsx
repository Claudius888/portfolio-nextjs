'use client';
import Aboutme from '@/components/Aboutme';
import { ContainerScroll } from '@/components/ContainerScroll';
import ExperienceCards from '@/components/ExperienceSection';
import HeroMobile from '@/components/HeroMobile';
import Preloader from '@/components/Preloader';
import Skills from '@/components/Skills';
import {
  DESKTOP,
  MOBILE,
  SMALL_MOBILE,
  TABLET,
  useDeviceDetection,
} from '@/lib/hooks';
import { cn } from '@/lib/utils';
import {
  useScroll,
  useTransform,
  motion,
  AnimatePresence,
  useWillChange,
  motionValue,
} from 'framer-motion';
import Lenis from 'lenis';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Navbar from '@/components/Navbar';
import { useIntialAnimation } from '@/lib/store';
import dynamic from 'next/dynamic';

const LazyMobileFooter = dynamic(() =>
  import('@/components/Footer').then((mod) => mod.MobileFooter)
);

const LazyDesktopFooter = dynamic(() => import('@/components/Footer'));

export default function Home() {
  const container = useRef(null);
  // const { getItem, setItem } = useCheckStorageonPageLoad();

  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  // const motion0 = motionValue(0)

  const {
    isinitialAnimation,
    toggle,
    toggleAnimateComplete,
  } = useIntialAnimation();

  useEffect(() => {
    if (isLoading === null && isinitialAnimation === null) {
      setIsLoading(true);
    } else if (!isinitialAnimation) {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log('Init anim', isinitialAnimation);
  }, [isinitialAnimation]);

  const { scrollYProgress } = useScroll({
    target: container,

    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (isLoading || typeof isLoading === 'undefined') {
      (async () => {
        setTimeout(() => {
          toggle();
          setIsLoading(false);
          document.body.style.cursor = 'default';
          window.scrollTo(0, 0);
          document.body.style.overflow = 'visible';
          toggleAnimateComplete();
        }, 2000);
      })();
    }
  }, [isLoading]);

  // const  setScrollVisiblity = useCallback(() => {
  //   if (scrollYProgress > motion0 && isAnimationComplete) {
  //     if (document.body.scrollHeight > window.innerHeight) {
  //     }
  //   } else if (!isAnimationComplete) {
  //   }
  // }, [scrollYProgress, isAnimationComplete])

  // useEffect(() => {
  //   setScrollVisiblity()
  // }, [setScrollVisiblity]);

  const device = useDeviceDetection();

  const isSmallMobile =
    device === SMALL_MOBILE || device === TABLET || device === MOBILE;

  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);

  const willChange = useWillChange();

  return (
    <main
      ref={container}
      className={cn(
        'flex relative flex-col bg-black-dark overflow-clip font-satoshi'
      )}
    >
      {isLoading === null && (
        <div className='min-h-screen min-w-screen bg-[#141516] absolute inset-0 z-[101]' />
      )}
      <AnimatePresence mode='wait'>
        {isLoading && <Preloader />}
      </AnimatePresence>
      {/* {!isLoading && isLoading !== null && ( */}
      <motion.div
        style={{ willChange }}
        animate={{
          opacity: !isLoading && isLoading !== null ? 1 : 0,
        }}
        transition={{
          ease: 'easeInOut',
          delay: 1000,
        }}
        className={cn(
          'relative'
          // (isLoading && isLoading == null) && 'pointer-events-none'
        )}
      >
        <Navbar />
        <div className='bg-transparent bg-grid-white/[0.1] items-center flex flex-col relative overflow-hidden'>
          <div className='absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]'></div>
          <div className='relative h-full w-full'>
            <HeroMobile />
            <ContainerScroll
              titleComponent={
                <>
                  <h1 className='text-4xl font-semibold bg-white-gradient bg-clip-text text-transparent'>
                    Experience
                  </h1>
                </>
              }
            >
              <ExperienceCards />
              <div className='min-h-[calc(100vh-50vh)] pointer-events-none min-w-[calc(100vw-50vw)] max-w-[780px] max-h-[780px] w-full h-full md:min-h-[780px] md:min-w-[780px] rounded-full absolute bottom-0 bg-gradient-2 blur-2xl md:blur-[150px] opacity-10 -translate-y-1-[5%] -translate-x-1/2 left-1/2'></div>
            </ContainerScroll>
            <div className='min-h-[calc(100vh-50vh)] pointer-events-none min-w-[calc(100vw-50vw)] max-w-[780px] max-h-[780px] w-full h-full md:min-h-[780px] md:min-w-[780px] rounded-full absolute bottom-0 bg-gradient-2 blur-3xl md:blur-[150px] opacity-35 -translate-y-1-[5%] -translate-x-1/2 left-1/2'></div>
          </div>
          <div className='absolute pointer-events-none inset-1 opacity-50 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]'></div>
          <Aboutme progress={scrollYProgress} />

          <div
            className={cn(
              'flex flex-col w-screen h-screen z-10 md:bg-dark mt-28',
              isSmallMobile && 'pb-10 h-min'
            )}
          >
            <Skills />
            {!isSmallMobile && (
              <motion.div
                style={{ height }}
                className='bg-red-300 relative mt-80'
              >
                <div className='h-[1550%] w-[120%] -left-[10%] rounded-b-[50%] bg-dark z-[2] absolute shadow-[0px 60px 50px rgba(0, 0, 0, 0.748)]'></div>
              </motion.div>
            )}
          </div>
          {isSmallMobile && <LazyMobileFooter />}
        </div>
        {device === DESKTOP && <LazyDesktopFooter />}
      </motion.div>
      {/* )} */}
      <Analytics />
      <SpeedInsights />
    </main>
  );
}
