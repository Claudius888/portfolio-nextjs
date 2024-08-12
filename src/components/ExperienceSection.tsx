import React, { useCallback, useEffect, useState } from 'react';
import { LayoutGroup, motion, stagger, useAnimate, useCycle } from 'framer-motion';
import { useWindowSize } from 'usehooks-ts';
import { BackgroundGradient } from './BackgroundGradient';
import { Icons } from './ui/Icons';
import { SMALL_MOBILE, useDeviceDetection } from '@/lib/hooks';
import { experienceProp } from '@/lib/types';

const experienceArr:experienceProp[] = [
  {
    title: 'Frontend Developer',
    company: 'WEBNEXS',
    endTime: 'Current',
    tools: [
      'React',
      'React Native',
      'Nextjs',
      'Vitest',
      'Cypress',
      'Typescript',
    ],
  },
  {
    title: 'Software Engineer',
    company: 'ALTAROAD',
    endTime: '05/23',
    tools: ['Python', 'Streamlit', 'AWS', 'ElasticSearch'],
  },
  {
    title: 'M.Sc in \nComputer Science',
    company: 'EPITA',
    endTime: '2021 - 6/2022',
    tools: ['Algorithms', 'Dev Patterns'],
  },
  {
    title: 'Software Engineer \n(React Native)',
    company: 'COREFUL',
    endTime: '06/21',
    tools: ['React', 'React Native', 'Javascript'],
  },
  {
    title: 'Software Engineer \n(React Native)',
    company: 'CALIBRAINT',
    endTime: '09/20',
    tools: ['React', 'React Native', 'Javascript'],
  },
];

interface mobileExpericeCardProps {
  experience: experienceProp;
  isOpen: boolean;
  setExpanded: (isOpen: number | false) => void;
  idx: number;
}
const staggerMenuItems = stagger(0.1, { startDelay: 0.15 });

function ExperienceCard({
  experience,
  isOpen,
  setExpanded,
  idx,
}: mobileExpericeCardProps) {
  const [scope, animate] = useAnimate();
  const device = useDeviceDetection();
  const isSmallDevice = SMALL_MOBILE == device

  useEffect(() => {
    animate(
      '.inner-card',
      {
        height: isOpen ? isSmallDevice ? '18vh' : '12vh' : '7vh',
      },
      {
        type: 'spring',
        bounce: 0,
        duration: 0.5,
      }
    );
    animate(
      'hr',
      isOpen
        ? { opacity: 0.5, scale: 1, filter: 'blur(0px)' }
        : { opacity: 0, scale: 0.3, filter: 'blur(20px)' },
      {
        duration: 0.2,
        // delay: isOpen ? staggerMenuItems : 0,
      }
    );

    animate(
      '.tools',
      isOpen
        ? { opacity: 1, scale: 1, filter: 'blur(0px)' }
        : { opacity: 0, scale: 0.3, filter: 'blur(20px)' },
      {
        duration: 0.2,
        delay: isOpen ? staggerMenuItems : 0,
      }
    );
  }, [isOpen, isSmallDevice]);

  return (
    <motion.button
      // href=''
      // target='_blank'
      layout
      ref={scope}
      className='p-[1.5px] z-1 rounded-[0.80rem]
      relative w-[80vw] cursor-pointer min-h-[3rem]'
      // style={{ height: expanded ? '20rem' : '10rem' }}
      onClick={() => setExpanded(idx)}
      // onTap={() => setExpanded(idx)}
    >
      <div
        className=' bg-white bg-opacity-20 backdrop-blur-sm rounded-xl border 
      border-white border-opacity-10 group relative overflow-hidden z-1 inner-card'
      >
        <div className='px-3 py-2'>
          <div>
            <span
              className='text-sm text-gray-300 group-hover:text-opacity-100 
            transition-all duration-200 text-opacity-95 font-medium'
            >
              {[3, 4].indexOf(idx) > -1
                ? experience.title.split('\n')[0]
                : experience.title}{' '}
              at {experience.company}
            </span>
            {/* <p className='font-bold bg-clip-text text-transparent bg-white-gradient text-xl'>
              {experience.company}
            </p> */}
          </div>
          <hr className='border-white opacity-10 my-1' />
          {experience.tools.map((item, index) => {
            return (
              <span
                key={index}
                className='bg-clip-text text-transparent bg-white-gradient tools opacity-0'
              >
                {item} {index == experience.tools.length - 1 ? '' : ' . '}
              </span>
            );
          })}
        </div>
        {/* <div className="flex items-center justify-start gap-3"></div> */}
      </div>
    </motion.button>
  );
}

function PCExperienceCard({ experience }: { experience: experienceProp }) {
  const [isFocused, onHover] = useCycle(false, true);
  return (
    <BackgroundGradient
      className='rounded-[22px] font-satoshi flex sm:p-1 bg-white dark:bg-zinc-900 h-[70vh] relative items-center group/canvas-card'
      onHover={onHover}
    >
      <div
        className='group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-200 mx-auto flex items-center justify-center
         absolute inset-0
        '
      >
        <h1 className='text-2xl text-white-gradient font-bold'>
          {experience.company}
        </h1>
      </div>
      <div
        className='px-4 py-2
      dark:text-white text-xl opacity-0 group-hover/canvas-card:opacity-100 z-10 
          text-black mt-4 font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200
      '
      >
        <motion.div
          animate={
            isFocused
              ? { opacity: 1, scale: 1, filter: 'blur(0px)' }
              : { opacity: 0, scale: 0.3, filter: 'blur(20px)' }
          }
          className='flex flex-col gap-2'
        >
          <span className='text-gray-300 text-2xl font-bold group-hover:text-opacity-100 transition-all duration-200 text-opacity-95'>
            {experience.title.split('\n').map((item, idx) => {
              return (
                <p key={`${item}-${idx}`} className='text-white-gradient'>
                  {item}
                </p>
              );
            })}
          </span>
          <p className='font-bold bg-clip-text text-transparent bg-white-gradient text-lg'>
            at {experience.company}
          </p>
          <hr className='border-white opacity-10 my-1' />
          <span className='flex flex-col'>
            {experience.tools.map((item, index) => {
              return (
                <span
                  key={index}
                  className='bg-clip-text text-transparent bg-white-gradient 
                  text-xl flex flex-row items-center gap-2 font-bold'
                >
                  <Icons.Point className='fill-white' />
                  {item}
                </span>
              );
            })}
          </span>
        </motion.div>
      </div>
    </BackgroundGradient>
  );
}

function ExperienceCards() {
  const { width = 0, height = 0 } = useWindowSize();
  const [isMobileScreen, setIsMobileScreen] = useState<boolean | null>(null);
  const [expanded, setExpanded] = useState<number | false>(false);

  const isMobile = useCallback(() => {
    if (width && width < 768) return true;
    return false;
  }, [width]);

  useEffect(() => {
    setIsMobileScreen(() => isMobile());
  }, [isMobile]);

  return (
    <div className='md:max-w-[70vw] relative'>
      {isMobileScreen ? (
        <div className='flex flex-col gap-3 items-center h-[28rem] min-w-[90vw] my-4 overflow-clip'>
          {experienceArr.map((experience, i) => {
            const isOpen = expanded === i;
            return (
              <ExperienceCard
                key={i}
                experience={experience}
                isOpen={isOpen}
                setExpanded={setExpanded}
                idx={i}
              />
            );
          })}
        </div>
      ) : (
        <div className='gap-2 flex flex-row'>
          {experienceArr.map((experience, i) => {
            return <PCExperienceCard key={i} experience={experience} />;
          })}
        </div>
      )}
    </div>
  );
}

export default ExperienceCards;
