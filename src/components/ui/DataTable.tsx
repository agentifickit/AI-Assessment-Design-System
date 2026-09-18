import React from 'react';
import { ChevronDownIcon, ChevronUpIcon, ChevronsUpDownIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface Column<T> {
  id: string;
  header: string;
  /** Cell renderer. Return a node; wrap long text in truncate yourself. */
  cell: (row: T) => React.ReactNode;
  width?: string;
  align?: 'left' | 'right';
  sortable?: boolean;
  /** Freezes the column against horizontal scroll. Use on the identity column only. */
  sticky?: boolean;
}

export interface DataTableProps<T> {
  caption: string;
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  sort?: {columnId: string;direction: 'asc' | 'desc';};
  onSort?: (columnId: string) => void;
  onRowClick?: (row: T) => void;
  selectedKey?: string;
  className?: string;
  /** Rendered inside the scroll container when rows is empty. */
  empty?: React.ReactNode;
}

export function DataTable<T>({
  caption,
  columns,
  rows,
  rowKey,
  sort,
  onSort,
  onRowClick,
  selectedKey,
  className,
  empty
}: DataTableProps<T>) {
  return (
    <div className={cn('scroll-panel min-w-0 overflow-x-auto', className)}>
      <table className="w-full border-collapse text-13">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-line bg-[var(--table-header-bg)]">
            {columns.map((c) => {
              const sorted = sort?.columnId === c.id;
              return (
                <th
                  key={c.id}
                  scope="col"
                  style={{ width: c.width }}
                  aria-sort={sorted ? sort!.direction === 'asc' ? 'ascending' : 'descending' : undefined}
                  className={cn(
                    'whitespace-nowrap px-3 py-2 text-2xs font-semibold uppercase tracking-wide text-fg-muted',
                    c.align === 'right' ? 'text-right' : 'text-left',
                    c.sticky && 'sticky left-0 z-10 bg-[var(--table-header-bg)]'
                  )}>
                  
                  {c.sortable && onSort ?
                  <button
                    type="button"
                    onClick={() => onSort(c.id)}
                    className={cn(
                      'inline-flex items-center gap-1 rounded-xs transition-colors duration-100 ease-enter hover:text-fg-primary',
                      c.align === 'right' && 'flex-row-reverse'
                    )}>
                    
                      {c.header}
                      {sorted ?
                    sort!.direction === 'asc' ?
                    <ChevronUpIcon className="h-3 w-3" aria-hidden="true" /> :

                    <ChevronDownIcon className="h-3 w-3" aria-hidden="true" /> :


                    <ChevronsUpDownIcon className="h-3 w-3 opacity-50" aria-hidden="true" />
                    }
                    </button> :

                  c.header
                  }
                </th>);

            })}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 &&
          <tr>
              <td colSpan={columns.length} className="px-3 py-10">
                {empty}
              </td>
            </tr>
          }
          {rows.map((row) => {
            const key = rowKey(row);
            const selected = key === selectedKey;
            return (
              <tr
                key={key}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                aria-selected={onRowClick ? selected : undefined}
                tabIndex={onRowClick ? 0 : undefined}
                onKeyDown={
                onRowClick ?
                (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onRowClick(row);
                  }
                } :
                undefined
                }
                className={cn(
                  'border-b border-[var(--table-divider)] transition-colors duration-100 ease-enter',
                  onRowClick && 'cursor-pointer hover:bg-[var(--table-row-hover)]',
                  selected && 'bg-surface-selected'
                )}>
                
                {columns.map((c) =>
                <td
                  key={c.id}
                  style={{ height: 'var(--row-height)' }}
                  className={cn(
                    'px-3 py-1.5 align-middle text-fg-secondary',
                    c.align === 'right' ? 'text-right tnum' : 'text-left',
                    c.sticky && cn('sticky left-0 z-10 bg-surface', selected && 'bg-surface-selected')
                  )}>
                  
                    {c.cell(row)}
                  </td>
                )}
              </tr>);

          })}
        </tbody>
      </table>
    </div>);

}