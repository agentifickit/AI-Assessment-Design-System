import React from 'react';
import { PageHeader } from '../../components/docs/PageHeader';
import { DocSection } from '../../components/docs/DocSection';
import { Example } from '../../components/docs/Example';
import { DoDont } from '../../components/docs/DoDont';

const styles = [
{ name: 'display', spec: '36 / 44 · 600 · -0.02em', sample: 'Assessment complete', cls: 'text-4xl font-semibold tracking-[-0.02em]' },
{ name: 'heading-1', spec: '24 / 32 · 600 · -0.01em', sample: 'Candidate evidence report', cls: 'text-2xl font-semibold tracking-[-0.01em]' },
{ name: 'heading-2', spec: '18 / 28 · 600', sample: 'Challenges and improves AI output', cls: 'text-lg font-semibold' },
{ name: 'heading-3', spec: '16 / 26 · 600', sample: 'Behaviour 3 of 5', cls: 'text-base font-semibold' },
{ name: 'heading-4', spec: '13 / 20 · 600', sample: 'Reviewer notes', cls: 'text-13 font-semibold' },
{ name: 'body-lg', spec: '16 / 26 · 400', sample: 'The candidate asked the assistant to justify its pricing claim before using it.', cls: 'text-base' },
{ name: 'body-base', spec: '14 / 20 · 400', sample: 'The candidate asked the assistant to justify its pricing claim before using it.', cls: 'text-sm' },
{ name: 'body-sm', spec: '13 / 20 · 400', sample: 'The candidate asked the assistant to justify its pricing claim before using it.', cls: 'text-13' },
{ name: 'label', spec: '12 / 16 · 500', sample: 'Assessment window', cls: 'text-xs font-medium' },
{ name: 'label-sm', spec: '11 / 16 · 500 · 0.02em', sample: 'EVIDENCE COMPLETENESS', cls: 'text-2xs font-medium tracking-wide' },
{ name: 'caption', spec: '11 / 16 · 400', sample: 'Captured 14:02:11 · event 4a91', cls: 'text-2xs' },
{ name: 'code', spec: '12 / 20 · mono 400', sample: 'draft_v3 · sha 8f21c0', cls: 'font-mono text-xs' },
{ name: 'data', spec: '13 / 20 · 500 · tabular', sample: '1,284 · 42m 09s · 3 of 5', cls: 'text-13 font-medium tnum' },
{ name: 'data-lg', spec: '24 / 32 · 600 · tabular', sample: '18 / 24', cls: 'text-2xl font-semibold tnum' }];


export function TypographyPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        eyebrow="Foundations"
        title="Typography"
        intro="Three families with three jobs. Inter reads the interface, Inter with tabular figures holds numbers still, and JetBrains Mono marks anything quoted verbatim from a session. A reader can always tell the record from our narration." />
      

      <DocSection title="Families">
        <div className="grid gap-3 md:grid-cols-3">
          {[
          {
            n: 'Inter',
            r: 'UI and reading',
            s: 'Aa Bb Cc 0123',
            cls: 'font-sans',
            d: "Fallback: -apple-system, 'Segoe UI', Roboto, Helvetica, Arial."
          },
          {
            n: 'Inter · tabular',
            r: 'Data, timers, IDs',
            s: '0123456789',
            cls: 'font-sans tnum',
            d: 'font-variant-numeric: tabular-nums. Every column of figures, every countdown.'
          },
          {
            n: 'JetBrains Mono',
            r: 'Verbatim record',
            s: 'Aa Bb Cc 0123',
            cls: 'font-mono',
            d: 'Prompts, transcript excerpts, event IDs, hashes. Fallback: ui-monospace, SFMono-Regular, Menlo.'
          }].
          map((f) =>
          <div key={f.n} className="rounded-md border border-line bg-surface p-4">
              <p className={`${f.cls} text-2xl text-fg-primary`}>{f.s}</p>
              <p className="mt-3 text-13 font-semibold text-fg-primary">{f.n}</p>
              <p className="text-2xs text-fg-muted">{f.r}</p>
              <p className="mt-2 text-13 leading-6 text-fg-secondary">{f.d}</p>
            </div>
          )}
        </div>
      </DocSection>

      <DocSection
        title="Named styles"
        description="Fourteen styles fix size, line height, weight, and letter spacing. No component invents its own; if a style is missing, the answer is to extend this table, not to inline a value.">
        
        <div className="scroll-panel overflow-x-auto rounded-md border border-line">
          <table className="w-full border-collapse">
            <caption className="sr-only">Named type styles</caption>
            <thead>
              <tr className="border-b border-line bg-surface-subtle">
                <th scope="col" className="w-32 px-3 py-2 text-left text-2xs font-semibold uppercase tracking-wide text-fg-muted">
                  Style
                </th>
                <th scope="col" className="w-48 px-3 py-2 text-left text-2xs font-semibold uppercase tracking-wide text-fg-muted">
                  Size / line / weight
                </th>
                <th scope="col" className="px-3 py-2 text-left text-2xs font-semibold uppercase tracking-wide text-fg-muted">
                  Specimen
                </th>
              </tr>
            </thead>
            <tbody>
              {styles.map((s) =>
              <tr key={s.name} className="border-b border-line-subtle last:border-b-0">
                  <td className="whitespace-nowrap px-3 py-2.5 align-middle font-mono text-xs text-fg-primary">{s.name}</td>
                  <td className="whitespace-nowrap px-3 py-2.5 align-middle font-mono text-xs text-fg-muted">{s.spec}</td>
                  <td className={`px-3 py-2.5 align-middle text-fg-primary ${s.cls}`}>{s.sample}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocSection
        title="Scale"
        description="11 / 12 / 13 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 48. 13px is the dense-UI default; 14px is the candidate default; 16px at 1.65 is the reading size for conversations and reports. Nothing sits below 11px, and 11px is only for tabular metadata.">
        
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-3 rounded-md border border-line bg-surface p-4">
          {[11, 12, 13, 14, 16, 18, 20, 24, 30, 36, 48].map((n) =>
          <span key={n} className="text-fg-primary" style={{ fontSize: `${n}px`, lineHeight: 1.2 }}>
              {n}
            </span>
          )}
        </div>
      </DocSection>

      <DocSection
        title="Measure"
        description="Conversation and report prose caps at 68ch. Reviewer annotations cap at 60ch. Table cells are uncapped but truncate with the full value available on hover and focus.">
        
        <Example label="68ch — conversation and report prose">
          <p className="max-w-measure text-base leading-[1.65] text-fg-secondary">
            The candidate asked the assistant to name the source for its claim about mid-market churn, then rejected
            the first two answers because neither cited the account data supplied in the brief. This is the behaviour
            the assessment is looking for: verification before use, in the candidate's own words.
          </p>
        </Example>
      </DocSection>

      <DocSection title="Numbers">
        <DoDont
          doText={
          <>
              Tabular figures everywhere a number can change or align:{' '}
              <span className="tnum font-medium">42m 09s</span>,{' '}
              <span className="tnum font-medium">1,284</span>, <span className="tnum font-medium">3 of 5</span>. Columns
              stay still while a timer counts down.
            </>
          }
          dontText={
          <>
              Proportional figures in a timer or a table column: <span className="font-medium">42m 09s</span> shifts
              horizontally on every tick, which reads as instability during a timed assessment.
            </>
          } />
        
      </DocSection>

      <DocSection
        title="Responsive behaviour"
        description="Type sizes are fixed, not fluid. Fluid type breaks the tabular alignment reviewers depend on and makes 200% zoom unpredictable. Only display and heading-1 drop one rung below 768px.">
        
        <p className="max-w-measure text-13 leading-6 text-fg-secondary">
          At 200% zoom every style remains at its authored size and the layout reflows instead — panels stack, the
          three-panel workspace becomes tabbed, and no horizontal scrolling is introduced below 320px CSS pixels.
        </p>
      </DocSection>
    </div>);

}