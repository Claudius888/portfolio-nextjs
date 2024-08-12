import React from 'react';
import { FlipWords } from './Flipwords';
import GButton from './GButton';
// import AnimatingTextMobile from './AnimatingTextMobile'
// import ExperienceCards from './ExperienceCard'
// import TitleCarousel from './TitleCarousel'

function HeroMobile() {
  return (
    <>
      {/* <div id="background__noisy" /> */}
      <div className='relative z-[1]'>
        <div className='w-full'>
          <div className='max-w-4xl mx-auto pb-28 pt-16 md:py-28 relative z-1 grid grid-cols-1 gap-8 px-6'>
            <span className='flex items-center flex-col relative overflow-clip'>
              <FlipWords
                words={['Passionate', 'Innovative', 'Creative', 'Experienced']}
                className=''
              />
              <h1
                className='animated-js text-center text-6xl md:text-2xl font-bold 
              mt-1 bg-text-gradient-1 bg-clip-text text-transparent text-wrap'
              >
                Frontend Developer
              </h1>
            </span>
            <h2 className='text-[#DFE5EC] text-lg text-center mx-auto max-w-xl font-normal'>
              Hi 👋. My name is Josh, and I am a Javascript developer living in
              UK & working remotely with the whole world.
            </h2>
            <div className='text-center flex justify-center'>
              <div className='max-w-max relative z-20 group'>
                <GButton label='Ship stuff with me'/>
                <div className='bg-black bg-opacity-40 transition-all duration-200 opacity-0 group-hover:opacity-100 w-2/3 h-[8px] absolute -bottom-1 left-1/2 -z-1 -translate-x-1/2 blur-md'></div>
              </div>
            </div>
            {/* <Image
              alt="Lines"
              loading="lazy"
              width="897"
              height="599"
              decoding="async"
              data-nimg="1"
              className="mx-auto -translate-y-[1px] w-full absolute top-0 pointer-events-none -z-1 bg-transparent"
              src="/images/Lines.webp"
            ></Image> */}
          </div>

        </div>
        <div className='px-8 w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 relative'>
        <div className="min-h-[calc(100vh-50vh)] pointer-events-none min-w-[calc(100vw-50vw)] max-w-[780px] max-h-[780px] w-full h-full md:min-h-[780px] md:min-w-[780px] rounded-full absolute top-0 bg-gradient-1 blur-[150px] opacity-50 -translate-y-1/4 -translate-x-1/2 left-1/2"></div>
          {/* <div className=" -z-10 w-full h-full max-w-[394px] max-h-[560px] bg-gradient-2 absolute top-0 -translate-x-1/2 left-1/2 opacity-100 blur-[150px] translate-y-2/3 lg:translate-y-1/3"></div> */}
        {/* <div className='w-full h-[60vh] md:h-full rounded-full absolute bottom-0 translate-y-1/3 md:top-0 bg-gradient-2 blur-3xl md:blur-[150px] md:-translate-y-2/3 md:opacity-100 opacity-100 z-1' ></div> */}
          <div className='absolute top-[8vh] right-0 select-none pointer-events-none -translate-y-full w-1/2'>
            {/* <Image
              alt="Enzo says Hello with his hand!"
              loading="lazy"
              width="540"
              height="522"
              decoding="async"
              data-nimg="1"
              className="h-[184px] object-contain mr-3 md:mr-20 mx-auto w-auto"
              src="/images/memoji-hi.png"
              ></Image> */}
            {/* <div className="lg:hidden">
              <TitleCarousel />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroMobile;
