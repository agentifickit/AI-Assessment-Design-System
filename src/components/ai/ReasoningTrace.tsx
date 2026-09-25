import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { BrainIcon, ChevronRightIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface ReasoningTraceProps {
  /** The model's reasoning as it arrived. Shown in full, never summarised. */
  text: string;
  /** True while the reasoning is still arriving. */
  streaming: boolean;
  /** Seconds the reasoning took, when known from elsewhere. Otherwise the
   *  trace measures it itself while `streaming` is true. */
  seconds?: number;
  className?: string;
}

/** Thinking the candidate can audit (DS-29). While the model reasons, the
 *  trace is open and its lines arrive under a breathing icon, the older ones
 *  fading under the top edge. When the answer starts it folds to "Thought for
 *  4s"; opening it shows every word. "Thinking" is only ever the label of a
 *  trace the reader can open, never of a wait with nothing behind it. */
export function ReasoningTrace({ text, streaming, seconds, className }: ReasoningTraceProps) {
  const startedAt = useRef<number | null>(streaming ? Date.now() : null);
  const [measured, setMeasured] = useState<number | null>(null);
  const [live, setLive] = useState(0);
  const [chosen, setChosen] = useState<boolean | null>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (streaming) {
      if (startedAt.current === null) startedAt.current = Date.now();
      const t = window.setInterval(() => {
        if (startedAt.current !== null) setLive(Math.round((Date.now() - startedAt.current) / 1000));
      }, 500);
      return () => window.clearInterval(t);
    }
    if (startedAt.current !== null && measured === null) {
      setMeasured(Math.max(1, Math.round((Date.now() - startedAt.current) / 1000)));
    }
  }, [streaming, measured]);

  // Keep the newest line in view while the trace is streaming.
  useLayoutEffect(() => {
    if (streaming && bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [text, streaming]);

  const open = chosen ?? streaming;
  const took = seconds ?? measured;
  const heading = streaming ? 'Thinking' : took ? `Thought for ${took}s` : 'Thought';

  return (
    <div className={cn('min-w-0', className)}>
      <button
        type="button"
        onClick={() => setChosen(!open)}
        aria-expanded={open}
        className="group flex items-center gap-2 rounded-xs py-1 text-left text-xs transition-colors duration-100 ease-enter">
        <span
          className={cn(
            'inline-flex h-3.5 w-3.5 items-center justify-center',
            streaming ? 'text-ai-fg' : 'text-fg-muted group-hover:text-fg-secondary'
          )}>
          <BrainIcon className={cn('h-3.5 w-3.5', streaming && 'ai-breathe')} aria-hidden="true" />
        </span>
        <span className={streaming ? 'ai-shimmer font-medium' : 'text-fg-secondary group-hover:text-fg-primary'}>
          {heading}
        </span>
        {streaming && live >= 1 && <span className="text-2xs text-fg-muted tnum">{live}s</span>}
        <ChevronRightIcon
          className={cn(
            'h-3 w-3 text-fg-muted transition-transform duration-140 ease-enter',
            open && 'rotate-90'
          )}
          aria-hidden="true" />
      </button>
      <div
        className={cn(
          'grid transition-[grid-template-rows,opacity] duration-220 ease-enter',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        )}>
        <div className="min-h-0 overflow-hidden" aria-hidden={!open}>
          <div
            ref={bodyRef}
            aria-busy={streaming || undefined}
            className={cn(
              'scroll-panel ml-[7px] mt-0.5 overflow-y-auto border-l border-line-subtle pb-1 pl-3.5 text-xs leading-5 text-fg-secondary whitespace-pre-wrap',
              streaming ? 'ai-trace-live max-h-32' : 'max-h-72'
            )}>
            {text}
          </div>
        </div>
      </div>
    </div>);
}
