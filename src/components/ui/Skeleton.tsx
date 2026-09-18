import React from 'react';
import { cn } from '../../utils/cn';

export interface SkeletonProps {
  lines?: number;
  className?: string;
  /** Timed candidate surfaces use static placeholders — no shimmer, no pulse. */
  animated?: boolean;
  label?: string;
}

export function Skeleton({ lines = 3, className, animated = true, label = 'Loading' }: SkeletonProps) {
  return (
    <div role="status" aria-live="polite" aria-label={label} className={cn('flex flex-col gap-2', className)}>
      {Array.from({ length: lines }).map((_, i) =>
      <span
        key={i}
        className={cn(
          'block h-2.5 rounded-xs bg-surface-sunken',
          animated && 'animate-pulse',
          i === lines - 1 ? 'w-3/5' : 'w-full'
        )} />

      )}
      <span className="sr-only">{label}</span>
    </div>);

}