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
  /** Properties: 'sm' sets values in the 11px step and the secondary ink,
   *  for a read-out inside a popover. Rows: 'lg' sets values in body-base
   *  (14/20), for candidate-facing facts. 'md' is the 13px default. */
  size?: 'sm' | 'md' | 'lg';
  /** Rows only: a fixed key column in px. The value starts 12px after it and
   *  reads left-aligned, as facts about one person or one file do. Without
   *  it the value sits at the right edge. Issue #17. */
  keyColumn?: number;
  className?: string;
}

/** Label and value pairs. The 'properties' variant is how a document states
 *  what it asks for, as Linear and ClickUp do above an issue: an 88px label
 *  column in the muted 11px step, values in the 13px body ink on a 20px line,
 *  6px between rows, no rules and no fills. Values wrap; labels never do, so
 *  keep them to one or two words ("Hand in", "Unit"). DS-39, from the task
 *  brief in the workspace review of 2026-09-26. */
export function KeyValueList({ items, variant = 'rows', size = 'md', keyColumn, className }: KeyValueListProps) {
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

  const aligned = typeof keyColumn === 'number';
  return (
    <dl className={cn('divide-y divide-line-subtle', className)}>
      {items.map((i) =>
      <div
        key={i.key}
        className={cn('items-baseline py-2', aligned ? 'grid gap-3' : 'flex justify-between gap-4')}
        style={aligned ? { gridTemplateColumns: `${keyColumn}px minmax(0, 1fr)` } : undefined}>
        
          <dt className={cn('text-xs text-fg-muted', aligned ? 'min-w-0' : 'shrink-0')}>{i.key}</dt>
          <dd
          className={cn(
            'min-w-0 text-fg-primary',
            !aligned && 'text-right',
            size === 'lg' ? 'text-sm' : 'text-13',
            i.mono && 'font-mono tnum',
            i.mono && size !== 'lg' && 'text-xs'
          )}>
          
            {i.value}
          </dd>
        </div>
      )}
    </dl>);

}