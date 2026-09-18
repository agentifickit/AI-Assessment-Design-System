import React from 'react';
import { cn } from '../../utils/cn';

export interface ScreenFrameProps {
  title: string;
  audience: string;
  summary: string;
  uses: string[];
  children: React.ReactNode;
  /** Screens that own their own scrolling (the workspace) opt out of the page padding. */
  bleed?: boolean;
  className?: string;
}

export function ScreenFrame({ title, audience, summary, uses, children, bleed, className }: ScreenFrameProps) {
  return (
    <div className={cn('flex min-h-full flex-col', className)}>
      <div className="border-b border-line bg-surface px-4 py-3 md:px-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h1 className="text-sm font-semibold text-fg-primary">{title}</h1>
          <span className="text-2xs text-fg-muted">{audience}</span>
        </div>
        <p className="mt-1 max-w-measure text-13 leading-6 text-fg-secondary">{summary}</p>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {uses.map((u) =>
          <li
            key={u}
            className="rounded-xs border border-line bg-surface-subtle px-1.5 py-0.5 text-[10px] text-fg-muted">
            
              {u}
            </li>
          )}
        </ul>
      </div>
      <div className={cn('min-w-0 flex-1 bg-canvas', !bleed && 'p-4 md:p-6')}>{children}</div>
    </div>);

}