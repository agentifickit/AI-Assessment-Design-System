import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/docs/PageHeader';
import { DocSection } from '../../components/docs/DocSection';
import { Checkbox } from '../../components/ui/Checkbox';
import { Progress } from '../../components/ui/Progress';
import { Alert } from '../../components/ui/Alert';

interface CheckGroup {
  id: string;
  label: string;
  intro: string;
  items: {id: string;text: string;}[];
}

const groups: CheckGroup[] = [
{
  id: 'visual',
  label: 'Visual consistency',
  intro: 'Run against every composition in both themes and all three density modes.',
  items: [
  { id: 'v1', text: 'No hardcoded palette value where a semantic token exists' },
  { id: 'v2', text: 'Signal orange appears only on non-text roles — focus rings, markers, borders, the live dot' },
  { id: 'v3', text: 'Every labelled accent surface pairs --action-primary with --action-primary-fg ink, never white' },
  { id: 'v4', text: 'Sibling cards in a row share baselines across heading, body, and footer' },
  { id: 'v5', text: 'Borders carry structure; shadows appear only on genuinely floating surfaces' },
  { id: 'v6', text: 'No gradient anywhere that was not explicitly requested' },
  { id: 'v7', text: 'Nested surfaces step radius inward, never outward' },
  { id: 'v8', text: 'Mono type is used only for verbatim record, identifiers, and dimension codes' }]

},
{
  id: 'states',
  label: 'Interaction states',
  intro: 'Every interactive element, every state, by keyboard as well as pointer.',
  items: [
  { id: 's1', text: 'Default, hover, focus-visible, active, disabled, and loading all present and distinct' },
  { id: 's2', text: 'Focus ring visible at 3:1 against every surface the control sits on' },
  { id: 's3', text: 'Disabled controls explain why in adjacent text, not only by appearance' },
  { id: 's4', text: 'No hover-only affordance — Stop, copy, retry, and edit reachable by keyboard' },
  { id: 's5', text: 'Every transition names its properties; no transition-all' },
  { id: 's6', text: 'No single-element transition longer than 300ms' },
  { id: 's7', text: 'Selected states use an instant marker, not a transitioned one' },
  { id: 's8', text: 'Dialog restores focus to the exact element that opened it' }]

},
{
  id: 'responsive',
  label: 'Responsiveness',
  intro: 'Test by resizing the container, not by switching device presets.',
  items: [
  { id: 'r1', text: 'Workspace passes through all five layout modes without content loss' },
  { id: 'r2', text: 'Conversation never renders below its 520px floor' },
  { id: 'r3', text: 'Panel content survives a mode change — draft text, scroll position, conversation state' },
  { id: 'r4', text: 'Each panel owns exactly one scroll container; the shell never scrolls' },
  { id: 'r5', text: 'No label, button, or nav item wraps to a second line at its target width' },
  { id: 'r6', text: 'Comparison table degrades to a stacked accordion rather than a squeezed table' },
  { id: 'r7', text: 'Desktop uses the width it has — no mobile stack padded out to fill a wide screen' },
  { id: 'r8', text: 'Sticky task header remains visible in every mode' }]

},
{
  id: 'a11y',
  label: 'Accessibility',
  intro: 'WCAG 2.2 AA is the floor. Failures here risk being recorded as findings about a person.',
  items: [
  { id: 'a1', text: 'All documented contrast pairs pass in both themes' },
  { id: 'a2', text: 'Every state legible with colour removed — glyph or shape plus written label' },
  { id: 'a3', text: 'Full keyboard operation including panel resize and collapse' },
  { id: 'a4', text: 'Streaming announces four events only; no token-level announcement' },
  { id: 'a5', text: 'Stop stays rendered and focusable for the whole stream' },
  { id: 'a6', text: 'No duplicate DOM ids when a component is rendered twice' },
  { id: 'a7', text: '200% text zoom with no loss of content or function' },
  { id: 'a8', text: 'Reduced motion honoured; every state still legible without movement' },
  { id: 'a9', text: 'Candidate surfaces refuse compact density and keep 44px touch targets' },
  { id: 'a10', text: 'Time-limit and data-loss events use assertive live regions; nothing else does' }]

},
{
  id: 'integrity',
  label: 'Evidence integrity',
  intro: 'Specific to this product. A pass here is what makes the system defensible.',
  items: [
  { id: 'e1', text: 'All five evaluation layers present and ordered wherever an evaluation appears' },
  { id: 'e2', text: 'A missing layer renders an explicit placeholder, never disappears' },
  { id: 'e3', text: 'Every AI-authored sentence is labelled as a draft interpretation' },
  { id: 'e4', text: 'Every conclusion names an accountable reviewer' },
  { id: 'e5', text: 'An override retains the original AI text rather than replacing it' },
  { id: 'e6', text: 'No opportunity state other than “observed” appears inside a rating control' },
  { id: 'e7', text: 'Missing or invalid evidence is never scored as zero or averaged away' },
  { id: 'e8', text: 'No aggregate score, ranking, or hire recommendation anywhere in the product' },
  { id: 'e9', text: 'Every limitation states what it does not imply' },
  { id: 'e10', text: 'Dimensions carry no colour identity; hue means evidence state only' }]

}];


const allIds = groups.flatMap((g) => g.items.map((i) => i.id));

export function QaPage() {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const completed = useMemo(() => allIds.filter((id) => done[id]).length, [done]);

  return (
    <>
      <PageHeader
        eyebrow="Standards"
        title="QA checklist"
        intro="Run this against every composition before release. It is stateful so a pass can be worked through in one sitting — and it is written as assertions rather than reminders, so each line either holds or it does not." />
      

      <div className="mb-8 rounded-md border border-line bg-surface p-4">
        <Progress
          label="Checklist progress"
          value={completed}
          max={allIds.length}
          valueText={`${completed} of ${allIds.length} checks`} />
        
      </div>

      <Alert
        className="mb-8"
        tone="info"
        title="The test matrix"
        children="Every composition is checked in light and dark, at compact, default, and comfortable density, and at 100% and 200% zoom — twelve cells per screen. Candidate surfaces skip the compact cells, because compact is refused there by design." />
      

      {groups.map((g) => {
        const groupDone = g.items.filter((i) => done[i.id]).length;
        return (
          <DocSection
            key={g.id}
            title={g.label}
            description={
            <>
                {g.intro}{' '}
                <span className="text-fg-muted tnum">
                  ({groupDone} of {g.items.length})
                </span>
              </>
            }>
            
            <ul className="divide-y divide-line-subtle overflow-hidden rounded-md border border-line bg-surface">
              {g.items.map((i) =>
              <li key={i.id} className="px-3.5 py-2.5">
                  <Checkbox
                  id={`qa-${i.id}`}
                  checked={Boolean(done[i.id])}
                  onChange={(e) => setDone((p) => ({ ...p, [i.id]: e.target.checked }))}
                  label={i.text} />
                
                </li>
              )}
            </ul>
          </DocSection>);

      })}

      <DocSection
        title="Automated coverage"
        description="What is machine-checkable in this deliverable, and what still needs a person.">
        
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-md border border-line bg-surface p-3.5">
            <p className="text-13 font-semibold text-fg-primary">Automated</p>
            <ul className="mt-1.5 flex list-disc flex-col gap-1.5 pl-4 text-13 leading-6 text-fg-secondary">
              <li>
                Contrast, via{' '}
                <Link to="/standards/contrast" className="text-link underline decoration-line-strong underline-offset-2">
                  the live audit
                </Link>{' '}
                — resolves every documented pair against the applied theme
              </li>
              <li>Token name typos, caught at compile time by literal types</li>
              <li>Token drift between the CSS, Tailwind, and TypeScript outputs</li>
            </ul>
          </div>
          <div className="rounded-md border border-dashed border-line-strong p-3.5">
            <p className="text-13 font-semibold text-fg-primary">Still needs a person</p>
            <ul className="mt-1.5 flex list-disc flex-col gap-1.5 pl-4 text-13 leading-6 text-fg-secondary">
              <li>Whether copy actually reads as non-judgemental</li>
              <li>Whether a hierarchy decision is right for the content</li>
              <li>Screen reader behaviour during a live stream</li>
              <li>Visual regression capture, which sits outside this front-end deliverable</li>
            </ul>
          </div>
        </div>
      </DocSection>
    </>);

}