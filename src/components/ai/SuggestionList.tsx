import React from 'react';
import { ChevronRightIcon } from 'lucide-react';
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
  /** `rows` are quiet rows on a plain surface. `cards` sit on a dot field:
   *  each is a white surface with a hairline, so no text crosses a dot, and
   *  the icon tile and edge turn AI violet on hover (DS-49). */
  appearance?: 'rows' | 'cards';
  className?: string;
}

/** Starting points for an empty conversation, with a leading icon. Selecting
 *  one fills the composer; it never sends on its own, so the person can edit
 *  it first. Three at most. DS-27; `cards` DS-49. */
export function SuggestionList({
  suggestions,
  onSelect,
  label = 'Suggestions',
  appearance = 'rows',
  className
}: SuggestionListProps) {
  const cards = appearance === 'cards';
  return (
    <ul aria-label={label} className={cn('flex flex-col', cards && 'gap-1.5', className)}>
      {suggestions.map((s) =>
      <li key={s.label}>
          <button
          type="button"
          onClick={() => onSelect(s.label)}
          className={cn(
            'group flex w-full items-center text-left text-xs text-fg-secondary transition-colors duration-100 ease-enter hover:text-fg-primary',
            cards ?
            'gap-3 rounded-md border border-line bg-surface px-2 py-2 hover:border-ai-border' :
            'gap-2.5 rounded-sm px-2 py-1.5 hover:bg-surface-hover'
          )}>
            {s.icon &&
          <span
            aria-hidden="true"
            className={cn(
              'inline-flex shrink-0 items-center justify-center text-fg-muted transition-colors duration-100 ease-enter group-hover:text-ai-fg',
              cards ? 'h-7 w-7 rounded-sm bg-surface-subtle group-hover:bg-ai-bg' : 'h-4 w-4'
            )}>
                {s.icon}
              </span>
          }
            <span className="min-w-0 flex-1 truncate">{s.label}</span>
            {cards &&
          <ChevronRightIcon
            aria-hidden="true"
            className="h-3.5 w-3.5 shrink-0 text-ai-fg opacity-0 transition-opacity duration-100 ease-enter group-hover:opacity-100" />
          }
          </button>
        </li>
      )}
    </ul>);
}
