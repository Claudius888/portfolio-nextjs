"use client";
import { useScroll, motion, useTransform } from 'framer-motion'
import React, { useRef } from 'react'
import { cn } from '../lib/utils'

const ABOUT_STR = "I'm a software developer with a strong focus on developing bug-free smooth user experiences."

export default function Aboutme({ progress }) {
  return (
    <div className="flex w-2/3 flex-col items-center">
      <p className="text-center text-xl font-black text-white-gradient uppercase mb-4">ABOUT ME</p>
      <Words value={ABOUT_STR} progress={progress} />
    </div>
  )
}

function Words({ value, progress }: { value: string }) {
  const el = useRef(null)
  const { scrollYProgress } = useScroll({
    target: el,
    offset: ['start 0.9', 'start 0.3']
  })

//   useEffect(() => {
//     scrollYProgress.on('change', (e) => console.log(e))
//   }, [])

  const words = value.split(' ')
  return (
    <h3
      className="font-black text-5xl lg:text-7xl text-center w-full mx-auto max-w-4xl
     leading-tight lg:leading-tight flex flex-wrap gap-3 justify-center"
      ref={el}>
      {words.map((word: string, i: number) => {
        const start = i / words.length
        const end = start + 1 / words.length
        return <Word key={i} word={word} index={i} range={[start, end]} progress={scrollYProgress} />
      })}
    </h3>
  )
}

function Word({ word, index, range, progress }: { word: string; index: number; range: number[]; progress: any }) {
  const opacity = useTransform(progress, range, [0, 1])

//   useEffect(() => {
//      opacity.on('change', e => console.log("OPacity ", e)) 
//   }, [])
  return (
    <span className={cn("mr-2 mt-3 bg-clip-text text-transparent bg-white-gradient relative")}>
      <span className='opacity-30 text-white absolute'>{word}</span>
      <motion.span style={{ opacity }} className="" key={index}>
        {word}
      </motion.span>
    </span>
  )
}
