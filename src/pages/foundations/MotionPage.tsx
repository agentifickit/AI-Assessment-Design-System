import React from 'react';
import { PageHeader } from '../../components/docs/PageHeader';
import { DocSection } from '../../components/docs/DocSection';
import { SpecList } from '../../components/docs/SpecList';
import { DoDont } from '../../components/docs/DoDont';
import { Alert } from '../../components/ui/Alert';

interface MotionRow {
  moment: string;
  duration: string;
  easing: string;
  property: string;
  note: string;
}

const rows: MotionRow[] = [
{
  moment: 'Streaming response',
  duration: 'none',
  easing: '—',
  property: 'none',
  note: 'Text appends with no layout animation. A 1ch caret blinks at 1s linear — the only looping animation in the system.'
},
{
  moment: 'Panel collapse & expand',
  duration: '220ms',
  easing: 'ease-enter',
  property: 'width',
  note: 'Live drag is unanimated. Following the pointer through a transition reads as lag, not smoothness.'
},
{
  moment: 'Overlay sheet',
  duration: '280ms',
  easing: 'ease-enter',
  property: 'transform, opacity',
  note: 'Slides from the edge it is anchored to, so its origin is never ambiguous.'
},
{
  moment: 'Evidence selection',
  duration: '140ms',
  easing: 'ease-enter',
  property: 'background-color, border-color',
  note: 'The 2px selection marker appears instantly with no transition. Selection must never depend on an animation having finished.'
},
{
  moment: 'Timeline jump',
  duration: '280ms scroll, 400ms highlight',
  easing: 'ease-enter',
  property: 'scroll, opacity',
  note: 'Scrubbing is instant. The 400ms target highlight is a fade of a highlight, not movement, so it may exceed the movement ceiling.'
},
{
  moment: 'Autosave status',
  duration: '140ms',
  easing: 'ease-enter',
  property: 'opacity',
  note: 'Cross-fade only. Never slides, spins, or pulses — a save indicator that moves reads as an error.'
},
{
  moment: 'Offline recovery banner',
  duration: '180ms in, no auto-exit',
  easing: 'ease-enter',
  property: 'opacity',
  note: 'Persists until dismissed. A candidate must not miss a recovery notice because it animated away.'
},
{
  moment: 'Submission confirmation',
  duration: '180ms',
  easing: 'ease-enter',
  property: 'opacity',
  note: 'A calm change into a confirmed state. No celebration, no drawn checkmark, no confetti — nothing has been won.'
},
{
  moment: 'Reviewer approval',
  duration: '180ms',
  easing: 'ease-enter',
  property: 'opacity',
  note: 'Same treatment as submission, plus an instant state-badge swap so the record changes without delay.'
},
{
  moment: 'Error appearance',
  duration: '140ms',
  easing: 'ease-enter',
  property: 'opacity',
  note: 'Opacity only. No shake and no flash — both read as blame during an assessment.'
},
{
  moment: 'Retry in progress',
  duration: '280ms fill',
  easing: 'linear',
  property: 'transform',
  note: 'Determinate fill only where the duration is genuinely known. Otherwise a static label, never a spinner implying progress.'
},
{
  moment: 'Press feedback',
  duration: '100ms',
  easing: 'ease-enter',
  property: 'transform, background-color',
  note: 'A 1px downward nudge. The shortest transition in the system, because it is the most frequent.'
}];


export function MotionPage() {
  return (
    <>
      <PageHeader
        eyebrow="Foundation"
        title="Motion"
        intro="Motion communicates status, continuity, and system response. During a timed assessment it must never delay a candidate, imply activity that is not happening, or startle someone who is already under pressure. Several moments in this product are specified as deliberately unanimated." />
      

      <DocSection
        title="Scale"
        description="Four durations and three curves. Anything outside this set needs a reason written down.">
        
        <SpecList
          entries={[
          { term: '--dur-press, 100ms', detail: 'Press and hover feedback. High frequency, so the shortest.' },
          { term: '--dur-fast, 140ms', edge: true, detail: 'State changes on existing elements: selection, save status, colour changes.' },
          { term: '--dur-base, 180ms', detail: 'Small elements entering or leaving: toasts, banners, confirmations.' },
          { term: '--dur-panel, 220–280ms', detail: 'Structural movement: panel collapse, drawers, sheets, dialogs. 300ms is a hard ceiling.' },
          { term: '--ease-enter', detail: <><code>cubic-bezier(0.23, 1, 0.32, 1)</code> — decelerating. Anything entering, expanding, or settling.</> },
          { term: '--ease-move', detail: <><code>cubic-bezier(0.65, 0, 0.35, 1)</code> — symmetrical. Movement across the screen in both directions.</> },
          { term: '--ease-linear', detail: 'Continuous or indeterminate motion only: the streaming caret, a determinate progress fill.' }].
          map(({ term, detail }) => ({ term, detail }))} />
        
        <p className="mt-3 text-13 leading-6 text-fg-secondary">
          <code>ease-in</code> is not used on any UI transition. It starts slowly, which reads as unresponsiveness on the
          very interactions that need to feel immediate.
        </p>
      </DocSection>

      <DocSection
        title="Product moments"
        description="Every animated moment in the product, with its duration, curve, and the properties it is allowed to touch.">
        
        <div className="overflow-x-auto rounded-md border border-line bg-surface">
          <table className="w-full min-w-[52rem] border-collapse text-13">
            <caption className="sr-only">Motion specification for each product moment</caption>
            <thead>
              <tr className="border-b border-line bg-surface-subtle">
                {['Moment', 'Duration', 'Easing', 'Properties', 'Behaviour'].map((h) =>
                <th key={h} scope="col" className="px-3 py-2 text-left text-2xs font-semibold uppercase tracking-wide text-fg-muted">
                    {h}
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) =>
              <tr key={r.moment} className="border-b border-line-subtle last:border-b-0 align-top">
                  <th scope="row" className="px-3 py-2.5 text-left text-13 font-medium text-fg-primary">{r.moment}</th>
                  <td className="whitespace-nowrap px-3 py-2.5 font-mono text-2xs text-fg-secondary">{r.duration}</td>
                  <td className="whitespace-nowrap px-3 py-2.5 font-mono text-2xs text-fg-secondary">{r.easing}</td>
                  <td className="px-3 py-2.5 font-mono text-2xs text-fg-secondary">{r.property}</td>
                  <td className="px-3 py-2.5 leading-6 text-fg-secondary">{r.note}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocSection
        title="Never animated during a timed assessment"
        description="These are prohibitions, not preferences. Each one has cost a candidate something in a comparable product.">
        
        <div className="grid gap-3 sm:grid-cols-2">
          {[
          { t: 'The timer', d: 'No pulse, no colour animation, no ticking motion. Emphasis in the final ten minutes comes from weight and wording. A timer that animates manufactures panic.' },
          { t: 'Workspace skeletons', d: 'Static placeholders instead of shimmer. A shimmer implies work is happening, which may not be true when a request has already failed.' },
          { t: 'Task content entrances', d: 'The brief, reference documents, and draft appear immediately. A candidate paying for that time should not wait on a fade.' },
          { t: 'Keyboard-triggered actions', d: 'Anything reached by shortcut resolves instantly. Someone using the keyboard is optimising for speed; animation cancels the benefit.' }].
          map((x) =>
          <div key={x.t} className="rounded-md border border-dashed border-line-strong p-3">
              <p className="text-13 font-semibold text-fg-primary">{x.t}</p>
              <p className="mt-1 text-13 leading-6 text-fg-secondary">{x.d}</p>
            </div>
          )}
        </div>
      </DocSection>

      <DocSection
        title="Reduced motion"
        description="Implemented once, globally, and then verified per component rather than re-declared.">
        
        <Alert
          tone="info"
          title="Under prefers-reduced-motion"
          children="Every transition collapses to a 100ms opacity change. Smooth scrolling becomes instant. The streaming caret stops and is replaced by a static “Responding” label, so the state is still legible without movement. No information is only available to someone who can see motion." />
        
        <DoDont
          className="mt-4"
          doText="Reduce motion to a short opacity change and keep every state legible in text. Announce the state instead of showing it move."
          dontText="Disabling animation and leaving the user with no indication that anything changed — or keeping a looping caret because it is “subtle”." />
        
      </DocSection>
    </>);

}