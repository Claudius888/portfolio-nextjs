'use client';

import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useIntialAnimation } from '@/lib/store';

const LazyTransition = dynamic(() =>
  import('@/components/Preloader/Transition')
);

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState<boolean | null | undefined>(null);
  const { isinitialAnimation } = useIntialAnimation()
  const [sessionItem, setSessionItem] = useState<boolean | null | undefined>(null);

  useEffect(() => {
    if (isLoading !== null || typeof isLoading !== 'undefined') {
      (async () => {
        setTimeout(() => {
          setIsLoading(false);
          document.body.style.cursor = 'default';
          window.scrollTo(0, 0);
        }, 1050);
      })();
    }
  }, []);

  useEffect(() => {
    if (isLoading === null && isinitialAnimation === null) {
        setIsLoading(isinitialAnimation);
    } else if(!isinitialAnimation) {
        setIsLoading(true)
        setSessionItem(isinitialAnimation)
    }
  }, []);

  return (
    <main>
      { (isLoading !== null || typeof isLoading !== 'undefined') &&
        <AnimatePresence mode='wait'>
          {isLoading && <LazyTransition pathname={pathname} />}
        </AnimatePresence>
      }
      {(!isLoading || sessionItem === null || sessionItem === undefined) && (
        <div className=''>{children}</div>
      )}
    </main>
  );
}
