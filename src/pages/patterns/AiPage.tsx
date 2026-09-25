import React, { useState } from 'react';
import { PageHeader } from '../../components/docs/PageHeader';
import { DocSection } from '../../components/docs/DocSection';
import { Example } from '../../components/docs/Example';
import { DoDont } from '../../components/docs/DoDont';
import { SpecList } from '../../components/docs/SpecList';
import { Message } from '../../components/ai/Message';
import { ToolActionRow } from '../../components/ai/ToolActionRow';
import { SourceChip } from '../../components/ai/SourceChip';
import { PromptComposer } from '../../components/ai/PromptComposer';
import { Alert } from '../../components/ui/Alert';
import { ButtonGroup } from '../../components/ui/ButtonGroup';
import type { ComposerState } from '../../components/ai/PromptComposer';

export function AiPage() {
  const [state, setState] = useState<ComposerState>('idle');
  const [value, setValue] = useState('');

  const notice =
  state === 'rate-limited' ?
  'The assistant is briefly unavailable. Your time has been paused and your work is saved.' :
  state === 'offline' ?
  'You are offline. Your draft is saved on this device and will sync when you reconnect.' :
  state === 'disabled' ?
  'The conversation is closed because you have submitted this assessment.' :
  undefined;

  return (
    <>
      <PageHeader
        eyebrow="Patterns"
        title="AI interaction"
        intro="Conversation, composition, tool actions, and citation — built for a timed assessment rather than a chat product. Nothing here implies the assistant has hidden reasoning, independent authority, or a role in the hiring decision." />
      

      <DocSection
        title="Message variants"
        description="Author is carried by position, border treatment, and a written label. Never by colour alone — a user message and an assistant message remain distinguishable in greyscale and at 200% zoom.">
        
        <Example label="Message, user, assistant with tool call and citation, system, error" tone="surface">
          <div className="max-w-measure">
            <Message author="user" authorLabel="You" timestamp="13:11" onEdit={() => undefined}>
              Draft the opening two paragraphs. Do not claim anything the churn review does not support.
            </Message>
            <Message
              author="assistant"
              authorLabel="Assistant"
              timestamp="13:11"
              onCopy={() => undefined}
              onRetry={() => undefined}
              footer={
              <ul className="flex flex-wrap gap-1.5">
                  <li>
                    <SourceChip index={1} title="Mid-market churn review.pdf" locator="p.2, Exit interviews" />
                  </li>
                </ul>
              }>
              
              <div className="mb-2">
                <ToolActionRow
                  action="Retrieving from Mid-market churn review.pdf"
                  status="completed"
                  duration="1.2s"
                  detail="Matched 3 sections across pages 2–4." />
                
              </div>
              Of 24 mid-market accounts lost in H1, three cited a feature gap — and two of those features had already
              shipped.
            </Message>
            <Message author="system" authorLabel="Task instruction" timestamp="13:02">
              You have 75 minutes. Your draft saves automatically and you can review everything before submitting.
            </Message>
            <Message author="error" authorLabel="Response failed" timestamp="13:19" onRetry={() => undefined}>
              The response could not be completed. Your message and draft are saved, and your time has been paused
              while this is resolved.
            </Message>
          </div>
        </Example>
      </DocSection>

      <DocSection
        title="Streaming accessibility"
        description="The intuitive approach — announce as it arrives — makes a screen reader unusable during a stream. This system announces four events and never token text.">
        
        <Alert
          tone="info"
          title="The four announcements"
          children="Generation started, generation completed, generation interrupted, generation failed. Each is delivered once, through a single polite live region per thread, naming what happened rather than just “done”." />
        
        <SpecList
          className="mt-4"
          columns={1}
          entries={[
          { term: 'The growing region', detail: <>The streaming message is <code>aria-busy="true"</code> with <code>aria-live="off"</code>. Without this, assistive technology re-reads the buffer on every append.</> },
          { term: 'Stop', detail: 'Rendered and focusable for the entire stream, never hover-revealed. Someone who wants to stop generation is usually in a hurry.' },
          { term: 'Caret', detail: 'A 1ch blinking caret marks activity. Under reduced motion it is replaced by a static “Responding” label, so the state is legible without movement.' },
          { term: 'Interruption', detail: 'Stopping announces that nothing was added to the draft, because the visible result of stopping is otherwise ambiguous.' },
          { term: 'Focus', detail: 'Focus never moves on its own during a stream. A candidate typing their next message must not be interrupted by arriving output.' }]
          } />
        
        <DoDont
          className="mt-4"
          doText="Announce that generation started, then announce the outcome. Let the reader choose when to read the response itself."
          dontText={<>An <code>aria-live="polite"</code> region wrapped around the streaming text, or a per-token announcement. Both produce continuous speech that cannot be interrupted or navigated.</>} />
        
      </DocSection>

      <DocSection
        title="Prompt composer states"
        description="Five states. Every blocked state must explain itself in words and say what happened to the candidate's work and time — an inert composer with no explanation reads as a fault the candidate caused.">
        
        <div className="mb-3">
          <ButtonGroup
            label="Composer state"
            value={state}
            onChange={(v) => setState(v as ComposerState)}
            options={[
            { value: 'idle', label: 'Idle' },
            { value: 'streaming', label: 'Streaming' },
            { value: 'rate-limited', label: 'Rate limited' },
            { value: 'offline', label: 'Offline' },
            { value: 'disabled', label: 'Closed' }]
            } />
          
        </div>
        <Example label="PromptComposer" tone="surface">
          <div className="max-w-measure">
            <PromptComposer
              value={value}
              onChange={setValue}
              onSubmit={() => setValue('')}
              onStop={() => setState('idle')}
              state={state}
              notice={notice}
              attachments={[{ id: 'a', name: 'Mid-market churn review.pdf', meta: 'PDF, 6 pages' }]}
              onRemoveAttachment={() => undefined}
              onAttach={() => undefined}
              suggestions={state === 'idle' ? ['What have I not verified?', 'Check my draft against the source'] : undefined}
              onSuggestion={setValue} />
            
          </div>
        </Example>
      </DocSection>

      <DocSection title="Language">
        <DoDont
          doText={
          <ul className="flex list-disc flex-col gap-1.5 pl-4">
              <li>“Responding”, “Retrieving from Brand guidelines.pdf”</li>
              <li>“AI-generated draft”, “Human review required”</li>
              <li>“Your work is saved”, “You can review before submitting”</li>
              <li>“Evidence not captured”, “This behaviour was not observed”</li>
            </ul>
          }
          dontText={
          <ul className="flex list-disc flex-col gap-1.5 pl-4">
              <li>“AI is thinking” — implies hidden reasoning we cannot see</li>
              <li>“The AI has decided” — no automated decision is made here</li>
              <li>“Bad prompt”, “Candidate failed” — judgemental and inaccurate</li>
              <li>“Objective score”, “Guaranteed accurate” — claims the method cannot support</li>
            </ul>
          } />
        
      </DocSection>
    </>);

}