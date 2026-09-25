import React, { useCallback, useRef, useState } from 'react';
import { FileTextIcon, PaperclipIcon, SendIcon } from 'lucide-react';
import { ScreenFrame } from '../../components/docs/ScreenFrame';
import { WorkspaceShell } from '../../components/layout/WorkspaceShell';
import { PanelRegion } from '../../components/layout/PanelRegion';
import { Message } from '../../components/ai/Message';
import { ToolActionRow } from '../../components/ai/ToolActionRow';
import { SourceChip } from '../../components/ai/SourceChip';
import { PromptComposer } from '../../components/ai/PromptComposer';
import { StreamAnnouncer, type StreamPhase } from '../../components/ai/StreamAnnouncer';
import { AssessmentTimer } from '../../components/assessment/AssessmentTimer';
import { SaveStatus } from '../../components/assessment/SaveStatus';
import { ConnectionStatus } from '../../components/assessment/ConnectionStatus';
import { Button } from '../../components/ui/Button';
import { Dialog } from '../../components/ui/Dialog';
import { Checkbox } from '../../components/ui/Checkbox';
import { Alert } from '../../components/ui/Alert';
import { KeyValueList } from '../../components/ui/KeyValueList';
import { Tag } from '../../components/ui/Tag';
import {
  draftContent,
  notSharedOnSubmit,
  referenceDocs,
  sharedOnSubmit,
  submissionChecklist,
  taskBrief,
  transcript } from
'../../data/workspaceContent';

export function WorkspaceScreen() {
  const [draft, setDraft] = useState(draftContent);
  const [prompt, setPrompt] = useState('');
  const [phase, setPhase] = useState<StreamPhase>('idle');
  const [reviewOpen, setReviewOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [checked, setChecked] = useState<Record<string, boolean>>(
    Object.fromEntries(submissionChecklist.map((c) => [c.id, c.done]))
  );
  const [openDoc, setOpenDoc] = useState<string>('churn');
  const timerRef = useRef<number | null>(null);

  const allChecked = submissionChecklist.every((c) => checked[c.id]);

  /** Deterministic simulation — no model call. Demonstrates the streaming
   *  contract: phase transitions drive the announcer, Stop stays reachable. */
  const send = useCallback(() => {
    if (!prompt.trim()) return;
    setPrompt('');
    setPhase('streaming');
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setPhase('complete'), 2200);
  }, [prompt]);

  const stop = useCallback(() => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setPhase('interrupted');
  }, []);

  const header =
  <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-3 py-2">
      <div className="min-w-0">
        <p className="text-2xs text-fg-muted">{taskBrief.assessment}</p>
        <h1 className="truncate text-13 font-semibold text-fg-primary">{taskBrief.taskName}</h1>
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
        <SaveStatus state="saved" savedAt="12s ago" />
        <ConnectionStatus state="stable" />
        <AssessmentTimer minutesRemaining={41} totalMinutes={taskBrief.totalMinutes} />
        <Button variant="primary" onClick={() => setReviewOpen(true)} disabled={submitted}>
          {submitted ? 'Submitted' : 'Review and submit'}
        </Button>
      </div>
    </div>;


  const brief =
  <PanelRegion label="Task brief and reference material">
      <div className="flex flex-col gap-4 p-3">
        <section>
          <h3 className="text-13 font-semibold text-fg-primary">Scenario</h3>
          <p className="mt-1.5 text-13 leading-6 text-fg-secondary">{taskBrief.scenario}</p>
        </section>

        <section className="rounded-md border border-line bg-surface-subtle p-3">
          <h3 className="text-13 font-semibold text-fg-primary">What to produce</h3>
          <p className="mt-1.5 text-13 leading-6 text-fg-secondary">{taskBrief.deliverable}</p>
          <KeyValueList
          className="mt-3"
          variant="inline"
          items={taskBrief.constraints.map((c) => ({ key: c.label, value: c.value }))} />
        
        </section>

        <section>
          <h3 className="text-13 font-semibold text-fg-primary">How this works</h3>
          <ul className="mt-1.5 flex list-disc flex-col gap-1.5 pl-4 text-13 leading-6 text-fg-secondary">
            {taskBrief.expectations.map((e) =>
          <li key={e}>{e}</li>
          )}
          </ul>
        </section>

        <section>
          <h3 className="text-13 font-semibold text-fg-primary">Reference material</h3>
          <ul className="mt-2 flex flex-col gap-1.5">
            {referenceDocs.map((d) => {
            const open = openDoc === d.id;
            return (
              <li key={d.id}>
                  <button
                  type="button"
                  onClick={() => setOpenDoc(open ? '' : d.id)}
                  aria-expanded={open}
                  className="w-full rounded-md border border-line bg-surface px-2.5 py-2 text-left transition-colors duration-100 ease-enter hover:bg-surface-hover">
                  
                    <span className="flex items-start gap-2">
                      <FileTextIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-fg-muted" aria-hidden="true" />
                      <span className="min-w-0">
                        <span className="block truncate text-13 font-medium text-fg-primary">{d.name}</span>
                        <span className="block text-2xs text-fg-muted">{d.meta}</span>
                      </span>
                    </span>
                    {open && <span className="mt-2 block text-13 leading-6 text-fg-secondary">{d.summary}</span>}
                  </button>
                </li>);

          })}
          </ul>
        </section>
      </div>
    </PanelRegion>;


  const conversation =
  <PanelRegion
    label="Conversation with the assistant"
    heading="Conversation"
    scroll={false}
    footer={
    <div className="p-2.5">
          <PromptComposer
        value={prompt}
        onChange={setPrompt}
        onSubmit={send}
        onStop={stop}
        state={phase === 'streaming' ? 'streaming' : 'idle'}
        attachments={[{ id: 'churn', name: 'Mid-market churn review.pdf', meta: 'PDF, 6 pages' }]}
        onAttach={() => undefined}
        suggestions={
        phase === 'streaming' ?
        undefined :
        ['Check my draft against the churn review', 'What have I not verified?']
        }
        onSuggestion={(s) => setPrompt(s)} />
      
        </div>
    }>
    
      <StreamAnnouncer phase={phase} />
      <div className="scroll-panel min-h-0 flex-1 overflow-y-auto px-3 py-3">
        {transcript.map((t) =>
      <Message
        key={t.id}
        author={t.author}
        authorLabel={t.authorLabel}
        timestamp={t.timestamp}
        onCopy={t.author === 'assistant' ? () => undefined : undefined}
        onRetry={t.author === 'assistant' ? () => undefined : undefined}
        onEdit={t.author === 'user' ? () => undefined : undefined}
        branch={
        t.branch ?
        { index: t.branch.index, total: t.branch.total, onPrev: () => undefined, onNext: () => undefined } :
        undefined
        }
        footer={
        t.sources ?
        <ul className="flex flex-wrap gap-1.5">
                  {t.sources.map((s) =>
          <li key={s.index}>
                      <SourceChip index={s.index} title={s.title} locator={s.locator} onOpen={() => setOpenDoc('churn')} />
                    </li>
          )}
                </ul> :
        undefined
        }>
        
            {t.tool &&
        <div className="mb-2">
                <ToolActionRow
            action={t.tool.action}
            status={t.tool.status}
            duration={t.tool.duration}
            detail={t.tool.detail} />
          
              </div>
        }
            {t.body.map((p, i) =>
        <p key={i} className={i > 0 ? 'mt-2.5' : undefined}>
                {p}
              </p>
        )}
          </Message>
      )}

        {phase === 'streaming' &&
      <Message author="assistant" authorLabel="Assistant" streaming onStop={stop}>
            <div aria-busy="true" aria-live="off">
              Comparing your draft against the churn review now — checking each figure you cite against the page it
              came from
            </div>
          </Message>
      }

        {phase === 'interrupted' &&
      <Message author="system" authorLabel="Task instruction" timestamp="13:52">
            Response stopped. Nothing was added to your draft.
          </Message>
      }
      </div>
    </PanelRegion>;


  const artifact =
  <PanelRegion
    label="Your draft"
    heading="Draft"
    headerAside={<span className="text-2xs text-fg-muted tnum">{draft.trim().split(/\s+/).length} words</span>}
    collapseSide="right"
    scroll={false}
    footer={
    <div className="flex items-center justify-between gap-2 px-3 py-2">
          <SaveStatus state="saved" savedAt="12s ago" />
          <Tag icon={<PaperclipIcon className="h-3 w-3" />}>Submitted as your deliverable</Tag>
        </div>
    }>
    
      <label htmlFor="workspace-draft" className="sr-only">
        Your draft deliverable
      </label>
      <textarea
      id="workspace-draft"
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      spellCheck
      className="scroll-panel min-h-0 w-full flex-1 resize-none border-0 bg-transparent px-3 py-3 text-13 leading-6 text-fg-primary outline-none placeholder:text-fg-muted" />
    
    </PanelRegion>;


  return (
    <ScreenFrame
      title="Candidate assessment workspace"
      audience="Assessed candidate"
      summary="The three-panel workspace under real content: task brief with reference material, a conversation with tool calls and citations, and the draft. The task header is sticky and carries the timer, save status, connection status, and the route to submission. Panels resize by pointer or keyboard and collapse to labelled edge tabs."
      uses={[
      'WorkspaceShell',
      'PanelRegion',
      'PanelSeparator',
      'Message',
      'PromptComposer',
      'ToolActionRow',
      'SourceChip',
      'AssessmentTimer',
      'SaveStatus',
      'ConnectionStatus',
      'Dialog']
      }
      bleed>
      
      <div className="relative h-[min(78vh,860px)]">
        <WorkspaceShell
          className="h-full"
          header={header}
          brief={brief}
          conversation={conversation}
          artifact={artifact} />
        
      </div>

      <Dialog
        open={reviewOpen}
        onClose={() => setReviewOpen(false)}
        title={submitted ? 'Assessment submitted' : 'Review before submitting'}
        description={
        submitted ?
        'Your work is recorded. A reviewer will read the evidence before any conclusion is drawn.' :
        'Nothing is submitted until you choose to submit. You can close this and keep working.'
        }
        width="md"
        footer={
        submitted ?
        <Button variant="secondary" onClick={() => setReviewOpen(false)}>
              Close
            </Button> :

        <>
              <Button variant="tertiary" onClick={() => setReviewOpen(false)}>
                Keep working
              </Button>
              <Button
            variant="primary"
            icon={<SendIcon className="h-3.5 w-3.5" />}
            disabled={!allChecked}
            onClick={() => setSubmitted(true)}>
            
                Submit assessment
              </Button>
            </>

        }>
        
        {submitted ?
        <div className="flex flex-col gap-3">
            <Alert
            tone="success"
            title="Your work is saved and submitted"
            children="Submitted at 13:54, with 41 minutes remaining. You do not need to do anything else." />
          
            <p className="text-13 leading-6 text-fg-secondary">
              Your assessment will be reviewed by a person. The report records what was observed in this session and
              what could not be established from it.
            </p>
          </div> :

        <div className="flex flex-col gap-4">
            <ul className="flex flex-col gap-2.5">
              {submissionChecklist.map((c) =>
            <li key={c.id} className="rounded-md border border-line bg-surface p-2.5">
                  <Checkbox
                id={`submit-check-${c.id}`}
                checked={Boolean(checked[c.id])}
                onChange={(e) => setChecked((p) => ({ ...p, [c.id]: e.target.checked }))}
                label={c.label}
                description={c.detail} />
              
                </li>
            )}
            </ul>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-md border border-line bg-surface p-3">
                <h4 className="text-2xs font-semibold uppercase tracking-wide text-fg-muted">Shared with reviewers</h4>
                <ul className="mt-1.5 flex list-disc flex-col gap-1 pl-4 text-13 leading-6 text-fg-secondary">
                  {sharedOnSubmit.map((s) =>
                <li key={s}>{s}</li>
                )}
                </ul>
              </div>
              <div className="rounded-md border border-dashed border-line-strong p-3">
                <h4 className="text-2xs font-semibold uppercase tracking-wide text-fg-muted">Not collected</h4>
                <ul className="mt-1.5 flex list-disc flex-col gap-1 pl-4 text-13 leading-6 text-fg-secondary">
                  {notSharedOnSubmit.map((s) =>
                <li key={s}>{s}</li>
                )}
                </ul>
              </div>
            </div>
          </div>
        }
      </Dialog>
    </ScreenFrame>);

}