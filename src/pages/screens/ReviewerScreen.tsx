import React, { useMemo, useState } from 'react';
import { CheckIcon, TriangleAlertIcon } from 'lucide-react';
import { ScreenFrame } from '../../components/docs/ScreenFrame';
import { PanelRegion } from '../../components/layout/PanelRegion';
import { EvaluationLayerStack } from '../../components/evidence/EvaluationLayerStack';
import { SourceEvent } from '../../components/evidence/SourceEvent';
import { EvidenceExcerpt } from '../../components/evidence/EvidenceExcerpt';
import { InterpretationBlock } from '../../components/evidence/InterpretationBlock';
import { ReviewerDecision } from '../../components/evidence/ReviewerDecision';
import { LimitationBlock } from '../../components/evidence/LimitationBlock';
import { ReviewerAnnotation } from '../../components/evidence/ReviewerAnnotation';
import { EvidenceStateBadge } from '../../components/evidence/EvidenceStateBadge';
import { OpportunityStateBadge } from '../../components/evidence/OpportunityStateBadge';
import { BehaviourRating } from '../../components/evidence/BehaviourRating';
import { DimensionBadge } from '../../components/dimensions/DimensionBadge';
import { DimensionCoverage } from '../../components/dimensions/DimensionCoverage';
import { Button } from '../../components/ui/Button';
import { ButtonGroup } from '../../components/ui/ButtonGroup';
import { Textarea } from '../../components/ui/Textarea';
import { KeyValueList } from '../../components/ui/KeyValueList';
import { cn } from '../../utils/cn';
import { candidate, coverage, moments } from '../../data/reviewContent';
import { dimensionMap, dimensionOrder } from '../../data/dimensions';
import type { DimensionId } from '../../types/framework';
import type { BehaviourBand } from '../../types/system';

export function ReviewerScreen() {
  const [selectedId, setSelectedId] = useState(moments[0].id);
  const [filter, setFilter] = useState<'all' | DimensionId>('all');
  const [note, setNote] = useState('');
  const [bands, setBands] = useState<Partial<Record<DimensionId, BehaviourBand>>>({
    delegation: 'demonstrated',
    discernment: 'consistently-demonstrated',
    diligence: 'consistently-demonstrated'
  });

  const visible = useMemo(
    () => filter === 'all' ? moments : moments.filter((m) => m.dimension === filter),
    [filter]
  );
  const selected = moments.find((m) => m.id === selectedId) ?? moments[0];

  return (
    <ScreenFrame
      title="Reviewer evidence workspace"
      audience="Assessment reviewer"
      summary="A session timeline tagged by dimension, an inspector showing all five evaluation layers for the selected moment, and an evaluation panel where the accountable human records their conclusion. Compact density — this is a desktop operator surface."
      uses={[
      'PanelRegion',
      'EvaluationLayerStack',
      'SourceEvent',
      'EvidenceExcerpt',
      'InterpretationBlock',
      'ReviewerDecision',
      'LimitationBlock',
      'ReviewerAnnotation',
      'BehaviourRating',
      'DimensionBadge',
      'OpportunityStateBadge']
      }
      bleed>
      
      <div className="flex h-[min(80vh,900px)] min-h-0 flex-col" data-density="compact">
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-line bg-surface px-3 py-2">
          <div className="min-w-0">
            <h2 className="truncate text-13 font-semibold text-fg-primary">
              {candidate.name} <span className="font-mono text-2xs font-normal text-fg-muted">{candidate.reference}</span>
            </h2>
            <p className="text-2xs text-fg-muted">
              {candidate.assessment} · completed {candidate.completedAt} · {candidate.duration}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" icon={<TriangleAlertIcon className="h-3.5 w-3.5" />}>
              Escalate
            </Button>
            <Button variant="primary" icon={<CheckIcon className="h-3.5 w-3.5" />}>
              Approve for release
            </Button>
          </div>
        </div>

        <div className="flex min-h-0 flex-1 gap-1.5 p-1.5">
          {/* Timeline rail — 320px, fixed. */}
          <div className="hidden w-[320px] shrink-0 lg:flex">
            <PanelRegion
              label="Session timeline"
              heading="Timeline"
              headerAside={<span className="text-2xs text-fg-muted tnum">{visible.length} moments</span>}>
              
              <div className="border-b border-line-subtle p-2">
                <ButtonGroup
                  size="sm"
                  label="Filter timeline by dimension"
                  value={filter}
                  onChange={(v) => setFilter(v as 'all' | DimensionId)}
                  options={[
                  { value: 'all', label: 'All' },
                  ...dimensionOrder.map((d) => ({ value: d, label: dimensionMap[d].code }))]
                  } />
                
              </div>
              <ol className="flex flex-col">
                {visible.map((m) => {
                  const active = m.id === selectedId;
                  return (
                    <li key={m.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedId(m.id)}
                        aria-current={active}
                        className={cn(
                          'flex w-full gap-2.5 border-b border-line-subtle px-2.5 py-2 text-left transition-colors duration-140 ease-enter hover:bg-surface-hover',
                          active && 'bg-surface-selected'
                        )}>
                        
                        {/* Instant marker — never waits on a transition. */}
                        <span
                          aria-hidden="true"
                          className={cn('w-0.5 shrink-0 rounded-full', active ? 'bg-brand' : 'bg-transparent')} />
                        
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center justify-between gap-2">
                            <span className="font-mono text-2xs text-fg-muted tnum">{m.timestamp}</span>
                            <DimensionBadge dimension={m.dimension} codeOnly size="sm" />
                          </span>
                          <span className="mt-1 block text-13 font-medium leading-5 text-fg-primary">{m.summary}</span>
                          <span className="mt-1.5 flex flex-wrap gap-1">
                            <EvidenceStateBadge state={m.evidenceState} size="sm" />
                            {m.opportunity !== 'observed' &&
                            <OpportunityStateBadge state={m.opportunity} size="sm" />
                            }
                          </span>
                        </span>
                      </button>
                    </li>);

                })}
              </ol>
            </PanelRegion>
          </div>

          {/* Inspector — flexible. */}
          <div className="flex min-h-0 min-w-0 flex-1">
            <PanelRegion
              label="Evidence inspector"
              heading={`Inspector · ${selected.timestamp}`}
              headerAside={<DimensionBadge dimension={selected.dimension} size="sm" />}>
              
              <div className="p-3">
                <EvaluationLayerStack
                  sourceEvent={
                  <SourceEvent
                    timestamp={selected.timestamp}
                    eventType={selected.eventType}
                    detail={selected.source.detail}
                    eventId={selected.source.eventId}
                    onJump={() => undefined} />

                  }
                  evidence={
                  selected.evidence ?
                  <EvidenceExcerpt
                    state={selected.evidenceState}
                    before={selected.evidence.before}
                    quote={selected.evidence.quote}
                    after={selected.evidence.after}
                    speaker={selected.evidence.speaker}
                    timestamp={selected.timestamp}
                    sourceLabel={selected.evidence.sourceLabel}
                    onOpenSource={() => undefined} /> :

                  undefined
                  }
                  interpretation={
                  selected.interpretation ?
                  <InterpretationBlock
                    confidence={selected.interpretation.confidence}
                    evidenceCount={selected.interpretation.evidenceCount}
                    actions={
                    <>
                            <Button variant="secondary" size="sm">
                              Accept as written
                            </Button>
                            <Button variant="tertiary" size="sm">
                              Override
                            </Button>
                          </>
                    }>
                    
                        {selected.interpretation.text}
                      </InterpretationBlock> :
                  undefined
                  }
                  decision={
                  selected.decision ?
                  <ReviewerDecision
                    reviewer={selected.decision.reviewer}
                    role={selected.decision.role}
                    timestamp={selected.decision.timestamp}
                    overrode={selected.decision.overrode}
                    approved={selected.decision.approved}>
                    
                        {selected.decision.text}
                      </ReviewerDecision> :
                  undefined
                  }
                  limitation={
                  selected.limitation ?
                  <LimitationBlock
                    state={selected.limitation.state}
                    title={selected.limitation.title}
                    reason={selected.limitation.reason}
                    doesNotImply={selected.limitation.doesNotImply} /> :

                  undefined
                  } />
                

                {selected.annotation &&
                <div className="mt-4 border-t border-line-subtle pt-4">
                    <ReviewerAnnotation
                    author={selected.annotation.author}
                    timestamp={selected.annotation.timestamp}
                    anchor={selected.annotation.anchor}>
                    
                      {selected.annotation.text}
                    </ReviewerAnnotation>
                  </div>
                }
              </div>
            </PanelRegion>
          </div>

          {/* Evaluation panel — 380px, becomes a drawer below 1280px. */}
          <div className="hidden w-[380px] shrink-0 xl:flex">
            <PanelRegion label="Behaviour evaluation" heading="Evaluation">
              <div className="flex flex-col gap-4 p-3">
                <section>
                  <h3 className="text-13 font-semibold text-fg-primary">Coverage</h3>
                  <p className="mt-1 text-2xs leading-5 text-fg-secondary">
                    What the session gave you, before any conclusion.
                  </p>
                  <DimensionCoverage className="mt-2.5" entries={coverage} />
                </section>

                <section className="border-t border-line-subtle pt-4">
                  <h3 className="text-13 font-semibold text-fg-primary">Ratings</h3>
                  <p className="mt-1 text-2xs leading-5 text-fg-secondary">
                    Rate only where a behaviour was observed. Dimensions without observation are recorded as
                    limitations, never as low ratings.
                  </p>
                  <div className="mt-3 flex flex-col gap-3.5">
                    {dimensionOrder.map((d) => {
                      const entry = coverage.find((c) => c.dimension === d);
                      const ratable = entry?.opportunities.includes('observed');
                      return (
                        <div key={d} className="rounded-md border border-line bg-surface p-2.5">
                          <DimensionBadge dimension={d} size="sm" />
                          <div className="mt-2">
                            {ratable ?
                            <BehaviourRating
                              name={`rating-${d}`}
                              value={bands[d] ?? null}
                              onChange={(band) => setBands((p) => ({ ...p, [d]: band }))} /> :


                            <div className="flex flex-col gap-1.5">
                                <OpportunityStateBadge state="capture-failed" size="sm" />
                                <p className="text-2xs leading-5 text-fg-secondary">
                                  Not ratable. {dimensionMap[d].label} cannot be rated from this session — record a
                                  limitation instead.
                                </p>
                              </div>
                            }
                          </div>
                        </div>);

                    })}
                  </div>
                </section>

                <section className="border-t border-line-subtle pt-4">
                  <Textarea
                    id="reviewer-note"
                    label="Reviewer note"
                    hint="Attributed to you in the report."
                    rows={4}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="What you concluded and why." />
                  
                  <div className="mt-2 flex items-center justify-end gap-2">
                    <Button variant="tertiary" size="sm">
                      Discard
                    </Button>
                    <Button variant="primary" size="sm" disabled={!note.trim()}>
                      Save note
                    </Button>
                  </div>
                </section>

                <section className="border-t border-line-subtle pt-4">
                  <KeyValueList
                    variant="rows"
                    items={[
                    { key: 'Reviewer', value: candidate.reviewer },
                    { key: 'Moments', value: String(moments.length), mono: true },
                    { key: 'Not captured', value: '1 period', mono: true },
                    { key: 'Status', value: 'Awaiting approval' }]
                    } />
                  
                </section>
              </div>
            </PanelRegion>
          </div>
        </div>
      </div>
    </ScreenFrame>);

}