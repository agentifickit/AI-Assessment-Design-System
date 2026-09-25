import React from 'react';
import { PageHeader } from '../components/docs/PageHeader';
import { DocSection } from '../components/docs/DocSection';
import { DoDont } from '../components/docs/DoDont';
import { principles } from '../data/principles';

export function PrinciplesPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        eyebrow="System"
        title="Design principles"
        intro="Six principles, each stated with the UI consequence it forces. A principle that does not change what gets built is decoration, so every one here ends in a rule you can hold a screen against." />
      

      <ol className="mb-10 flex flex-col gap-4">
        {principles.map((p) =>
        <li key={p.number} className="rounded-md border border-line bg-surface p-4">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-13 text-fg-muted tnum">{p.number}</span>
              <h2 className="text-sm font-semibold text-fg-primary">{p.title}</h2>
            </div>
            <p className="mt-2 max-w-measure text-13 leading-6 text-fg-secondary">{p.body}</p>
            <p className="mt-3 max-w-measure border-l-2 border-accent-border pl-3 text-13 leading-6 text-fg-primary">
              <span className="font-medium">Consequence: </span>
              {p.consequence}
            </p>
          </li>
        )}
      </ol>

      <DocSection
        title="What the system refuses to do"
        description="These are not stylistic preferences. Each one would misrepresent what an assessment of this kind can establish.">
        
        <div className="grid gap-3 sm:grid-cols-2">
          {[
          {
            t: 'No hire / reject recommendation',
            d: 'The product supplies evidence for a human decision and stops there. No “recommended”, no “strong match”, no ranking that implies one.'
          },
          {
            t: 'No numeric score',
            d: 'A behaviour is rated on four named bands with a count of supporting moments. A number would imply measurement precision the evidence does not have.'
          },
          {
            t: 'No hidden reasoning claims',
            d: 'The interface never says “AI is thinking”. It reports observable actions: “Responding”, “Retrieving from Brand guidelines.pdf”.'
          },
          {
            t: 'No surveillance framing',
            d: 'Captured events are shown to the candidate in plain language during the session, not collected silently and revealed afterwards.'
          }].
          map((x) =>
          <div key={x.t} className="rounded-md border border-line bg-surface p-3">
              <p className="text-13 font-semibold text-fg-primary">{x.t}</p>
              <p className="mt-1 text-13 leading-6 text-fg-secondary">{x.d}</p>
            </div>
          )}
        </div>
      </DocSection>

      <DocSection title="Applying principle 02 in practice">
        <DoDont
          doText={
          <>
              Label the draft, keep it subordinate, and require a named reviewer before it becomes a conclusion.
              “AI-generated draft interpretation, Moderate confidence, 3 linked moments”.
            </>
          }
          dontText={
          <>
              Presenting a generated paragraph at the same visual weight as a reviewer's decision, or as the default
              content of a released report.
            </>
          } />
        
      </DocSection>
    </div>);

}