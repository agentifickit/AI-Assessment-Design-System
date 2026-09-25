import React from 'react';
import { cn } from '../../utils/cn';

export interface StateLabelProps {
  /** A 12px glyph that names the state with the words, e.g. a lock for "Read only". */
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

/** A page's standing state, said quietly: 11px muted text beside a 12px glyph,
 *  on the right of the page header next to the page's actions. No border, no
 *  fill, no radius. A state the reader cannot act on is information, not a
 *  status to scan for, so it is not a Badge. Badges stay for statuses in lists
 *  and tables, at `--radius-xs` 3px, never a pill. DS-38, from the workspace
 *  review of 2026-09-26 ("Read only" had been a pill). */
export function StateLabel({ icon, children, className }: StateLabelProps) {
  return (
    <span className={cn('inline-flex items-center gap-1 whitespace-nowrap text-2xs text-fg-muted', className)}>
      {icon}
      {children}
    </span>);

}
