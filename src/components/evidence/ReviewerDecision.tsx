import React, { useState } from 'react';
import { ChevronRightIcon, UserCheckIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { EvidenceStateBadge } from './EvidenceStateBadge';

export interface ReviewerDecisionProps {
  reviewer: string;
  role: string;
  timestamp: string;
  children: React.ReactNode;
  /** The AI draft this decision replaced. Retained, never deleted. */
  overrode?: string;
  approved?: boolean;
  className?: string;
}

/** Layer 4 of the evidence model. The accountable human conclusion:
 *  solid surface, full-weight text, named attribution. */
export function ReviewerDecision({
  reviewer,
  role,
  timestamp,
  children,
  overrode,
  approved,
  className
}: ReviewerDecisionProps) {
  const [showOriginal, setShowOriginal] = useState(false);

  return (
    <div className={cn('rounded-md border-l-2 border border-line bg-surface', className)} style={{ borderLeftColor: 'var(--human-border)' }}>
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 pt-2.5">
        <span className="inline-flex items-center gap-1.5 text-2xs font-medium text-fg-primary">
          <UserCheckIcon className="h-3.5 w-3.5" aria-hidden="true" />
          {reviewer}
          <span className="font-normal text-fg-muted">· {role}</span>
        </span>
        <span className="flex items-center gap-2">
          {approved && <EvidenceStateBadge state="approved" size="sm" />}
          <span className="text-2xs text-fg-muted tnum">{timestamp}</span>
        </span>
      </div>
      <div className="max-w-measure px-3 py-2 text-13 font-medium leading-6 text-fg-primary">{children}</div>
      {overrode &&
      <div className="border-t border-line-subtle px-3 py-1.5">
          <button
          type="button"
          onClick={() => setShowOriginal((v) => !v)}
          aria-expanded={showOriginal}
          className="inline-flex items-center gap-1 rounded-xs text-2xs text-fg-muted transition-colors duration-100 ease-enter hover:text-fg-primary">
          
            <ChevronRightIcon
            className={cn('h-3 w-3 transition-transform duration-140 ease-enter', showOriginal && 'rotate-90')}
            aria-hidden="true" />
          
            Overridden interpretation
          </button>
          {showOriginal &&
        <p className="mt-1.5 max-w-measure border-l-2 border-line pl-2.5 text-xs italic leading-5 text-fg-muted">
              {overrode}
            </p>
        }
        </div>
      }
    </div>);

}