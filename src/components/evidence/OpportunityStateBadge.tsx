import React from 'react';
import { cn } from '../../utils/cn';
import { OpportunityGlyph } from './OpportunityGlyph';
import { opportunityStateMap } from '../../data/opportunityStates';
import type { OpportunityStateId } from '../../types/framework';

export interface OpportunityStateBadgeProps {
  state: OpportunityStateId;
  size?: 'sm' | 'md';
  /** Glyph-only form for dense grids. The label still reaches screen readers. */
  glyphOnly?: boolean;
  className?: string;
}

/** Glyph + written label + hue, in that order of importance. The hue only
 *  helps a reader re-find a state they already know; the glyph and the words
 *  carry the meaning. */
export function OpportunityStateBadge({
  state,
  size = 'md',
  glyphOnly,
  className
}: OpportunityStateBadgeProps) {
  const spec = opportunityStateMap[state];
  if (!spec) return null;

  return (
    <span
      className={cn(
        'inline-flex max-w-full items-center gap-1.5 rounded-xs border align-middle',
        size === 'sm' ? 'px-1.5 py-0.5' : 'px-2 py-1',
        glyphOnly && 'px-1 py-1',
        className
      )}
      style={{ color: spec.fg, backgroundColor: spec.bg, borderColor: spec.border }}
      title={spec.meaning}>
      
      <OpportunityGlyph state={state} size={size === 'sm' ? 10 : 12} className="shrink-0" />
      {glyphOnly ?
      <span className="sr-only">{spec.label}</span> :

      <span className="truncate text-2xs font-medium">{spec.label}</span>
      }
    </span>);

}