import { style } from '@vanilla-extract/css';
import { flexCenter } from '@/shared/consts/theme/global.css';
import { sprinkles } from '@/shared/consts/theme/sprinkles.css';

export const footer = style({
  width: '100%',
});

export const footerContainer = style([
  flexCenter,
  sprinkles({
    backgroundColor: 'white',
    padding: '12px',
  }),
  {
    justifyContent: 'space-between',
  },
]);
