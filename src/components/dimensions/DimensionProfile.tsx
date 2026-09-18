import React from 'react';
import { cn } from '../../utils/cn';
import { behaviourBands } from '../evidence/BehaviourRating';
import { OpportunityStateBadge } from '../evidence/OpportunityStateBadge';
import { dimensionMap, dimensionOrder } from '../../data/dimensions';
import { opportunityStateMap } from '../../data/opportunityStates';
import type { DimensionResult } from '../../types/framework';

export interface DimensionProfileProps {
  results: DimensionResult[];
  className?: string;
}

/** Four labelled rows — not a radar chart.
 *
 *  A radar encloses an area, and an enclosed area reads as a total. This
 *  product does not produce a total, so the profile is presented as four
 *  independent rows that cannot be visually summed. */
export function DimensionProfile({ results, className }: DimensionProfileProps) {
  const byId = new Map(results.map((r) => [r.dimension, r]));

  return (
    <div className={cn('overflow-hidden rounded-md border border-line bg-surface', className)}>
      <table className="w-full border-collapse">
        <caption className="sr-only">
          Behaviour profile across the four AI-fluency dimensions. Each dimension is rated independently; no overall
          score is produced.
        </caption>
        <thead>
          <tr className="border-b border-line bg-surface-subtle">
            <th scope="col" className="w-[38%] px-3 py-2 text-left text-2xs font-semibold uppercase tracking-wide text-fg-muted">
              Dimension
            </th>
            <th scope="col" className="px-3 py-2 text-left text-2xs font-semibold uppercase tracking-wide text-fg-muted">
              Rating
            </th>
            <th scope="col" className="w-28 px-3 py-2 text-right text-2xs font-semibold uppercase tracking-wide text-fg-muted">
              Moments
            </th>
          </tr>
        </thead>
        <tbody>
          {dimensionOrder.map((id) => {
            const spec = dimensionMap[id];
            const result = byId.get(id);
            const band = behaviourBands.find((b) => b.id === result?.band);
            const opportunity = result ? opportunityStateMap[result.opportunity] : undefined;
            const measured = Boolean(band) && result?.opportunity === 'observed';

            return (
              <tr key={id} className="border-b border-line-subtle last:border-b-0">
                <th scope="row" className="px-3 py-3 text-left align-top">
                  <span className="flex items-baseline gap-2">
                    <span className="font-mono text-2xs font-semibold text-fg-muted">{spec.code}</span>
                    <span className="text-13 font-semibold text-fg-primary">{spec.label}</span>
                  </span>
                  <span className="mt-1 block max-w-measure-tight text-2xs leading-5 text-fg-secondary">
                    {spec.description}
                  </span>
                </th>

                <td className="px-3 py-3 align-top">
                  {measured ?
                  <>
                      <div className="flex items-center gap-1" aria-hidden="true">
                        {behaviourBands.map((b) =>
                      <span
                        key={b.id}
                        className={cn(
                          'h-1.5 w-9 rounded-[1px] border',
                          b.id === result?.band ?
                          'border-fg-primary bg-fg-primary' :
                          'border-line bg-transparent'
                        )} />

                      )}
                      </div>
                      <span className="mt-1.5 block text-13 font-medium text-fg-primary">{band?.label}</span>
                    </> :

                  <div className="flex flex-col items-start gap-1.5">
                      {result && <OpportunityStateBadge state={result.opportunity} size="sm" />}
                      <span className="block max-w-measure-tight text-2xs leading-5 text-fg-secondary">
                        {result?.limitation ?? opportunity?.meaning ?? spec.unmeasuredCopy}
                      </span>
                    </div>
                  }
                </td>

                <td className="px-3 py-3 text-right align-top">
                  {measured ?
                  <span className="text-13 font-medium text-fg-primary tnum">{result?.momentCount ?? 0}</span> :

                  <span className="text-2xs text-fg-muted">—</span>
                  }
                  <span className="mt-0.5 block text-2xs text-fg-muted">
                    {measured ? 'linked' : 'not rated'}
                  </span>
                </td>
              </tr>);

          })}
        </tbody>
      </table>
      <p className="border-t border-line bg-surface-subtle px-3 py-2 text-2xs leading-5 text-fg-secondary">
        Each dimension is rated on its own evidence. The four ratings are not combined, weighted, or averaged — there
        is no overall score for this assessment.
      </p>
    </div>);

}