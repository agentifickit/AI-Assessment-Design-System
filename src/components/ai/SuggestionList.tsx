import React from 'react';
import { cn } from '../../utils/cn';

export interface Suggestion {
  label: string;
  icon?: React.ReactNode;
}

export interface SuggestionListProps {
  suggestions: Suggestion[];
  onSelect: (label: string) => void;
  /** Accessible name for the list, e.g. "Suggested questions". */
  label?: string;
  className?: string;
}

/** Starting points for an empty conversation: quiet rows with a leading icon,
 *  not bordered buttons. Selecting one fills the composer; it never sends on
 *  its own, so the person can edit it first. Three at most. DS-27. */
export function SuggestionList({
  suggestions,
  onSelect,
  label = 'Suggestions',
  className,
}: SuggestionListProps) {
  return (
    <ul aria-label={label} className={cn('flex flex-col', className)}>
      {suggestions.map((s) =>
      <li key={s.label}>
          <button
          type="button"
          onClick={() => onSelect(s.label)}
          className="group flex w-full items-center gap-2.5 rounded-sm px-2 py-1.5 text-left text-xs text-fg-secondary transition-colors duration-100 ease-enter hover:bg-surface-hover hover:text-fg-primary">
            {s.icon &&
          <span
            aria-hidden="true"
            className="inline-flex h-4 w-4 shrink-0 items-center justify-center text-fg-muted transition-colors duration-100 ease-enter group-hover:text-ai-fg">
                {s.icon}
              </span>
          }
            <span className="min-w-0 truncate">{s.label}</span>
          </button>
        </li>
      )}
    </ul>);
}
