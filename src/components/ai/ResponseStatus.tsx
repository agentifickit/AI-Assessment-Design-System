import React, { useEffect, useState } from 'react';
import { cn } from '../../utils/cn';
import { AssistantMark } from './AssistantMark';

export interface ResponseStatusProps {
  /** One fixed line: "Responding". Used when `phrases` is not given. */
  label?: string;
  /** Lines the status moves through while it waits, each one something the
   *  assistant is observably doing with this turn: "Reading the brief",
   *  "Opening your sheet", "Drafting a reply". The last one holds. DS-24. */
  phrases?: string[];
  /** Milliseconds each phrase stays before the next rises in. */
  interval?: number;
  /** Whole seconds since the request was sent. Shown from 3 seconds, so a
   *  quick answer never flashes a counter. */
  elapsed?: number;
  className?: string;
}

/** The turn between sending and the first words arriving. The mark turns, a
 *  light sweeps across the line, and with `phrases` the copy moves on: the
 *  outgoing phrase lifts away as the next rises in. Under reduced motion the
 *  phrases still change but nothing moves. It is not a live region: the
 *  thread's StreamAnnouncer says that generation started. */
export function ResponseStatus({
  label = 'Responding',
  phrases,
  interval = 2200,
  elapsed,
  className
}: ResponseStatusProps) {
  const lines = phrases && phrases.length > 0 ? phrases : [label];
  const [at, setAt] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (lines.length < 2 || at >= lines.length - 1) return;
    const t = window.setTimeout(() => {
      setAt((i) => Math.min(i + 1, lines.length - 1));
      setTick((n) => n + 1);
    }, interval);
    return () => window.clearTimeout(t);
  }, [at, interval, lines.length]);

  const current = lines[Math.min(at, lines.length - 1)];
  const previous = tick > 0 ? lines[Math.max(0, Math.min(at, lines.length - 1) - 1)] : null;

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <AssistantMark size="md" working />
      <span className="relative inline-grid overflow-hidden text-xs font-medium">
        {previous &&
        <span key={`out-${tick}`} className="ai-phrase-out col-start-1 row-start-1 text-fg-muted" aria-hidden="true">
            {previous}
          </span>
        }
        <span key={`in-${tick}`} className={cn('ai-shimmer col-start-1 row-start-1', tick > 0 && 'ai-phrase-in')}>
          {current}
        </span>
      </span>
      {elapsed !== undefined && elapsed >= 3 &&
      <span className="text-2xs text-fg-muted tnum">{elapsed}s</span>
      }
    </div>);
}
