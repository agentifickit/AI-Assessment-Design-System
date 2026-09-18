import React from 'react';
import { PageHeader } from '../components/docs/PageHeader';
import { DocSection } from '../components/docs/DocSection';
import { Example } from '../components/docs/Example';
import { DoDont } from '../components/docs/DoDont';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

const decisions = [
{
  t: 'Warm neutrals, not blue-grey',
  d: 'The neutral ramp carries a slight warm cast. Blue-grey plus an accent is the default look of every SaaS dashboard; warm neutral plus signal orange reads as instrumentation, and it keeps hour-long reading sessions from feeling clinical to someone being assessed.'
},
{
  t: 'Borders carry structure, shadows carry elevation',
  d: 'Cards, tables, panels, and timelines separate with 1px hairlines and background steps. A shadow appears only when something genuinely floats: popover, dialog, toast. This is what keeps a dense reviewer screen from looking quilted.'
},
{
  t: 'Scarce accent',
  d: 'Signal orange covers roughly 2% of any screen: the primary action, the focus ring, the active navigation marker, the live-session indicator. Scarcity is what makes it mean “act here”. Accent-coloured text uses orange-700; links use blue-700 so the accent stays rare.'
},
{
  t: 'Three type families, each with a job',
  d: 'Inter for UI and reading. Inter with tabular figures for data, timers, and IDs. JetBrains Mono for prompts, transcript excerpts, and identifiers. Mono is how the interface says “this is a verbatim record” — the reader can always tell quoted evidence from our narration.'
},
{
  t: 'Provenance is structural',
  d: 'AI-authored regions carry a 2px left rule, a tinted surface, and a written attribution row. User messages sit in a bordered inset block; assistant messages sit on the plain canvas. Author survives greyscale, high-contrast mode, and a screen reader.'
}];


export function DirectionPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        eyebrow="System"
        title="Visual direction"
        intro="Operational, precise, and quiet. The reference point is infrastructure tooling: dense, legible, dependable, and confident enough not to decorate. Every decision below is stated once and applied everywhere." />
      

      <DocSection title="Decisions">
        <div className="flex flex-col gap-3">
          {decisions.map((d) =>
          <div key={d.t} className="rounded-md border border-line bg-surface p-4">
              <h3 className="text-13 font-semibold text-fg-primary">{d.t}</h3>
              <p className="mt-1.5 max-w-measure text-13 leading-6 text-fg-secondary">{d.d}</p>
            </div>
          )}
        </div>
      </DocSection>

      <DocSection
        title="Accent budget"
        description="A worked example. In a full application screen the accent appears at most in these four places.">
        
        <Example label="Where orange is allowed" note="Everything else is neutral">
          <div className="flex flex-wrap items-center gap-6">
            <Button variant="primary">Submit for review</Button>
            <span className="flex items-center gap-2 text-13 text-fg-secondary">
              <span className="h-4 w-0.5 rounded-full bg-accent" aria-hidden="true" />
              Active navigation marker
            </span>
            <span className="rounded-sm border-2 border-accent px-2 py-1 text-13 text-fg-secondary">Focus ring</span>
            <Badge tone="accent" dot>
              Session live
            </Badge>
          </div>
        </Example>
      </DocSection>

      <DocSection title="Rejected outright">
        <DoDont
          doTitle="The system's aesthetic"
          dontTitle="Never in this product"
          doText={
          <ul className="list-disc pl-4">
              <li>Solid fills, hairline borders, one accent</li>
              <li>Compact 4–6px corners</li>
              <li>Motion that reports state, under 300ms</li>
              <li>Labels beside every status marker</li>
            </ul>
          }
          dontText={
          <ul className="list-disc pl-4">
              <li>Gradients, glows, glassmorphism, purple as brand</li>
              <li>Avatar-bubble chat, score dials, progress trophies</li>
              <li>Confetti or celebration on submission</li>
              <li>“AI is thinking” shimmer implying visible reasoning</li>
            </ul>
          } />
        
      </DocSection>

      <DocSection
        title="Tone of the two halves"
        description="Candidate and operator surfaces share every token. They differ only in density, measure, and how much is on screen at once.">
        
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-md border border-line bg-surface p-4">
            <p className="text-13 font-semibold text-fg-primary">Candidate surfaces</p>
            <p className="mt-1.5 text-13 leading-6 text-fg-secondary">
              Comfortable density, 44px targets, one primary action per view, 68ch measure, and no more information
              than the current step needs. Everything that could raise anxiety — time, saving, connection — is stated
              plainly and continuously rather than announced at the moment it goes wrong.
            </p>
          </div>
          <div className="rounded-md border border-line bg-surface p-4">
            <p className="text-13 font-semibold text-fg-primary">Operator surfaces</p>
            <p className="mt-1.5 text-13 leading-6 text-fg-secondary">
              Compact density, 28px rows, frozen identity columns, persistent filters, and keyboard navigation through
              long sessions. Density is earned by removing chrome, not by shrinking type.
            </p>
          </div>
        </div>
      </DocSection>
    </div>);

}