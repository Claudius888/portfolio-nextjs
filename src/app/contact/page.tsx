'use client';
import Footer from '@/components/Footer';
import Transition from '@/components/Preloader/Transition';
import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
import { DESKTOP, useDeviceDetection } from '@/lib/hooks';

const LazyMobileFooter = dynamic(() =>
  import('@/components/Footer').then((mod) => mod.MobileFooter)
);

const LazyDesktopFooter = dynamic(() => import('@/components/Footer'));

export default function Contact() {
  const device = useDeviceDetection();
  const isMobile = device !== DESKTOP;
  return (
    <div className='flex min-h-[100vh] justify-center bg-dark sm:max-h-auto sm:justify-normal relative flex-col overflow-hidden font-satoshi'>
      {isMobile ? <LazyMobileFooter /> : <LazyDesktopFooter />}
    </div>
  );
}
