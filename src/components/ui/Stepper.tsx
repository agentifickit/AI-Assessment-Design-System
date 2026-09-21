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
  /** Progress inside each step, 0 to 1, indexed like `steps`. When present the
   *  connectors become 3px tracks with an action-coloured fill so milestones and
   *  progress are one component. Only the current step's entry is read: done
   *  steps are full and future steps empty, so the fill can never contradict the
   *  markers. Without it the connectors are unchanged. */
  progress?: number[];
  /** Connector width in px. The wizard uses 56 with `progress`. */
  connectorWidth?: number;
  className?: string;
}

/** Fill for the connector that leaves step `i`, 0 to 1. The chip state decides
 *  for done and future steps; the current step reads `progress[current]`,
 *  clamped, with a missing or non-finite entry treated as 0. */
function connectorFill(i: number, current: number, progress: number[]): number {
  if (i < current) return 1;
  if (i > current) return 0;
  const value = progress[i];
  return Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 0;
}

/** No "Step 1 of 4" caption — the markers already say it, and the list is announced as an ordered list. */
export function Stepper({ steps, current, label, progress, connectorWidth = 16, className }: StepperProps) {
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
              {i < steps.length - 1 &&
              (progress ?
              <span
                aria-hidden="true"
                className="h-[3px] shrink-0 overflow-hidden rounded-full bg-line"
                style={{ width: connectorWidth }}>
                
                    <span
                  className="block h-full rounded-full bg-action transition-[width] duration-280 ease-enter"
                  style={{ width: `${connectorFill(i, current, progress) * 100}%` }} />

                  </span> :

              <span aria-hidden="true" className="h-px shrink-0 bg-line" style={{ width: connectorWidth }} />)
              }
            </li>);

        })}
      </ol>
    </nav>);

}
