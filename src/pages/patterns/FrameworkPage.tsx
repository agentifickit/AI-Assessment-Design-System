import React from 'react';
import { PageHeader } from '../../components/docs/PageHeader';
import { DocSection } from '../../components/docs/DocSection';
import { DoDont } from '../../components/docs/DoDont';
import { Example } from '../../components/docs/Example';
import { DimensionBadge } from '../../components/dimensions/DimensionBadge';
import { DimensionProfile } from '../../components/dimensions/DimensionProfile';
import { DimensionCoverage } from '../../components/dimensions/DimensionCoverage';
import { OpportunityStateBadge } from '../../components/evidence/OpportunityStateBadge';
import { Alert } from '../../components/ui/Alert';
import { dimensions } from '../../data/dimensions';
import { opportunityStates } from '../../data/opportunityStates';
import { coverage, dimensionResults } from '../../data/reviewContent';

export function FrameworkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Patterns"
        title="Behavioural framework"
        intro="Four dimensions — Delegation, Description, Discernment, Diligence — and six opportunity states. These are the product's actual subject matter, so they are defined once as data and read by every surface rather than re-described per screen." />
      

      <DocSection
        title="The four dimensions"
        description="Fixed order everywhere: DL, DS, DC, DG. A reader learns the sequence once and can then scan any surface without re-reading the labels.">
        
        <Alert
          tone="neutral"
          title="No dimension owns a colour"
          children="Each dimension is identified by a mono code, a written label, and its fixed position. Colour in these views already means evidence state — giving dimensions hues too would force a reader to work out which axis a colour belongs to." />
        
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {dimensions.map((d) =>
          <div key={d.id} className="rounded-md border border-line bg-surface p-4">
              <DimensionBadge dimension={d.id} />
              <p className="mt-2.5 text-13 leading-6 text-fg-secondary">{d.description}</p>
              <p className="mt-3 text-2xs font-semibold uppercase tracking-wide text-fg-muted">Observable behaviours</p>
              <ul className="mt-1.5 flex list-disc flex-col gap-1 pl-4 text-13 leading-6 text-fg-secondary">
                {d.observables.map((o) =>
              <li key={o}>{o}</li>
              )}
              </ul>
              <p className="mt-3 border-t border-line-subtle pt-2.5 text-2xs leading-5 text-fg-muted">
                When unmeasured: “{d.unmeasuredCopy}”
              </p>
            </div>
          )}
        </div>
      </DocSection>

      <DocSection
        title="Profile presentation"
        description="Four labelled rows, each carrying its band, its supporting moment count, and — where a dimension was not measured — the reason instead of a rating.">
        
        <Example label="DimensionProfile, report and reviewer summary">
          <DimensionProfile results={dimensionResults} />
        </Example>
        <DoDont
          className="mt-4"
          doText="Present the four dimensions as independent rows. State explicitly that they are not combined, because a reader will look for a total."
          dontText="A radar chart. A radar encloses an area, an area reads as a total, and this product deliberately produces no total. Also avoid an average, a percentage, or a five-star scale." />
        
      </DocSection>

      <DocSection
        title="Opportunity states"
        description="A separate vocabulary from the ten evidence states. Evidence states describe what a captured observation is; opportunity states describe whether the assessment ever got a fair chance to observe it. Conflating them is what turns a system failure into an apparent weakness.">
        
        <div className="overflow-hidden rounded-md border border-line bg-surface">
          <table className="w-full border-collapse text-13">
            <caption className="sr-only">The six opportunity states and their meanings</caption>
            <thead>
              <tr className="border-b border-line bg-surface-subtle">
                <th scope="col" className="w-56 px-3 py-2 text-left text-2xs font-semibold uppercase tracking-wide text-fg-muted">State</th>
                <th scope="col" className="px-3 py-2 text-left text-2xs font-semibold uppercase tracking-wide text-fg-muted">Meaning</th>
                <th scope="col" className="w-32 px-3 py-2 text-left text-2xs font-semibold uppercase tracking-wide text-fg-muted">Ratable</th>
              </tr>
            </thead>
            <tbody>
              {opportunityStates.map((s) =>
              <tr key={s.id} className="border-b border-line-subtle last:border-b-0 align-top">
                  <th scope="row" className="px-3 py-2.5 text-left">
                    <OpportunityStateBadge state={s.id} size="sm" />
                  </th>
                  <td className="px-3 py-2.5 leading-6 text-fg-secondary">{s.meaning}</td>
                  <td className="px-3 py-2.5 text-2xs text-fg-secondary">
                    {s.supportsFinding ? 'Yes — supports a finding' : 'No'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Alert
          className="mt-4"
          tone="warning"
          title="Missing or invalid evidence is never negative performance"
          children="Behaviour not observed, invalid opportunity, evidence capture failed, and not assessed can never be rendered inside a rating control. The reviewer workspace enforces this at the component level: where a dimension has no observed opportunity, the rating control is replaced by a limitation." />
        
      </DocSection>

      <DocSection
        title="Coverage before conclusions"
        description="A reviewer sees how much of each dimension the session actually gave them before reading any interpretation — otherwise a thin evidence base and a rich one look identical.">
        
        <Example label="DimensionCoverage, reviewer evaluation panel">
          <div className="max-w-md">
            <DimensionCoverage entries={coverage} />
          </div>
        </Example>
      </DocSection>

      <DocSection title="Where each surface uses this">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
          { t: 'Evidence timeline', d: 'Every moment is tagged with its dimension code and the rail is filterable by dimension. The code sits beside the timestamp, never as a coloured row treatment.' },
          { t: 'Reviewer workspace', d: 'Evidence groups under dimension headings with a per-dimension coverage count. Ratings appear only where an opportunity was observed.' },
          { t: 'Report', d: 'The four-row profile, then findings tagged by dimension, then follow-up questions attributed to the dimension that prompted them.' },
          { t: 'Comparison', d: 'Dimensions as rows so candidates are compared within a dimension. Comparable and non-comparable dimensions are separated into labelled groups.' }].
          map((x) =>
          <div key={x.t} className="rounded-md border border-line bg-surface p-3.5">
              <p className="text-13 font-semibold text-fg-primary">{x.t}</p>
              <p className="mt-1 text-13 leading-6 text-fg-secondary">{x.d}</p>
            </div>
          )}
        </div>
      </DocSection>
    </>);

}