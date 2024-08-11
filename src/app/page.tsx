'use client';
import Aboutme from '@/components/Aboutme';
import { ContainerScroll } from '@/components/ContainerScroll';
import { Experience } from '@/components/Experience';
import ExperienceCards from '@/components/ExperienceSection';
import Footer from '@/components/Footer';
import Skills from '@/components/Skills';
import { UI } from '@/components/UI';
import { Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useScroll, useTransform, motion } from 'framer-motion';
import Lenis from 'lenis';
import Image from 'next/image';
import { Suspense, useEffect, useRef } from 'react';
export default function Home() {

  const container = useRef(null)

  const { scrollYProgress } = useScroll({
    target: container,

    offset: ['start start', 'end end']
  })


  useEffect(() => {
    const lenis = new Lenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);


  return (
    <main className='flex relative flex-col bg-dark overflow-clip'>
      {/* <div className='w-screen h-screen relative'>
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
      </div> */}
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Experience <br />
            </h1>
          </>
        }
      >
      <ExperienceCards/>
      </ContainerScroll>
      <div className='flex relative h-screen items-center justify-center flex-col pt-[1vh]'>
      <Aboutme progress={scrollYProgress}/>
      </div>
      <Skills/>
      {/* <motion.div style={{ height }} className={styles.circleContainer}>
        <div className={styles.circle}></div>
      </motion.div> */}
      <Footer/>
    </main>
  );
}
