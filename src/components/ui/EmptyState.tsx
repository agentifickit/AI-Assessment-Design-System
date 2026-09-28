import React from 'react';
import { cn } from '../../utils/cn';

export type EmptyKind = 'first-run' | 'no-results' | 'no-permission' | 'no-evidence';

export interface EmptyStateProps {
  kind?: EmptyKind;
  icon?: React.ReactNode;
  title: string;
  description?: string;
  /** One `sm` button that makes the change, or two `sm` secondary buttons
   *  when the product names two ways in (Upload a CSV, Add one candidate).
   *  The page's primary action stays in the top bar. Issue #18. */
  action?: React.ReactNode;
  className?: string;
}

/** Four kinds, one shape. No illustration, no decorative shapes — the copy does the work.
 *  A first-run state is the whole content of its page or pane, so its title is
 *  heading-3 (16/26); the other three sit inside a region that already has a
 *  heading and keep heading-4 (13/20). Issue #18. */
export function EmptyState({ kind = 'no-results', icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      data-kind={kind}
      className={cn(
        'flex flex-col items-center justify-center gap-2 rounded-md border border-dashed border-line px-6 py-10 text-center',
        className
      )}>

      {icon && <span className="text-fg-muted" aria-hidden="true">{icon}</span>}
      <p className={cn('font-semibold text-fg-primary', kind === 'first-run' ? 'text-base' : 'text-13')}>{title}</p>
      {description && <p className="max-w-measure-tight text-13 text-fg-muted">{description}</p>}
      {action && <div className="mt-1.5 flex flex-wrap items-center justify-center gap-2">{action}</div>}
    </div>);

}
