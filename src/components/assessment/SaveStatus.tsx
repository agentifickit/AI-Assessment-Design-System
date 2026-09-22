import React from 'react';
import { CheckIcon, CloudOffIcon, Loader2Icon, RotateCwIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

export type SaveState = 'saved' | 'saving' | 'retrying' | 'queued';

export interface SaveStatusProps {
  state: SaveState;
  /** Relative time, e.g. "12s ago". Only shown when saved. */
  savedAt?: string;
  className?: string;
}

const meta: Record<SaveState, {Icon: React.ElementType;text: (t?: string) => string;cls: string;}> = {
  saved: { Icon: CheckIcon, text: (t) => t ? `Your work is saved, ${t}` : 'Your work is saved', cls: 'text-fg-muted' },
  saving: { Icon: Loader2Icon, text: () => 'Saving your work', cls: 'text-fg-muted' },
  retrying: { Icon: RotateCwIcon, text: () => 'Retrying save — your work is kept on this device', cls: 'text-warning-fg' },
  queued: { Icon: CloudOffIcon, text: () => 'Offline — changes are queued and will save on reconnect', cls: 'text-warning-fg' }
};

export function SaveStatus({ state, savedAt, className }: SaveStatusProps) {
  const { Icon, text, cls } = meta[state];
  return (
    <span
      role="status"
      aria-live="polite"
      className={cn('inline-flex items-center gap-1.5 text-2xs', cls, className)}>
      
      <Icon className={cn('h-3 w-3 shrink-0', state === 'saving' && 'animate-spin')} aria-hidden="true" />
      {text(savedAt)}
    </span>);

}