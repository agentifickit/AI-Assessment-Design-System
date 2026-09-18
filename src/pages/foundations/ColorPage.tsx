import React from 'react';
import { PageHeader } from '../../components/docs/PageHeader';
import { DocSection } from '../../components/docs/DocSection';
import { TokenTable } from '../../components/docs/TokenTable';
import { Example } from '../../components/docs/Example';
import { Alert } from '../../components/ui/Alert';
import { EvidenceStateBadge } from '../../components/evidence/EvidenceStateBadge';
import { evidenceStates } from '../../data/evidenceStates';
import {
  primitiveNeutral,
  primitiveOrange,
  semanticForeground,
  semanticProvenance,
  semanticStatus,
  semanticSurface } from
'../../data/tokens';

const vizHues = [
{ token: '--viz-1', label: 'Series 1', value: 'var(--viz-1)' },
{ token: '--viz-2', label: 'Series 2', value: 'var(--viz-2)' },
{ token: '--viz-3', label: 'Series 3', value: 'var(--viz-3)' },
{ token: '--viz-4', label: 'Series 4', value: 'var(--viz-4)' },
{ token: '--viz-5', label: 'Series 5', value: 'var(--viz-5)' }];


export function ColorPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        eyebrow="Foundations"
        title="Colour"
        intro="Warm neutrals carry the interface. One signal orange carries action. Every other hue is categorical — it tells you what kind of thing you are looking at, never how good it is." />
      

      <DocSection
        title="Neutral ramp"
        description="Built on a warm cast so long reading sessions stay comfortable and the interface reads as instrumentation rather than generic SaaS.">
        
        <div className="mb-3 flex overflow-hidden rounded-md border border-line">
          {primitiveNeutral.map((n) =>
          <div key={n.name} className="h-12 flex-1" style={{ background: n.value }} title={n.name} />
          )}
        </div>
        <TokenTable caption="Neutral primitives" rows={primitiveNeutral} swatch showDark={false} />
      </DocSection>

      <DocSection
        title="Signal orange"
        description="Seeded from the supplied ramp with #F6521F at 500. Used on roughly 2% of any screen.">
        
        <div className="mb-3 flex overflow-hidden rounded-md border border-line">
          {primitiveOrange.map((n) =>
          <div key={n.name} className="h-12 flex-1" style={{ background: n.value }} title={n.name} />
          )}
        </div>
        <Alert tone="warning" title="Contrast rule for the accent" className="mb-3">
          <p>
            #F6521F on white measures 3.4:1. That clears the 3:1 non-text threshold, so it is valid as a button
            background with white text (4.6:1) and as a focus ring — but it is <strong>never</strong> used for
            accent-coloured text. Accent text and accent icons use orange-700 (6.9:1). Links in body copy use blue-700
            and are underlined, which keeps the accent scarce.
          </p>
        </Alert>
        <TokenTable caption="Orange primitives" rows={primitiveOrange} swatch showDark={false} />
      </DocSection>

      <DocSection title="Semantic surfaces">
        <TokenTable caption="Surface roles" rows={semanticSurface} />
      </DocSection>

      <DocSection
        title="Semantic foreground"
        description="Contrast figures are measured against the surface each role is intended to sit on.">
        
        <TokenTable caption="Foreground roles" rows={semanticForeground} />
      </DocSection>

      <DocSection
        title="System status"
        description="Reserved for conditions of the system: connection, saving, validation, destructive confirmation. Never used to describe a person's performance.">
        
        <TokenTable caption="Status roles" rows={semanticStatus} />
      </DocSection>

      <DocSection
        title="Provenance"
        description="Who authored this. Always rendered as surface + 2px left rule + written label + icon, so it survives greyscale and screen readers.">
        
        <TokenTable caption="Provenance roles" rows={semanticProvenance} />
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="border-l-2 bg-ai-bg py-2.5 pl-3 pr-3" style={{ borderLeftColor: 'var(--ai-border)' }}>
            <p className="text-2xs font-medium text-ai-fg">AI-generated draft</p>
            <p className="mt-1 text-13 leading-6 text-fg-secondary">
              Tinted surface, lighter rule, secondary text weight. Subordinate by construction.
            </p>
          </div>
          <div
            className="rounded-md border border-l-2 border-line bg-surface py-2.5 pl-3 pr-3"
            style={{ borderLeftColor: 'var(--human-border)' }}>
            
            <p className="text-2xs font-medium text-fg-primary">Reviewer-approved</p>
            <p className="mt-1 text-13 font-medium leading-6 text-fg-primary">
              Solid surface, darker rule, full-weight text. Authority by construction.
            </p>
          </div>
        </div>
      </DocSection>

      <DocSection
        title="Evidence states"
        description="Ten categorical roles. The hue exists to help you find a state again after you have learned it; the glyph and the label are what carry the meaning.">
        
        <div className="scroll-panel overflow-x-auto rounded-md border border-line">
          <table className="w-full border-collapse text-13">
            <caption className="sr-only">Evidence state tokens</caption>
            <thead>
              <tr className="border-b border-line bg-surface-subtle">
                <th scope="col" className="px-3 py-2 text-left text-2xs font-semibold uppercase tracking-wide text-fg-muted">
                  State
                </th>
                <th scope="col" className="px-3 py-2 text-left text-2xs font-semibold uppercase tracking-wide text-fg-muted">
                  Token prefix
                </th>
                <th scope="col" className="px-3 py-2 text-left text-2xs font-semibold uppercase tracking-wide text-fg-muted">
                  Means
                </th>
              </tr>
            </thead>
            <tbody>
              {evidenceStates.map((s) =>
              <tr key={s.id} className="border-b border-line-subtle last:border-b-0">
                  <td className="px-3 py-2 align-top">
                    <EvidenceStateBadge state={s.id} size="sm" />
                  </td>
                  <td className="whitespace-nowrap px-3 py-2 align-top font-mono text-xs text-fg-secondary">
                    --ev-{s.id}-*
                  </td>
                  <td className="px-3 py-2 align-top text-13 text-fg-secondary">{s.meaning}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Example label="Greyscale check" note="The same ten states with hue removed" className="mt-3">
          <div className="flex flex-wrap gap-2 grayscale">
            {evidenceStates.map((s) =>
            <EvidenceStateBadge key={s.id} state={s.id} size="sm" />
            )}
          </div>
        </Example>
      </DocSection>

      <DocSection
        title="Data visualisation"
        description="Five categorical hues separated for deuteranopia, plus a neutral empty fill and a hatched 'not measured' fill. There is deliberately no sequential heat scale for behaviour data — a gradient implies a ranking.">
        
        <div className="flex flex-wrap gap-3">
          {vizHues.map((v) =>
          <div key={v.token} className="flex items-center gap-2 rounded-sm border border-line bg-surface px-2.5 py-1.5">
              <span className="h-4 w-4 rounded-[2px]" style={{ background: v.value }} aria-hidden="true" />
              <span className="font-mono text-xs text-fg-secondary">{v.token}</span>
            </div>
          )}
          <div className="flex items-center gap-2 rounded-sm border border-line bg-surface px-2.5 py-1.5">
            <span className="h-4 w-4 rounded-[2px] border border-line hatch-unmeasured" aria-hidden="true" />
            <span className="font-mono text-xs text-fg-secondary">not measured</span>
          </div>
        </div>
      </DocSection>

      <DocSection
        title="Dark mode"
        description="Not an inversion. Borders gain contrast because hairlines disappear first on dark surfaces, elevation is expressed by lighter surfaces rather than heavier shadow, and the accent shifts to orange-400 so it does not vibrate against near-black.">
        
        <Example label="Compare" note="Use the theme control in the header">
          <div className="grid gap-3 sm:grid-cols-3">
            {['canvas', 'surface', 'surface-raised'].map((s) =>
            <div key={s} className="rounded-md border border-line p-3" style={{ background: `var(--${s})` }}>
                <p className="font-mono text-xs text-fg-secondary">--{s}</p>
                <p className="mt-1 text-13 text-fg-primary">Primary text</p>
                <p className="text-13 text-fg-muted">Muted metadata</p>
              </div>
            )}
          </div>
        </Example>
      </DocSection>
    </div>);

}