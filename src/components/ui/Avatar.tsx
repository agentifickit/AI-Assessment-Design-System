import React from 'react';
import { cn } from '../../utils/cn';

export interface AvatarProps {
  name: string;
  /** 'person' uses initials; 'system' marks non-human actors with a square and a monospace mark. */
  kind?: 'person' | 'system';
  size?: 'sm' | 'md';
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

export function Avatar({ name, kind = 'person', size = 'md', className }: AvatarProps) {
  return (
    <span
      title={name}
      aria-hidden="true"
      className={cn(
        'inline-flex shrink-0 items-center justify-center border font-medium',
        size === 'sm' ? 'h-5 w-5 text-[9px]' : 'h-7 w-7 text-2xs',
        kind === 'person' ?
        'rounded-full border-line bg-surface-subtle text-fg-secondary' :
        'rounded-xs border-ai-border bg-ai-bg font-mono text-ai-fg',
        className
      )}>
      
      {kind === 'person' ? initials(name) : 'AI'}
    </span>);

}