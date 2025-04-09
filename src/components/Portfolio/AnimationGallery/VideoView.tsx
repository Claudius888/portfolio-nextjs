import React, { HTMLAttributes, StyleHTMLAttributes, useMemo } from 'react';
import Vimeo from '@u-wave/react-vimeo';
import { AnimationsObj, classnameProp } from '@/lib/types';

export function VideoView({
  animation,
  isSelected = false,
  classDef = undefined,
  styles = {},
}: {
  animation: AnimationsObj;
  isSelected?: Boolean;
  classDef?: classnameProp;
  styles?: StyleHTMLAttributes<HTMLDivElement>;
}) {
  // const posterUrl = process.env.NEXT_PUBLIC_CLOUDFRONT_URI + '/blue_screen.png';

  const vidUrl = useMemo(() => {
    const baseUrl = process.env.NEXT_PUBLIC_CLOUDFRONT_URI;
    if (animation && baseUrl) {
      if (animation.videoUrl.includes('vimeo.com')) {
        // Return the original URL for Vimeo - we'll process it separately
        return animation.videoUrl;
      }
      const separator =
        baseUrl.endsWith('/') || animation?.videoUrl?.startsWith('/')
          ? ''
          : '/';
      return baseUrl + separator + animation?.videoUrl;
    }
    return undefined;
  }, [animation]);

  const isVimeo = useMemo(
    () => vidUrl && vidUrl.includes('vimeo.com'),
    [vidUrl]
  );

  const scaleStyle = useMemo((): classnameProp => {
    return `${
      isVimeo
        ? animation?.isSmall
          ? 'scale-75'
          : 'scale-90'
        : 'max-h-[25rem] scale-90'
    }
    ${
      classDef
        ? animation?.isSmall
          ? 'max-h-[29rem] max-w-[16rem]'
          : 'scale-125 max-h-[27rem] max-w-[13.35rem]'
        : ''
    }
    `;
  }, [isVimeo, classDef, animation]);

  return (
    <div
      data-phone-mask
      className={`
            min-h-[22rem] min-w-[12rem] pointer-events-none
           bg-black rounded-[30px] p-2 shadow-inner border border-gray-700 relative 
           overflow-hidden transition-opacity duration-300 
          ${isSelected ? 'opacity-0' : 'opacity-100'}
          ${scaleStyle}
          `}
      style={styles}
      // ${classDef}
    >
      {/* Video Player or Vimeo iframe with consistent styling */}
      {isVimeo ? (
        <div
          className={`
              w-full pointer-events-none
              rounded-[20px] bg-black relative overflow-hidden
              ${animation?.isSmall ? 'aspect-[9.8/18]' : 'aspect-[9/19]'}
              `}
        >
          {/* {animation.isSmall && <div className='w-full h-4'></div>} */}
          <Vimeo
            video={animation.videoUrl}
            style={{
              // width: '100%',
              // height: '100%',
              borderRadius: '20px',
            }}
            // className='absolute left-0 right-0'
            className={`
              ${classDef && animation?.isSmall && 'w-[12rem]'}
              `}
            autoplay
            loop
            showTitle={false}
            background
            // responsive
          />
        </div>
      ) : (
        <video
          // object-cover block
          className='
            w-full h-full object-fill
            rounded-[20px] bg-black relative aspect-[9/19]'
          src={vidUrl}
          // poster={posterUrl}
          // autoPlay
          muted
          playsInline
          preload='metadata'
          aria-hidden='true'
        />
      )}
    </div>
  );
}
