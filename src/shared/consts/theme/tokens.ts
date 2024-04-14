import { darkColors, lightColors } from './index';
import { fontSizes } from './fonts';
import { borderWidths } from './border';
import { shadows } from './shadows';
import { space } from './space';
import { radii } from './radii';

export const tokens = {
  colors: {
    light: lightColors,
    dark: darkColors,
  },
  fonts: {
    base: 'sans-serif',
  },
  fontSizes,
  borderWidths,
  shadows,
  space,
  radii,
} as const;

export type Tokens = typeof tokens;
