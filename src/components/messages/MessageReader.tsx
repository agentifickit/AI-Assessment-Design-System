import React from 'react';
import { PaperclipIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Avatar } from '../ui/Avatar';
import { Tag } from '../ui/Tag';

export type MessageSource = 'email' | 'slack';

export interface MessageAttachment {
  id: string;
  name: string;
  onOpen?: () => void;
}

export interface MessageReaderProps {
  source: MessageSource;
  subject: string;
  sender: {name: string;meta?: string;};
  /** Written out, not relative: "Fri 19 Sep, 16:42". */
  timestamp: string;
  children: React.ReactNode;
  attachments?: MessageAttachment[];
  /** The reply composer slot. Whether the candidate may reply is a PRD decision;
   *  the reader draws the seat, not the behaviour. */
  reply?: React.ReactNode;
  /** 'drawer' fits the 480px drawer; 'page' is the pinned-tab reading width. */
  width?: 'drawer' | 'page';
  className?: string;
}

const sourceLabel: Record<MessageSource, string> = { email: 'Email', slack: 'Slack' };

/** One message opened from the inbox, at drawer width or as a pinned tab.
 *  Subject, sender meta, body, attachment chips, then the reply seat. Slack
 *  senders take the square avatar (DS-19) so the source is legible without the
 *  label. DS-18, approved 2026-09-22; the inbox itself is outside PRD-08. */
export function MessageReader({
  source,
  subject,
  sender,
  timestamp,
  children,
  attachments = [],
  reply,
  width = 'drawer',
  className
}: MessageReaderProps) {
  return (
    <article aria-label={`${sourceLabel[source]} from ${sender.name}: ${subject}`} className={cn('flex min-h-0 flex-col', className)}>
      <header className={cn('shrink-0 border-b border-line-subtle', width === 'page' ? 'px-8 pb-5 pt-6' : 'px-4 pb-4 pt-4')}>
        <h2 className={cn('font-semibold text-fg-primary', width === 'page' ? 'text-lg' : 'text-sm')}>{subject}</h2>
        <div className="mt-3 flex items-center gap-2.5">
          <Avatar name={sender.name} shape={source === 'slack' ? 'square' : 'circle'} />
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline gap-2">
              <span className="truncate text-13 font-medium text-fg-primary">{sender.name}</span>
              <span className="text-10 font-medium uppercase tracking-wide text-fg-muted">{sourceLabel[source]}</span>
            </div>
            {sender.meta && <p className="truncate text-xs leading-[18px] text-fg-muted">{sender.meta}</p>}
          </div>
          <time className="shrink-0 text-2xs text-fg-muted tnum">{timestamp}</time>
        </div>
      </header>

      <div className={cn('scroll-panel min-h-0 flex-1 overflow-y-auto', width === 'page' ? 'px-8 py-6' : 'px-4 py-4')}>
        <div className={cn('max-w-measure text-fg-secondary', width === 'page' ? 'text-base leading-[26px]' : 'text-sm leading-6')}>
          {children}
        </div>
        {attachments.length > 0 &&
        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Attachments">
            {attachments.map((a) =>
          <li key={a.id}>
                {a.onOpen ?
            <button type="button" onClick={a.onOpen} className="rounded-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-line-strong">
                    <Tag icon={<PaperclipIcon className="h-3 w-3" aria-hidden="true" />}>{a.name}</Tag>
                  </button> :

            <Tag icon={<PaperclipIcon className="h-3 w-3" aria-hidden="true" />}>{a.name}</Tag>
            }
              </li>
          )}
          </ul>
        }
      </div>

      {reply && <div className={cn('shrink-0 border-t border-line-subtle', width === 'page' ? 'px-8 py-4' : 'px-4 py-3')}>{reply}</div>}
    </article>);

}
