import React from 'react';
import { cn } from '../../utils/cn';

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name: string;
  legend: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  className?: string;
}

export function RadioGroup({ name, legend, options, value, onChange, hint, className }: RadioGroupProps) {
  return (
    <fieldset className={cn('min-w-0', className)}>
      <legend className="text-xs font-medium text-fg-secondary">{legend}</legend>
      {hint && <p className="mt-1 text-2xs text-fg-muted">{hint}</p>}
      <div className="mt-2 flex flex-col gap-2">
        {options.map((o) => {
          const id = `${name}-${o.value}`;
          return (
            <div key={o.value} className="flex items-start gap-2.5">
              <input
                id={id}
                type="radio"
                name={name}
                value={o.value}
                checked={value === o.value}
                disabled={o.disabled}
                onChange={() => onChange(o.value)}
                className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer appearance-none rounded-full border border-line bg-[var(--input-bg)] transition-colors duration-100 ease-enter checked:border-[5px] checked:border-accent hover:border-line-strong disabled:cursor-not-allowed disabled:opacity-50" />
              
              <label
                htmlFor={id}
                className={cn('min-w-0 cursor-pointer select-none', o.disabled && 'cursor-not-allowed opacity-60')}>
                
                <span className="block text-13 text-fg-primary">{o.label}</span>
                {o.description && <span className="mt-0.5 block text-2xs text-fg-muted">{o.description}</span>}
              </label>
            </div>);

        })}
      </div>
    </fieldset>);

}