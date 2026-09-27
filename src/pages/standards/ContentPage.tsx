import React from 'react';
import { CheckIcon } from 'lucide-react';
import { PageHeader } from '../../components/docs/PageHeader';
import { DocSection } from '../../components/docs/DocSection';
import { DoDont } from '../../components/docs/DoDont';
import { Alert } from '../../components/ui/Alert';
import { Badge } from '../../components/ui/Badge';
import { statusWords, type StatusWord } from '../../data/statusWords';

/** The one tone map: `dot` for every word but Verified, which takes the check. */
function StatusWordBadge({ status }: {status: StatusWord;}) {
  return status.glyph === 'check' ?
  <Badge tone={status.tone} icon={<CheckIcon className="h-3 w-3 shrink-0" strokeWidth={2.5} aria-hidden="true" />}>
      {status.label}
    </Badge> :

  <Badge tone={status.tone} dot>
      {status.label}
    </Badge>;

}

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
  context: 'A report is final',
  use: 'Verified',
  avoid: 'AI-verified or Confirmed',
  why: '“Verified” means a named Plural reviewer checked the report and released it (V1 decision C4, human-verified). A person did the checking, so the word never takes “AI-”, and wherever there is room it names them: “Verified by J. Okonkwo, 15 Aug”. It is the one word for this state in the pipeline, the queue and the report.'
},
{
  context: 'Saying what was verified',
  use: 'Verified report',
  avoid: 'Verified candidate',
  why: 'Verification covers the report: a reviewer checked what it says against the evidence it cites. It says nothing about the person, their identity or their credentials, so the word qualifies the report and never the candidate.'
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
        title="Status words"
        description="Decided with the candidate pipeline and the report (PLU-097 D-4, PLU-105 D-17, DS-26, 2026-09-27): one set of words and one tone map for the pipeline, the verification queue and the report. Each is a Badge with its dot, and the word is always present, so the tone is never the only cue. An approved report takes no hue: Verified is neutral, with the check glyph in place of the dot.">

        <div className="overflow-hidden rounded-md border border-line bg-surface">
          <table className="w-full border-collapse text-13">
            <caption className="sr-only">Status words, their badge tone and who sees them</caption>
            <thead>
              <tr className="border-b border-line bg-surface-subtle">
                {['Word', 'Tone', 'Shown to', 'Means'].map((h) =>
                <th key={h} scope="col" className="px-3 py-2 text-left text-2xs font-semibold uppercase tracking-wide text-fg-muted">
                    {h}
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {statusWords.map((s) =>
              <tr key={s.id} className="border-b border-line-subtle last:border-b-0 align-top">
                  <th scope="row" className="w-44 px-3 py-2.5 text-left font-normal">
                    <StatusWordBadge status={s} />
                  </th>
                  <td className="w-40 px-3 py-2.5 text-fg-secondary">
                    <code className="font-mono text-2xs text-fg-primary">{s.tone}</code>
                    {s.glyph === 'check' ? ', check glyph' : ', dot'}
                  </td>
                  <td className="w-48 px-3 py-2.5 text-fg-secondary">{s.adminOnly ? 'Plural admins only' : 'Recruiters and admins'}</td>
                  <td className="px-3 py-2.5 leading-6 text-fg-secondary">{s.meaning}</td>
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