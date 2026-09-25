import React from 'react';
import { MailIcon, SlackIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import type { MessageSource } from './MessageReader';

const channelIcon: Record<MessageSource, React.ComponentType<{className?: string;}>> = {
  email: MailIcon,
  slack: SlackIcon
};

const channelName: Record<MessageSource, string> = { email: 'Email', slack: 'Slack' };

export interface ChannelMarkProps {
  channel: MessageSource;
  className?: string;
}

/** Where a message came from, as a 14px mark in the muted ink with the
 *  channel's name for screen readers. It takes the slot a repeated word
 *  ("Email") used to fill; Teams takes the same slot when its PRD adds it.
 *  DS-40. */
export function ChannelMark({ channel, className }: ChannelMarkProps) {
  const Icon = channelIcon[channel];
  return (
    <span className={cn('inline-flex text-fg-muted', className)}>
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      <span className="sr-only">{channelName[channel]}</span>
    </span>);

}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  return ((parts[0][0] ?? '') + (parts.length > 1 ? parts[parts.length - 1][0] ?? '' : '')).toUpperCase();
}

export interface InboxRowProps {
  channel: MessageSource;
  sender: string;
  subject: string;
  /** One or two lines of the body. */
  preview?: string;
  /** Short: "09:14" today, "22 Sep" before. */
  time: string;
  unread?: boolean;
  /** The message open in the reader or a tab. */
  active?: boolean;
  onOpen: () => void;
}

/** One row of the inbox list, inside a `ul`. Sender and subject lead, in the
 *  primary ink and medium weight while unread; the preview follows in the
 *  muted ink. At the right, the time, then the unread dot and the channel
 *  mark. The sender's initials are a circle, or the square for Slack (DS-19).
 *  DS-40, from the workspace review of 2026-09-26. */
export function InboxRow({ channel, sender, subject, preview, time, unread, active, onOpen }: InboxRowProps) {
  return (
    <li>
      <button
        type="button"
        onClick={onOpen}
        aria-current={active ? 'true' : undefined}
        className={cn(
          'flex w-full items-start gap-3 border-b border-line-subtle px-4 py-2.5 text-left transition-colors duration-100 ease-enter focus-visible:-outline-offset-2',
          active ? 'bg-surface-active' : 'hover:bg-surface-hover'
        )}>
        
        <span
          aria-hidden="true"
          className={cn(
            'mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center border border-line bg-surface-subtle text-9 font-semibold text-fg-secondary',
            channel === 'slack' ? 'rounded-xs' : 'rounded-full'
          )}>
          
          {initials(sender)}
        </span>
        <span className="min-w-0 flex-1">
          <span className={cn('line-clamp-2 text-13 leading-5', unread ? 'font-medium text-fg-primary' : 'text-fg-secondary')}>
            {sender}: {subject}
          </span>
          {preview && <span className="mt-0.5 line-clamp-2 text-2xs leading-4 text-fg-muted">{preview}</span>}
        </span>
        <span className="flex shrink-0 flex-col items-end gap-1">
          <span className="text-2xs text-fg-muted tnum">{time}</span>
          <span className="flex items-center gap-1.5">
            {unread &&
            <>
                <span className="h-1.5 w-1.5 rounded-full bg-info-solid" aria-hidden="true" />
                <span className="sr-only">Unread,</span>
              </>
            }
            <ChannelMark channel={channel} />
          </span>
        </span>
      </button>
    </li>);

}
