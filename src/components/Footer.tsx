import { useEffect, useRef } from 'react';
import { useScroll, motion, useTransform, useMotionValue } from 'framer-motion';
import { cn } from '../lib/utils';
import FramerBtn from './FramerBtn';
import {
  DESKTOP,
  MOBILE,
  SMALL_MOBILE,
  TABLET,
  useDeviceDetection,
} from '../lib/hooks';

const MobileFooter = () => {
  const x = useMotionValue(50);
  const y = useMotionValue(0);
  const device = useDeviceDetection();
  const isSmallMobile = SMALL_MOBILE === device;
  return (
    <motion.div
      style={{ y:0 }}
      className={cn('w-full pb-0 overflow-hidden items-end')}
    >
      <footer className='section bg-dark overflow-clip'>
        <div className={cn('flex flex-col medium')}>
          <div className='flex flex-wrap pb-[calc(var(--section-padding)/2)] relative'>
            <div className='flex-colf'>
              <div className='absolute right-0 bottom-[calc(var(--gap-padding)*1.5)] w-arrow'>
                <motion.svg
                  style={{ scale: 2, rotate: 80 }}
                  width='14'
                  height='14'
                  viewBox='0 0 9 9'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z'
                    fill='white'
                  />
                </motion.svg>
              </div>
              <h2 className='text-white'>
                <span className='block'>
                  <div
                    className='mr-1 h-[.85em] w-[.85em] translate-y-[0.09em] relative inline-flex rounded-[50%]'
                    // style={{
                    //   backgroundImage: 'url("/images/1.jpg")',
                    //   backgroundSize: 'cover',
                    // }}
                  />
                  Let&apos;s work
                </span>
                <span className='block'>together</span>
              </h2>
            </div>
          </div>
          <div className='pb-[calc(var(--section-padding)*0.475)] flex flex-wrap relative'>
            <div className='flex-col flex-colf w-full'>
              <div className='block w-full h-[1px] bg-slate-200' />
              {/* Mag Round btn */}
              <div
                className={cn(
                  'max-w-fit absolute -top-20 right-[7vw] z-20',
                  isSmallMobile && '-top-[3rem]'
                )}
              >
                <FramerBtn
                  key={'linkedin-24'}
                  keystr={'linkedin-24'}
                  coordx={x}
                  background='#455CE9'
                  label='Get in touch'
                  type='rounded'
                />
              </div>
            </div>
          </div>
          {/* row */}
          <div className='row pb-0 lg:pb-11 w-full md:w-auto mt-[3rem] h-[20vh] relative'>
            {/* <div className='flex-colf flex flex-col w-full md:w-auto md:flex-row '> */}
            <div className='flex flex-col gap-5 items-center'>
              {/* <FramerBtn
                key={'email-32'}
                keystr={'email-32'}
                background='transparent'
                label='joshmarion777@gmail.com'
                type='flatRounded'
                outerStyleParam={{}}
              /> */}
              <button className='w-[80vw] h-[3rem] bg-transparent text-white rounded-3xl border-2'>
                joshmarion777@gmail.com
              </button>
              <button className='w-[80vw] h-[3rem] bg-transparent text-white rounded-3xl border-2'>
                +33 780 800 970
              </button>
              {/* <FramerBtn
                key={'phone-12'}
                keystr={'phone-12'}
                background='transparent'
                label='+33 7 80 80 09 70'
                type='flatRounded'
                outerStyleParam={{ marginLeft: '1rem' }}
              /> */}
            </div>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default function Footer() {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end end'],
  });
  const device = useDeviceDetection();

  const rotate = useTransform(scrollYProgress, [0, 1], [120, 90]);
  const x = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const y = useTransform(scrollYProgress, [0, 1], [-500, 0]);

  // useEffect(() => {
  //   console.log(x, y, scrollYProgress)
  // }, [x, y, scrollYProgress])

  if (device === MOBILE || device === TABLET || device == SMALL_MOBILE) {
    return <MobileFooter />;
  }

  return (
    <motion.div
      style={{ y }}
      ref={container}
      className={cn('w-full pb-0 overflow-hidden items-end block')}
    >
      <footer className='section bg-dark overflow-clip'>
        <div className={cn('flex flex-col medium')}>
          <div className='flex flex-wrap pb-[calc(var(--section-padding)/2)] relative'>
            <div className='flex-colf'>
              <div className='absolute right-0 bottom-[calc(var(--gap-padding)*1.5)] w-arrow'>
                <motion.svg
                  style={{ rotate, scale: 2 }}
                  width='14'
                  height='14'
                  viewBox='0 0 9 9'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z'
                    fill='white'
                  />
                </motion.svg>
              </div>
              <h2 className='text-white'>
                <span className='block'>
                  <div
                    className='mr-1 h-[.85em] w-[.85em] translate-y-[0.09em] relative inline-flex rounded-[50%]'
                    // style={{
                    //   backgroundImage: 'url("/images/1.jpg")',
                    //   backgroundSize: 'cover',
                    // }}
                  />
                  Let&apos;s work
                </span>
                <span className='block'>together</span>
              </h2>
            </div>
          </div>
          <div className='pb-[calc(var(--section-padding)*0.475)] flex flex-wrap relative'>
            <div className='flex-col flex-colf w-full'>
              <div className='block w-full h-[1px] bg-slate-200' />
              {/* Mag Round btn */}
              <div className='max-w-fit absolute -top-20 right-[7vw] z-20'>
                <FramerBtn
                  key={'linkedin-24'}
                  keystr={'linkedin-24'}
                  coordx={x}
                  background='#455CE9'
                  label='Get in touch'
                  type='rounded'
                />
              </div>
            </div>
          </div>
          <div className='row pb-11'>
            <div className='flex-colf flex flex-row'>
              {/* <div className="w-full grid grid-flow-col grid-rows-2 place-items-stretch"> */}
              <FramerBtn
                key={'email-32'}
                keystr={'email-32'}
                background='transparent'
                label='joshmarion777@gmail.com'
                type='flatRounded'
                outerStyleParam={{}}
              />
              <FramerBtn
                key={'phone-12'}
                keystr={'phone-12'}
                background='transparent'
                label='+33 7 80 80 09 70'
                type='flatRounded'
                outerStyleParam={{ marginLeft: '1rem' }}
              />
            </div>
          </div>
        </div>
      </footer>
      <div className='overlay overlay-gradient'></div>
    </motion.div>
  );
}
