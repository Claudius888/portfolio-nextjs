import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';

const SMALL_MOBILE = 'SMALL_MOBILE';
const MOBILE = 'MOBILE';
const DESKTOP = 'DESKTOP';
const TABLET = 'TABLET';
// ref: https://medium.com/@josephat94/building-a-custom-hook-to-detect-user-device-in-react-js-e4dd6e0d2d9c
export const useDeviceDetection = () => {
  const [device, setDevice] = useState('');

  useEffect(() => {
    const handleDeviceDetection = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobile =
        /iphone|ipad|ipod|android|blackberry|windows phone/g.test(userAgent) ||
        window.innerWidth <= 768;
      const isTablet =
        /(ipad|tablet|playbook|silk)|(android(?!.*mobile))/g.test(userAgent) ||
        window.innerWidth <= 768;

      if (isMobile) {
        if (window.innerWidth <= 380) {
          setDevice(SMALL_MOBILE);
        } else {
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

export { MOBILE, DESKTOP, TABLET, SMALL_MOBILE };

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

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, callback]);
};

export const useCheckStorageonPageLoad = () => {

  useEffect(() => {
    const clearStorage = (e:BeforeUnloadEvent) => {
      console.log("Im called");
      window.sessionStorage.clear();
    };

    window.addEventListener('beforeunload', clearStorage);
    return () => {
      window.removeEventListener('beforeunload', clearStorage);
    };
  }, []);

  const getItem = (key:string) => {
    try {
      const item  = window.sessionStorage.getItem(key)
      if (item) {
        return JSON.parse(item);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const setItem = (key:string, value: boolean) => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.log(error)
    }
  }

  return {getItem, setItem};
};
