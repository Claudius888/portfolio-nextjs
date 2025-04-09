'use client';
import { useEffect, useState, Fragment, useMemo } from 'react';
import { Transition } from '@headlessui/react';
import { VideoView } from '../AnimationGallery/VideoView';
import ContentSection from './ContentSection';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { AnimationsObj } from '@/lib/types';

const fetchGistContent = async (gistId: string | undefined) => {
  if (!gistId) {
    // Don't attempt to fetch if gistId is missing
    // useQuery's 'enabled' option handles this, but belt-and-suspenders check
    return null;
  }

  const response = await fetch(`https://api.github.com/gists/${gistId}`);

  if (!response.ok) {
    // Throw an error for TanStack Query to catch
    throw new Error(
      `Failed to fetch Gist: ${response.status} ${response.statusText} (ID: ${gistId})`
    );
  }

  const data = await response.json();

  // Find the first file in the Gist (adjust if you need a specific filename)
  const firstFileName = data?.files ? Object.keys(data.files)[0] : null;

  if (firstFileName) {
    return data.files[firstFileName].content; // Return the content
  } else {
    // You could return null/empty string or throw an error if content is mandatory
    // throw new Error('Gist is empty or file not found.');
    return null; // Return null if no file found
  }
};

function Modal({
  selectedAnimationState,
  onClose,
}: {
  selectedAnimationState: {
    data: AnimationsObj;
    initialRect: DOMRect | null;
  } | null;
  onClose: () => void;
}) {
  const { data: animation, initialRect } = selectedAnimationState || {}; // Destructure state
  const [showContent, setShowContent] = useState(false); // State to fade in content slightly delayed

  // const queryClient = useQueryClient();
  const gistId = animation && animation.gistId; // Get the gistId

  const {
    data: gistContent,
    isLoading: isLoadingGist,
    error: gistQueryError,
    isError: isGistError,
  } = useQuery({
    // Query key: uniquely identifies this query, depends on gistId
    queryKey: ['gist', gistId],
    // Query function: fetches the data
    queryFn: () => fetchGistContent(gistId),
    // Options: only run the query if gistId has a value
    enabled: !!gistId,
    staleTime: 10 * 1000,
    retry: 1,
  });

  const gistErrorMessage =
    gistQueryError instanceof Error ? gistQueryError.message : null;

  // Phone element's style state
  const [phoneStyle, setPhoneStyle] = useState({});

  useEffect(() => {
    if (animation && initialRect) {
      // --- Initial State (Before Animation) ---
      // Position the modal's phone exactly where the original was
      setPhoneStyle({
        position: 'fixed', // Use fixed positioning relative to viewport
        top: `${initialRect.top}px`,
        left: `${initialRect.left}px`,
        width: `${initialRect.width}px`,
        height: `${initialRect.height}px`,
        transition: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)', // Tailwind's ease-in-out timing
        opacity: 1, // Start visible
        zIndex: 51, // Ensure it's above backdrop but potentially below final modal content briefly
      });

      // --- Trigger Animation ---

      requestAnimationFrame(() => {
        // --- Target State (Apply final styles to trigger transition) ---
        setPhoneStyle((prev) => ({
          ...prev,
          position: 'relative', // Back to relative within the modal flow
          top: 'auto',
          left: 'auto',
          width: '100%', // Example: Target width within its new container
          height: 'auto', // Example: Target height
          opacity: 1, // Remain visible
          transform: 'translate(0, 0) scale(1)', // Ensure transforms are reset if needed
        }));
        setTimeout(() => setShowContent(true), 150); // Delay content fade-in
      });
    } else {
      // Reset when closing
      setPhoneStyle({});
      setShowContent(false);
    }
  }, [animation, initialRect]); // Rerun effect if selected animation changes

  // Scroll lock / Escape key handler (remains the same)
  useEffect(() => {
    if (!animation) return;
    const handleEsc = (event: KeyboardEvent) =>
      event.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [animation, onClose]);

  const vidUrl = useMemo(() => {
    const baseUrl = process.env.NEXT_PUBLIC_CLOUDFRONT_URI;
    if (animation && baseUrl) {
      const separator =
        baseUrl.endsWith('/') || animation?.videoUrl?.startsWith('/')
          ? ''
          : '/';
      return baseUrl + separator + animation?.videoUrl;
    }
    return undefined;
  }, [animation]);

  const handleContentClick = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <Transition show={!!animation} as={Fragment}>
      <div
        className='fixed inset-0 z-50 flex items-center justify-center p-4'
        role='dialog'
        aria-modal='true'
        aria-labelledby='modal-title'
        aria-hidden={!animation}
      >
        {/* Backdrop with transition */}
        <Transition // Use nested Transition for independent animation if preferred
          show={!!animation} // Show backdrop immediately
          as='div'
          className='fixed inset-0 bg-black/70 cursor-pointer' // Darker backdrop maybe
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
          onClick={onClose}
        />

        <Transition
          show={!!animation} // Control panel visibility
          as='div' // <--- CORRECTED: Render a div instead of a Fragment
          className='w-full max-w-6xl' // Example: Constrain width here if needed
          enter='ease-out duration-500'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-300'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          {/* Modal Panel Layout (Phone Left, Content Right) */}
          <div
            className='relative bg-white rounded-lg shadow-xl w-[80vw] h-[80vh] flex overflow-hidden cursor-default'
            onClick={handleContentClick}
          >
            {/* --- Phone Column (Left) --- */}
            <div
              className={`w-1/3 h-full flex items-center justify-center p-6 bg-gray-100 shrink-0
            `}
            >
              {animation && vidUrl && (
                <VideoView
                  styles={phoneStyle}
                  animation={animation}
                  classDef='bg-black rounded-[30px] p-[5px] shadow-lg border-2 border-gray-700 overflow-hidden aspect-[9/19]'
                />
              )}
            </div>
            {/* --- Content Column (Right) --- */}
            <div
              className={`w-2/3 h-full overflow-y-auto p-6 md:p-8 transition-opacity duration-300 ease-in-out ${
                showContent ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Close Button */}
              <button
                className='absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition z-20' // Ensure high z-index
                onClick={onClose}
                aria-label='Close modal'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>

              {/* Content Details */}
              {animation && (
                <ContentSection
                  isLoadingGist={isLoadingGist}
                  isGistError={isGistError}
                  gistContent={gistContent}
                  gistErrorMessage={gistErrorMessage}
                />
              )}
            </div>
            {/* End Content Column */}
          </div>
          {/* End Modal Panel Layout */}
        </Transition>
      </div>
      {/* End Main Fixed Container */}
    </Transition>
  );
}

export default Modal;
