import React from 'react';
import { cn } from '../../utils/cn';

export interface KeyValueItem {
  key: string;
  value: React.ReactNode;
  mono?: boolean;
}

export interface KeyValueListProps {
  items: KeyValueItem[];
  /** 'rows' divides each pair with a hairline; 'inline' is a compact two-column
   *  grid; 'properties' is a document's property rows (DS-39). */
  variant?: 'rows' | 'inline' | 'properties';
  /** Properties only: 'sm' sets values in the 11px step and the secondary
   *  ink, for a read-out inside a popover. */
  size?: 'sm' | 'md';
  className?: string;
}

/** Label and value pairs. The 'properties' variant is how a document states
 *  what it asks for, as Linear and ClickUp do above an issue: an 88px label
 *  column in the muted 11px step, values in the 13px body ink on a 20px line,
 *  6px between rows, no rules and no fills. Values wrap; labels never do, so
 *  keep them to one or two words ("Hand in", "Unit"). DS-39, from the task
 *  brief in the workspace review of 2026-09-26. */
export function KeyValueList({ items, variant = 'rows', size = 'md', className }: KeyValueListProps) {
  if (variant === 'properties') {
    return (
      <dl className={cn('grid grid-cols-[88px_minmax(0,1fr)] gap-x-3 gap-y-1.5', className)}>
        {items.map((i) =>
        <React.Fragment key={i.key}>
            <dt className="truncate pt-px text-2xs leading-5 text-fg-muted">{i.key}</dt>
            <dd
            className={cn(
              'min-w-0 leading-5',
              size === 'sm' ? 'text-2xs text-fg-secondary' : 'text-13 text-fg-primary',
              i.mono && 'font-mono tnum',
              i.mono && size !== 'sm' && 'text-xs'
            )}>
            
              {i.value}
            </dd>
          </React.Fragment>
        )}
      </dl>);

  }

  if (variant === 'inline') {
    return (
      <dl className={cn('grid grid-cols-[minmax(0,auto)_minmax(0,1fr)] gap-x-4 gap-y-1.5', className)}>
        {items.map((i) =>
        <React.Fragment key={i.key}>
            <dt className="text-xs text-fg-muted">{i.key}</dt>
            <dd className={cn('min-w-0 text-13 text-fg-primary', i.mono && 'font-mono text-xs')}>{i.value}</dd>
          </React.Fragment>
        )}
      </dl>);

  }

  return (
    <dl className={cn('divide-y divide-line-subtle', className)}>
      {items.map((i) =>
      <div key={i.key} className="flex items-baseline justify-between gap-4 py-2">
          <dt className="shrink-0 text-xs text-fg-muted">{i.key}</dt>
          <dd className={cn('min-w-0 text-right text-13 text-fg-primary', i.mono && 'font-mono text-xs tnum')}>
            {i.value}
          </dd>
        </div>
      )}
    </dl>);

}