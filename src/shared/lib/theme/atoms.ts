import clsx from 'clsx';
import { sprinkles, Sprinkles } from '../../consts/theme/sprinkles.css';

export type Atoms = Sprinkles;

export const atoms = ({ ...params }: Atoms) => {
  const sprinklesClasses = sprinkles(params);

  return clsx(sprinklesClasses);
};
