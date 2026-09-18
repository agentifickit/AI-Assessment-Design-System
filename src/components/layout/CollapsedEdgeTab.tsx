import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface CollapsedEdgeTabProps {
  label: string;
  onExpand: () => void;
  side: 'left' | 'right';
}

/** A collapsed panel becomes a 32px labelled edge tab, never a zero-width
 *  sliver — a reader must always be able to see that something is there and
 *  what expanding it will reveal. */
export function CollapsedEdgeTab({ label, onExpand, side }: CollapsedEdgeTabProps) {
  const Chevron = side === 'left' ? ChevronRightIcon : ChevronLeftIcon;
  return (
    <button
      type="button"
      onClick={onExpand}
      aria-expanded={false}
      className={cn(
        'group flex w-8 shrink-0 flex-col items-center gap-2 border border-line bg-surface-subtle py-2',
        'transition-colors duration-100 ease-enter hover:bg-surface-hover'
      )}>
      
      <Chevron className="h-3.5 w-3.5 shrink-0 text-fg-muted" aria-hidden="true" />
      <span
        className="whitespace-nowrap text-2xs font-semibold uppercase tracking-wide text-fg-secondary"
        style={{ writingMode: 'vertical-rl' }}>
        
        {label}
      </span>
      <span className="sr-only">Expand {label.toLowerCase()}</span>
    </button>);

}