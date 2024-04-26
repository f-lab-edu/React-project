import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Mode } from '../../consts/theme/types';

interface ThemeModeContextValues {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

const ThemeContext = createContext<ThemeModeContextValues>({
  mode: 'light',
  setMode: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<Mode>('light');

  const modeValue = useMemo(
    () => ({
      mode,
      setMode,
    }),
    [mode],
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);

    return () => {
      document.documentElement.removeAttribute('data-theme');
    };
  }, [mode]);

  return (
    <ThemeContext.Provider value={modeValue}>{children}</ThemeContext.Provider>
  );
};

export const useThemeMode = () => useContext(ThemeContext);
