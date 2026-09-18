import React from 'react';
import { cn } from '../../utils/cn';
import { evidenceStateMap } from '../../data/evidenceStates';
import type { EvidenceStateId } from '../../types/system';
import { EvidenceGlyph } from './EvidenceGlyph';

export interface EvidenceStateBadgeProps {
  state: EvidenceStateId;
  /** Hides the written label. Only permitted where a legend is visible in the same view. */
  glyphOnly?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

export function EvidenceStateBadge({ state, glyphOnly, size = 'md', className }: EvidenceStateBadgeProps) {
  const spec = evidenceStateMap[state];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-xs border font-medium whitespace-nowrap',
        size === 'sm' ? 'px-1.5 py-0.5 text-[10px] leading-4' : 'px-2 py-0.5 text-2xs leading-5',
        state === 'unmeasured' && 'hatch-unmeasured',
        className
      )}
      style={{ color: spec.fg, backgroundColor: spec.bg, borderColor: spec.border }}
      title={spec.meaning}>
      
      <EvidenceGlyph state={state} size={size === 'sm' ? 10 : 12} className="shrink-0" />
      {glyphOnly ? <span className="sr-only">{spec.label}</span> : spec.label}
    </span>);

}