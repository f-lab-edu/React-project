import { defineProperties, createSprinkles } from '@vanilla-extract/sprinkles';
import { breakpoints } from './breakpoints.css';
import { vars } from './vars.css';

const flexAlignment = [
  'start',
  'center',
  'flex-start',
  'flex-end',
  'stretch',
] as const;

const responsiveProperties = defineProperties({
  conditions: {
    xs: {},
    sm: { '@media': `screen and (min-width: ${breakpoints.sm}px)` },
    md: { '@media': `screen and (min-width: ${breakpoints.md}px)` },
    lg: { '@media': `screen and (min-width: ${breakpoints.lg}px)` },
    xl: { '@media': `screen and (min-width: ${breakpoints.xl}px)` },
  },
  defaultCondition: 'xs',
  responsiveArray: ['xs', 'sm', 'md', 'lg', 'xl'],
  properties: {
    display: [
      'none',
      'block',
      'flex',
      'grid',
      'inline',
      'inline-block',
      'inline-flex',
    ],
    flexDirection: ['row', 'column', 'column-reverse'],
    justifyContent: [...flexAlignment, 'space-around', 'space-between'],
    alignItems: flexAlignment,
    overflow: ['auto', 'hidden', 'scroll', 'unset'],
    overflowY: ['auto', 'hidden', 'scroll'],
    overflowX: ['auto', 'hidden', 'scroll'],
    position: ['absolute', 'fixed', 'relative', 'sticky'],
    textAlign: ['center', 'left', 'right'],
    width: vars.space,
    minWidth: vars.space,
    maxWidth: vars.space,
    height: vars.space,
    minHeight: vars.space,
    maxHeight: vars.space,
    fontSize: vars.fontSizes,
    padding: vars.space,
    paddingTop: vars.space,
    paddingBottom: vars.space,
    paddingLeft: vars.space,
    paddingRight: vars.space,
    margin: vars.space,
    marginTop: vars.space,
    marginBottom: vars.space,
    marginLeft: vars.space,
    marginRight: vars.space,
    borderRadius: vars.radii,
    borderTopLeftRadius: vars.radii,
    borderBottomRightRadius: vars.radii,
    borderTopRightRadius: vars.radii,
    borderBottomLeftRadius: vars.radii,
    border: {
      '1': `1px solid ${vars.colors.border}`,
    },
    borderBottom: {
      '1': `1px solid ${vars.colors.border}`,
    },
    borderColor: vars.colors,
    boxShadow: vars.shadows,
    gap: vars.space,
    zIndex: {
      '0': 0,
      '1': 1,
      '2': 2,
      '3': 3,
      '4': 4,
      '5': 5,
    },
  },
  shorthands: {
    paddingX: ['paddingLeft', 'paddingRight'],
    paddingY: ['paddingTop', 'paddingBottom'],
    marginX: ['marginLeft', 'marginRight'],
    marginY: ['marginTop', 'marginBottom'],
    borderLeftRadius: ['borderBottomLeftRadius', 'borderTopLeftRadius'],
    borderRightRadius: ['borderBottomRightRadius', 'borderTopRightRadius'],
    borderTopRadius: ['borderTopLeftRadius', 'borderTopRightRadius'],
    borderBottomRadius: ['borderBottomLeftRadius', 'borderBottomRightRadius'],
  },
});

const interactiveProperties = defineProperties({
  conditions: {
    base: {},
    hover: { selector: '&:hover' },
    focus: { selector: '&:focus' },
    active: { selector: '&:active' },
  },
  defaultCondition: 'base',
  properties: {
    background: vars.colors,
    backgroundColor: vars.colors,
    color: vars.colors,
  },
});

export const sprinkles = createSprinkles(
  responsiveProperties,
  interactiveProperties,
);

export type Sprinkles = Parameters<typeof sprinkles>[0];
