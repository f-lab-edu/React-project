import { globalStyle } from '@vanilla-extract/css';

globalStyle(`*`, {
  boxSizing: `border-box`,
  margin: 0,
  padding: 0,
  border: 0,
});

globalStyle('body', {
  lineHeight: 1,
});

globalStyle(`p, h1, h2, h3, h4, h5, h6`, {
  overflowWrap: `break-word`,
});

globalStyle('ol, ul', {
  listStyle: 'none',
});

globalStyle('a', {
  color: 'inherit',
  textDecoration: 'none',
});
