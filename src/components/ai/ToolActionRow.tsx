import React, { useState } from 'react';
import { CheckIcon, ChevronRightIcon, Loader2Icon, SlashIcon, XIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

export type ToolStatus = 'running' | 'completed' | 'failed' | 'cancelled';

export interface ToolActionRowProps {
  /** Written as the observable action, e.g. "Retrieving from Brand guidelines.pdf". */
  action: string;
  status: ToolStatus;
  duration?: string;
  detail?: React.ReactNode;
  className?: string;
}

const statusMeta: Record<ToolStatus, {label: string;Icon: React.ElementType;cls: string;}> = {
  running: { label: 'Running', Icon: Loader2Icon, cls: 'text-fg-secondary' },
  completed: { label: 'Completed', Icon: CheckIcon, cls: 'text-success-fg' },
  failed: { label: 'Failed', Icon: XIcon, cls: 'text-danger-fg' },
  cancelled: { label: 'Cancelled', Icon: SlashIcon, cls: 'text-fg-muted' }
};

export function ToolActionRow({ action, status, duration, detail, className }: ToolActionRowProps) {
  const [open, setOpen] = useState(false);
  const { label, Icon, cls } = statusMeta[status];

  return (
    <div className={cn('rounded-sm border border-line-subtle bg-surface-subtle', className)}>
      <button
        type="button"
        onClick={() => detail && setOpen((o) => !o)}
        aria-expanded={detail ? open : undefined}
        disabled={!detail}
        className="flex w-full items-center gap-2 px-2.5 py-1.5 text-left disabled:cursor-default">
        
        {detail &&
        <ChevronRightIcon
          className={cn('h-3 w-3 shrink-0 text-fg-muted transition-transform duration-140 ease-enter', open && 'rotate-90')}
          aria-hidden="true" />

        }
        <Icon
          className={cn('h-3.5 w-3.5 shrink-0', cls, status === 'running' && 'animate-spin')}
          aria-hidden="true" />
        
        <span className="min-w-0 flex-1 truncate text-xs text-fg-secondary">{action}</span>
        <span className={cn('shrink-0 text-2xs font-medium', cls)}>{label}</span>
        {duration && <span className="shrink-0 text-2xs text-fg-muted tnum">{duration}</span>}
      </button>
      {open && detail &&
      <div className="border-t border-line-subtle px-2.5 py-2 font-mono text-[11px] leading-5 text-fg-muted">
          {detail}
        </div>
      }
    </div>);

}