'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
// import SearchBar from './Searchbar/Searchbar';
import AnimationList from './AnimationGallery/AnimationList';
import Modal from './Modal/Modal';
import { AnimationsObj } from '@/lib/types';

const ALL_ANIMATIONS: AnimationsObj[] = [
  {
    id: '1',
    title: 'Neumorphism (React Native Skia)',
    videoUrl:
      'https://player.vimeo.com/video/1073476926?h=228676385a&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479', // Path relative to the public folder
    componentsUsed: ['React Native Skia', 'React Native Reanimated'],
    isSmall: false,
    gistId: '52fd66e5007efe7832fb5cc26c7b7325',
  },
  {
    id: '2',
    title: 'Custom Skia Component',
    videoUrl:
      'https://player.vimeo.com/video/1073715836?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
    tags: ['button', 'scale', 'interaction', 'press'],
    componentsUsed: ['React Native Skia', 'Mask Component', 'with Timing'],
    isSmall: true,
    gistId: '0aaca82a9ce9da21125efef7a65695cc',
  },
  {
    id: '3',
    title: 'Hinti Wallet App',
    videoUrl:
      'https://player.vimeo.com/video/1073254207?h=8d33d6cb3b&amp;badge=0&amp;autoplay=1&amp;player_id=0&amp;app_id=58479&amp;sidedock=0&amp;controls=0', // Add more videos as needed
    tags: ['card', 'flip', '3d', 'transform'],
    componentsUsed: [
      'React Native Reanimated',
      'Path Manipulation',
      'Lottie Animations',
      'Card Mark Effect',
    ],
    isSmall: true,
    gistId: '492d9389a4e55677b5544706a2a6da5c',
  },
  {
    id: '4',
    title: 'ReAnimated Horizontal Flatlist',
    videoUrl:
      'https://player.vimeo.com/video/1073348239?h=0cb9687fad&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
    componentsUsed: [
      'React Native Reanimated',
      'Custom Flatlist',
      'withSpring Transform',
    ],
    isSmall: false,
    gistId: 'df1ee2f699284b02357576b54aae7b37',
  },
  {
    id: '5',
    title: 'ReAnimated Switch Component',
    videoUrl:
      'https://player.vimeo.com/video/1073354796?h=90b9a7a623&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479', // Path relative to the public folder
    componentsUsed: ['React Native Reanimated', 'withSpring Transform'],
    isSmall: false,
    gistId: '09279adcf577649c4f598a5b078cc2ed',
  },
  {
    id: '6',
    title: 'Lottie Animation',
    videoUrl:
      'https://player.vimeo.com/video/1073356143?h=8c7afe0e36&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479', // Add more videos as needed
    componentsUsed: ['LottieView', 'Figma Design'],
    isSmall: false,
    gistId: '07e04f757cdea988031deb0b242b68e0',
  },
  {
    id: '7',
    title: 'Music Player Widget (ReAnimated)',
    videoUrl:
      'https://player.vimeo.com/video/1073472933?h=717beb2ee6&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
    componentsUsed: [
      'React Native Reanimated',
      'LED Board',
      'Vinyl(Record) Player',
      'Interactive Progress Bar',
    ],
    isSmall: false,
    gistId: '597d22a6f325f7280a870f82ede371e0',
  },
  {
    id: '8',
    title: 'Custom Scroll Flatlist (reverse)',
    videoUrl:
      'https://player.vimeo.com/video/1073715869?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
    tags: ['loading', 'spinner', 'indicator', 'bounce'],
    componentsUsed: ['React Native Reanimated', 'Vertical Flatlist'],
    isSmall: false,
    gistId: '83bfe352201c88e6fffcec3b74de693b',
  },
  {
    id: '9',
    title: 'Pan Gesture Color Interpolation',
    videoUrl:
      'https://player.vimeo.com/video/1073716395?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479', // Path relative to the public folder
    tags: ['list', 'fade', 'entry'],
    isSmall: false,
    gistId: 'dbc0397c747adaa3c7965515435142ec',
  },
  {
    id: '10',
    title: 'Multi Tab Common BottomSheet',
    videoUrl:
      'https://player.vimeo.com/video/1073896110?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479',
    componentsUsed: [
      'React Native Reanimated',
      'React Native Gesture Handler',
      'Pan Gesture',
      'Expo Router (Custom)',
    ],
    isSmall: false,
    gistId: '596e9e6c82dd9ec6b6a1d7a3bcd2cae5',
  },
];

// --- Pagination Constants ---
const INITIAL_LOAD_COUNT = 4; // Number of items to show initially
const LOAD_MORE_COUNT = 4; // Number of items to load each time button is clicked
// -----

export default function PortfolioPage() {
  // Update state to hold animation data AND initial rectangle
  const [selectedAnimation, setSelectedAnimation] = useState<{
    data: AnimationsObj;
    initialRect: DOMRect | null;
  } | null>(null); // Shape: { data: animation, initialRect: DOMRect } | null

  const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD_COUNT);

  // Use useCallback to memoize the click handler
  const handleCardClick = useCallback(
    (animation: AnimationsObj, cardElement: HTMLDivElement) => {
      // Find the phone mask element within the clicked card
      const phoneElement = cardElement?.querySelector('[data-phone-mask]'); // Add data attribute to phone mask div
      if (phoneElement) {
        const initialRect = phoneElement.getBoundingClientRect();
        setSelectedAnimation({ data: animation, initialRect });
        // Optionally hide the original element immediately via style or state
        (phoneElement as HTMLDivElement).style.opacity = '0'; // Hide original temporarily
      } else {
        // Fallback if phone mask isn't found (shouldn't happen with data-attribute)
        setSelectedAnimation({ data: animation, initialRect: null });
      }
    },
    []
  ); // Empty dependency array - function doesn't depend on component state/props

  const handleCloseModal = useCallback(() => {
    // Find the original card element corresponding to the closing animation
    // This part is tricky without refs, potentially use ID or data attribute matching
    const originalCardPhone = document.querySelector(
      `[data-animation-id="${selectedAnimation?.data?.id}"] [data-phone-mask]`
    );
    if (originalCardPhone) {
      (originalCardPhone as HTMLDivElement).style.opacity = '1'; // Make original visible again
    }
    setSelectedAnimation(null); // Close the modal
  }, [selectedAnimation]); // Depend on selectedAnimation to get the ID

  // --- Sliced Animations to Show ---
  const animationsToShow = useMemo(
    () => ALL_ANIMATIONS.slice(0, visibleCount),
    [visibleCount]
  );
  // ---------------------------------

  // --- Handle Load More Click ---
  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + LOAD_MORE_COUNT);
  };

  return (
    <div className='min-h-screen flex flex-col items-center px-2 sm:px-4 bg-black-dark font-satoshi'>
      <Head>
        <title>Cool Animations (Shared Transition)</title>
        <meta
          name='description'
          content='A gallery of cool animations styled'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='flex flex-col items-center w-full flex-1 py-8 md:py-12'>
        {/* ... Title and Description ... */}
        <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text bg-white-gradient text-transparent mb-2 text-center'>
          Portfolio
        </h1>
        <p className='text-base sm:text-lg bg-clip-text bg-white-gradient text-transparent mb-6 md:mb-6 text-center max-w-xl px-4'>
          Explore various animations. Made with React Native.
        </p>

        {/* Pass the click handler down */}
        <AnimationList
          animations={animationsToShow}
          // Pass selectedId for conditional styling/hiding
          selectedAnimationId={selectedAnimation?.data?.id}
          onAnimationClick={handleCardClick}
        />
      </main>
      {visibleCount < ALL_ANIMATIONS.length && (
        <div
          className='
        fixed bottom-0 left-1/2
        -translate-x-1/2
        mb-6 z-10'
        >
          {/* Position fixed bottom center */}
          <button
            onClick={handleLoadMore}
            className='px-6 py-3 bg-blue-600 text-white text-sm font-semibold rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out'
          >
            View More ({ALL_ANIMATIONS.length - visibleCount} remaining)
          </button>
        </div>
      )}

      {/* Pass selectedAnimation data (including initialRect) to Modal */}
      <Modal
        selectedAnimationState={selectedAnimation} // Pass the whole state object
        onClose={handleCloseModal}
      />
    </div>
  );
}
