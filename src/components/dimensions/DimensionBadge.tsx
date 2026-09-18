import React from 'react';
import { cn } from '../../utils/cn';
import { dimensionMap } from '../../data/dimensions';
import type { DimensionId } from '../../types/framework';

export interface DimensionBadgeProps {
  dimension: DimensionId;
  /** Code only, for dense timeline rows. The full label still reaches AT. */
  codeOnly?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

/** Deliberately monochrome. The four dimensions are identified by a mono code
 *  and a written label in a fixed order — never by a hue. Colour in these
 *  views already means evidence state, and a reader should never have to work
 *  out which axis a colour belongs to. */
export function DimensionBadge({ dimension, codeOnly, size = 'md', className }: DimensionBadgeProps) {
  const spec = dimensionMap[dimension];
  if (!spec) return null;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-xs border border-line bg-surface-subtle align-middle text-fg-secondary',
        size === 'sm' ? 'px-1.5 py-0.5' : 'px-2 py-1',
        className
      )}
      title={`${spec.label} — ${spec.description}`}>
      
      <span className="font-mono text-2xs font-semibold tracking-wide text-fg-primary">{spec.code}</span>
      {codeOnly ?
      <span className="sr-only">{spec.label}</span> :

      <span className="text-2xs font-medium">{spec.label}</span>
      }
    </span>);

}