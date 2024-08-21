'use client';

import Transition from '@/components/Preloader/Transition';
import { useCheckStorageonPageLoad } from '@/lib/hooks';
import { localStorageKey } from '@/lib/types';
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
  // const { getItem } = useCheckStorageonPageLoad();
  const { isinitialAnimation } = useIntialAnimation()
  const [sessionItem, setSessionItem] = useState<boolean | null | undefined>(null);

  useEffect(() => {
    if (isLoading !== null || typeof isLoading !== 'undefined') {
      (async () => {
        setTimeout(() => {
          setIsLoading(false);
          document.body.style.cursor = 'default';
          window.scrollTo(0, 0);
        }, 900);
      })();
    }
  }, []);

  useEffect(() => {
    // const localstorageitem = getItem(localStorageKey)
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
