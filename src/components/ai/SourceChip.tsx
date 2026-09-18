import React from 'react';
import { FileTextIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface SourceChipProps {
  index: number;
  title: string;
  locator?: string;
  onOpen?: () => void;
  className?: string;
}

/** Numbered citation. The number is the durable reference used in reports and exports. */
export function SourceChip({ index, title, locator, onOpen, className }: SourceChipProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        'inline-flex max-w-full items-center gap-1.5 rounded-xs border border-line bg-surface px-1.5 py-0.5 text-2xs text-fg-secondary',
        'transition-colors duration-100 ease-enter hover:bg-surface-hover hover:text-fg-primary',
        className
      )}>
      
      <span className="inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[2px] border border-line-strong text-[9px] font-semibold tnum">
        {index}
      </span>
      <FileTextIcon className="h-3 w-3 shrink-0 text-fg-muted" aria-hidden="true" />
      <span className="truncate">{title}</span>
      {locator && <span className="shrink-0 text-fg-muted tnum">{locator}</span>}
    </button>);

}