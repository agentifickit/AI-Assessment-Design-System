import React from 'react';
import { PageHeader } from '../../components/docs/PageHeader';
import { DocSection } from '../../components/docs/DocSection';
import { DoDont } from '../../components/docs/DoDont';
import { Alert } from '../../components/ui/Alert';

const pairs: {context: string;use: string;avoid: string;why: string;}[] = [
{
  context: 'Evidence is missing',
  use: 'Evidence not captured',
  avoid: 'No evidence found',
  why: '“Not captured” names our failure. “Not found” implies we looked and the candidate came up short.'
},
{
  context: 'A behaviour did not appear',
  use: 'This behaviour was not observed',
  avoid: 'Candidate did not demonstrate this',
  why: 'The first describes our record. The second asserts something about the person that a single task cannot establish.'
},
{
  context: 'An AI draft awaits a human',
  use: 'AI-generated draft, human review required',
  avoid: 'AI assessment complete',
  why: 'No conclusion exists until a named person signs it. Saying “complete” misrepresents where accountability sits.'
},
{
  context: 'A conclusion is final',
  use: 'Reviewer-approved',
  avoid: 'Verified or Confirmed',
  why: '“Reviewer-approved” names who is accountable. The alternatives imply a machine check the product does not perform.'
},
{
  context: 'The assistant is generating',
  use: 'Responding',
  avoid: 'AI is thinking',
  why: 'We can observe output arriving. We cannot observe reasoning, and implying we can is a claim about the model we cannot support.'
},
{
  context: 'Work is stored',
  use: 'Your work is saved',
  avoid: 'Autosaved or Synced',
  why: 'Plain language, and it answers the question the candidate is actually asking under time pressure.'
},
{
  context: 'Before submitting',
  use: 'You can review before submitting',
  avoid: 'Are you sure?',
  why: 'The first offers a next step. The second invites doubt without giving anything to act on.'
},
{
  context: 'A candidate performed poorly',
  use: 'Partially demonstrated, development area',
  avoid: 'Candidate failed or Weak performance',
  why: 'The assessment produces evidence for a human decision. It does not issue verdicts.'
},
{
  context: 'Describing a rating',
  use: 'Rated on 4 linked moments',
  avoid: 'Objective score: 3.2 / 5',
  why: 'There is no score in this product. A number implies a precision and a comparability the method does not have.'
},
{
  context: 'Two facts side by side',
  use: 'Candidate, 06:25',
  avoid: 'A middle dot between them',
  why: 'The middle dot reads as machine-made copy. Join two facts with a comma, give them a column each, or write the sentence.'
},
{
  context: 'A prompt was ineffective',
  use: 'The request did not specify the audience',
  avoid: 'Bad prompt',
  why: 'Name the observable gap. “Bad” is a judgement with no evidence attached and nothing a person can learn from.'
}];


export function ContentPage() {
  return (
    <>
      <PageHeader
        eyebrow="Standards"
        title="Content and tone"
        intro="Direct, calm, specific, and non-judgemental. Copy in this product decides whether a candidate trusts the process and whether a hiring manager understands the limits of what they are reading — it is not decoration on the interface." />
      

      <Alert
        className="mb-8"
        tone="neutral"
        title="Four rules behind everything below"
        children="Describe what was observed, not what it proves. Name the human who is accountable. State a system failure as ours. Never let a number stand in for a judgement." />
      

      <DocSection
        title="Preferred phrasing"
        description="Each pair is a real decision made in this system, with the reason recorded so it survives someone rewriting the copy later.">
        
        <div className="overflow-hidden rounded-md border border-line bg-surface">
          <table className="w-full border-collapse text-13">
            <caption className="sr-only">Preferred and avoided phrasing with rationale</caption>
            <thead>
              <tr className="border-b border-line bg-surface-subtle">
                {['Context', 'Use', 'Avoid', 'Why'].map((h) =>
                <th key={h} scope="col" className="px-3 py-2 text-left text-2xs font-semibold uppercase tracking-wide text-fg-muted">
                    {h}
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {pairs.map((p) =>
              <tr key={p.context} className="border-b border-line-subtle last:border-b-0 align-top">
                  <th scope="row" className="w-40 px-3 py-2.5 text-left font-medium text-fg-primary">{p.context}</th>
                  <td className="w-56 px-3 py-2.5">
                    <span className="rounded-xs border border-success-border bg-success-bg px-1.5 py-0.5 text-2xs text-success-fg">
                      {p.use}
                    </span>
                  </td>
                  <td className="w-56 px-3 py-2.5">
                    <span className="rounded-xs border border-danger-border bg-danger-bg px-1.5 py-0.5 text-2xs text-danger-fg line-through decoration-1">
                      {p.avoid}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 leading-6 text-fg-secondary">{p.why}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocSection
        title="Errors and recovery"
        description="During a timed assessment an error message has one job: tell the candidate their work is safe and what happens next.">
        
        <DoDont
          doText={
          <>
              <p className="font-medium text-fg-primary">The response could not be completed.</p>
              <p className="mt-1">
                Your message and draft are saved, and your time has been paused while this is resolved. You can retry
                now or keep working on your draft.
              </p>
              <p className="mt-2 text-2xs text-fg-muted">
                Names the fault, states what happened to their work and their time, gives two next steps.
              </p>
            </>
          }
          dontText={
          <>
              <p className="font-medium text-fg-primary">Something went wrong. Please try again.</p>
              <p className="mt-2 text-2xs text-fg-muted">
                Says nothing about the draft, nothing about the clock, and gives a candidate under time pressure no
                information they can act on.
              </p>
            </>
          } />
        
      </DocSection>

      <DocSection
        title="Writing for each audience"
        description="Same facts, different questions being asked.">
        
        <div className="grid gap-3 sm:grid-cols-2">
          {[
          { t: 'Candidate', d: 'Answers “am I doing this right, and is my work safe?” Second person, present tense, no assessment jargon. Never hints at how they are performing — that is not established yet and implying it changes their behaviour.' },
          { t: 'Reviewer', d: 'Answers “what does the evidence actually support?” Precise and clinical. Every AI-authored sentence is labelled, and confidence is stated rather than implied by tone.' },
          { t: 'Hiring manager', d: 'Answers “what can I conclude from this?” Plain language with the limits stated in the same voice as the findings, not relegated to a footnote.' },
          { t: 'Administrator', d: 'Answers “what is the state of things and who did what?” Factual and timestamped. Attributes every change to a named person.' }].
          map((x) =>
          <div key={x.t} className="rounded-md border border-line bg-surface p-3.5">
              <p className="text-13 font-semibold text-fg-primary">{x.t}</p>
              <p className="mt-1 text-13 leading-6 text-fg-secondary">{x.d}</p>
            </div>
          )}
        </div>
      </DocSection>
    </>);

}