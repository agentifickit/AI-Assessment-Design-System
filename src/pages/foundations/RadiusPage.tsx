import React from 'react';
import { PageHeader } from '../../components/docs/PageHeader';
import { DocSection } from '../../components/docs/DocSection';
import { Example } from '../../components/docs/Example';
import { DoDont } from '../../components/docs/DoDont';
import { radiusScale } from '../../data/tokens';

export function RadiusPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        eyebrow="Foundations"
        title="Radius"
        intro="Compact corners. 4px on controls, 6px on panels, 10px reserved for dialogs. Softer corners would read as a consumer assistant; square corners would read as a spreadsheet. This sits deliberately between the two." />
      

      <DocSection title="Scale">
        <div className="mb-4 flex flex-wrap gap-3">
          {radiusScale.map((r) =>
          <div key={r.token} className="flex flex-col items-center gap-1.5">
              <div
              className="h-14 w-14 border border-line bg-surface"
              style={{ borderRadius: r.value }}
              aria-hidden="true" />
            
              <span className="font-mono text-2xs text-fg-muted tnum">{r.value}</span>
            </div>
          )}
        </div>
        <div className="scroll-panel overflow-x-auto rounded-md border border-line">
          <table className="w-full border-collapse text-13">
            <caption className="sr-only">Radius scale</caption>
            <thead>
              <tr className="border-b border-line bg-surface-subtle">
                {['Token', 'Value', 'Applied to'].map((h) =>
                <th key={h} scope="col" className="px-3 py-2 text-left text-2xs font-semibold uppercase tracking-wide text-fg-muted">
                    {h}
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {radiusScale.map((r) =>
              <tr key={r.token} className="border-b border-line-subtle last:border-b-0">
                  <td className="whitespace-nowrap px-3 py-2 font-mono text-xs text-fg-primary">{r.token}</td>
                  <td className="whitespace-nowrap px-3 py-2 font-mono text-xs text-fg-muted tnum">{r.value}</td>
                  <td className="px-3 py-2 text-fg-secondary">{r.use}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocSection
        title="Nesting rule"
        description="A child's radius equals the parent's radius minus the padding between them, floored at 3px. Without this rule a nested surface either looks pinched at the corners or floats loose inside its container.">
        
        <Example label="6px card, 12px padding, 3px child">
          <div className="rounded-md border border-line bg-surface p-3">
            <div className="rounded-xs border border-line bg-surface-subtle p-3 text-13 text-fg-secondary">
              6 − 12 = −6 → floored to 3px
            </div>
          </div>
        </Example>
      </DocSection>

      <DocSection title="Where radius is not used">
        <DoDont
          doText={
          <ul className="list-disc pl-4">
              <li>Status badges and tags at 3px — square enough to read as metadata</li>
              <li>Table cells and full-bleed panel edges at 0</li>
              <li>Avatars and progress tracks at full</li>
            </ul>
          }
          dontText={
          <ul className="list-disc pl-4">
              <li>Fully rounded pill buttons — they read as consumer chat UI</li>
              <li>12px+ corners on cards, which soften a dense screen into mush</li>
              <li>Mixing 4px and 8px controls in the same row</li>
            </ul>
          } />
        
      </DocSection>
    </div>);

}