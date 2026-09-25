import React from 'react';
import { cn } from '../../utils/cn';
import { AssistantMark } from './AssistantMark';

export interface ResponseStatusProps {
  /** What the assistant is observably doing, in the present tense:
   *  "Responding", "Reading your sheet". Never "Thinking". */
  label?: string;
  /** Whole seconds since the request was sent. Shown from 3 seconds, so a
   *  quick answer never flashes a counter. */
  elapsed?: number;
  className?: string;
}

/** The turn between sending and the first words arriving. A light sweep runs
 *  across the label and the mark turns; under reduced motion both stand still
 *  and the label alone carries the state. It is not a live region: the
 *  thread's StreamAnnouncer says that generation started. DS-24. */
export function ResponseStatus({ label = 'Responding', elapsed, className }: ResponseStatusProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <AssistantMark size="md" working />
      <span className="ai-shimmer text-xs font-medium">{label}</span>
      {elapsed !== undefined && elapsed >= 3 &&
      <span className="text-2xs text-fg-muted tnum">{elapsed}s</span>
      }
    </div>);
}
