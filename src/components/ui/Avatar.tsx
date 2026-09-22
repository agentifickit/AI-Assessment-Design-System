import React from 'react';
import { cn } from '../../utils/cn';

export interface AvatarProps {
  name: string;
  /** 'person' uses initials; 'system' marks non-human actors with a square and a monospace mark. */
  kind?: 'person' | 'system';
  size?: 'sm' | 'md' | 'xs';
  /** People are circles. The rounded square is reserved for Slack authorship so
   *  the source is legible without a label. DS-19, approved 2026-09-22. */
  shape?: 'circle' | 'square';
  className?: string;
}

function initials(name: string): string {
  return name.
  split(' ').
  filter(Boolean).
  slice(0, 2).
  map((p) => p[0]?.toUpperCase()).
  join('');
}

export function Avatar({ name, kind = 'person', size = 'md', shape = 'circle', className }: AvatarProps) {
  return (
    <span
      title={name}
      aria-hidden="true"
      className={cn(
        'inline-flex shrink-0 items-center justify-center border font-medium',
        size === 'xs' ? 'h-4 w-4 text-9 font-semibold' : size === 'sm' ? 'h-5 w-5 text-9' : 'h-7 w-7 text-2xs',
        kind === 'person' ?
        cn(shape === 'square' ? 'rounded-xs' : 'rounded-full', 'border-line bg-surface-subtle text-fg-secondary') :
        'rounded-xs border-ai-border bg-ai-bg font-mono text-ai-fg',
        className
      )}>
      
      {kind === 'person' ? initials(name) : 'AI'}
    </span>);

}