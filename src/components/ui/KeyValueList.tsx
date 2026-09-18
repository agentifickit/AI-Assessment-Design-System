import React from 'react';
import { cn } from '../../utils/cn';

export interface KeyValueItem {
  key: string;
  value: React.ReactNode;
  mono?: boolean;
}

export interface KeyValueListProps {
  items: KeyValueItem[];
  /** 'rows' divides each pair with a hairline; 'inline' is a compact two-column grid. */
  variant?: 'rows' | 'inline';
  className?: string;
}

export function KeyValueList({ items, variant = 'rows', className }: KeyValueListProps) {
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