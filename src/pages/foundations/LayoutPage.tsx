import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/docs/PageHeader';
import { DocSection } from '../../components/docs/DocSection';
import { SpecList } from '../../components/docs/SpecList';
import { DoDont } from '../../components/docs/DoDont';
import { Alert } from '../../components/ui/Alert';
import { layoutThresholds, panelConstraints, CONVERSATION_FLOOR } from '../../hooks/usePanelLayout';

export function LayoutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Foundation"
        title="Layout"
        intro="The hardest layout problem in this product is not the controls — it is the three-panel assessment workspace. This foundation specifies that surface first, and describes the rest of the shell in terms of it." />
      

      <DocSection
        title="Application shell"
        description="Two shells, chosen by who is working and what they need width for.">
        
        <SpecList
          entries={[
          { term: 'Candidate shell', detail: 'A 48px icon rail only. The candidate has one task; navigation should not compete with it for width.' },
          { term: 'Operator shell', detail: 'Reviewer and admin. 240px labelled sidebar, collapsible to the 48px rail. Long sessions mean many destinations.' },
          { term: 'Top bar', detail: '48px tall, sticky, full width. Carries identity and environment, never task-specific controls.' },
          { term: 'Task header', detail: 'A second sticky band below the top bar, workspace only. Task name, timer, save status, connection status, submit.' }]
          } />
        
      </DocSection>

      <DocSection
        title="Three-panel workspace"
        description="Task context, AI conversation, and the work product. The conversation is the only panel with no fixed width — it absorbs whatever the outer two leave, because it is where a candidate spends most of their attention.">
        
        <div className="grid gap-3 lg:grid-cols-3">
          {[
          {
            n: '1',
            name: 'Task brief & reference material',
            w: `${panelConstraints.brief.min}–${panelConstraints.brief.max}px`,
            body: 'Scenario, deliverable, constraints, and the reference documents. Below 280px document names truncate to uselessness; above 420px it starts stealing from the conversation.'
          },
          {
            n: '2',
            name: 'AI conversation',
            w: `min ${CONVERSATION_FLOOR}px, otherwise flexible`,
            body: `Flex child. ${CONVERSATION_FLOOR}px is the point at which a 68ch measure plus the user-message inset and the action row stop coexisting. Below the floor a panel must collapse — never compress.`
          },
          {
            n: '3',
            name: 'Draft or artifact editor',
            w: `${panelConstraints.artifact.min}–${panelConstraints.artifact.max}px`,
            body: 'Below 360px prose wraps too tightly to edit; above 720px the measure exceeds comfortable reading and the conversation suffers.'
          }].
          map((p) =>
          <div key={p.n} className="rounded-md border border-line bg-surface p-4">
              <div className="flex items-baseline gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-xs border border-fg-primary bg-fg-primary text-2xs font-semibold text-fg-inverse tnum">
                  {p.n}
                </span>
                <h3 className="text-13 font-semibold text-fg-primary">{p.name}</h3>
              </div>
              <p className="mt-2 font-mono text-2xs text-brand-fg">{p.w}</p>
              <p className="mt-2 text-13 leading-6 text-fg-secondary">{p.body}</p>
            </div>
          )}
        </div>
        <p className="mt-4 text-13 leading-6 text-fg-secondary">
          See it under real content on the{' '}
          <Link to="/screens/workspace" className="text-link underline decoration-line-strong underline-offset-2">
            candidate assessment workspace
          </Link>
          .
        </p>
      </DocSection>

      <DocSection
        title="Breakpoints"
        description="Named for the content failure they prevent, not for a device class. Every threshold is the width at which the previous arrangement can no longer hold the conversation above its readable floor.">
        
        <div className="overflow-hidden rounded-md border border-line bg-surface">
          <table className="w-full border-collapse text-13">
            <caption className="sr-only">Workspace layout modes and the content failure each one prevents</caption>
            <thead>
              <tr className="border-b border-line bg-surface-subtle">
                <th scope="col" className="w-40 px-3 py-2 text-left text-2xs font-semibold uppercase tracking-wide text-fg-muted">Mode</th>
                <th scope="col" className="w-24 px-3 py-2 text-left text-2xs font-semibold uppercase tracking-wide text-fg-muted">From</th>
                <th scope="col" className="px-3 py-2 text-left text-2xs font-semibold uppercase tracking-wide text-fg-muted">Why the previous arrangement fails</th>
              </tr>
            </thead>
            <tbody>
              {layoutThresholds.map((t) =>
              <tr key={t.mode} className="border-b border-line-subtle last:border-b-0">
                  <th scope="row" className="px-3 py-2.5 text-left font-mono text-2xs font-medium text-fg-primary">{t.mode}</th>
                  <td className="px-3 py-2.5 text-fg-secondary tnum">{t.min === 0 ? '0' : `${t.min}px`}</td>
                  <td className="px-3 py-2.5 leading-6 text-fg-secondary">{t.why}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Alert
          className="mt-4"
          tone="info"
          title="Reflow never remounts"
          children="The workspace renders the same three children in every mode and hides rather than unmounts the inactive ones. A candidate who resizes a window or rotates a tablet mid-task must never lose draft text, scroll position, or conversation state." />
        
      </DocSection>

      <DocSection
        title="Resizing and collapse"
        description="Both are keyboard-operable, because a candidate who cannot use a pointer must still be able to give the draft more room.">
        
        <SpecList
          entries={[
          { term: 'Separator role', detail: <><code>role="separator"</code>, <code>aria-orientation="vertical"</code>, and live <code>aria-valuenow/min/max</code> in pixels.</> },
          { term: 'Keyboard', detail: 'Arrow keys move 16px. Home and End jump to the panel minimum and maximum. Enter or Space collapses.' },
          { term: 'Pointer', detail: '1px visible line, 9px hit area. Pointer capture so a fast drag does not lose the handle. Live drag is never animated.' },
          { term: 'Collapse target', detail: 'A collapsed panel becomes a 32px labelled edge tab, never a zero-width sliver. A reader must be able to see something is there.' },
          { term: 'Restore', detail: 'Re-expanding restores the last width, not the default. Scroll position and editor state survive a collapse.' },
          { term: 'Persistence', detail: 'Widths persist per panel for the session, so a candidate sets up their workspace once.' }]
          } />
        
      </DocSection>

      <DocSection
        title="Overflow ownership"
        description="Stated as a rule because it is the single most common cause of a broken full-height layout.">
        
        <DoDont
          doText={
          <ul className="flex list-disc flex-col gap-1.5 pl-4">
              <li>The shell is <code>h-dvh</code> and never scrolls itself.</li>
              <li>Each panel owns exactly one scroll container.</li>
              <li>No scroll container nests inside another.</li>
              <li>Every flex ancestor carries <code>min-h-0</code>, or the child refuses to shrink and the scroll never engages.</li>
            </ul>
          }
          dontText={
          <ul className="flex list-disc flex-col gap-1.5 pl-4">
              <li>Letting the page scroll and the panels scroll together, so a candidate loses the timer.</li>
              <li>A scrolling region inside a scrolling region — the inner one becomes unreachable by keyboard.</li>
              <li>Fixed pixel heights to fake full height. They break at 200% zoom.</li>
            </ul>
          } />
        
      </DocSection>

      <DocSection
        title="Other layouts"
        description="Each is a constrained variant of the same rules.">
        
        <SpecList
          columns={1}
          entries={[
          { term: 'Reviewer workspace', detail: '320px timeline rail · flexible inspector · 380px evaluation panel. Under 1280px the evaluation panel becomes a right-hand drawer so the inspector keeps a readable measure.' },
          { term: 'Report', detail: '720px reading column centred in the canvas, with a sticky in-page table of contents to its left above 1024px and collapsed to a disclosure below it. Print styles drop the shell entirely.' },
          { term: 'Comparison', detail: 'Frozen 220px criterion column, candidate columns at 260px minimum, horizontal scroll beyond three candidates. Below 1024px it becomes a stacked accordion per dimension rather than a squeezed table.' },
          { term: 'Admin', detail: 'Full-width tables inside the operator shell. Sticky table headers and a frozen identity column; filters in a sticky toolbar above the scroll container.' }]
          } />
        
      </DocSection>
    </>);

}