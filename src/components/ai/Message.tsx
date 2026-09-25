import React from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CopyIcon,
  PencilIcon,
  RefreshCwIcon,
  SquareIcon,
  TriangleAlertIcon } from
'lucide-react';
import { cn } from '../../utils/cn';
import { IconButton } from '../ui/IconButton';

export type MessageAuthor = 'user' | 'assistant' | 'system' | 'error';

export interface MessageProps {
  author: MessageAuthor;
  /** Human-readable author name shown in the attribution row and to screen readers. */
  authorLabel: string;
  timestamp?: string;
  children: React.ReactNode;
  streaming?: boolean;
  onStop?: () => void;
  onCopy?: () => void;
  onRetry?: () => void;
  onEdit?: () => void;
  branch?: {index: number;total: number;onPrev: () => void;onNext: () => void;};
  footer?: React.ReactNode;
  /** Set false where the container already names the author (a copilot column
   *  titled with the assistant's name, a thread of one sender). The accessible
   *  name still carries the author. DS-11, approved 2026-09-22. */
  attribution?: boolean;
  /** `record` is the transcript look for reviewers: a rule beside the
   *  assistant, secondary text. `conversation` is the live copilot thread:
   *  the assistant reads as plain primary text under its mark, the person's
   *  turn sits in a rounded bubble. DS-21. */
  appearance?: 'record' | 'conversation';
  /** Leads the attribution row, e.g. `<AssistantMark size="sm" />`. */
  avatar?: React.ReactNode;
  /** More controls in the action row, after copy, retry and edit. */
  actions?: React.ReactNode;
  /** `always` keeps the action row visible, e.g. under the latest reply;
   *  `hover` reveals it on hover and on keyboard focus. */
  actionsVisible?: 'hover' | 'always';
  /** Draw the streaming caret. In the conversation appearance it is a soft
   *  breathing dot rather than a blink. Set false when the children draw it
   *  themselves, e.g. a markdown renderer that puts `stream-soft` on its own
   *  root so the dot sits at the end of the last line. DS-31. */
  caret?: boolean;
  className?: string;
}

/** Author is carried by position, border treatment, and a written label — never by colour alone.
 *  In the conversation appearance the person's turn is the bordered bubble on
 *  the right and the assistant's is unboxed on the left under its label. */
export function Message({
  author,
  authorLabel,
  timestamp,
  children,
  streaming,
  onStop,
  onCopy,
  onRetry,
  onEdit,
  branch,
  footer,
  attribution = true,
  appearance = 'record',
  avatar,
  actions,
  actionsVisible = 'hover',
  caret = true,
  className
}: MessageProps) {
  const isUser = author === 'user';
  const isSystem = author === 'system';
  const isError = author === 'error';
  const conversation = appearance === 'conversation';

  return (
    <article
      aria-label={`${authorLabel} message`}
      aria-busy={streaming || undefined}
      className={cn('group/msg flex flex-col', isUser && 'items-end', className)}
      style={{ marginTop: 'var(--msg-gap)' }}>
      
      {attribution &&
      <div
        className={cn(
          'flex w-full gap-2',
          avatar ? 'items-center' : 'items-baseline',
          isUser ? 'justify-end' : 'justify-start'
        )}>
        {avatar}
        <span
          className={cn(
            'text-2xs font-medium',
            isError ? 'text-danger-fg' : isSystem ? 'text-fg-secondary' : isUser ? 'text-fg-secondary' : 'text-ai-fg'
          )}>
          
          {authorLabel}
        </span>
        {timestamp && <span className="text-2xs text-fg-muted tnum">{timestamp}</span>}
      </div>
      }

      <div
        className={cn(
          'mt-1 min-w-0',
          isUser &&
          cn(
            'max-w-[85%] border bg-[var(--msg-user-bg)] border-[var(--msg-user-border)] px-3 py-2',
            conversation ? 'rounded-lg' : 'rounded-md'
          ),
          author === 'assistant' && (conversation ? 'w-full max-w-measure' : 'w-full max-w-measure border-l-2 pl-3'),
          isSystem && 'w-full rounded-md border border-line-strong border-dashed bg-transparent px-3 py-2.5',
          isError && 'w-full rounded-md border border-danger-border bg-danger-bg px-3 py-2.5'
        )}
        style={author === 'assistant' && !conversation ? { borderLeftColor: 'var(--msg-assistant-rule)' } : undefined}>
        
        {isError &&
        <TriangleAlertIcon className="mb-1.5 h-4 w-4 text-danger-fg" aria-hidden="true" />
        }
        <div
          className={cn(
            'text-13 leading-6',
            isUser || conversation && author === 'assistant' ?
            'text-fg-primary' :
            isError ?
            'text-danger-fg' :
            'text-fg-secondary',
            streaming && caret && (conversation ? 'stream-soft' : 'stream-caret')
          )}>
          
          {children}
        </div>
        {footer && <div className="mt-2.5">{footer}</div>}
      </div>

      {(onCopy || onRetry || onEdit || actions || branch || streaming && onStop) &&
      <div
        className={cn(
          'mt-1.5 flex items-center gap-1',
          isUser ? 'justify-end' : 'justify-start',
          !streaming &&
          actionsVisible === 'hover' &&
          'opacity-0 transition-opacity duration-100 ease-enter group-hover/msg:opacity-100 focus-within:opacity-100'
        )}>
        
          {streaming && onStop &&
        <button
          type="button"
          onClick={onStop}
          className="inline-flex h-6 items-center gap-1.5 rounded-xs border border-line bg-surface px-2 text-2xs font-medium text-fg-secondary transition-colors duration-100 ease-enter hover:bg-surface-hover">
          
              <SquareIcon className="h-2.5 w-2.5 fill-current" aria-hidden="true" />
              Stop
            </button>
        }
          {branch &&
        <span className="mr-1 inline-flex items-center gap-0.5 rounded-xs border border-line px-1 py-0.5">
              <IconButton
            label="Previous version"
            size="sm"
            icon={<ChevronLeftIcon className="h-3 w-3" />}
            onClick={branch.onPrev}
            disabled={branch.index <= 1} />
          
              <span className="text-2xs text-fg-muted tnum">
                {branch.index} of {branch.total}
              </span>
              <IconButton
            label="Next version"
            size="sm"
            icon={<ChevronRightIcon className="h-3 w-3" />}
            onClick={branch.onNext}
            disabled={branch.index >= branch.total} />
          
            </span>
        }
          {onCopy &&
        <IconButton label="Copy message" size="sm" icon={<CopyIcon className="h-3 w-3" />} onClick={onCopy} />
        }
          {onRetry &&
        <IconButton
          label="Regenerate response"
          size="sm"
          icon={<RefreshCwIcon className="h-3 w-3" />}
          onClick={onRetry} />

        }
          {onEdit &&
        <IconButton label="Edit message" size="sm" icon={<PencilIcon className="h-3 w-3" />} onClick={onEdit} />
        }
          {actions}
        </div>
      }
    </article>);

}