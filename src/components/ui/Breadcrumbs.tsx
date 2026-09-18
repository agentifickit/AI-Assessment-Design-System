import React from 'react';
import { ChevronRightIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface Crumb {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: Crumb[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('min-w-0', className)}>
      <ol className="flex min-w-0 items-center gap-1.5 text-xs">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.label} className="flex min-w-0 items-center gap-1.5">
              {last || !c.href ?
              <span
                aria-current={last ? 'page' : undefined}
                className={cn('truncate', last ? 'text-fg-primary' : 'text-fg-muted')}>
                
                  {c.label}
                </span> :

              <a
                href={c.href}
                className="truncate text-fg-muted transition-colors duration-100 ease-enter hover:text-fg-primary hover:underline">
                
                  {c.label}
                </a>
              }
              {!last && <ChevronRightIcon className="h-3 w-3 shrink-0 text-fg-disabled" aria-hidden="true" />}
            </li>);

        })}
      </ol>
    </nav>);

}