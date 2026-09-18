import React, { useId, useState } from 'react';
import { cn } from '../../utils/cn';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  side?: 'top' | 'bottom';
  className?: string;
}

/** Hover and focus both open it. Content is supplementary — never the only place a value appears. */
export function Tooltip({ content, children, side = 'top', className }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}>
      
      {React.cloneElement(children, { 'aria-describedby': open ? id : undefined })}
      {open &&
      <span
        role="tooltip"
        id={id}
        className={cn(
          'pointer-events-none absolute left-1/2 z-50 w-max max-w-[18rem] -translate-x-1/2 rounded-lg border border-line bg-surface-raised px-2 py-1.5 text-2xs text-fg-secondary shadow-popover',
          side === 'top' ? 'bottom-full mb-1.5' : 'top-full mt-1.5',
          className
        )}>
        
          {content}
        </span>
      }
    </span>);

}