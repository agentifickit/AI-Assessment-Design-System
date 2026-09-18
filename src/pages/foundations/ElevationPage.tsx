import React from 'react';
import { PageHeader } from '../../components/docs/PageHeader';
import { DocSection } from '../../components/docs/DocSection';

const levels = [
{
  n: '0',
  name: 'Canvas',
  bg: '--canvas',
  border: 'None',
  shadow: 'None',
  use: 'The application background. Nothing sits at this level except the shell itself.',
  dark: 'Darkest surface in the theme (#100f0e).'
},
{
  n: '1',
  name: 'Surface',
  bg: '--surface',
  border: '1px default',
  shadow: 'None',
  use: 'Cards, panels, tables, message blocks. The workhorse level.',
  dark: 'Lighter than canvas (#1a1917). Elevation reads as lightness, not shadow.'
},
{
  n: '2',
  name: 'Raised panel',
  bg: '--surface',
  border: '1px default + subtle inner divider',
  shadow: 'None',
  use: 'A panel inside a panel: the evaluation rail, the reference-material drawer.',
  dark: 'Border brightens to keep the boundary visible.'
},
{
  n: '3',
  name: 'Sticky',
  bg: '--surface',
  border: '1px default on the leaving edge',
  shadow: 'shadow-sticky (1px)',
  use: 'Sticky headers, sticky table headers, the pinned composer bar.',
  dark: 'Shadow is near-invisible; the border does the work.'
},
{
  n: '4',
  name: 'Popover',
  bg: '--surface-raised',
  border: '1px default',
  shadow: 'shadow-popover',
  use: 'Menus, tooltips, comboboxes, the command palette.',
  dark: 'Surface lightens to #262523; shadow deepens rather than spreads.'
},
{
  n: '5',
  name: 'Dialog',
  bg: '--surface-raised',
  border: '1px default',
  shadow: 'shadow-dialog + scrim',
  use: 'Modals and confirmations. Focus is trapped at this level and above.',
  dark: 'Scrim rises to 62% so the dialog separates without a heavier shadow.'
},
{
  n: '6',
  name: 'Toast',
  bg: '--surface-raised',
  border: '1px default',
  shadow: 'shadow-toast',
  use: 'Transient notifications. Never covers the primary action of the current view.',
  dark: 'Same treatment as popover with a slightly wider spread.'
},
{
  n: '7',
  name: 'Critical overlay',
  bg: '--surface-raised',
  border: '1px danger',
  shadow: 'shadow-dialog + scrim, no click-outside dismissal',
  use: 'Session ended, data at risk, destructive confirmation. Requires an explicit choice.',
  dark: 'Danger border is the only chromatic edge permitted at this level.'
}];


export function ElevationPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        eyebrow="Foundations"
        title="Elevation"
        intro="Eight levels. The first four use nothing but background and border — a shadow only appears once something genuinely floats above the page. This is what keeps a reviewer screen with forty bordered regions from looking like a pile of cards." />
      

      <DocSection title="Levels">
        <div className="scroll-panel overflow-x-auto rounded-md border border-line">
          <table className="w-full border-collapse text-13">
            <caption className="sr-only">Elevation levels</caption>
            <thead>
              <tr className="border-b border-line bg-surface-subtle">
                {['Level', 'Background', 'Border', 'Shadow', 'Use', 'Dark mode'].map((h) =>
                <th key={h} scope="col" className="px-3 py-2 text-left text-2xs font-semibold uppercase tracking-wide text-fg-muted">
                    {h}
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {levels.map((l) =>
              <tr key={l.n} className="border-b border-line-subtle last:border-b-0 align-top">
                  <td className="whitespace-nowrap px-3 py-2.5">
                    <span className="font-mono text-xs text-fg-muted tnum">{l.n}</span>
                    <span className="ml-2 font-medium text-fg-primary">{l.name}</span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-2.5 font-mono text-xs text-fg-secondary">{l.bg}</td>
                  <td className="px-3 py-2.5 text-fg-secondary">{l.border}</td>
                  <td className="whitespace-nowrap px-3 py-2.5 font-mono text-xs text-fg-secondary">{l.shadow}</td>
                  <td className="px-3 py-2.5 text-fg-secondary">{l.use}</td>
                  <td className="px-3 py-2.5 text-fg-muted">{l.dark}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocSection title="Specimens">
        <div className="rounded-md border border-line bg-canvas p-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
            { l: 'Surface', cls: 'border border-line bg-surface' },
            { l: 'Popover', cls: 'border border-line bg-surface-raised shadow-popover' },
            { l: 'Dialog', cls: 'border border-line bg-surface-raised shadow-dialog' },
            { l: 'Critical', cls: 'border border-danger-border bg-surface-raised shadow-dialog' }].
            map((s) =>
            <div key={s.l} className={`rounded-lg p-4 ${s.cls}`}>
                <p className="text-13 font-medium text-fg-primary">{s.l}</p>
                <p className="mt-1 text-2xs text-fg-muted">Level specimen</p>
              </div>
            )}
          </div>
        </div>
      </DocSection>

      <DocSection
        title="Why so little shadow"
        description="Shadow is the most expensive signal in a dense interface: it costs contrast, it renders differently across displays, and it disappears in high-contrast mode. Reserving it for genuine float means that when something does lift, the lift is informative.">
        
        <p className="max-w-measure text-13 leading-6 text-fg-secondary">
          In dark mode the strategy inverts. Shadow against near-black is almost invisible, so elevation is expressed by
          lightening the surface and brightening the border. A popover in dark mode is not a shadowed card — it is a
          lighter card.
        </p>
      </DocSection>
    </div>);

}