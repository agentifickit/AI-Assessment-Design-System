import React from 'react';
import { cn } from '../../utils/cn';

export interface ToggleProps {
  id: string;
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  /** State text shown beside the switch. Non-colour confirmation of the current value. */
  stateText?: [onText: string, offText: string];
  className?: string;
}

export function Toggle({
  id,
  label,
  description,
  checked,
  onChange,
  disabled,
  stateText = ['On', 'Off'],
  className
}: ToggleProps) {
  return (
    <div className={cn('flex items-start justify-between gap-4', className)}>
      <label htmlFor={id} className="min-w-0 cursor-pointer select-none">
        <span className="block text-13 font-medium text-fg-primary">{label}</span>
        {description && <span className="mt-0.5 block max-w-measure-tight text-2xs text-fg-muted">{description}</span>}
      </label>
      <div className="flex shrink-0 items-center gap-2">
        <span className="text-2xs text-fg-muted tnum">{checked ? stateText[0] : stateText[1]}</span>
        <button
          id={id}
          type="button"
          role="switch"
          aria-checked={checked}
          aria-label={label}
          disabled={disabled}
          onClick={() => onChange(!checked)}
          className={cn(
            'relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition-colors duration-140 ease-enter disabled:cursor-not-allowed disabled:opacity-50',
            checked ? 'border-action bg-action' : 'border-line bg-surface-subtle'
          )}>
          
          <span
            className={cn(
              'absolute h-3.5 w-3.5 rounded-full bg-surface transition-transform duration-140 ease-enter',
              checked ? 'translate-x-[18px]' : 'translate-x-[3px]'
            )}
            style={checked ? { backgroundColor: 'var(--action-primary-fg)' } : undefined} />
          
        </button>
      </div>
    </div>);

}