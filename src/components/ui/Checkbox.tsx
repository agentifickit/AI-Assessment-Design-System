import React from 'react';
import { CheckIcon, MinusIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  id: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  indeterminate?: boolean;
}

export function Checkbox({
  id,
  label,
  description,
  indeterminate,
  className,
  checked,
  disabled,
  ...props
}: CheckboxProps) {
  return (
    <div className={cn('flex items-start gap-2.5', className)}>
      <span className="relative flex h-4 w-4 shrink-0 items-center justify-center pt-px">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          aria-checked={indeterminate ? 'mixed' : undefined}
          className="peer absolute h-4 w-4 cursor-pointer appearance-none rounded-xs border border-line bg-[var(--input-bg)] transition-colors duration-100 ease-enter checked:border-action checked:bg-action hover:border-line-strong disabled:cursor-not-allowed disabled:opacity-50"
          {...props} />
        
        {indeterminate ?
        <MinusIcon className="pointer-events-none relative h-3 w-3 text-action-fg" aria-hidden="true" /> :

        <CheckIcon
          className="pointer-events-none relative hidden h-3 w-3 text-action-fg peer-checked:block"
          aria-hidden="true" />

        }
      </span>
      <label
        htmlFor={id}
        className={cn('min-w-0 cursor-pointer select-none', disabled && 'cursor-not-allowed opacity-60')}>
        
        <span className="block text-13 text-fg-primary">{label}</span>
        {description && <span className="mt-0.5 block text-2xs text-fg-muted">{description}</span>}
      </label>
    </div>);

}