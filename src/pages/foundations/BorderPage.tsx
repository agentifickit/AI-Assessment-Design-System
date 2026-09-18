import React from 'react';
import { PageHeader } from '../../components/docs/PageHeader';
import { DocSection } from '../../components/docs/DocSection';
import { Example } from '../../components/docs/Example';
import { DoDont } from '../../components/docs/DoDont';

export function BorderPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        eyebrow="Foundations"
        title="Border"
        intro="Borders are the primary structural device in this system. They are cheaper than shadow, they survive dark mode and high-contrast mode, and they let a dense screen stay flat instead of turning into a field of floating tiles." />
      

      <DocSection title="Widths">
        <div className="grid gap-3 sm:grid-cols-3">
          {[
          { w: '1px', t: 'Hairline', d: 'Dividers, card and panel edges, table rows, input outlines. The default for everything.' },
          { w: '1.5px', t: 'Emphasis', d: 'Selected state on a control or rating band, paired with an accent colour and a filled marker.' },
          { w: '2px', t: 'Strong', d: 'Focus rings, provenance rules on AI and reviewer blocks, active tab underline.' }].
          map((b) =>
          <div key={b.w} className="rounded-md bg-surface p-3" style={{ border: `${b.w} solid var(--border-default)` }}>
              <p className="font-mono text-xs text-fg-muted">{b.w}</p>
              <p className="mt-1 text-13 font-semibold text-fg-primary">{b.t}</p>
              <p className="mt-1 text-13 leading-6 text-fg-secondary">{b.d}</p>
            </div>
          )}
        </div>
      </DocSection>

      <DocSection title="Colours">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
          { n: '--border-subtle', d: 'Dividers inside a surface that already has an outer border — table rows, card sections. Lower contrast so the outer edge stays dominant.' },
          { n: '--border-default', d: 'Every surface boundary and input outline. 1.6:1 against canvas in light, deliberately raised to 2.4:1 in dark where hairlines vanish first.' },
          { n: '--border-strong', d: 'Hover state on inputs, dashed limitation blocks, the hatch pattern for unmeasured behaviour.' },
          { n: '--accent-border', d: 'Focus ring and selected control outline. The only place an accent border is permitted.' }].
          map((c) =>
          <div key={c.n} className="rounded-md border border-line bg-surface p-3">
              <p className="font-mono text-xs text-fg-primary">{c.n}</p>
              <p className="mt-1 text-13 leading-6 text-fg-secondary">{c.d}</p>
            </div>
          )}
        </div>
      </DocSection>

      <DocSection
        title="Focus ring"
        description="2px solid accent at 2px offset, on every interactive element without exception — including inside the artifact editor and inside virtualised lists. Tab through the specimen below.">
        
        <Example label="Focus specimens" note="Keyboard only — :focus-visible">
          <div className="flex flex-wrap items-center gap-3">
            <button type="button" className="h-8 rounded-sm border border-line bg-surface px-3 text-13 text-fg-primary">
              Button
            </button>
            <input
              aria-label="Focus specimen input"
              className="h-8 rounded-sm border border-line bg-surface px-2.5 text-13"
              defaultValue="Input" />
            
            <a href="#focus" className="text-13 text-link underline underline-offset-2">
              Link
            </a>
            <span
              tabIndex={0}
              role="button"
              className="rounded-xs border border-line bg-surface-subtle px-2 py-1 text-2xs text-fg-secondary">
              
              Chip
            </span>
          </div>
        </Example>
      </DocSection>

      <DocSection title="State outlines">
        <div className="flex flex-col gap-3">
          <div className="rounded-sm border border-danger-solid bg-surface px-3 py-2 text-13 text-fg-primary">
            Error outline — 1px danger solid, always accompanied by an icon and a message. Never colour alone.
          </div>
          <div className="rounded-sm border border-warning-border bg-warning-bg px-3 py-2 text-13 text-warning-fg">
            Warning outline — used on autosave retry and unstable connection, not on validation.
          </div>
          <div className="rounded-sm border-[1.5px] border-accent-border bg-accent-bg px-3 py-2 text-13 text-fg-primary">
            Selected — 1.5px accent inset plus a filled marker elsewhere in the row.
          </div>
          <div className="rounded-md border border-dashed border-line-strong px-3 py-2 text-13 text-fg-secondary">
            Dashed — reserved for absence: incomplete evidence, empty states, limitation blocks.
          </div>
        </div>
      </DocSection>

      <DocSection
        title="High-contrast environments"
        description="Under forced-colors, backgrounds and shadows are discarded by the OS. Anything that communicated through fill alone would disappear.">
        
        <DoDont
          doText="Every state that uses a fill also carries a border and a glyph, so it survives forced-colors. Focus rings are declared with outline, which forced-colors preserves."
          dontText="Communicating selection with a background tint alone, or drawing a focus indicator with box-shadow — both vanish entirely in high-contrast mode." />
        
      </DocSection>

      <DocSection title="Table and timeline dividers">
        <Example label="Divider hierarchy">
          <div className="overflow-hidden rounded-md border border-line bg-surface">
            <div className="border-b border-line bg-surface-subtle px-3 py-2 text-2xs font-semibold uppercase tracking-wide text-fg-muted">
              Header — 1px default below
            </div>
            {['Row one', 'Row two', 'Row three'].map((r) =>
            <div key={r} className="border-b border-line-subtle px-3 py-2 text-13 text-fg-secondary last:border-b-0">
                {r} — 1px subtle between
              </div>
            )}
          </div>
        </Example>
      </DocSection>
    </div>);

}