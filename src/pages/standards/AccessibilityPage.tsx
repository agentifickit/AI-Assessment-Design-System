import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/docs/PageHeader';
import { DocSection } from '../../components/docs/DocSection';
import { SpecList } from '../../components/docs/SpecList';
import { DoDont } from '../../components/docs/DoDont';
import { Alert } from '../../components/ui/Alert';

export function AccessibilityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Standards"
        title="Accessibility"
        intro="WCAG 2.2 AA is the floor, not the goal. This product makes consequential judgements about people, so an interface that is harder for one candidate to operate is a fairness problem before it is a compliance problem." />
      

      <Alert
        className="mb-8"
        tone="warning"
        title="Why this matters more here than in most products"
        children="If a candidate cannot operate the workspace efficiently, the evidence we capture reflects our interface rather than their ability. Every accessibility failure in this system risks being recorded as a performance finding about a person." />
      

      <DocSection title="Keyboard operation" description="Everything, without exception, including the layout itself.">
        <SpecList
          columns={1}
          entries={[
          { term: 'Panel resizing', detail: <>Separators are focusable with <code>role="separator"</code>. Arrows move 16px, Home and End jump to the panel minimum and maximum, Enter collapses. A candidate who cannot drag must still be able to give the draft more room.</> },
          { term: 'Tab order', detail: 'Follows visual order within each panel, and panels are traversed left to right. A collapsed panel is a single tab stop that announces what it will reveal.' },
          { term: 'Focus visibility', detail: <>A 2px ring in <code>--brand-accent</code> with a 1px offset, at 3:1 against every surface it appears on. Never removed, never replaced by a colour change alone.</> },
          { term: 'Dialogs', detail: 'Focus moves to the first focusable element, is trapped while open, and returns to the exact trigger on close. Focusables are re-queried live, so a dialog whose contents change still traps correctly.' },
          { term: 'No keyboard traps', detail: 'The editor uses Tab for focus movement, not indentation. Escape leaves every transient surface except a critical dialog, which says so.' },
          { term: 'Shortcuts', detail: 'Never single-character without a modifier, because a candidate is typing prose for most of the session.' }]
          } />
        
      </DocSection>

      <DocSection title="Screen reader support">
        <SpecList
          columns={1}
          entries={[
          { term: 'Landmarks', detail: 'Each workspace panel is a labelled region. The timeline is an ordered list; the report is an article with sectioned headings.' },
          { term: 'Streaming', detail: <>Four announcements only — started, completed, interrupted, failed. See <Link to="/patterns/ai" className="text-link underline decoration-line-strong underline-offset-2">AI interaction</Link> for the full contract.</> },
          { term: 'Status regions', detail: 'Save status, connection status, and the timer are polite live regions. Only a time-limit change or potential data loss uses assertive.' },
          { term: 'Evidence states', detail: 'Every glyph is decorative and the state name is real text. A glyph-only badge keeps its label in an sr-only span.' },
          { term: 'Tables', detail: 'Real table semantics with captions, scoped headers, and column-group headers separating comparable from non-comparable dimensions.' },
          { term: 'Ratings', detail: 'Behaviour bands are named radio options, never a slider or a star control. A band is announced by its full label.' }]
          } />
        
      </DocSection>

      <DocSection
        title="Non-colour encoding"
        description="Every state in this system is legible without colour, because a hue can be the reinforcement but never the signal.">
        
        <SpecList
          entries={[
          { term: 'Evidence states', detail: 'Distinct glyph shape + written label + hue. Ten states, ten glyphs.' },
          { term: 'Opportunity states', detail: 'Circular glyphs, where evidence glyphs are square — the two vocabularies differ structurally before colour.' },
          { term: 'Message author', detail: 'Position, border treatment, and a written attribution label.' },
          { term: 'Connection status', detail: 'The dot changes shape as well as colour: circle, rotated square, square.' },
          { term: 'Behaviour bands', detail: 'Four filled/unfilled segments plus the band name in text.' },
          { term: 'Dimensions', detail: 'A mono code and a label in fixed order. No dimension has a colour at all.' }]
          } />
        
      </DocSection>

      <DocSection title="Zoom, reflow, and motion">
        <SpecList
          columns={1}
          entries={[
          { term: '200% text zoom', detail: 'No loss of content or function. Panel minimums are in pixels but the layout mode changes on container width, so zooming promotes the workspace to tabbed mode rather than clipping it.' },
          { term: '400% / 320px reflow', detail: 'Single-column mode with the three panels as tabs, and the timer and save status in a compact sticky bar.' },
          { term: 'No fixed heights', detail: 'The workspace uses dynamic viewport units with min-h-0 discipline. Fixed pixel heights break at zoom.' },
          { term: 'Reduced motion', detail: 'All transitions collapse to a 100ms opacity change; smooth scrolling becomes instant; the streaming caret is replaced by a static label.' },
          { term: 'High contrast', detail: 'Structure is carried by borders rather than shadows, so forced-colours modes retain every boundary. Focus rings use a real border, not a box-shadow.' }]
          } />
        
      </DocSection>

      <DocSection
        title="Density and size limits"
        description="Enforceable rules, not preferences. Compact density exists for reviewers reading long sessions — it must never reach a candidate under time pressure.">
        
        <div className="overflow-hidden rounded-md border border-line bg-surface">
          <table className="w-full border-collapse text-13">
            <caption className="sr-only">Minimum sizes by surface type</caption>
            <thead>
              <tr className="border-b border-line bg-surface-subtle">
                {['Rule', 'Candidate surfaces', 'Operator surfaces'].map((h) =>
                <th key={h} scope="col" className="px-3 py-2 text-left text-2xs font-semibold uppercase tracking-wide text-fg-muted">
                    {h}
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {[
              ['Density modes allowed', 'Default and comfortable only', 'Compact, default, comfortable'],
              ['Minimum control height', '40px', '28px with 8px hit-slop'],
              ['Minimum touch target', '44 × 44px', '32 × 32px (pointer-first)'],
              ['Minimum text size', '13px body, 11px metadata', '11px floor, tabular metadata only'],
              ['Table row height', '44px', '28px compact / 36px default']].
              map(([rule, cand, op]) =>
              <tr key={rule} className="border-b border-line-subtle last:border-b-0">
                  <th scope="row" className="px-3 py-2.5 text-left font-medium text-fg-primary">{rule}</th>
                  <td className="px-3 py-2.5 text-fg-secondary">{cand}</td>
                  <td className="px-3 py-2.5 text-fg-secondary">{op}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <DoDont
          className="mt-4"
          doText="Set compact density on the reviewer and admin shells only. Candidate-facing routes stay at default or comfortable regardless of the user's preference elsewhere in the product."
          dontText="Applying a global density preference to the candidate workspace. A 28px row is fine for a reviewer scanning a session and wrong for someone with 41 minutes left." />
        
      </DocSection>

      <DocSection
        title="Timed-assessment accommodations"
        description="A time limit is an accessibility surface in its own right.">
        
        <SpecList
          columns={1}
          entries={[
          { term: 'Extensions', detail: 'Configured per candidate before the session and shown in the timer as an adjusted total, not as a visible flag that marks them out in the interface.' },
          { term: 'System-fault pauses', detail: 'Any interruption attributable to us pauses the clock automatically and tells the candidate that it has, in plain words.' },
          { term: 'Time-limit changes', detail: 'Announced through an assertive live region — one of only two assertive uses in the system. A silent change to a time limit is never acceptable.' },
          { term: 'No timer motion', detail: 'The timer never pulses, ticks, or changes colour. Emphasis in the final ten minutes comes from weight and wording.' },
          { term: 'Error prevention', detail: 'Submission is a reviewable step with an explicit checklist and a confirmation. Nothing destructive is one keystroke away.' }]
          } />
        
      </DocSection>
    </>);

}