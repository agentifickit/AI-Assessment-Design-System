import React, { useId, useRef } from 'react';
import { ArrowUpIcon, PaperclipIcon, SquareIcon, WifiOffIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Tag } from '../ui/Tag';

export type ComposerState = 'idle' | 'streaming' | 'rate-limited' | 'offline' | 'disabled';

export interface ComposerAttachment {
  id: string;
  name: string;
  meta: string;
}

export interface PromptComposerProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onStop?: () => void;
  state?: ComposerState;
  attachments?: ComposerAttachment[];
  onRemoveAttachment?: (id: string) => void;
  onAttach?: () => void;
  suggestions?: string[];
  onSuggestion?: (s: string) => void;
  maxChars?: number;
  /** Explains a blocked state in words. Required whenever state is not idle/streaming. */
  notice?: string;
  className?: string;
}

export function PromptComposer({
  value,
  onChange,
  onSubmit,
  onStop,
  state = 'idle',
  attachments = [],
  onRemoveAttachment,
  onAttach,
  suggestions,
  onSuggestion,
  maxChars = 8000,
  notice,
  className
}: PromptComposerProps) {
  const taRef = useRef<HTMLTextAreaElement>(null);
  // Generated per instance — the workspace renders more than one composer,
  // and duplicate DOM ids silently break label and description association.
  const uid = useId();
  const inputId = `${uid}-input`;
  const statusId = `${uid}-status`;
  const over = value.length > maxChars;
  const blocked = state === 'rate-limited' || state === 'offline' || state === 'disabled';
  const canSend = value.trim().length > 0 && !over && !blocked && state !== 'streaming';

  const autoGrow = (el: HTMLTextAreaElement) => {
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 8 * 24 + 16)}px`;
  };

  return (
    <div className={cn('min-w-0', className)}>
      {suggestions && suggestions.length > 0 && value.length === 0 &&
      <div className="mb-2 flex flex-wrap gap-1.5">
          {suggestions.map((s) =>
        <button
          key={s}
          type="button"
          onClick={() => onSuggestion?.(s)}
          className="rounded-sm border border-line bg-surface px-2 py-1 text-left text-2xs text-fg-secondary transition-colors duration-100 ease-enter hover:bg-surface-hover hover:text-fg-primary">
          
              {s}
            </button>
        )}
        </div>
      }

      <div
        className={cn(
          'rounded-md border bg-[var(--input-bg)] transition-[border-color] duration-100 ease-enter',
          over ? 'border-danger-solid' : 'border-line focus-within:border-accent-border',
          blocked && 'bg-surface-subtle'
        )}>
        
        {attachments.length > 0 &&
        <div className="flex flex-wrap gap-1.5 border-b border-line-subtle px-2.5 py-2">
            {attachments.map((a) =>
          <Tag
            key={a.id}
            onRemove={onRemoveAttachment ? () => onRemoveAttachment(a.id) : undefined}
            removeLabel={`Remove ${a.name}`}>
            
                {a.name}
                <span className="text-fg-muted"> · {a.meta}</span>
              </Tag>
          )}
          </div>
        }

        <label htmlFor={inputId} className="sr-only">
          Message the assistant
        </label>
        <textarea
          id={inputId}
          ref={taRef}
          rows={2}
          value={value}
          disabled={blocked}
          placeholder={blocked ? 'Sending is paused' : 'Describe what you need. Include the context that matters.'}
          onChange={(e) => {
            onChange(e.target.value);
            autoGrow(e.target);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey) && canSend) {
              e.preventDefault();
              onSubmit();
            }
          }}
          aria-describedby={statusId}
          className="scroll-panel block w-full resize-none bg-transparent px-3 py-2.5 text-13 leading-6 text-fg-primary placeholder:text-fg-muted focus:outline-none disabled:cursor-not-allowed" />
        

        <div className="flex items-center justify-between gap-3 border-t border-line-subtle px-2 py-1.5">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onAttach}
              disabled={blocked}
              className="inline-flex h-7 items-center gap-1.5 rounded-xs px-2 text-2xs font-medium text-fg-muted transition-colors duration-100 ease-enter hover:bg-surface-hover hover:text-fg-primary disabled:opacity-40">
              
              <PaperclipIcon className="h-3.5 w-3.5" aria-hidden="true" />
              Attach
            </button>
            <span className="text-2xs text-fg-muted">⌘↵ to send</span>
          </div>

          <div className="flex items-center gap-2">
            <span className={cn('text-2xs tnum', over ? 'text-danger-fg' : 'text-fg-muted')}>
              {value.length.toLocaleString()} / {maxChars.toLocaleString()}
            </span>
            {state === 'streaming' ?
            <button
              type="button"
              onClick={onStop}
              className="inline-flex h-7 items-center gap-1.5 rounded-sm border border-line bg-surface px-2.5 text-2xs font-medium text-fg-primary transition-colors duration-100 ease-enter hover:bg-surface-hover">
              
                <SquareIcon className="h-2.5 w-2.5 fill-current" aria-hidden="true" />
                Stop
              </button> :

            <button
              type="button"
              onClick={onSubmit}
              disabled={!canSend}
              aria-label="Send message"
              className="inline-flex h-7 w-7 items-center justify-center rounded-sm border border-action bg-action text-action-fg transition-colors duration-100 ease-enter hover:bg-action-hover disabled:cursor-not-allowed disabled:border-line disabled:bg-surface-subtle disabled:text-fg-disabled">
              
                <ArrowUpIcon className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            }
          </div>
        </div>
      </div>

      <p id={statusId} aria-live="polite" className="mt-1.5 min-h-4 text-2xs text-fg-muted">
        {over && `Your message is ${(value.length - maxChars).toLocaleString()} characters over the limit. Shorten it to send.`}
        {!over && notice &&
        <span className={cn('inline-flex items-center gap-1.5', blocked && 'text-warning-fg')}>
            {state === 'offline' && <WifiOffIcon className="h-3 w-3" aria-hidden="true" />}
            {notice}
          </span>
        }
      </p>
    </div>);

}