import { style } from '@vanilla-extract/css';

export const itemWrapper = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, auto))', // 0, 1fr
});

export const sampleMain = style({
  border: '1px solid gray',
  boxShadow:
    'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;',
  padding: '30px',
});
