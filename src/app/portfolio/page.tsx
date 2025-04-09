'use client';
import Footer from '@/components/Footer';
import Transition from '@/components/Preloader/Transition';
import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
import { DESKTOP, useDeviceDetection } from '@/lib/hooks';
import PortfolioPage from '@/components/Portfolio/PortfolioPage';

const LazyMobileFooter = dynamic(() =>
  import('@/components/Footer').then((mod) => mod.MobileFooter)
);

const LazyDesktopFooter = dynamic(() => import('@/components/Footer'));

export default function Portfolio() {
  const device = useDeviceDetection();
  const isMobile = device !== DESKTOP;
  return <PortfolioPage />;
}
