import React from 'react';
import { SearchIcon, XIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface SearchInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  shortcut?: string;
  className?: string;
}

export function SearchInput({
  id,
  label,
  value,
  onChange,
  placeholder = 'Search',
  shortcut,
  className
}: SearchInputProps) {
  return (
    <div className={cn('relative flex items-center', className)}>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <SearchIcon className="pointer-events-none absolute left-2.5 h-3.5 w-3.5 text-fg-muted" aria-hidden="true" />
      <input
        id={id}
        type="search"
        role="searchbox"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 w-full rounded-sm border border-line bg-[var(--input-bg)] pl-8 pr-16 text-13 text-fg-primary placeholder:text-fg-muted transition-colors duration-100 ease-enter hover:border-line-strong [&::-webkit-search-cancel-button]:hidden" />
      
      {value ?
      <button
        type="button"
        onClick={() => onChange('')}
        aria-label="Clear search"
        className="absolute right-2 rounded-xs p-0.5 text-fg-muted transition-colors duration-100 ease-enter hover:bg-surface-hover hover:text-fg-primary">
        
          <XIcon className="h-3.5 w-3.5" aria-hidden="true" />
        </button> :

      shortcut &&
      <kbd className="pointer-events-none absolute right-2 rounded-xs border border-line bg-surface-subtle px-1 py-0.5 text-2xs text-fg-muted">
            {shortcut}
          </kbd>

      }
    </div>);

}