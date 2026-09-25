import React from 'react';
import { cn } from '../../utils/cn';

export type AssistantMarkSize = 'sm' | 'md' | 'lg';

export interface AssistantMarkProps {
  size?: AssistantMarkSize;
  /** Turns slowly while the assistant is responding. Still under reduced motion. */
  working?: boolean;
  className?: string;
}

const tile: Record<AssistantMarkSize, string> = {
  sm: 'h-4 w-4 rounded-xs',
  md: 'h-5 w-5 rounded-sm',
  lg: 'h-8 w-8 rounded-md',
};

const glyph: Record<AssistantMarkSize, number> = { sm: 9, md: 11, lg: 16 };

/** The assistant's identity in a thread: a violet tile with a four-point spark.
 *  Decorative. The written author label next to it carries the meaning, so the
 *  mark never stands alone and never replaces the label. DS-23. */
export function AssistantMark({ size = 'md', working, className }: AssistantMarkProps) {
  const g = glyph[size];
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex shrink-0 items-center justify-center border border-ai-border bg-ai-bg text-ai-fg',
        tile[size],
        className
      )}>
      <svg
        width={g}
        height={g}
        viewBox="0 0 16 16"
        className={cn(working && 'ai-mark-working')}>
        <path
          d="M8 0.5C8.45 4.6 11.4 7.55 15.5 8 11.4 8.45 8.45 11.4 8 15.5 7.55 11.4 4.6 8.45 0.5 8 4.6 7.55 7.55 4.6 8 0.5Z"
          fill="currentColor" />
      </svg>
    </span>);
}
