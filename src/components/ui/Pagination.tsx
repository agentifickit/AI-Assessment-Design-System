import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Button } from './Button';

export interface PaginationProps {
  page: number;
  pageCount: number;
  totalLabel: string;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({ page, pageCount, totalLabel, onPageChange, className }: PaginationProps) {
  return (
    <nav
      aria-label="Pagination"
      className={cn('flex flex-wrap items-center justify-between gap-3 border-t border-line px-3 py-2', className)}>
      
      <p className="text-2xs text-fg-muted tnum">{totalLabel}</p>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          iconLeft={<ChevronLeftIcon className="h-3.5 w-3.5" aria-hidden="true" />}>
          
          Previous
        </Button>
        <span className="text-2xs text-fg-secondary tnum" aria-live="polite">
          Page {page} of {pageCount}
        </span>
        <Button
          size="sm"
          disabled={page >= pageCount}
          onClick={() => onPageChange(page + 1)}
          iconRight={<ChevronRightIcon className="h-3.5 w-3.5" aria-hidden="true" />}>
          
          Next
        </Button>
      </div>
    </nav>);

}