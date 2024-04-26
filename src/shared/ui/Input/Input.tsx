import { forwardRef, HTMLProps } from 'react';
import { input } from '@/shared/ui/Input/Input.css';
import { Atom } from '@/shared/ui';

interface InputProps extends HTMLProps<HTMLInputElement> {}

// font-size: small

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ ...props }, ref) => (
    <Atom display="block">
      <input className={input} {...props} ref={ref} />
    </Atom>
  ),
);

Input.displayName = 'Input';
