import React from 'react';
import { CheckIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface StepperStep {
  id: string;
  label: string;
  description?: string;
}

export interface StepperProps {
  steps: StepperStep[];
  /** Index of the current step. Steps before it are complete. */
  current: number;
  label: string;
  className?: string;
}

/** No "Step 1 of 4" caption — the markers already say it, and the list is announced as an ordered list. */
export function Stepper({ steps, current, label, className }: StepperProps) {
  return (
    <nav aria-label={label} className={cn('min-w-0', className)}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-2">
        {steps.map((s, i) => {
          const complete = i < current;
          const active = i === current;
          return (
            <li key={s.id} className="flex items-center gap-2">
              <span
                aria-current={active ? 'step' : undefined}
                className={cn(
                  'inline-flex items-center gap-2 rounded-sm border px-2 py-1',
                  active && 'border-accent-border bg-accent-bg',
                  complete && 'border-line bg-surface',
                  !active && !complete && 'border-dashed border-line bg-transparent'
                )}>
                
                <span
                  className={cn(
                    // 11px is the small-text floor; 9px was below it. The active
                    // marker carries a numeral, so it uses the action surface.
                    'inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-xs border text-2xs font-semibold tnum',
                    complete && 'border-fg-primary bg-fg-primary text-fg-inverse',
                    active && 'border-action bg-action text-action-fg',
                    !active && !complete && 'border-line text-fg-muted'
                  )}>
                  
                  {complete ? <CheckIcon className="h-2.5 w-2.5" aria-hidden="true" /> : i + 1}
                </span>
                <span
                  className={cn(
                    'text-xs font-medium',
                    active ? 'text-fg-primary' : complete ? 'text-fg-secondary' : 'text-fg-muted'
                  )}>
                  
                  {s.label}
                </span>
                {complete && <span className="sr-only">Completed</span>}
              </span>
              {i < steps.length - 1 && <span aria-hidden="true" className="h-px w-4 bg-line" />}
            </li>);

        })}
      </ol>
    </nav>);

}