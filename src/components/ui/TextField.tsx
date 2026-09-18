import React from 'react';
import { cn } from '../../utils/cn';
import { Field, controlBase, controlBorder } from './Field';

export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  iconLeft?: React.ReactNode;
  suffix?: React.ReactNode;
  fieldClassName?: string;
  mono?: boolean;
}

export function TextField({
  id,
  label,
  hint,
  error,
  iconLeft,
  suffix,
  fieldClassName,
  mono,
  className,
  required,
  ...props
}: TextFieldProps) {
  return (
    <Field id={id} label={label} hint={hint} error={error} required={required} className={fieldClassName}>
      <div className="relative flex items-center">
        {iconLeft &&
        <span className="pointer-events-none absolute left-2.5 text-fg-muted" aria-hidden="true">
            {iconLeft}
          </span>
        }
        <input
          id={id}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          className={cn(
            controlBase,
            controlBorder(!!error),
            'h-8 px-2.5',
            iconLeft && 'pl-8',
            suffix && 'pr-16',
            mono && 'font-mono',
            className
          )}
          {...props} />
        
        {suffix &&
        <span className="pointer-events-none absolute right-2.5 text-2xs text-fg-muted tnum">{suffix}</span>
        }
      </div>
    </Field>);

}