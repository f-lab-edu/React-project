import { AllHTMLAttributes, createElement, forwardRef } from 'react';
import clsx, { ClassValue } from 'clsx';
import { atoms, Atoms } from '../../lib/theme/atoms';
import { sprinkles } from '@/shared/consts/theme';

type HTMLProperties<T = HTMLElement> = Omit<AllHTMLAttributes<T>, 'className'>;

type Props = HTMLProperties &
  Atoms & {
    className?: ClassValue;
  };

export const Atom = forwardRef<HTMLElement, Props>(
  ({ className, ...props }, ref) => {
    const atomProps: Record<string, unknown> = {};
    const nativeProps: Record<string, unknown> = {};

    for (const key in props) {
      if (sprinkles.properties.has(key as keyof Omit<Atoms, 'reset'>)) {
        atomProps[key] = props[key as keyof typeof props];
      } else {
        nativeProps[key] = props[key as keyof typeof props];
      }
    }

    const atomicClasses = atoms({
      ...atomProps,
    });

    return createElement('div', {
      className: clsx(className, atomicClasses),
      ...nativeProps,
      ref,
    });
  },
);

Atom.displayName = 'Atom';
