import React from 'react';
import { SparkleIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import type { ConfidenceBand } from '../../types/system';
import { ConfidenceIndicator } from './ConfidenceIndicator';

export interface InterpretationBlockProps {
  children: React.ReactNode;
  confidence: ConfidenceBand;
  /** Number of linked evidence items. Zero renders the unsupported notice. */
  evidenceCount: number;
  actions?: React.ReactNode;
  className?: string;
}

/** Layer 3 of the evidence model. AI-generated draft — visually subordinate, always labelled,
 *  and explicitly marked when nothing supports it. */
export function InterpretationBlock({
  children,
  confidence,
  evidenceCount,
  actions,
  className
}: InterpretationBlockProps) {
  return (
    <div
      className={cn('border-l-2 bg-ai-bg py-2.5 pl-3 pr-3', className)}
      style={{ borderLeftColor: 'var(--ai-border)' }}>
      
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5">
        <span className="inline-flex items-center gap-1.5 text-2xs font-medium text-ai-fg">
          <SparkleIcon className="h-3 w-3" aria-hidden="true" />
          AI-generated draft interpretation
        </span>
        <ConfidenceIndicator band={confidence} />
      </div>
      <div className="mt-1.5 max-w-measure text-13 leading-6 text-fg-secondary">{children}</div>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
        {evidenceCount > 0 ?
        <span className="text-2xs text-fg-muted tnum">
            {evidenceCount} linked {evidenceCount === 1 ? 'moment' : 'moments'} from the session
          </span> :

        <span className="rounded-xs border border-dashed border-line-strong px-1.5 py-0.5 text-2xs text-fg-muted">
            No linked evidence — cannot be approved as written
          </span>
        }
        {actions && <span className="flex items-center gap-1.5">{actions}</span>}
      </div>
    </div>);

}