import { useState, useEffect } from 'react';

const SMALL_MOBILE = 'SMALL_MOBILE'
const MOBILE = 'MOBILE'
const DESKTOP = 'DESKTOP'
const TABLET = 'TABLET'
// ref: https://medium.com/@josephat94/building-a-custom-hook-to-detect-user-device-in-react-js-e4dd6e0d2d9c
export const useDeviceDetection = () => {
  const [device, setDevice] = useState('');

  useEffect(() => {
    const handleDeviceDetection = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobile = /iphone|ipad|ipod|android|blackberry|windows phone/g.test(userAgent) || window.innerWidth <= 768;
      const isTablet = /(ipad|tablet|playbook|silk)|(android(?!.*mobile))/g.test(userAgent) || window.innerWidth <= 768;

      if (isMobile) {
        if(window.innerWidth <= 380) {
          setDevice(SMALL_MOBILE)
        }else {
          setDevice(MOBILE);
        }
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

export { MOBILE, DESKTOP, TABLET, SMALL_MOBILE }

export const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement>,
  callback: Function
) => {
  useEffect(() => {
    const listener = (event: any) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      callback(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]);
};
