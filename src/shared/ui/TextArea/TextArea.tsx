import { textArea } from '@/shared/ui/TextArea/TextArea.css';
import { forwardRef, HTMLProps } from 'react';

interface TextAreaProps extends HTMLProps<HTMLTextAreaElement> {}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ ...props }, ref) => <textarea className={textArea} {...props} ref={ref} />,
);

TextArea.displayName = 'TextArea';
