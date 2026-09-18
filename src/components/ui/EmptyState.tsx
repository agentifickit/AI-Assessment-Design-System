import React from 'react';
import { cn } from '../../utils/cn';

export type EmptyKind = 'first-run' | 'no-results' | 'no-permission' | 'no-evidence';

export interface EmptyStateProps {
  kind?: EmptyKind;
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

/** Four kinds, one shape. No illustration, no decorative shapes — the copy does the work. */
export function EmptyState({ kind = 'no-results', icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      data-kind={kind}
      className={cn(
        'flex flex-col items-center justify-center gap-2 rounded-md border border-dashed border-line px-6 py-10 text-center',
        className
      )}>
      
      {icon && <span className="text-fg-muted" aria-hidden="true">{icon}</span>}
      <p className="text-13 font-semibold text-fg-primary">{title}</p>
      {description && <p className="max-w-measure-tight text-13 text-fg-muted">{description}</p>}
      {action && <div className="mt-1.5">{action}</div>}
    </div>);

}