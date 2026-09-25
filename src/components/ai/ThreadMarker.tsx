import React from 'react';
import { cn } from '../../utils/cn';

export interface ThreadMarkerProps {
  /** Two or three words: "Unit 1", "This unit", "Yesterday". */
  children: React.ReactNode;
  className?: string;
}

/** Marks where a message thread's context changes: turns carried from an
 *  earlier unit sit under "Unit 1", this unit's under "This unit". 11px muted
 *  text centred between two hairlines. It marks a boundary in the reading
 *  order; it is not a heading, and it never takes the accent. DS-42, from the
 *  workspace review of 2026-09-26. */
export function ThreadMarker({ children, className }: ThreadMarkerProps) {
  return (
    <p className={cn('flex items-center gap-2 py-1 text-2xs text-fg-muted', className)}>
      <span aria-hidden="true" className="h-px flex-1 bg-line-subtle" />
      {children}
      <span aria-hidden="true" className="h-px flex-1 bg-line-subtle" />
    </p>);

}
