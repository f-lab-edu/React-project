import { style } from '@vanilla-extract/css';
import { sprinkles } from '@/shared/consts/theme/sprinkles.css';
import { flexCenter } from '@/shared/consts/theme/global.css';

export const container = style({
  position: 'fixed',
  top: '0px',
  left: '0px',
  width: '100%',
  zIndex: '10',
  transition: 'top 0.3s ease 0s',
});

export const nav = style([
  sprinkles({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1',
    width: 'full',
    backgroundColor: 'white',
    boxShadow: 'notice',
  }),
  {
    padding: '0 14px',
  },
]);

export const navLeft = style([
  flexCenter,
  {
    minWidth: '0px',
    flex: 1,
  },
]);

export const navRight = style([
  flexCenter,
  {
    flex: '0 0 auto',
    justifyContent: 'flex-end',
  },
]);

export const navItem = sprinkles({
  marginRight: '12px',
});
