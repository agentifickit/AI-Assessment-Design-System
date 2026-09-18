import React from 'react';
import { ClockIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface AssessmentTimerProps {
  /** Whole minutes remaining. */
  minutesRemaining: number;
  totalMinutes: number;
  paused?: boolean;
  className?: string;
}

/** Emphasis changes by weight and wording, never by alarm colour or pulsing.
 *  A candidate under time pressure should not be startled by their own timer. */
export function AssessmentTimer({ minutesRemaining, totalMinutes, paused, className }: AssessmentTimerProps) {
  const final = minutesRemaining <= 10;
  const hrs = Math.floor(minutesRemaining / 60);
  const mins = minutesRemaining % 60;
  const display = hrs > 0 ? `${hrs}h ${String(mins).padStart(2, '0')}m` : `${mins}m`;

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-sm border border-line bg-surface px-2.5 py-1',
        className
      )}>
      
      <ClockIcon className="h-3.5 w-3.5 text-fg-muted" aria-hidden="true" />
      <span className="flex items-baseline gap-1.5">
        <span
          className={cn('text-13 tnum', final ? 'font-semibold' : 'font-medium')}
          style={{ color: final ? 'var(--timer-fg-final)' : 'var(--timer-fg)' }}>
          
          {display}
        </span>
        <span className="text-2xs text-fg-muted">remaining</span>
      </span>
      <span className="sr-only" aria-live="polite">
        {paused ?
        'Timer paused.' :
        `${display} remaining of ${totalMinutes} minutes.`}
      </span>
      {paused &&
      <span className="rounded-xs border border-line bg-surface-subtle px-1.5 py-0.5 text-2xs text-fg-secondary">
          Paused
        </span>
      }
    </div>);

}