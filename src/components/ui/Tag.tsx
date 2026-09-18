import React from 'react';
import { XIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface TagProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  onRemove?: () => void;
  /** Accessible name for the remove control, e.g. "Remove Brand guidelines.pdf". */
  removeLabel?: string;
  mono?: boolean;
  className?: string;
}

/** Low-emphasis, removable descriptor. Square-ish corners on purpose — full pills read consumer. */
export function Tag({ children, icon, onRemove, removeLabel, mono, className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex max-w-full items-center gap-1.5 rounded-xs border border-line bg-surface-subtle px-1.5 py-0.5 text-2xs text-fg-secondary',
        mono && 'font-mono',
        className
      )}>
      
      {icon}
      <span className="truncate">{children}</span>
      {onRemove &&
      <button
        type="button"
        onClick={onRemove}
        aria-label={removeLabel ?? 'Remove'}
        className="-mr-0.5 rounded-xs p-0.5 text-fg-muted transition-colors duration-100 ease-enter hover:bg-surface-active hover:text-fg-primary">
        
          <XIcon className="h-3 w-3" aria-hidden="true" />
        </button>
      }
    </span>);

}