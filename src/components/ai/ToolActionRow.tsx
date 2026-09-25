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
  /** `row` is the bordered row; `step` is a borderless line in a copilot
   *  thread, where only a failure or a stop is written out. DS-25. */
  variant?: 'row' | 'step';
  /** Replaces the completed tick in the `step` variant, e.g. for working notes. */
  icon?: React.ReactNode;
  className?: string;
}

const statusMeta: Record<ToolStatus, {label: string;Icon: React.ElementType;cls: string;}> = {
  running: { label: 'Running', Icon: Loader2Icon, cls: 'text-fg-secondary' },
  completed: { label: 'Completed', Icon: CheckIcon, cls: 'text-success-fg' },
  failed: { label: 'Failed', Icon: XIcon, cls: 'text-danger-fg' },
  cancelled: { label: 'Cancelled', Icon: SlashIcon, cls: 'text-fg-muted' }
};

/** In a step the tick is quiet: a thread of green ticks reads as a checklist
 *  the candidate has to act on. The running spinner takes the AI colour. */
const stepCls: Record<ToolStatus, string> = {
  running: 'text-ai-fg',
  completed: 'text-fg-muted',
  failed: 'text-danger-fg',
  cancelled: 'text-fg-muted'
};

export function ToolActionRow({
  action,
  status,
  duration,
  detail,
  variant = 'row',
  icon,
  className
}: ToolActionRowProps) {
  const [open, setOpen] = useState(false);
  const { label, Icon, cls } = statusMeta[status];

  if (variant === 'step') {
    const written = status === 'failed' || status === 'cancelled';
    return (
      <div className={cn('min-w-0', className)}>
        <button
          type="button"
          onClick={() => detail && setOpen((o) => !o)}
          aria-expanded={detail ? open : undefined}
          disabled={!detail}
          className="flex w-full items-center gap-2 rounded-xs py-1 text-left disabled:cursor-default">
          <span className={cn('inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center', stepCls[status])}>
            {icon && status === 'completed' ?
            icon :
            <Icon
              className={cn('h-3.5 w-3.5', status === 'running' && 'animate-spin')}
              aria-hidden="true" />
            }
          </span>
          <span
            className={cn(
              'min-w-0 truncate text-xs',
              status === 'running' ? 'text-fg-primary' : 'text-fg-secondary'
            )}>
            {action}
          </span>
          {written ?
          <span className={cn('shrink-0 text-2xs font-medium', cls)}>
              {status === 'cancelled' ? 'Stopped' : label}
            </span> :
          <span className="sr-only">, {label}</span>
          }
          {duration && <span className="shrink-0 text-2xs text-fg-muted tnum">{duration}</span>}
          {detail &&
          <ChevronRightIcon
            className={cn(
              'h-3 w-3 shrink-0 text-fg-muted transition-transform duration-140 ease-enter',
              open && 'rotate-90'
            )}
            aria-hidden="true" />
          }
        </button>
        {open && detail &&
        <div className="mb-1 ml-[22px] mt-0.5 rounded-sm border border-line-subtle bg-surface-subtle px-2.5 py-2 text-2xs leading-5 text-fg-secondary">
            {detail}
          </div>
        }
      </div>);
  }

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