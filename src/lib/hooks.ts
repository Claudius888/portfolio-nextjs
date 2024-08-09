import { useState, useEffect } from 'react';

const MOBILE = 'MOBILE'
const DESKTOP = 'DESKTOP'
const TABLET = 'TABLET'
// ref: https://medium.com/@josephat94/building-a-custom-hook-to-detect-user-device-in-react-js-e4dd6e0d2d9c
export const useDeviceDetection = () => {
  const [device, setDevice] = useState('');

  useEffect(() => {
    const handleDeviceDetection = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobile = /iphone|ipad|ipod|android|blackberry|windows phone/g.test(userAgent);
      const isTablet = /(ipad|tablet|playbook|silk)|(android(?!.*mobile))/g.test(userAgent);

      if (isMobile) {
        setDevice(MOBILE);
      } else if (isTablet) {
        setDevice(TABLET);
      } else {
        setDevice(DESKTOP);
      }
    };

    handleDeviceDetection();
    window.addEventListener('resize', handleDeviceDetection);

    return () => {
      window.removeEventListener('resize', handleDeviceDetection);
    };
  }, []);

  return device;
};

export { MOBILE, DESKTOP, TABLET }