import React, { useState } from 'react';
import { cn } from '../lib/utils';
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useTransform,
  useWillChange,
} from 'framer-motion';
import { DESKTOP, useDeviceDetection } from '../lib/hooks';
import Link from 'next/link';

const rounded = 'rounded';
const flatRounded = 'flatRounded';

export default function FramerBtn({
  type,
  coordx,
  label,
  background,
  outerStyleParam,
  keystr,
  onClick,
}: {
  type: string;
  coordx?: MotionValue;
  label: string;
  background?: string;
  outerStyleParam?: React.CSSProperties;
  keystr: string;
  onClick?: () => void;
}) {
  const [animateHeight, setAnimateHeight] = useState<string | null>(null);
  const mapRange = (
    inputLower: number,
    inputUpper: number,
    outputLower: number,
    outputUpper: number
  ) => {
    const INPUT_RANGE = inputUpper - inputLower;
    const OUTPUT_RANGE = outputUpper - outputLower;

    return (value: number) =>
      outputLower + (((value - inputLower) / INPUT_RANGE) * OUTPUT_RANGE || 0);
  };
  const device = useDeviceDetection();

  const setTransform = (
    item: HTMLElement & EventTarget,
    event: React.PointerEvent,
    x: MotionValue,
    y: MotionValue
  ) => {
    const bounds = item.getBoundingClientRect();
    const relativeX = event.clientX - bounds.left;
    const relativeY = event.clientY - bounds.top;
    const xRange = mapRange(0, bounds.width, -1, 1)(relativeX);
    const yRange = mapRange(0, bounds.height, -1, 1)(relativeY);
    x.set(xRange * 10);
    y.set(yRange * 10);

    // console.log(xRange);
  };

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const textX = useTransform(x, (latest) => latest * 0.5);
  const textY = useTransform(y, (latest) => latest * 0.5);

  const outerStyle = type === rounded ? '' : 'flatbtn-outer cursor-pointer';
  const innerStyle = type === rounded ? 'roundbtn' : 'btn-click flatbtn-inner';
  const textStyle = type === rounded ? '' : 'btn-text lg:px-3';
  const secondBtnStyle = device == DESKTOP ? outerStyleParam : {};

  const willChange = useWillChange();

  return (
    <AnimatePresence>
      <motion.div
        onPointerMove={(event) => {
          const item = event.currentTarget;
          setTransform(item, event, x, y);
        }}
        key={`${keystr}-outer`}
        onPointerLeave={() => {
          x.set(0);
          y.set(0);
        }}
        onHoverStart={() => setAnimateHeight('open')}
        onHoverEnd={() => setAnimateHeight('close')}
        style={{ x, y, ...secondBtnStyle, willChange }}
        className={cn('', outerStyle)}
        transition={{
          type: 'spring',
          bounce: 1,
          stiffness: 50,
          damping: 7,
          mass: 0.5,
        }}
        onClick={() => onClick && onClick()}
      >
        <Link
          href={'https://www.linkedin.com/in/joshua-joseph777/'}
          target='_blank'
          className={cn('z-[100]', type === rounded ? 'cursor-pointer' : 'pointer-events-none')}
        >
          <motion.div
            layout
            key={`${keystr}-inner`}
            className={cn(
              'font-medium relative bg-transparent flex justify-center items-center overflow-clip',
              innerStyle
            )}
            style={{ x: coordx, background }}
          >
            <motion.span
              key={`${keystr}-span`}
              style={{ x: textX, y: textY }}
              className={cn('z-10 relative text-white', textStyle)}
            >
              {label}
            </motion.span>
            {/* src='https://web.archive.org/web/20160312084140im_/http://splatoon.nintendo.com/assets/img/nav-bg-fill-blue.png?1443460871' */}
            <AnimatePresence>
              <motion.div
                key={`${keystr}-main`}
                layout
                className='absolute bottom-0 w-full self-baseline bg-blue -z-10'
                style={{ willChange }}
                initial={{
                  height: 0,
                  opacity: 0,
                }}
                // animateHeight== 'close' ? [0, 1, 1, 0] :
                // height: animateHeight == 'open' ? [0, 20, 200, 200] : animateHeight == 'close' ? [200, 0, 200, 200] : 0,
                // opacity: animateHeight == 'open' ? [1, 1, 1, 1] : animateHeight == 'close' ? [0, 1, 1, 0] : 1,

                animate={{
                  height:
                    animateHeight == 'open'
                      ? [0, 200]
                      : animateHeight == 'close'
                      ? [200, 0]
                      : 0,
                  opacity:
                    animateHeight == 'open'
                      ? [1, 1]
                      : animateHeight == 'close'
                      ? [0, 0]
                      : 0,
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                }}
                transition={{
                  ease: 'easeInOut',
                  duration: 0.5,
                  opacity: {
                    duration: animateHeight == 'close' ? 0.001 : 1,
                  },
                }}
              />
              <motion.div
                layout
                key={`${keystr}-closer`}
                className='absolute top-0 w-full self-center bg-blue -z-9'
                style={{ willChange }}
                initial={{
                  height: 200,
                  opacity: 0,
                }}
                animate={{
                  height:
                    animateHeight == 'close'
                      ? [200, 0]
                      : animateHeight == 'open'
                      ? 0
                      : 200,
                  opacity:
                    animateHeight == 'close'
                      ? [1, 1]
                      : animateHeight == 'open'
                      ? 0
                      : 0,
                }}
                exit={{
                  height: 200,
                  opacity: 0,
                }}
                transition={{
                  ease: 'easeInOut',
                  duration: 0.5,
                  opacity: {
                    duration: animateHeight == 'open' ? 0.001 : 0.5,
                  },
                }}
              />
            </AnimatePresence>
          </motion.div>
        </Link>
      </motion.div>
    </AnimatePresence>
  );
}
