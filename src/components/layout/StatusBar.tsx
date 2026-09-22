import React from 'react';
import { cn } from '../../utils/cn';

export type StatusTone = 'neutral' | 'warning' | 'danger';

export interface StatusSegment {
  id: string;
  /** Rendered in caps by the `status` style; write it as a sentence fragment. */
  label: string;
  tone?: StatusTone;
  /** Announced on change. Connection and save state are live; the candidate name is not. */
  live?: boolean;
}

export interface StatusBarProps {
  segments: StatusSegment[];
  /** Right-aligned slot, e.g. the timer. */
  trailing?: React.ReactNode;
  className?: string;
}

const toneClasses: Record<StatusTone, string> = {
  neutral: 'text-fg-muted',
  warning: 'text-warning-fg',
  danger: 'text-danger-fg'
};

/** The candidate shell's 32px bottom bar. Segments are instrumentation, so they
 *  use the `status` type style (10/16 mono, caps, tracked) and never carry a
 *  decision. DS-12, approved 2026-09-22. The timer segment is a slot: what it
 *  shows is a PRD decision, not a design-system one. */
export function StatusBar({ segments, trailing, className }: StatusBarProps) {
  return (
    <div className={cn('flex h-8 shrink-0 items-center justify-between gap-4 border-t border-line bg-surface-subtle px-3', className)}>
      <ul className="flex min-w-0 items-center gap-4">
        {segments.map((s) =>
        <li
          key={s.id}
          role={s.live ? 'status' : undefined}
          aria-live={s.live ? 'polite' : undefined}
          className={cn(
            'truncate font-mono text-10 font-medium uppercase tracking-[0.08em]',
            toneClasses[s.tone ?? 'neutral']
          )}>
          
            {s.label}
          </li>
        )}
      </ul>
      {trailing && <div className="shrink-0 font-mono text-10 font-medium uppercase tracking-[0.08em] text-fg-muted tnum">{trailing}</div>}
    </div>);

}
