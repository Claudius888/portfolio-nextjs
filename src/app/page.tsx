'use client';
import { ContainerScroll } from '@/components/ContainerScroll';
import { Experience } from '@/components/Experience';
import ExperienceCards from '@/components/ExperienceSection';
import { UI } from '@/components/UI';
import { Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Image from 'next/image';
import { Suspense } from 'react';

export default function Home() {
  return (
    <main className='flex relative flex-col bg-dark overflow-clip'>
      <div className='w-screen h-screen'>
        <Canvas
          shadows
          gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
          camera={{ position: [0, 0, 8], fov: 42 }}
        >
          <color attach='background' args={['#171720']} />
          <fog attach='fog' args={['#171720', 10, 30]} />
          <Suspense>
            <Experience />
          </Suspense>
          <Stats />
        </Canvas>
        <UI />
      </div>
      <ExperienceCards/>
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Unleash the power of <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Scroll Animations
              </span>
            </h1>
          </>
        }
      >
        <Image
          src={`/linear.webp`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </main>
  );
}
