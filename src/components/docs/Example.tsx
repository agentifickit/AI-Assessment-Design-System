import React from 'react';
import { cn } from '../../utils/cn';

export interface ExampleProps {
  label?: string;
  note?: string;
  children: React.ReactNode;
  /** Sunken canvas behind the specimen, matching how components sit on a real page. */
  tone?: 'canvas' | 'surface';
  className?: string;
  bodyClassName?: string;
}

export function Example({ label, note, children, tone = 'canvas', className, bodyClassName }: ExampleProps) {
  return (
    <figure className={cn('overflow-hidden rounded-md border border-line', className)}>
      {label &&
      <figcaption className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line-subtle bg-surface px-3 py-1.5">
          <span className="text-2xs font-medium text-fg-secondary">{label}</span>
          {note && <span className="text-2xs text-fg-muted">{note}</span>}
        </figcaption>
      }
      <div className={cn('p-4', tone === 'canvas' ? 'bg-canvas' : 'bg-surface', bodyClassName)}>{children}</div>
    </figure>);

}