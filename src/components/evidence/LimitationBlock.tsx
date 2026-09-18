import React from 'react';
import { cn } from '../../utils/cn';
import type { EvidenceStateId } from '../../types/system';
import { EvidenceStateBadge } from './EvidenceStateBadge';

export interface LimitationBlockProps {
  state: Extract<EvidenceStateId, 'incomplete' | 'invalid' | 'unmeasured'>;
  title: string;
  reason: string;
  /** What this limitation must not be read as. Stated explicitly, every time. */
  doesNotImply: string;
  className?: string;
}

/** Layer 5 of the evidence model. Same visual weight as a finding so it cannot be skimmed past. */
export function LimitationBlock({ state, title, reason, doesNotImply, className }: LimitationBlockProps) {
  return (
    <div className={cn('rounded-md border border-dashed border-line-strong bg-transparent p-3', className)}>
      <div className="flex flex-wrap items-center gap-2">
        <EvidenceStateBadge state={state} size="sm" />
        <h4 className="text-13 font-semibold text-fg-primary">{title}</h4>
      </div>
      <p className="mt-1.5 max-w-measure text-13 leading-6 text-fg-secondary">{reason}</p>
      <p className="mt-1.5 max-w-measure border-t border-line-subtle pt-1.5 text-xs leading-5 text-fg-muted">
        <span className="font-medium text-fg-secondary">This does not indicate:</span> {doesNotImply}
      </p>
    </div>);

}