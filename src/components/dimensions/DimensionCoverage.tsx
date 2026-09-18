import React from 'react';
import { cn } from '../../utils/cn';
import { OpportunityStateBadge } from '../evidence/OpportunityStateBadge';
import { DimensionBadge } from './DimensionBadge';
import { dimensionMap, dimensionOrder } from '../../data/dimensions';
import type { DimensionId, OpportunityStateId } from '../../types/framework';

export interface CoverageEntry {
  dimension: DimensionId;
  opportunities: OpportunityStateId[];
}

export interface DimensionCoverageProps {
  entries: CoverageEntry[];
  className?: string;
}

/** Coverage before conclusions.
 *
 *  A reviewer should be able to see how much of each dimension the session
 *  actually gave them before reading any interpretation — otherwise a thin
 *  evidence base and a rich one look identical. */
export function DimensionCoverage({ entries, className }: DimensionCoverageProps) {
  const byId = new Map(entries.map((e) => [e.dimension, e]));

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {dimensionOrder.map((id) => {
        const spec = dimensionMap[id];
        const entry = byId.get(id);
        const opportunities = entry?.opportunities ?? ['not-assessed'];
        const observed = opportunities.filter((o) => o === 'observed').length;
        const total = opportunities.filter((o) => o !== 'not-assessed').length;

        return (
          <div key={id} className="rounded-md border border-line bg-surface p-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <DimensionBadge dimension={id} size="sm" />
              <span className="text-2xs text-fg-muted tnum">
                {total === 0 ? 'Not assessed' : `${observed} of ${total} opportunities observed`}
              </span>
            </div>
            <p className="mt-1.5 text-2xs leading-5 text-fg-secondary">{spec.description}</p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {opportunities.map((o, i) =>
              <li key={`${o}-${i}`}>
                  <OpportunityStateBadge state={o} size="sm" />
                </li>
              )}
            </ul>
          </div>);

      })}
    </div>);

}