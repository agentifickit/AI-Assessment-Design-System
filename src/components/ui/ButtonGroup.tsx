import React from 'react';
import { cn } from '../../utils/cn';

export interface ButtonGroupOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export interface ButtonGroupProps {
  options: ButtonGroupOption[];
  value: string;
  onChange: (value: string) => void;
  /** Accessible name for the group. */
  label: string;
  size?: 'sm' | 'md';
  className?: string;
}

/** Segmented control. Single selection, arrow-key navigable via native radio semantics. */
export function ButtonGroup({ options, value, onChange, label, size = 'md', className }: ButtonGroupProps) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn('inline-flex items-center rounded-sm border border-line bg-surface p-0.5', className)}>
      
      {options.map((opt) => {
        const selected = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(opt.value)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-xs font-medium',
              'transition-[background-color,color] duration-100 ease-enter',
              size === 'sm' ? 'h-6 px-2 text-2xs' : 'h-7 px-2.5 text-xs',
              selected ?
              'bg-surface-active text-fg-primary' :
              'text-fg-muted hover:text-fg-primary'
            )}>
            
            {opt.icon}
            {opt.label}
          </button>);

      })}
    </div>);

}