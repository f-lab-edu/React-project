import React, { createContext, useContext, useEffect, useState } from 'react';
import { breakpoints } from '@/shared/consts/theme/breakpoints.css';
import throttle from 'lodash/throttle';

interface BreakpointState {
  [key: string]: boolean;
}

interface DeviceState extends BreakpointState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

type BreakpointKey = keyof typeof breakpoints;

const BreakpointContext = createContext<DeviceState>({
  isMobile: false,
  isTablet: false,
  isDesktop: false,
});

const deviceChecker = (state: BreakpointState): DeviceState => {
  return {
    ...state,
    isMobile: state.xs || state.sm,
    isTablet: state.md || state.lg,
    isDesktop: state.xl,
  };
};
const breakpointCheck = () =>
  Object.keys(breakpoints).reduce((acc, size, index, array) => {
    const key: BreakpointKey = size as BreakpointKey;
    const breakpoint = breakpoints[key];
    let matched;

    if (index === array.length - 1) {
      matched = `(min-width: ${breakpoint}px)`;
    } else {
      const nextBreakpoint = breakpoints[array[index + 1] as BreakpointKey];
      matched = `(min-width: ${breakpoint}px) and (max-width: ${nextBreakpoint - 1}px)`;
    }

    const mediaQuery =
      typeof window?.matchMedia === 'function'
        ? window.matchMedia(matched)
        : null;

    return {
      ...acc,
      [key]: mediaQuery?.matches ?? false,
    };
  }, {});

export const BreakpointProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [deviceState, setDeviceState] = useState<DeviceState>(() =>
    deviceChecker(breakpointCheck()),
  );

  useEffect(() => {
    setDeviceState(deviceChecker(breakpointCheck()));
    const onResize = () => {
      setDeviceState(deviceChecker(breakpointCheck()));
    };

    const throttleOnResize = throttle(onResize, 500);

    window.addEventListener('resize', throttleOnResize);

    return () => {
      window.removeEventListener('resize', throttleOnResize);
    };
  }, []);

  return (
    <BreakpointContext.Provider value={deviceState}>
      {children}
    </BreakpointContext.Provider>
  );
};

export const useMatchBreakpoint = () => {
  const breakpointContext = useContext(BreakpointContext);

  if (breakpointContext === undefined) {
    throw new Error('BreakpointContext is undefined');
  }

  return breakpointContext;
};
