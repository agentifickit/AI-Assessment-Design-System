import React from 'react';
import { ScreenFrame } from '../../components/docs/ScreenFrame';
import { DimensionBadge } from '../../components/dimensions/DimensionBadge';
import { OpportunityStateBadge } from '../../components/evidence/OpportunityStateBadge';
import { BehaviourRating } from '../../components/evidence/BehaviourRating';
import { EvidenceExcerpt } from '../../components/evidence/EvidenceExcerpt';
import { Alert } from '../../components/ui/Alert';
import { Badge } from '../../components/ui/Badge';
import { dimensionMap, dimensionOrder } from '../../data/dimensions';
import type { DimensionId, OpportunityStateId } from '../../types/framework';
import type { BehaviourBand, EvidenceStateId } from '../../types/system';

interface Cell {
  band: BehaviourBand | null;
  opportunity: OpportunityStateId;
  moments: number;
  excerpt?: {state: EvidenceStateId;quote: string;speaker: string;sourceLabel: string;};
  note?: string;
}

interface CandidateColumn {
  id: string;
  name: string;
  reference: string;
  task: string;
  duration: string;
  cells: Record<DimensionId, Cell>;
}

/** Two candidates took the same simulation; one took a different one. That is
 *  the realistic case, and it is why comparability is a per-dimension property
 *  rather than a property of the whole comparison. */
const candidates: CandidateColumn[] = [
{
  id: 'a',
  name: 'R. Adeyemi',
  reference: 'NW-2291',
  task: 'Campaign positioning',
  duration: '52 min',
  cells: {
    delegation: { band: 'demonstrated', opportunity: 'observed', moments: 3 },
    description: {
      band: null,
      opportunity: 'capture-failed',
      moments: 0,
      note: 'A connection interruption prevented capture during the only context-setting exchange.'
    },
    discernment: {
      band: 'consistently-demonstrated',
      opportunity: 'observed',
      moments: 4,
      excerpt: {
        state: 'positive',
        quote: 'That is the opposite of what the campaign leads on.',
        speaker: 'Candidate',
        sourceLabel: 'Conversation · 13:11'
      }
    },
    diligence: { band: 'consistently-demonstrated', opportunity: 'observed', moments: 5 }
  }
},
{
  id: 'b',
  name: 'T. Lindqvist',
  reference: 'NW-2304',
  task: 'Campaign positioning',
  duration: '68 min',
  cells: {
    delegation: { band: 'consistently-demonstrated', opportunity: 'observed', moments: 5 },
    description: {
      band: 'demonstrated',
      opportunity: 'observed',
      moments: 4,
      excerpt: {
        state: 'positive',
        quote: 'Audience is the VP of Marketing, internal, and she has already seen the campaign draft.',
        speaker: 'Candidate',
        sourceLabel: 'Conversation · 09:14'
      }
    },
    discernment: { band: 'partially-demonstrated', opportunity: 'observed', moments: 2 },
    diligence: { band: 'demonstrated', opportunity: 'observed', moments: 3 }
  }
},
{
  id: 'c',
  name: 'M. Haddad',
  reference: 'NW-2312',
  task: 'Outbound sequence review',
  duration: '61 min',
  cells: {
    delegation: { band: 'demonstrated', opportunity: 'observed', moments: 4 },
    description: { band: 'consistently-demonstrated', opportunity: 'observed', moments: 6 },
    discernment: { band: 'demonstrated', opportunity: 'observed', moments: 3 },
    diligence: {
      band: null,
      opportunity: 'not-assessed',
      moments: 0,
      note: 'The outbound simulation does not present a verification opportunity, so Diligence is out of scope for it.'
    }
  }
}];


function comparableAcross(d: DimensionId): boolean {
  // A dimension is only comparable where every candidate had an observed
  // opportunity AND took the same simulation.
  const tasks = new Set(candidates.map((c) => c.task));
  const allObserved = candidates.every((c) => c.cells[d].opportunity === 'observed');
  return allObserved && tasks.size === 1;
}

export function ComparisonScreen() {
  const comparable = dimensionOrder.filter(comparableAcross);
  const notComparable = dimensionOrder.filter((d) => !comparableAcross(d));

  const renderRow = (d: DimensionId, isComparable: boolean) =>
  <tr key={d} className="border-b border-line-subtle last:border-b-0 align-top">
      <th
      scope="row"
      className="sticky left-0 z-10 w-[220px] min-w-[220px] bg-surface px-3 py-3 text-left">
      
        <DimensionBadge dimension={d} size="sm" />
        <span className="mt-1.5 block text-2xs leading-5 text-fg-secondary">{dimensionMap[d].description}</span>
        {!isComparable &&
      <span className="mt-2 block rounded-xs border border-dashed border-line-strong px-1.5 py-1 text-[10px] leading-4 text-fg-muted">
            Not comparable across these candidates
          </span>
      }
      </th>
      {candidates.map((c) => {
      const cell = c.cells[d];
      return (
        <td key={c.id} className="min-w-[260px] border-l border-line-subtle px-3 py-3">
            {cell.band && cell.opportunity === 'observed' ?
          <>
                <BehaviourRating name={`cmp-${c.id}-${d}`} value={cell.band} readOnly />
                <p className="mt-1.5 text-2xs text-fg-muted tnum">{cell.moments} linked moments</p>
                {cell.excerpt &&
            <EvidenceExcerpt
              className="mt-2.5"
              state={cell.excerpt.state}
              quote={cell.excerpt.quote}
              speaker={cell.excerpt.speaker}
              sourceLabel={cell.excerpt.sourceLabel} />

            }
              </> :

          <div className="flex flex-col gap-1.5">
                <OpportunityStateBadge state={cell.opportunity} size="sm" />
                <p className="text-2xs leading-5 text-fg-secondary">{cell.note}</p>
              </div>
          }
          </td>);

    })}
    </tr>;


  return (
    <ScreenFrame
      title="Candidate comparison"
      audience="Recruiter or hiring manager"
      summary="Dimensions as rows, candidates as columns, with a frozen criterion column. Candidates are compared within a dimension and never summed across them — there is no total row, no ranking, and no recommendation. Dimensions that cannot be fairly compared are separated out rather than quietly included."
      uses={['DimensionBadge', 'BehaviourRating', 'EvidenceExcerpt', 'OpportunityStateBadge']}>
      
      <Alert
        tone="neutral"
        title="Why there is no overall winner here"
        children="Each dimension rests on different evidence, and the candidates did not all face the same opportunities. Combining four independent ratings into a single figure would imply a precision this assessment does not have. Read each row on its own terms." />
      

      <div className="mt-5 overflow-hidden rounded-md border border-line bg-surface">
        <div className="scroll-panel overflow-x-auto">
          <table className="w-full min-w-[62rem] border-collapse">
            <caption className="sr-only">
              Behaviour comparison across three candidates by AI-fluency dimension. No aggregate score is produced.
            </caption>
            <thead>
              <tr className="border-b border-line bg-surface-subtle">
                <th
                  scope="col"
                  className="sticky left-0 z-20 w-[220px] min-w-[220px] bg-surface-subtle px-3 py-2.5 text-left text-2xs font-semibold uppercase tracking-wide text-fg-muted">
                  
                  Dimension
                </th>
                {candidates.map((c) =>
                <th
                  key={c.id}
                  scope="col"
                  className="min-w-[260px] border-l border-line-subtle px-3 py-2.5 text-left">
                  
                    <span className="block text-13 font-semibold text-fg-primary">{c.name}</span>
                    <span className="mt-0.5 block font-mono text-2xs font-normal text-fg-muted">{c.reference}</span>
                    <span className="mt-1.5 flex flex-wrap items-center gap-1.5">
                      <Badge tone="neutral">{c.task}</Badge>
                      <span className="text-2xs font-normal text-fg-muted tnum">{c.duration}</span>
                    </span>
                  </th>
                )}
              </tr>
            </thead>

            <tbody>
              <tr className="border-b border-line bg-surface-sunken">
                <th
                  scope="colgroup"
                  colSpan={candidates.length + 1}
                  className="px-3 py-1.5 text-left text-2xs font-semibold uppercase tracking-wide text-fg-muted">
                  
                  Comparable — same simulation, opportunity observed for every candidate
                </th>
              </tr>
              {comparable.length === 0 ?
              <tr>
                  <td colSpan={candidates.length + 1} className="px-3 py-6 text-13 text-fg-secondary">
                    No dimension is directly comparable across this selection.
                  </td>
                </tr> :

              comparable.map((d) => renderRow(d, true))
              }

              <tr className="border-y border-line bg-surface-sunken">
                <th
                  scope="colgroup"
                  colSpan={candidates.length + 1}
                  className="px-3 py-1.5 text-left text-2xs font-semibold uppercase tracking-wide text-fg-muted">
                  
                  Not comparable — different simulations, or evidence missing for at least one candidate
                </th>
              </tr>
              {notComparable.map((d) => renderRow(d, false))}
            </tbody>
          </table>
        </div>
        <p className="border-t border-line bg-surface-subtle px-3 py-2.5 text-2xs leading-5 text-fg-secondary">
          Missing evidence is shown as missing. It is never scored as zero, averaged away, or treated as a weaker
          result than an observed behaviour.
        </p>
      </div>
    </ScreenFrame>);

}