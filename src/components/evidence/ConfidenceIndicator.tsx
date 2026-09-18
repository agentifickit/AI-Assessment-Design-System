import React from 'react';
import { cn } from '../../utils/cn';
import type { ConfidenceBand } from '../../types/system';

export interface ConfidenceIndicatorProps {
  band: ConfidenceBand;
  className?: string;
}

const bands: Record<ConfidenceBand, {label: string;filled: number;note: string;}> = {
  high: { label: 'High confidence', filled: 3, note: 'Multiple independent moments support this.' },
  moderate: { label: 'Moderate confidence', filled: 2, note: 'Supported, but from a narrow slice of the session.' },
  low: { label: 'Low confidence', filled: 1, note: 'One ambiguous moment. Treat as a prompt for discussion.' },
  insufficient: { label: 'Insufficient evidence', filled: 0, note: 'Not enough was captured to say anything.' }
};

/** Worded bands, never a percentage — a number would imply a precision the evidence does not have. */
export function ConfidenceIndicator({ band, className }: ConfidenceIndicatorProps) {
  const b = bands[band];
  return (
    <span className={cn('inline-flex items-center gap-1.5', className)} title={b.note}>
      <span className="flex items-end gap-0.5" aria-hidden="true">
        {[0, 1, 2].map((i) =>
        <span
          key={i}
          className={cn(
            'w-1 rounded-[1px] border',
            i === 0 ? 'h-1.5' : i === 1 ? 'h-2.5' : 'h-3.5',
            i < b.filled ? 'border-fg-secondary bg-fg-secondary' : 'border-line-strong bg-transparent'
          )} />

        )}
      </span>
      <span className="text-2xs font-medium text-fg-secondary">{b.label}</span>
    </span>);

}