import { sprinkles } from '@/shared/consts/theme';
import { style } from '@vanilla-extract/css';

export const CommentsBox = style([
  sprinkles({
    background: 'background',
    color: 'text',
    borderBottom: '1',
    padding: '10px',
  }),
]);
