import React from 'react';
import { cn } from '../../utils/cn';

export interface SpecEntry {
  term: string;
  detail: React.ReactNode;
}

export interface SpecListProps {
  title?: string;
  entries: SpecEntry[];
  columns?: 1 | 2;
  className?: string;
}

/** The standard component-spec block: anatomy, variants, sizes, states, tokens,
 *  interaction, accessibility, responsive, content. */
export function SpecList({ title, entries, columns = 2, className }: SpecListProps) {
  return (
    <div className={cn('rounded-md border border-line bg-surface p-4', className)}>
      {title && <h4 className="mb-3 text-13 font-semibold text-fg-primary">{title}</h4>}
      <dl className={cn('grid gap-x-8 gap-y-3', columns === 2 ? 'sm:grid-cols-2' : 'grid-cols-1')}>
        {entries.map((e) =>
        <div key={e.term} className="min-w-0">
            <dt className="text-2xs font-semibold uppercase tracking-wide text-fg-muted">{e.term}</dt>
            <dd className="mt-1 text-13 leading-6 text-fg-secondary">{e.detail}</dd>
          </div>
        )}
      </dl>
    </div>);

}