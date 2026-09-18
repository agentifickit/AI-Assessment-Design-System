import React, { useState } from 'react';
import { ChevronDownIcon, DownloadIcon, ShareIcon } from 'lucide-react';
import { ScreenFrame } from '../../components/docs/ScreenFrame';
import { DimensionProfile } from '../../components/dimensions/DimensionProfile';
import { DimensionBadge } from '../../components/dimensions/DimensionBadge';
import { EvaluationLayerStack } from '../../components/evidence/EvaluationLayerStack';
import { SourceEvent } from '../../components/evidence/SourceEvent';
import { EvidenceExcerpt } from '../../components/evidence/EvidenceExcerpt';
import { InterpretationBlock } from '../../components/evidence/InterpretationBlock';
import { ReviewerDecision } from '../../components/evidence/ReviewerDecision';
import { LimitationBlock } from '../../components/evidence/LimitationBlock';
import { OpportunityStateBadge } from '../../components/evidence/OpportunityStateBadge';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Alert } from '../../components/ui/Alert';
import { KeyValueList } from '../../components/ui/KeyValueList';
import { cn } from '../../utils/cn';
import { candidate, dimensionResults, moments } from '../../data/reviewContent';

const sections = [
{ id: 'summary', label: 'Summary' },
{ id: 'profile', label: 'Behaviour profile' },
{ id: 'findings', label: 'Evidence-linked findings' },
{ id: 'strengths', label: 'Strengths' },
{ id: 'development', label: 'Development areas' },
{ id: 'uncertainty', label: 'Uncertainty' },
{ id: 'scope', label: 'Scope and limitations' },
{ id: 'followup', label: 'Follow-up questions' }];


const findings = moments.filter((m) => m.evidence && m.interpretation);

const followUps = [
{
  dimension: 'delegation' as const,
  q: 'Walk me through a time you decided a task was not worth handing to an assistant. What made you keep it?',
  why: 'One moment in this session shows manual correction rather than re-scoping. The session cannot tell us which judgement drove it.'
},
{
  dimension: 'description' as const,
  q: 'How do you decide what background an assistant needs before you ask for work?',
  why: 'Description could not be assessed in this session because of a capture failure. This question is not a follow-up on weakness — the behaviour was never observed.'
},
{
  dimension: 'diligence' as const,
  q: 'You wrote down what your recommendation did not establish. Is that habitual, and where did it come from?',
  why: 'Strong unprompted evidence here. Worth confirming it generalises beyond a written exercise.'
}];


export function ReportScreen() {
  const [open, setOpen] = useState<string | null>(findings[0]?.id ?? null);

  return (
    <ScreenFrame
      title="Candidate evidence report"
      audience="Recruiter or hiring manager"
      summary="A 720px reading column with a sticky in-page contents. Every finding links to the evidence it rests on and names the reviewer who approved it. There is no overall score and no hire recommendation — the report informs a human decision rather than making one."
      uses={['DimensionProfile', 'EvaluationLayerStack', 'EvidenceExcerpt', 'ReviewerDecision', 'LimitationBlock', 'OpportunityStateBadge']}>
      
      <div className="mx-auto flex max-w-[64rem] gap-8">
        {/* Sticky in-page contents — collapses to a disclosure below 1024px. */}
        <nav aria-label="Report contents" className="hidden w-44 shrink-0 lg:block">
          <div className="sticky top-4">
            <p className="mb-2 text-2xs font-semibold uppercase tracking-wide text-fg-muted">Contents</p>
            <ul className="flex flex-col gap-0.5 border-l border-line">
              {sections.map((s) =>
              <li key={s.id}>
                  <a
                  href={`#${s.id}`}
                  className="-ml-px block border-l-2 border-transparent py-1 pl-2.5 text-13 text-fg-secondary transition-colors duration-100 ease-enter hover:border-brand hover:text-fg-primary">
                  
                    {s.label}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </nav>

        <article className="min-w-0 max-w-measure flex-1">
          <header className="border-b border-line pb-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-2xs text-fg-muted">{candidate.assessment}</p>
                <h1 className="mt-1 text-xl font-semibold tracking-[-0.01em] text-fg-primary">{candidate.name}</h1>
                <p className="mt-1 font-mono text-2xs text-fg-muted">{candidate.reference}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Button variant="secondary" size="sm" icon={<ShareIcon className="h-3.5 w-3.5" />}>
                  Share
                </Button>
                <Button variant="secondary" size="sm" icon={<DownloadIcon className="h-3.5 w-3.5" />}>
                  Download PDF
                </Button>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Badge tone="success">Reviewer-approved</Badge>
              <Badge tone="neutral">Released 15 Aug</Badge>
              <span className="text-2xs text-fg-muted">
                Approved by {candidate.reviewer}, {candidate.reviewerRole}
              </span>
            </div>
          </header>

          <section id="summary" className="scroll-mt-4 border-b border-line py-6">
            <h2 className="text-base font-semibold text-fg-primary">Summary</h2>
            <p className="mt-2.5 text-sm leading-7 text-fg-secondary">
              In a 52-minute campaign-positioning task, this candidate consistently checked what the assistant produced
              against the source material before using it, and recorded the limits of their own conclusion without being
              prompted. They scoped work before delegating it, instructing the assistant to establish the evidence base
              before drafting.
            </p>
            <p className="mt-3 text-sm leading-7 text-fg-secondary">
              One dimension — Description — could not be assessed. A connection interruption prevented evidence capture
              during the only sustained context-setting exchange in the session. This is a gap in our record, not an
              observation about the candidate.
            </p>
            <Alert
              className="mt-4"
              tone="neutral"
              title="What this report is for"
              children="This report describes behaviour observed in one task. It does not rank candidates, produce a score, or recommend a hiring decision. Use it alongside your own assessment." />
            
          </section>

          <section id="profile" className="scroll-mt-4 border-b border-line py-6">
            <h2 className="text-base font-semibold text-fg-primary">Behaviour profile</h2>
            <p className="mt-2 text-13 leading-6 text-fg-secondary">
              Four dimensions, each rated on its own evidence. The ratings are not combined.
            </p>
            <DimensionProfile className="mt-4" results={dimensionResults} />
          </section>

          <section id="findings" className="scroll-mt-4 border-b border-line py-6">
            <h2 className="text-base font-semibold text-fg-primary">Evidence-linked findings</h2>
            <p className="mt-2 text-13 leading-6 text-fg-secondary">
              Each finding opens to the full evidence chain: what happened, what was observed, how it was interpreted,
              and who signed it off.
            </p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {findings.map((f) => {
                const isOpen = open === f.id;
                return (
                  <li key={f.id} className="rounded-md border border-line bg-surface">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : f.id)}
                      aria-expanded={isOpen}
                      className="flex w-full items-start justify-between gap-3 px-3.5 py-3 text-left">
                      
                      <span className="min-w-0">
                        <span className="flex flex-wrap items-center gap-2">
                          <DimensionBadge dimension={f.dimension} size="sm" />
                          <span className="font-mono text-2xs text-fg-muted tnum">{f.timestamp}</span>
                        </span>
                        <span className="mt-1.5 block text-13 font-medium leading-6 text-fg-primary">{f.summary}</span>
                      </span>
                      <ChevronDownIcon
                        className={cn(
                          'mt-0.5 h-4 w-4 shrink-0 text-fg-muted transition-transform duration-140 ease-enter',
                          isOpen && 'rotate-180'
                        )}
                        aria-hidden="true" />
                      
                    </button>
                    {isOpen &&
                    <div className="border-t border-line-subtle p-3.5">
                        <EvaluationLayerStack
                        sourceEvent={
                        <SourceEvent
                          timestamp={f.timestamp}
                          eventType={f.eventType}
                          detail={f.source.detail}
                          eventId={f.source.eventId} />

                        }
                        evidence={
                        f.evidence ?
                        <EvidenceExcerpt
                          state={f.evidenceState}
                          before={f.evidence.before}
                          quote={f.evidence.quote}
                          after={f.evidence.after}
                          speaker={f.evidence.speaker}
                          timestamp={f.timestamp}
                          sourceLabel={f.evidence.sourceLabel} /> :

                        undefined
                        }
                        interpretation={
                        f.interpretation ?
                        <InterpretationBlock
                          confidence={f.interpretation.confidence}
                          evidenceCount={f.interpretation.evidenceCount}>
                          
                                {f.interpretation.text}
                              </InterpretationBlock> :
                        undefined
                        }
                        decision={
                        f.decision ?
                        <ReviewerDecision
                          reviewer={f.decision.reviewer}
                          role={f.decision.role}
                          timestamp={f.decision.timestamp}
                          overrode={f.decision.overrode}
                          approved={f.decision.approved}>
                          
                                {f.decision.text}
                              </ReviewerDecision> :
                        undefined
                        }
                        limitation={
                        f.limitation ?
                        <LimitationBlock
                          state={f.limitation.state}
                          title={f.limitation.title}
                          reason={f.limitation.reason}
                          doesNotImply={f.limitation.doesNotImply} /> :

                        undefined
                        } />
                      
                      </div>
                    }
                  </li>);

              })}
            </ul>
          </section>

          <section id="strengths" className="scroll-mt-4 border-b border-line py-6">
            <h2 className="text-base font-semibold text-fg-primary">Strengths</h2>
            <ul className="mt-3 flex flex-col gap-3">
              {[
              {
                d: 'diligence' as const,
                t: 'Verified figures against the source before using them',
                b: 'Opened the churn review immediately before writing each of the two statistics in the final draft. Both match the source.'
              },
              {
                d: 'discernment' as const,
                t: 'Identified a contradiction the brief did not point out',
                b: 'Noticed that the existing campaign led on features while the churn data attributed loss to operational causes, and argued for a change of angle.'
              }].
              map((s) =>
              <li key={s.t} className="rounded-md border border-line bg-surface p-3.5">
                  <DimensionBadge dimension={s.d} size="sm" />
                  <p className="mt-2 text-13 font-medium text-fg-primary">{s.t}</p>
                  <p className="mt-1 text-13 leading-6 text-fg-secondary">{s.b}</p>
                </li>
              )}
            </ul>
          </section>

          <section id="development" className="scroll-mt-4 border-b border-line py-6">
            <h2 className="text-base font-semibold text-fg-primary">Development areas</h2>
            <p className="mt-2 text-13 leading-6 text-fg-secondary">
              Described as an absence with the opportunity linked, never as a low rating.
            </p>
            <div className="mt-3 rounded-md border border-line bg-surface p-3.5">
              <div className="flex flex-wrap items-center gap-2">
                <DimensionBadge dimension="delegation" size="sm" />
                <OpportunityStateBadge state="not-observed" size="sm" />
              </div>
              <p className="mt-2 text-13 font-medium text-fg-primary">
                Did not re-scope after a weak result
              </p>
              <p className="mt-1 text-13 leading-6 text-fg-secondary">
                When the assistant repeated an earlier paragraph, the candidate corrected it by hand rather than
                revising the request. Editing manually is a legitimate choice; the session does not show which
                judgement drove it.
              </p>
            </div>
          </section>

          <section id="uncertainty" className="scroll-mt-4 border-b border-line py-6">
            <h2 className="text-base font-semibold text-fg-primary">Uncertainty</h2>
            <div className="mt-3 flex flex-col gap-3">
              <LimitationBlock
                state="incomplete"
                title="Description was not assessed"
                reason="A connection interruption between 13:38 and 13:40 prevented capture of the only sustained context-setting exchange in this session."
                doesNotImply="This does not indicate that the candidate provides poor context. The behaviour was never recorded." />
              
              <LimitationBlock
                state="unmeasured"
                title="One interpretation could not be resolved"
                reason="The session cannot distinguish between a deliberate choice to edit manually and not considering a re-prompt."
                doesNotImply="This is not evidence of weak delegation." />
              
            </div>
          </section>

          <section id="scope" className="scroll-mt-4 border-b border-line py-6">
            <h2 className="text-base font-semibold text-fg-primary">Scope and limitations</h2>
            <KeyValueList
              className="mt-3"
              variant="rows"
              items={[
              { key: 'What was assessed', value: 'One 75-minute marketing positioning task' },
              { key: 'Time used', value: candidate.duration, mono: true },
              { key: 'Dimensions rated', value: '3 of 4', mono: true },
              { key: 'Evidence gaps', value: '1 capture failure (2 min)', mono: true },
              { key: 'Reviewed by', value: `${candidate.reviewer}, ${candidate.reviewerRole}` },
              { key: 'Interpretations overridden', value: '1 of 5', mono: true }]
              } />
            
            <p className="mt-4 text-13 leading-6 text-fg-secondary">
              This assessment observes how a person worked with an assistant on one realistic task. It does not measure
              domain expertise, collaboration with colleagues, performance under different tooling, or how the person
              would work over a longer horizon. It should not be treated as a general aptitude measure.
            </p>
          </section>

          <section id="followup" className="scroll-mt-4 py-6">
            <h2 className="text-base font-semibold text-fg-primary">Suggested follow-up questions</h2>
            <p className="mt-2 text-13 leading-6 text-fg-secondary">
              Drafted from the evidence, for a human interviewer to use or discard.
            </p>
            <ol className="mt-4 flex flex-col gap-3">
              {followUps.map((f, i) =>
              <li key={f.q} className="rounded-md border border-line bg-surface p-3.5">
                  <div className="flex items-baseline gap-2.5">
                    <span className="font-mono text-2xs text-fg-muted tnum">{String(i + 1).padStart(2, '0')}</span>
                    <DimensionBadge dimension={f.dimension} size="sm" />
                  </div>
                  <p className="mt-2 text-13 font-medium leading-6 text-fg-primary">{f.q}</p>
                  <p className="mt-1.5 text-2xs leading-5 text-fg-muted">
                    Why this question: {f.why}
                  </p>
                </li>
              )}
            </ol>
          </section>
        </article>
      </div>
    </ScreenFrame>);

}