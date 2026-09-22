import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { SearchIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface SearchRow {
  id: string;
  label: string;
  /** Secondary text at the right: a source, a date, a location. */
  meta?: string;
  icon?: React.ReactNode;
}

export interface SearchLightboxProps {
  open: boolean;
  onClose: () => void;
  /** Accessible name and placeholder, e.g. "Search this session". */
  label: string;
  value: string;
  onChange: (value: string) => void;
  results: SearchRow[];
  onSelect: (row: SearchRow) => void;
  /** The new-tab variant: create rows (new page, new sheet) sit above results. */
  createRows?: SearchRow[];
  emptyText?: string;
}

/** Search is a centred lightbox over a scrim, not a field in the shell. The
 *  shell stays quiet and the candidate gets one place to look, opened with a
 *  shortcut or the new-tab control. DS-17, approved 2026-09-22. Arrow keys
 *  move the selection, Enter chooses, Escape closes. */
export function SearchLightbox({
  open,
  onClose,
  label,
  value,
  onChange,
  results,
  onSelect,
  createRows = [],
  emptyText = 'Nothing matches yet'
}: SearchLightboxProps) {
  const rows = [...createRows, ...results];
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setIndex(0);
    const raf = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(raf);
  }, [open]);

  useEffect(() => setIndex(0), [value]);

  if (!open || typeof document === 'undefined') return null;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setIndex((i) => Math.min(i + 1, rows.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && rows[index]) {
      e.preventDefault();
      onSelect(rows[index]);
    }
  };

  const renderRow = (row: SearchRow, i: number, create: boolean) =>
  <li key={row.id} role="option" aria-selected={i === index} id={`search-row-${row.id}`}>
      <button
      type="button"
      tabIndex={-1}
      onMouseEnter={() => setIndex(i)}
      onClick={() => onSelect(row)}
      className={cn(
        'flex w-full items-center gap-2.5 px-4 py-2 text-left text-13 transition-colors duration-100 ease-enter',
        i === index ? 'bg-surface-hover text-fg-primary' : 'text-fg-secondary'
      )}>
      
        <span className="text-fg-muted">{row.icon}</span>
        <span className={cn('min-w-0 flex-1 truncate', create && 'font-medium')}>{row.label}</span>
        {row.meta && <span className="shrink-0 text-2xs text-fg-muted">{row.meta}</span>}
      </button>
    </li>;


  return createPortal(
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[15vh]" data-ledger-overlay="">
      <div className="absolute inset-0" style={{ background: 'var(--overlay-scrim)' }} onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={label}
        onKeyDown={onKeyDown}
        className="relative flex w-full max-w-[560px] flex-col overflow-hidden rounded-lg border border-line bg-surface-raised shadow-dialog">
        
        <div className="relative flex h-12 items-center border-b border-line-subtle">
          <SearchIcon className="pointer-events-none absolute left-4 h-4 w-4 text-fg-muted" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            role="combobox"
            aria-expanded={rows.length > 0}
            aria-controls="search-lightbox-results"
            aria-activedescendant={rows[index] ? `search-row-${rows[index].id}` : undefined}
            aria-label={label}
            placeholder={label}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="h-full w-full bg-transparent pl-11 pr-4 text-sm text-fg-primary placeholder:text-fg-muted focus:outline-none [&::-webkit-search-cancel-button]:hidden" />
          
        </div>
        <ul id="search-lightbox-results" role="listbox" className="scroll-panel max-h-[50vh] overflow-y-auto py-1.5">
          {createRows.map((r, i) => renderRow(r, i, true))}
          {createRows.length > 0 && results.length > 0 && <li role="presentation" className="my-1.5 border-t border-line-subtle" />}
          {results.map((r, i) => renderRow(r, createRows.length + i, false))}
          {rows.length === 0 && <li className="px-4 py-6 text-center text-13 text-fg-muted">{emptyText}</li>}
        </ul>
      </div>
    </div>,
    document.body
  );
}
