'use client';

import Transition from '@/components/Preloader/Transition';
import { useCheckStorageonPageLoad } from '@/lib/hooks';
import { localStorageKey } from '@/lib/types';
import { AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState<boolean | null | undefined>(null);
  const { getItem } = useCheckStorageonPageLoad();

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
    const localstorageitem = getItem(localStorageKey)
    if (isLoading === null && typeof localstorageitem === 'undefined') {
        setIsLoading(localstorageitem);
    } else if(!localstorageitem) {
        setIsLoading(true)
        setSessionItem(localstorageitem)
    }
  }, []);

//   useEffect(() => {
//     console.log(sessionItem, "isloading", isLoading)
//   }, [sessionItem, isLoading])

  return (
    <main>
      { (isLoading !== null || typeof isLoading !== 'undefined') &&
        <AnimatePresence mode='wait'>
          {isLoading && <Transition pathname={pathname} />}
        </AnimatePresence>
      }
      {(!isLoading || sessionItem === null || sessionItem === undefined) && (
        <div className=''>{children}</div>
      )}
    </main>
  );
}
