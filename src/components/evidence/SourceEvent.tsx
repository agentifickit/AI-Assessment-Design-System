import React from 'react';
import { CornerDownRightIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface SourceEventProps {
  timestamp: string;
  eventType: string;
  detail: string;
  eventId: string;
  onJump?: () => void;
  className?: string;
}

/** Layer 1 of the evidence model. Verbatim, immutable, monospace, on a sunken surface —
 *  styled to read as a record rather than as our prose. */
export function SourceEvent({ timestamp, eventType, detail, eventId, onJump, className }: SourceEventProps) {
  return (
    <div
      className={cn(
        'rounded-sm border border-line-subtle bg-surface-sunken px-3 py-2 font-mono text-xs',
        className
      )}>
      
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-fg-muted">
        <span className="tnum">{timestamp}</span>
        <span className="text-fg-secondary">{eventType}</span>
        <span className="tnum text-[10px]">{eventId}</span>
      </div>
      <p className="mt-1 break-words text-fg-primary">{detail}</p>
      {onJump &&
      <button
        type="button"
        onClick={onJump}
        className="mt-1.5 inline-flex items-center gap-1 rounded-xs font-sans text-2xs text-link underline underline-offset-2 transition-colors duration-100 ease-enter hover:text-link-hover">
        
          <CornerDownRightIcon className="h-3 w-3" aria-hidden="true" />
          Open in session replay
        </button>
      }
    </div>);

}