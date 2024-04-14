export const baseColors = {
  white: '#FFFFFF',
  black: '#111111',
  gray: '#797976',
  blue: '#261ae8',
};

export const statusColors = {
  success: '#5755CD',
  warning: '#DACB45',
  failure: '#C72525',
};

export const lightColors = {
  ...baseColors,
  ...statusColors,
  background: '#DCD6D6',
  text: '#181717',
  border: '#123231',
  disabled: '#CBC9C9',
};

export const darkColors = {
  ...baseColors,
  ...statusColors,
  background: '#212A2E',
  text: '#F2F2F2',
  border: '#3A444C',
  disabled: '#4D4C4C',
};
