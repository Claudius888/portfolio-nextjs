import React, { useCallback, useEffect, useState } from 'react';
import { motion, useCycle } from 'framer-motion';
import { useWindowSize } from 'usehooks-ts';
import { BackgroundGradient } from './BackgroundGradient';
import { Icons } from './ui/Icons';

interface experience {
  title: string;
  company: string;
  endTime: string;
  tools: string[] | [];
}

const experienceArr = [
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
    title: "Masters' in  \nComputer Science",
    company: 'EPITA',
    endTime: '2021 - 6/2022',
    tools: ['Algorithms', 'Dev Patterns'],
  },
  {
    title: 'Software Engineer \n(React Native)',
    company: 'COREFUL',
    endtime: '06/21',
    tools: ['React', 'React Native', 'Javascript'],
  },
  {
    title: 'Software Engineer \n(React Native)',
    company: 'CALIBRAINT',
    endTime: '09/20',
    tools: ['React', 'React Native', 'Javascript'],
  },
];

function ExperienceCard({ experience }: { experience: experience }) {
  const [expand, setExpand] = useState(false);

  return (
    <a
      href=''
      target='_blank'
      className='p-[1.5px] z-1 rounded-[0.80rem]
      relative w-[90vw] lg:h-[65vh]'
      // whileHover={{ width: '90vw' }}
      // initial={isMobileScreen ? { width: '90vw' } : { width: '25vw' }}
    >
      <div
        className='p-4 bg-white bg-opacity-10 backdrop-blur-sm rounded-xl border h-[18vh] lg:h-full
      border-white border-opacity-10 cursor-pointer group relative overflow-hidden z-1'
      >
        <div className='px-3 py-2'>
          <div>
            <p
              className='text-base text-gray-300 group-hover:text-opacity-100 
            transition-all duration-200 text-opacity-95 font-medium'
            >
              {experience.title}
            </p>
            <p className='font-bold bg-clip-text text-transparent bg-white-gradient text-3xl'>
              {experience.company}
            </p>
          </div>
          <hr className='border-white opacity-10 my-1' />
          {experience.tools.map((item, index) => {
            return (
              <span
                key={index}
                className='bg-clip-text text-transparent bg-white-gradient'
              >
                {item} {index == experience.tools.length - 1 ? '' : ' . '}
              </span>
            );
          })}
        </div>
        {/* <div className="flex items-center justify-start gap-3"></div> */}
      </div>
    </a>
  );
}

function PCExperienceCard({ experience }: { experience: experience }) {
  const [isFocused, onHover] = useCycle(false, true);
  return (
    <BackgroundGradient
      className='rounded-[22px] flex sm:p-1 bg-white dark:bg-zinc-900 h-[70vh] relative items-center group/canvas-card'
      onHover={onHover}
    >
      <div
        className='group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-200 mx-auto flex items-center justify-center
         absolute inset-0
        '
      >
        <h2 className='dark:text-white text-xl'>{experience.company}</h2>
      </div>
      <div
        className='px-4 py-2
      dark:text-white text-xl opacity-0 group-hover/canvas-card:opacity-100 z-10 
          text-black mt-4 font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200
      '
      >
        <motion.div
        animate={isFocused ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : { opacity: 0, scale: 0.3, filter: 'blur(20px)' }} 
        className='flex flex-col gap-2'>
          <span className='text-gray-300 text-xl group-hover:text-opacity-100 transition-all duration-200 text-opacity-95 font-medium'>
            {experience.title.split('\n').map((item, idx) => {
              return <p key={`${item}-${idx}`}>{item}</p>;
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
                  className='bg-clip-text text-transparent bg-white-gradient text-xl flex flex-row items-center gap-2'
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

  const isMobile = useCallback(() => {
    if (width && width < 768) return true;
    return false;
  }, [width]);

  useEffect(() => {
    setIsMobileScreen(() => isMobile());
  }, [isMobile]);

  return (
    <div className='max-w-[70vw]'>
      {isMobileScreen ? (
        <div className='grid grid-cols-1 place-items-start justify-items-center gap-5 relative'>
          {experienceArr.map((experience, i) => {
            return <ExperienceCard key={i} experience={experience} />;
          })}
        </div>
      ) : (
        <div className='gap-2 flex flex-row'>
          {experienceArr.map((experience, i) => {
            return <PCExperienceCard key={i} experience={experience} />;
          })}
        </div>
        // <LayoutGroup>
        // </LayoutGroup>
      )}
    </div>
  );
}

export default ExperienceCards;
