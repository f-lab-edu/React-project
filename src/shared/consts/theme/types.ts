import { Tokens } from './tokens';

export type Mode = 'light' | 'dark';

export type Theme = {
  colors: Tokens['colors'];
  fonts: Tokens['fonts'];
  fontSizes: Tokens['fontSizes'];
  borderWidths: Tokens['borderWidths'];
  shadows: Tokens['shadows'];
  space: Tokens['space'];
  radii: Tokens['radii'];
};
