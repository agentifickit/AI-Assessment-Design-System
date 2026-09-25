import React from 'react';
import { cn } from '../../utils/cn';

export interface ProgressProps {
  label: string;
  value: number;
  max?: number;
  /** Text shown at the right of the label row, e.g. "3 of 5 steps". */
  valueText?: string;
  tone?: 'neutral' | 'accent';
  indeterminate?: boolean;
  showLabel?: boolean;
  className?: string;
}

export function Progress({
  label,
  value,
  max = 100,
  valueText,
  tone = 'neutral',
  indeterminate,
  showLabel = true,
  className
}: ProgressProps) {
  const pct = Math.min(100, Math.max(0, value / max * 100));
  return (
    <div className={cn('min-w-0', className)}>
      {showLabel &&
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
          <span className="text-xs font-medium text-fg-secondary">{label}</span>
          {valueText && <span className="text-2xs text-fg-muted tnum">{valueText}</span>}
        </div>
      }
      <div
        role="progressbar"
        aria-label={label}
        aria-valuenow={indeterminate ? undefined : Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={valueText}
        className="h-1.5 w-full overflow-hidden rounded-full bg-surface-sunken">
        
        <div
          className={cn(
            'h-full rounded-full transition-[width] duration-280 ease-enter',
            tone === 'accent' ? 'bg-brand' : 'bg-fg-secondary',
            indeterminate && 'w-1/3 animate-pulse'
          )}
          style={indeterminate ? undefined : { width: `${pct}%` }} />
        
      </div>
    </div>);

}