import React from 'react';
import { cn } from '../../utils/cn';

export interface MinimisedPanelButtonProps {
  /** Accessible name, e.g. "Open copilot". */
  label: string;
  icon: React.ReactNode;
  onExpand: () => void;
  /** Unread count. This is one of the three accent uses the candidate shell allows. */
  count?: number;
  /** 'absolute' sits inside a relative shell; 'fixed' floats over the viewport. */
  position?: 'absolute' | 'fixed';
  className?: string;
}

/** The assistant column minimises to a 40px floating button at the bottom right
 *  of the work surface, not to a labelled edge tab: the candidate keeps the whole
 *  width for their work and can still see the assistant is one click away.
 *  DS-13, approved 2026-09-22. CollapsedEdgeTab remains the rule for panels
 *  whose label must stay visible (the brief). */
export function MinimisedPanelButton({
  label,
  icon,
  onExpand,
  count,
  position = 'absolute',
  className
}: MinimisedPanelButtonProps) {
  return (
    <button
      type="button"
      onClick={onExpand}
      aria-label={typeof count === 'number' && count > 0 ? `${label}, ${count} unread` : label}
      aria-expanded={false}
      className={cn(
        position,
        'bottom-4 right-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-md border border-line bg-surface text-fg-secondary shadow-dialog',
        'transition-colors duration-100 ease-enter hover:bg-surface-hover hover:text-fg-primary',
        className
      )}>
      
      {icon}
      {typeof count === 'number' && count > 0 &&
      <span
        aria-hidden="true"
        className="absolute -right-1 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-9 font-semibold text-fg-accent tnum">
          {count > 99 ? '99+' : count}
        </span>
      }
    </button>);

}
