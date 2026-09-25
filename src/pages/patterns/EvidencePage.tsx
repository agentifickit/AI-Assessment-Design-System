import React from 'react';
import { PageHeader } from '../../components/docs/PageHeader';
import { DocSection } from '../../components/docs/DocSection';
import { Example } from '../../components/docs/Example';
import { DoDont } from '../../components/docs/DoDont';
import { SpecList } from '../../components/docs/SpecList';
import { EvaluationLayerStack } from '../../components/evidence/EvaluationLayerStack';
import { SourceEvent } from '../../components/evidence/SourceEvent';
import { EvidenceExcerpt } from '../../components/evidence/EvidenceExcerpt';
import { InterpretationBlock } from '../../components/evidence/InterpretationBlock';
import { ReviewerDecision } from '../../components/evidence/ReviewerDecision';
import { LimitationBlock } from '../../components/evidence/LimitationBlock';
import { EvidenceStateBadge } from '../../components/evidence/EvidenceStateBadge';
import { Alert } from '../../components/ui/Alert';
import { evidenceStates } from '../../data/evidenceStates';
import { moments } from '../../data/reviewContent';

const m = moments[1];

export function EvidencePage() {
  return (
    <>
      <PageHeader
        eyebrow="Patterns"
        title="Evidence and review"
        intro="The five-layer evidence model and the ten evidence states. A reader must always be able to tell whether they are looking at what happened, what it might mean, or what a human concluded — and the layers are ordered and labelled so that distinction survives being skim-read." />
      

      <DocSection
        title="The five layers"
        description="Rendered in fixed order by EvaluationLayerStack. A caller supplies named slots and cannot reorder them, so the grammar is identical in the reviewer workspace, the report, and the comparison detail.">
        
        <Example label="EvaluationLayerStack, all five layers present" tone="surface">
          <EvaluationLayerStack
            sourceEvent={
            <SourceEvent
              timestamp={m.timestamp}
              eventType={m.eventType}
              detail={m.source.detail}
              eventId={m.source.eventId} />

            }
            evidence={
            <EvidenceExcerpt
              state={m.evidenceState}
              quote={m.evidence!.quote}
              after={m.evidence!.after}
              speaker={m.evidence!.speaker}
              timestamp={m.timestamp}
              sourceLabel={m.evidence!.sourceLabel} />

            }
            interpretation={
            <InterpretationBlock
              confidence={m.interpretation!.confidence}
              evidenceCount={m.interpretation!.evidenceCount}>
              
                {m.interpretation!.text}
              </InterpretationBlock>
            }
            decision={
            <ReviewerDecision
              reviewer={m.decision!.reviewer}
              role={m.decision!.role}
              timestamp={m.decision!.timestamp}
              overrode={m.decision!.overrode}
              approved={m.decision!.approved}>
              
                {m.decision!.text}
              </ReviewerDecision>
            } />
          
        </Example>

        <SpecList
          className="mt-4"
          columns={1}
          entries={[
          { term: 'Layer 1, Source event', detail: 'What happened, verbatim, with an event id. Set in mono on a sunken surface — mono marks the machine record, so it is never confusable with our narration.' },
          { term: 'Layer 2, Evidence', detail: 'The relevant observed behaviour, quoted in a figure/blockquote with the surrounding context dimmed. The quote is marked, never paraphrased.' },
          { term: 'Layer 3, Interpretation', detail: 'What the behaviour may indicate. Always labelled as an AI-generated draft, always carries a confidence band, and shows a notice when no evidence is linked.' },
          { term: 'Layer 4, Reviewer decision', detail: 'The accountable human conclusion, with a named person and role. An override keeps the original AI text available in a disclosure rather than deleting it.' },
          { term: 'Layer 5, Limitation', detail: 'What was not observed or cannot be concluded. Dashed border, same visual weight as a finding — a limitation is a result, not a footnote.' }]
          } />
        
      </DocSection>

      <DocSection
        title="Missing layers stay visible"
        description="An omitted layer renders an explicit placeholder rather than disappearing, so a reader can distinguish “there is no reviewer decision” from “the reviewer decision is off screen”.">
        
        <Example label="EvaluationLayerStack, evidence captured, no human conclusion yet" tone="surface">
          <EvaluationLayerStack
            sourceEvent={
            <SourceEvent
              timestamp={moments[2].timestamp}
              eventType={moments[2].eventType}
              detail={moments[2].source.detail}
              eventId={moments[2].source.eventId} />

            }
            evidence={
            <EvidenceExcerpt
              state={moments[2].evidenceState}
              quote={moments[2].evidence!.quote}
              after={moments[2].evidence!.after}
              speaker={moments[2].evidence!.speaker}
              timestamp={moments[2].timestamp}
              sourceLabel={moments[2].evidence!.sourceLabel} />

            }
            interpretation={
            <InterpretationBlock
              confidence={moments[2].interpretation!.confidence}
              evidenceCount={moments[2].interpretation!.evidenceCount}>
              
                {moments[2].interpretation!.text}
              </InterpretationBlock>
            } />
          
        </Example>
      </DocSection>

      <DocSection
        title="Evidence states"
        description="Ten states, each with a distinct glyph, a written label, and a restrained hue — in that order of importance. The hue only helps someone re-find a state they already know.">
        
        <Alert
          tone="neutral"
          title="Categorical, not graded"
          children="These hues do not form a scale. There is no red/amber/green ranking, because “incomplete evidence” is not worse than “neutral observation” — it is a different kind of thing. Any implementation that sorts or grades by hue has misread the system." />
        
        <div className="mt-4 overflow-hidden rounded-md border border-line bg-surface">
          <table className="w-full border-collapse text-13">
            <caption className="sr-only">The ten evidence states and their meanings</caption>
            <thead>
              <tr className="border-b border-line bg-surface-subtle">
                <th scope="col" className="w-56 px-3 py-2 text-left text-2xs font-semibold uppercase tracking-wide text-fg-muted">State</th>
                <th scope="col" className="px-3 py-2 text-left text-2xs font-semibold uppercase tracking-wide text-fg-muted">Meaning</th>
              </tr>
            </thead>
            <tbody>
              {evidenceStates.map((s) =>
              <tr key={s.id} className="border-b border-line-subtle last:border-b-0 align-top">
                  <th scope="row" className="px-3 py-2.5 text-left">
                    <EvidenceStateBadge state={s.id} size="sm" />
                  </th>
                  <td className="px-3 py-2.5 leading-6 text-fg-secondary">{s.meaning}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocSection title="Limitations">
        <Example label="LimitationBlock, capture failure" tone="surface">
          <LimitationBlock
            state="incomplete"
            title={moments[3].limitation!.title}
            reason={moments[3].limitation!.reason}
            doesNotImply={moments[3].limitation!.doesNotImply} />
          
        </Example>
        <DoDont
          className="mt-4"
          doText={<>State the fault as ours, give the window, and say explicitly what it does not imply. “Evidence not captured — a connection interruption at 13:38 prevented capture. This does not indicate how the candidate performed.”</>}
          dontText={<>Hiding the gap, scoring it as zero, or writing it as a candidate property: “No evidence of context-setting”, “Candidate did not demonstrate Description”, or a blank cell with no explanation.</>} />
        
      </DocSection>
    </>);

}