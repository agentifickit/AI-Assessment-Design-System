import React from 'react';
import { cn } from '../../utils/cn';
import { Field, controlBase, controlBorder } from './Field';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  counter?: {current: number;max: number;};
  fieldClassName?: string;
}

export function Textarea({
  id,
  label,
  hint,
  error,
  counter,
  fieldClassName,
  className,
  required,
  rows = 4,
  ...props
}: TextareaProps) {
  const over = counter ? counter.current > counter.max : false;
  return (
    <Field id={id} label={label} hint={hint} error={error} required={required} className={fieldClassName}>
      <textarea
        id={id}
        rows={rows}
        required={required}
        aria-invalid={error || over ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cn(controlBase, controlBorder(!!error || over), 'resize-y px-2.5 py-2 leading-6', className)}
        {...props} />
      
      {counter &&
      <p
        className={cn('text-2xs tnum', over ? 'text-danger-fg' : 'text-fg-muted')}
        aria-live="polite">
        
          {counter.current.toLocaleString()} / {counter.max.toLocaleString()} characters
          {over && ' — over the limit'}
        </p>
      }
    </Field>);

}