import React, { useState } from 'react';
import { ChevronRightIcon, ListChecksIcon, Loader2Icon } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface ToolStepGroupProps {
  /** The collapsed line, counted in words the candidate uses: "3 steps". */
  summary: string;
  /** Open while any step runs, then folds away once the answer arrives. */
  running?: boolean;
  defaultOpen?: boolean;
  /** `ToolActionRow variant="step"` rows. */
  children: React.ReactNode;
  className?: string;
}

/** A long run of steps folded into one line, opened on a thread line. The
 *  candidate copilot keeps its steps visible instead (Pulkit, 2026-09-26: tool
 *  calls stay visible, each on its own icon); this is for long agent runs on
 *  other surfaces, where the answer must stay the first thing read. DS-26. */
export function ToolStepGroup({
  summary,
  running = false,
  defaultOpen = false,
  children,
  className
}: ToolStepGroupProps) {
  // Open while running and folded after, until the person opens or closes it;
  // from then on their choice holds.
  const [chosen, setChosen] = useState<boolean | null>(null);
  const open = chosen ?? (running || defaultOpen);

  return (
    <div className={cn('min-w-0', className)}>
      <button
        type="button"
        onClick={() => setChosen(!open)}
        aria-expanded={open}
        className="flex items-center gap-2 rounded-xs py-1 text-left text-xs text-fg-secondary transition-colors duration-100 ease-enter hover:text-fg-primary">
        <span className={cn('inline-flex h-3.5 w-3.5 items-center justify-center', running ? 'text-ai-fg' : 'text-fg-muted')}>
          {running ?
          <Loader2Icon className="h-3.5 w-3.5 animate-spin" aria-hidden="true" /> :
          <ListChecksIcon className="h-3.5 w-3.5" aria-hidden="true" />
          }
        </span>
        <span>{summary}</span>
        <ChevronRightIcon
          className={cn(
            'h-3 w-3 text-fg-muted transition-transform duration-140 ease-enter',
            open && 'rotate-90'
          )}
          aria-hidden="true" />
      </button>
      {open &&
      <div className="ml-[7px] border-l border-line-subtle pl-3">{children}</div>
      }
    </div>);
}
