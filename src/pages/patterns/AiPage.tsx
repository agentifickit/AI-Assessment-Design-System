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
import { AssistantMark } from '../../components/ai/AssistantMark';
import { ResponseStatus } from '../../components/ai/ResponseStatus';
import { SuggestionList } from '../../components/ai/SuggestionList';
import { ToolStepGroup } from '../../components/ai/ToolStepGroup';
import { Tag } from '../../components/ui/Tag';
import { IconButton } from '../../components/ui/IconButton';
import {
  ChevronDownIcon,
  ClipboardListIcon,
  CopyIcon,
  FileTextIcon,
  GlobeIcon,
  MicIcon,
  NotebookTextIcon,
  PenLineIcon,
  PlusIcon,
  StickyNoteIcon,
  Table2Icon,
  XIcon } from
'lucide-react';
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
        description="Author is carried by position, border treatment, and a written label. Never by colour alone — a user message and an assistant message remain distinguishable in greyscale and at 200% zoom. These are the record appearance used in transcripts; the live copilot uses the conversation appearance below.">
        
        <Example label="Message · user, assistant with tool call and citation, system, error" tone="surface">
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
                    <SourceChip index={1} title="Mid-market churn review.pdf" locator="p.2 · Exit interviews" />
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
        title="Copilot thread states"
        description="The live copilot column uses the conversation appearance: the assistant's turn is plain primary text under its mark and name, the person's turn a rounded bubble on the right. Each state below says what is happening in words; motion only adds to it (DS-21 to DS-28).">

        <Example label="Empty: the mark, one sentence about the record, three starting points" tone="surface">
          <div className="max-w-[360px]">
            <AssistantMark size="lg" />
            <p className="mt-3 text-sm font-medium text-fg-primary">How can I help with this task?</p>
            <p className="mt-1 text-xs leading-5 text-fg-secondary">
              Ask about the materials, or ask for a draft you can edit. Everything you send is part of your session record.
            </p>
            <SuggestionList
              className="-mx-2 mt-3"
              label="Suggested questions"
              onSelect={() => undefined}
              suggestions={[
              { label: 'Summarise the materials', icon: <FileTextIcon className="h-3.5 w-3.5" /> },
              { label: 'What does the brief ask me to do?', icon: <ClipboardListIcon className="h-3.5 w-3.5" /> },
              { label: 'Draft a reply I can edit', icon: <PenLineIcon className="h-3.5 w-3.5" /> }]
              } />
          </div>
        </Example>

        <Example label="Responding, before the first words; a counter joins after three seconds" tone="surface">
          <div className="max-w-[360px]">
            <ResponseStatus elapsed={4} />
          </div>
        </Example>

        <Example label="A reply: steps folded when there are three or more, sources as numbered chips, actions on hover" tone="surface">
          <div className="max-w-[360px]">
            <Message author="user" authorLabel="You" attribution={false} appearance="conversation">
              What does the brief ask me to do?
            </Message>
            <Message
              author="assistant"
              authorLabel="Copilot"
              appearance="conversation"
              avatar={<AssistantMark size="sm" />}
              actionsVisible="always"
              onCopy={() => undefined}
              actions={<IconButton label="Add to pad" size="sm" icon={<StickyNoteIcon className="h-3 w-3" />} />}
              footer={
              <div className="flex flex-wrap gap-1.5">
                  <SourceChip index={1} title="Task brief" icon={<ClipboardListIcon className="h-3 w-3" />} />
                  <SourceChip index={2} title="Usage sheet" icon={<Table2Icon className="h-3 w-3" />} />
                </div>
              }>
              <div className="mb-2">
                <ToolStepGroup summary="3 steps">
                  <ToolActionRow variant="step" action="Working notes" status="completed" icon={<NotebookTextIcon className="h-3.5 w-3.5" />} detail="Read the brief first, then check the usage sheet." />
                  <ToolActionRow variant="step" action="Read your sheet" status="completed" />
                  <ToolActionRow variant="step" action="Searched the web for renewal discount benchmarks" status="completed" />
                </ToolStepGroup>
              </div>
              The brief asks for a pricing recommendation for the renewal, backed by the usage sheet.
            </Message>
          </div>
        </Example>

        <Example label="A step still running, and one that failed" tone="surface">
          <div className="max-w-[360px]">
            <ToolActionRow variant="step" action="Reading your sheet" status="running" />
            <ToolActionRow variant="step" action="Searching the web for renewal benchmarks" status="failed" />
          </div>
        </Example>

        <SpecList
          className="mt-4"
          columns={1}
          entries={[
          { term: 'Mark', detail: 'AssistantMark leads the assistant\'s name and never replaces it. It turns only while the assistant is responding.' },
          { term: 'Steps', detail: 'Written as the observable action in the present tense while running ("Reading your sheet") and the past tense once done ("Read your sheet"). Only a failure or a stop is written out as a status; a finished step shows a quiet tick.' },
          { term: 'Working notes', detail: 'Model reasoning that the thread can show is labelled "Working notes", never "Thought for" or "Thinking".' },
          { term: 'Sources', detail: 'Numbered SourceChips under the reply, with the source kind as the icon. The count is never written as a sentence.' },
          { term: 'Actions', detail: 'Icon buttons with tooltips: copy, then the product action (Add to pad). Visible under the latest reply, on hover for earlier ones.' },
          { term: 'Failure and stop', detail: 'A failure stays in the thread as a system message that names what became of the work, with Try again. A reply the person stopped keeps its text and says "You stopped this reply".' }]
          } />
      </DocSection>

      <DocSection
        title="Copilot composer"
        description="Five controls at rest: + on the left with the mode beside it, the model, dictation and send on the right. Files, workspace context and tools nest in the + menu; a tool that is on shows as a removable chip in the footer, so its state is never hidden behind the menu.">
        <Example label="PromptComposer with leading, trailing and context slots" tone="surface">
          <div className="max-w-[360px]">
            <PromptComposer
              value="What does the brief ask me to do?"
              onChange={() => undefined}
              onSubmit={() => undefined}
              sendKey="enter"
              label="Message the copilot"
              context={<Tag icon={<ClipboardListIcon className="h-3 w-3" />} onRemove={() => undefined} removeLabel="Remove Task brief">Task brief</Tag>}
              leading={
              <>
                  <IconButton label="Add files and tools" size="md" icon={<PlusIcon className="h-3.5 w-3.5" />} className="h-7 w-7 rounded-full border-line" />
                  <button type="button" className="inline-flex h-7 items-center gap-1 rounded-sm px-2 text-2xs font-medium text-fg-secondary hover:bg-surface-hover">
                    Ask <ChevronDownIcon className="h-3 w-3 opacity-60" aria-hidden="true" />
                  </button>
                  {/* The tool chip: a tool that is on, in the AI tint, with its off control. */}
                  <span className="inline-flex h-6 items-center gap-1 rounded-full border border-ai-border bg-ai-bg pl-2 pr-0.5 text-2xs font-medium text-ai-fg">
                    <GlobeIcon className="h-3 w-3" aria-hidden="true" />
                    Web
                    <button type="button" aria-label="Turn off web search" className="inline-flex h-5 w-5 items-center justify-center rounded-full hover:bg-surface">
                      <XIcon className="h-3 w-3" aria-hidden="true" />
                    </button>
                  </span>
                </>
              }
              trailing={
              <>
                  <button type="button" className="inline-flex h-7 items-center gap-1 rounded-sm px-2 text-2xs text-fg-muted hover:bg-surface-hover">
                    GPT-OSS 120B <ChevronDownIcon className="h-3 w-3 opacity-60" aria-hidden="true" />
                  </button>
                  <IconButton label="Dictate message" size="md" icon={<MicIcon className="h-3.5 w-3.5" />} className="h-7 w-7" />
                </>
              } />
          </div>
        </Example>
        <DoDont
          className="mt-4"
          doText="Nest what is used now and then (upload, add from the workspace, web search) in +. Keep the mode and the model visible, because they change what the assistant does."
          dontText="A row of seven icons, a divider between the text and the controls, a character counter from the first keystroke, or a focus ring on the field inside a focused surface." />
      </DocSection>

      <DocSection
        title="Streaming accessibility"
        description="The intuitive approach — announce as it arrives — makes a screen reader unusable during a stream. This system announces four events and never token text.">
        
        <Alert
          tone="info"
          title="The four announcements"
          children="Generation started · generation completed · generation interrupted · generation failed. Each is delivered once, through a single polite live region per thread, naming what happened rather than just “done”." />
        
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
              attachments={[{ id: 'a', name: 'Mid-market churn review.pdf', meta: 'PDF · 6 pages' }]}
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
              <li>“Responding” · “Retrieving from Brand guidelines.pdf”</li>
              <li>“Reading your sheet”, “Working notes”, “You stopped this reply”</li>
              <li>“AI-generated draft” · “Human review required”</li>
              <li>“Your work is saved” · “You can review before submitting”</li>
              <li>“Evidence not captured” · “This behaviour was not observed”</li>
            </ul>
          }
          dontText={
          <ul className="flex list-disc flex-col gap-1.5 pl-4">
              <li>“AI is thinking” — implies hidden reasoning we cannot see</li>
              <li>“Thought for 12 seconds”, “Used 1 sources” — the first implies a mind, the second counts at the reader</li>
              <li>“The AI has decided” — no automated decision is made here</li>
              <li>“Bad prompt” · “Candidate failed” — judgemental and inaccurate</li>
              <li>“Objective score” · “Guaranteed accurate” — claims the method cannot support</li>
            </ul>
          } />
        
      </DocSection>
    </>);

}