import React from 'react';
import { LinkIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import type { EvidenceStateId } from '../../types/system';
import { EvidenceStateBadge } from './EvidenceStateBadge';

export interface EvidenceExcerptProps {
  state: EvidenceStateId;
  /** Text before the quoted span — dimmed so the relevant part is unambiguous. */
  before?: string;
  quote: string;
  after?: string;
  speaker: string;
  timestamp: string;
  sourceLabel: string;
  onOpenSource?: () => void;
  className?: string;
}

/** Layer 2 of the evidence model. The observed behaviour, quoted in place with its context. */
export function EvidenceExcerpt({
  state,
  before,
  quote,
  after,
  speaker,
  timestamp,
  sourceLabel,
  onOpenSource,
  className
}: EvidenceExcerptProps) {
  return (
    <figure className={cn('rounded-md border border-line bg-surface', className)}>
      <figcaption className="flex flex-wrap items-center justify-between gap-2 border-b border-line-subtle px-3 py-2">
        <EvidenceStateBadge state={state} size="sm" />
        <span className="flex items-center gap-2 text-2xs text-fg-muted">
          <span>{speaker},</span>
          <span className="tnum">{timestamp}</span>
        </span>
      </figcaption>
      <blockquote className="px-3 py-2.5 font-mono text-xs leading-6">
        {before && <span className="text-fg-disabled">{before} </span>}
        <mark className="bg-transparent font-medium text-fg-primary underline decoration-line-strong decoration-1 underline-offset-4">
          {quote}
        </mark>
        {after && <span className="text-fg-disabled"> {after}</span>}
      </blockquote>
      <div className="border-t border-line-subtle px-3 py-1.5">
        <button
          type="button"
          onClick={onOpenSource}
          className="inline-flex items-center gap-1.5 rounded-xs text-2xs text-link underline underline-offset-2 transition-colors duration-100 ease-enter hover:text-link-hover">
          
          <LinkIcon className="h-3 w-3" aria-hidden="true" />
          {sourceLabel}
        </button>
      </div>
    </figure>);

}