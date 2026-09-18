import React from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Field, controlBase, controlBorder } from './Field';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  id: string;
  label: string;
  options: SelectOption[];
  hint?: string;
  error?: string;
  fieldClassName?: string;
}

export function Select({
  id,
  label,
  options,
  hint,
  error,
  fieldClassName,
  className,
  required,
  ...props
}: SelectProps) {
  return (
    <Field id={id} label={label} hint={hint} error={error} required={required} className={fieldClassName}>
      <div className="relative">
        <select
          id={id}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          className={cn(
            controlBase,
            controlBorder(!!error),
            'h-8 appearance-none pl-2.5 pr-8',
            className
          )}
          {...props}>
          
          {options.map((o) =>
          <option key={o.value} value={o.value}>
              {o.label}
            </option>
          )}
        </select>
        <ChevronDownIcon
          className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-fg-muted"
          aria-hidden="true" />
        
      </div>
    </Field>);

}