'use client';
import { useEffect, useState } from 'react';
import { motion, useWillChange } from 'framer-motion';
import { opacity, slideUp } from './anim';
import { Dot } from 'lucide-react';

const words = ["Hello", "Bonjour", "Ciao", "Olà", "やあ", "Hallå", "Guten tag", "Hallo"]

export default function Preloader() {
    const [index, setIndex] = useState(0);
    const [dimension, setDimension] = useState({width: 0, height:0});

    useEffect( () => {
        setDimension({width: window.innerWidth, height: window.innerHeight})
    }, [])

    useEffect( () => {
        if(index == words.length - 1) return;
        setTimeout( () => {
            setIndex(index + 1)
        }, index == 0 ? 1000 : 150)
    }, [index])

    const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width/2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`
    const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width/2} ${dimension.height} 0 ${dimension.height}  L0 0`

    const curve = {
        initial: {
            d: initialPath,
            transition: {duration: 0.7, ease: [0.76, 0, 0.24, 1]}
        },
        exit: {
            d: targetPath,
            transition: {duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3}
        }
    }
    const willChange = useWillChange()
    return (
        <motion.div variants={slideUp} initial="initial" exit="exit" className='h-[100vh] w-[100vw] flex items-center justify-center fixed z-50 bg-[#141516]'>
            {/* {dimension.width > 0 &&  */}
            <div className='min-h-[3rem] min-w-[17rem]'>
                <motion.p variants={opacity} initial="initial" animate="enter"
                style={{willChange}}
                layout
                layoutId={`word-${index}`}
                className='flex text-white text-5xl items-center text-center z-1 min-h-[3rem] min-w-[17rem] font-mono'
                >
                    <Dot className='w-10 h-10 mr-3 inset-0'/>
                    {words[index]}
                    </motion.p>
                <svg className='absolute top-0 w-full h-[calc(100%_+_300px]'>
                    <motion.path variants={curve} initial="initial" exit="exit" className='fill-[#141516]'></motion.path>
                </svg>
            </div>
            {/* } */}
        </motion.div>
    )
}