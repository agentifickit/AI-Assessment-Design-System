import React from 'react';
import { PageHeader } from '../../components/docs/PageHeader';
import { DocSection } from '../../components/docs/DocSection';
import { Example } from '../../components/docs/Example';
import { spacingScale } from '../../data/tokens';
import { useSystem } from '../../contexts/SystemContext';

const densityRows = [
{ mode: 'Compact', row: '28px', control: '28px', card: '12px', msg: '12px', use: 'Reviewer queue, evidence timeline, audit log' },
{ mode: 'Default', row: '36px', control: '32px', card: '16px', msg: '20px', use: 'Administration, reports, comparison' },
{ mode: 'Comfortable', row: '44px', control: '40px', card: '20px', msg: '24px', use: 'Every candidate-facing surface' }];


export function SpacingPage() {
  const { density } = useSystem();

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        eyebrow="Foundations"
        title="Spacing & density"
        intro="One 4px base and one scale serve both halves of the product. A dense reviewer table and a calm candidate screen are the same logic at different density settings — not two different systems."
        aside={
        <span className="rounded-sm border border-line bg-surface px-2.5 py-1.5 text-2xs text-fg-secondary">
            Current mode: <span className="font-medium text-fg-primary">{density}</span>
          </span>
        } />
      

      <DocSection title="Scale">
        <div className="scroll-panel overflow-x-auto rounded-md border border-line">
          <table className="w-full border-collapse text-13">
            <caption className="sr-only">Spacing scale</caption>
            <thead>
              <tr className="border-b border-line bg-surface-subtle">
                <th scope="col" className="px-3 py-2 text-left text-2xs font-semibold uppercase tracking-wide text-fg-muted">Token</th>
                <th scope="col" className="px-3 py-2 text-left text-2xs font-semibold uppercase tracking-wide text-fg-muted">Value</th>
                <th scope="col" className="w-40 px-3 py-2 text-left text-2xs font-semibold uppercase tracking-wide text-fg-muted">Scale</th>
                <th scope="col" className="px-3 py-2 text-left text-2xs font-semibold uppercase tracking-wide text-fg-muted">Used for</th>
              </tr>
            </thead>
            <tbody>
              {spacingScale.map((s) =>
              <tr key={s.token} className="border-b border-line-subtle last:border-b-0">
                  <td className="whitespace-nowrap px-3 py-1.5 font-mono text-xs text-fg-primary">{s.token}</td>
                  <td className="whitespace-nowrap px-3 py-1.5 font-mono text-xs text-fg-muted tnum">{s.value}</td>
                  <td className="px-3 py-1.5">
                    <span className="block h-2 rounded-[1px] bg-accent" style={{ width: s.value }} aria-hidden="true" />
                  </td>
                  <td className="px-3 py-1.5 text-13 text-fg-secondary">{s.use}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocSection
        title="Density modes"
        description="One data attribute on the application shell drives row height, control height, card padding, and message spacing. Nothing changes size — type stays at its authored value in all three modes.">
        
        <div className="scroll-panel overflow-x-auto rounded-md border border-line">
          <table className="w-full border-collapse text-13">
            <caption className="sr-only">Density modes</caption>
            <thead>
              <tr className="border-b border-line bg-surface-subtle">
                {['Mode', 'Row', 'Control', 'Card padding', 'Message gap', 'Applied to'].map((h) =>
                <th key={h} scope="col" className="px-3 py-2 text-left text-2xs font-semibold uppercase tracking-wide text-fg-muted">
                    {h}
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {densityRows.map((d) =>
              <tr key={d.mode} className="border-b border-line-subtle last:border-b-0">
                  <td className="px-3 py-2 font-medium text-fg-primary">{d.mode}</td>
                  <td className="px-3 py-2 font-mono text-xs text-fg-secondary tnum">{d.row}</td>
                  <td className="px-3 py-2 font-mono text-xs text-fg-secondary tnum">{d.control}</td>
                  <td className="px-3 py-2 font-mono text-xs text-fg-secondary tnum">{d.card}</td>
                  <td className="px-3 py-2 font-mono text-xs text-fg-secondary tnum">{d.msg}</td>
                  <td className="px-3 py-2 text-fg-secondary">{d.use}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Example label="Live" note="Switch density in the header to see rows change" className="mt-3">
          <div className="rounded-md border border-line bg-surface">
            {['Priya Raman', 'Tomas Andersen', 'Lucia Ferreira'].map((n) =>
            <div
              key={n}
              className="flex items-center justify-between border-b border-line-subtle px-3 last:border-b-0"
              style={{ height: 'var(--row-height)' }}>
              
                <span className="text-13 text-fg-primary">{n}</span>
                <span className="text-2xs text-fg-muted tnum">42m 09s</span>
              </div>
            )}
          </div>
        </Example>
      </DocSection>

      <DocSection title="Rules that do not bend">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
          { t: 'Touch targets', d: 'Candidate surfaces never go below 44×44. Operator surfaces may use 32×32 controls, but only with 8px of hit-slop so the pointer target still clears 40px.' },
          { t: 'Page gutters', d: '16px below 768px, 24px to 1280px, 32px above. The three-panel workspace uses 12px inter-panel gaps instead of gutters.' },
          { t: 'Section gaps', d: '24px between related blocks, 40px between report sections. Never more than 80px of vertical space anywhere.' },
          { t: 'Form density', d: 'Field gap follows the density mode. Label-to-control is always 6px, control-to-help is always 6px, regardless of mode.' }].
          map((r) =>
          <div key={r.t} className="rounded-md border border-line bg-surface p-3">
              <p className="text-13 font-semibold text-fg-primary">{r.t}</p>
              <p className="mt-1 text-13 leading-6 text-fg-secondary">{r.d}</p>
            </div>
          )}
        </div>
      </DocSection>
    </div>);

}