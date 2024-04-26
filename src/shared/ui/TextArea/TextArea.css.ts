import { style } from '@vanilla-extract/css';

export const textArea = style({
  overflow: 'hidden',
  overflowWrap: 'break-word',
  background: 'transparent',
  resize: 'none',
  outline: 0,
  border: 0,
  display: 'block',
  width: '100%',
  paddingRight: '1px',
});
