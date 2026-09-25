import React, { forwardRef, useId, useImperativeHandle, useLayoutEffect, useRef } from 'react';
import { ArrowUpIcon, PaperclipIcon, SquareIcon, WifiOffIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Tag } from '../ui/Tag';

export type ComposerState = 'idle' | 'streaming' | 'rate-limited' | 'offline' | 'disabled';

export interface ComposerAttachment {
  id: string;
  name: string;
  meta: string;
}

type TextareaPassthrough = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'value' | 'onChange' | 'disabled' | 'placeholder' | 'id' | 'rows'>;

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
  /** Explains a blocked state in words. Required whenever state is not
   *  idle/streaming, unless `placeholder` already explains it. */
  notice?: string;
  /** The footer's left side, in place of Attach: a + menu that holds files,
   *  context and tools, and the mode switch. Two controls at most. DS-22. */
  leading?: React.ReactNode;
  /** The footer's right side, before send: the model and dictation. Two
   *  controls at most; anything else nests in the + menu. */
  trailing?: React.ReactNode;
  /** What rides with the next message (mentions, a selection, files), drawn
   *  above the text. Used in place of `attachments`. */
  context?: React.ReactNode;
  /** Screen-reader name of the text field. */
  label?: string;
  /** Replaces the default placeholder, including in blocked states. */
  placeholder?: string;
  /** `enter` sends with Enter and breaks a line with Shift+Enter;
   *  `mod-enter` sends with Cmd or Ctrl+Enter. */
  sendKey?: 'enter' | 'mod-enter';
  /** Overrides the text-only rule, e.g. when context alone may be sent. */
  canSubmit?: boolean;
  /** Passed to the textarea. Its onKeyDown runs first; calling
   *  preventDefault keeps Enter for the consumer (an open mention list). */
  textareaProps?: TextareaPassthrough;
  className?: string;
}

const MAX_ROWS = 8;

/** The composer is one raised surface: context on top, the text, then a
 *  footer of at most five controls (+, mode, model, dictate, send). Send and
 *  stop are the round controls; the accent is spent on send alone. */
export const PromptComposer = forwardRef<HTMLTextAreaElement, PromptComposerProps>(
  function PromptComposer(
  {
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
    leading,
    trailing,
    context,
    label = 'Message the assistant',
    placeholder,
    sendKey = 'mod-enter',
    canSubmit,
    textareaProps,
    className
  },
  ref)
  {
    const taRef = useRef<HTMLTextAreaElement>(null);
    useImperativeHandle(ref, () => taRef.current as HTMLTextAreaElement);
    // Generated per instance — the workspace renders more than one composer,
    // and duplicate DOM ids silently break label and description association.
    const uid = useId();
    const inputId = `${uid}-input`;
    const statusId = `${uid}-status`;
    const over = value.length > maxChars;
    const nearLimit = value.length > maxChars * 0.8;
    const blocked = state === 'rate-limited' || state === 'offline' || state === 'disabled';
    const hasContent = canSubmit ?? value.trim().length > 0;
    const canSend = hasContent && !over && !blocked && state !== 'streaming';

    // Grows with the text, including text set from outside (a suggestion, dictation).
    useLayoutEffect(() => {
      const el = taRef.current;
      if (!el) return;
      el.style.height = 'auto';
      el.style.height = `${Math.min(el.scrollHeight, MAX_ROWS * 24 + 16)}px`;
    }, [value]);

    const describedBy = [textareaProps?.['aria-describedby'], statusId].filter(Boolean).join(' ');

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
            'rounded-xl border bg-[var(--input-bg)] transition-[border-color,box-shadow] duration-100 ease-enter',
            over ? 'border-danger-solid' : 'border-line focus-within:border-accent-border',
            blocked ? 'bg-surface-subtle' : 'shadow-[var(--shadow-composer)]'
          )}>
          {context ?
          <div className="flex flex-wrap gap-1.5 px-3 pt-2.5">{context}</div> :
          attachments.length > 0 &&
          <div className="flex flex-wrap gap-1.5 px-3 pt-2.5">
                {attachments.map((a) =>
            <Tag
              key={a.id}
              onRemove={onRemoveAttachment ? () => onRemoveAttachment(a.id) : undefined}
              removeLabel={`Remove ${a.name}`}>
                    {a.name}
                    <span className="text-fg-muted">, {a.meta}</span>
                  </Tag>
            )}
              </div>

          }

          <label htmlFor={inputId} className="sr-only">
            {label}
          </label>
          <textarea
            {...textareaProps}
            id={inputId}
            ref={taRef}
            rows={2}
            value={value}
            disabled={blocked}
            placeholder={
            placeholder ?? (
            blocked ? 'Sending is paused' : 'Describe what you need. Include the context that matters.')
            }
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              textareaProps?.onKeyDown?.(e);
              if (e.defaultPrevented || e.key !== 'Enter' || e.nativeEvent.isComposing) return;
              const send = sendKey === 'enter' ? !e.shiftKey : e.metaKey || e.ctrlKey;
              if (!send) return;
              e.preventDefault();
              if (canSend) onSubmit();
            }}
            aria-describedby={describedBy}
            // The surface around the field carries the focus border; a second
            // ring on the field itself doubled it.
            style={{ outline: 'none', ...textareaProps?.style }}
            className="scroll-panel block w-full resize-none bg-transparent px-3 pb-1 pt-2.5 text-13 leading-6 text-fg-primary placeholder:text-fg-muted disabled:cursor-not-allowed" />

          <div className="flex items-center justify-between gap-2 px-2 pb-2 pt-1">
            <div className="flex min-w-0 items-center gap-1">
              {leading ??
              <>
                  <button
                  type="button"
                  onClick={onAttach}
                  disabled={blocked}
                  className="inline-flex h-7 items-center gap-1.5 rounded-sm px-2 text-2xs font-medium text-fg-muted transition-colors duration-100 ease-enter hover:bg-surface-hover hover:text-fg-primary disabled:opacity-40">
                    <PaperclipIcon className="h-3.5 w-3.5" aria-hidden="true" />
                    Attach
                  </button>
                  <span className="text-2xs text-fg-muted">
                    {sendKey === 'enter' ? 'Enter to send' : '⌘↵ to send'}
                  </span>
                </>
              }
            </div>

            <div className="flex shrink-0 items-center gap-1">
              {nearLimit &&
              <span className={cn('mr-1 text-2xs tnum', over ? 'text-danger-fg' : 'text-fg-muted')}>
                  {value.length.toLocaleString()} / {maxChars.toLocaleString()}
                </span>
              }
              {trailing}
              {state === 'streaming' ?
              <button
                type="button"
                onClick={onStop}
                aria-label="Stop"
                title="Stop responding"
                className="ml-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-fg-primary text-surface transition-opacity duration-100 ease-enter hover:opacity-90">
                  <SquareIcon className="h-2.5 w-2.5 fill-current" aria-hidden="true" />
                </button> :

              <button
                type="button"
                onClick={onSubmit}
                disabled={!canSend}
                aria-label="Send message"
                className="ml-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full border border-action bg-action text-action-fg transition-colors duration-100 ease-enter hover:bg-action-hover disabled:cursor-not-allowed disabled:border-line disabled:bg-surface-subtle disabled:text-fg-disabled">
                  <ArrowUpIcon className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              }
            </div>
          </div>
        </div>

        <p id={statusId} aria-live="polite" className={cn('text-2xs text-fg-muted', (over || notice) && 'mt-1.5')}>
          {over &&
          `Your message is ${(value.length - maxChars).toLocaleString()} characters over the limit. Shorten it to send.`}
          {!over && notice &&
          <span className={cn('inline-flex items-center gap-1.5', blocked && 'text-warning-fg')}>
              {state === 'offline' && <WifiOffIcon className="h-3 w-3" aria-hidden="true" />}
              {notice}
            </span>
          }
        </p>
      </div>);
  }
);
