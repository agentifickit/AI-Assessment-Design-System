import { useEffect, useRef, useState } from 'react';
import { cn } from '../../utils/cn';

export interface PageTitleInputProps {
  /** The page's name. An empty string shows the placeholder. */
  value: string;
  /** Called on Enter and on leaving the field, with the name trimmed and its
   *  whitespace collapsed, only when it changed. An empty string means
   *  untitled; the caller decides what to store. */
  onCommit: (title: string) => void;
  /** Enter commits, then calls this to move on, e.g. to the editor's first line. */
  onEnter?: () => void;
  placeholder?: string;
  readOnly?: boolean;
  /** Takes focus with the text selected, as a new page opens. */
  autoFocus?: boolean;
  /** Accessible name. */
  label?: string;
  className?: string;
}

/** A page's title edited in the page, as Notion does: a borderless field in
 *  the heading-1 step (24/32, 600) at the top of the document, the same name
 *  the tab and the sidebar show. It grows onto a second line rather than
 *  scrolling. Enter moves on to the body, Escape restores the name. The field
 *  has no box because it is the heading; the caret is its focus indicator.
 *  The placeholder is in the muted ink, which passes 3:1 as large text, not
 *  the disabled ink. DS-41, from the workspace review of 2026-09-26. */
export function PageTitleInput({
  value,
  onCommit,
  onEnter,
  placeholder = 'Untitled',
  readOnly,
  autoFocus,
  label = 'Page title',
  className
}: PageTitleInputProps) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [draft, setDraft] = useState(value);
  const [editing, setEditing] = useState(false);
  // A rename from elsewhere (the tab, the sidebar) shows unless the title is being typed.
  const shown = editing ? draft : value;

  const commit = (raw: string) => {
    setEditing(false);
    const next = raw.replace(/\s+/g, ' ').trim();
    if (next !== value) onCommit(next);
  };

  // The field grows with the name, as a heading would.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = '0px';
    el.style.height = `${el.scrollHeight}px`;
  }, [shown]);

  useEffect(() => {
    if (!autoFocus) return;
    ref.current?.focus();
    ref.current?.select();
  }, [autoFocus]);

  return (
    <textarea
      ref={ref}
      rows={1}
      aria-label={label}
      placeholder={placeholder}
      value={shown}
      readOnly={readOnly}
      onFocus={() => {
        setDraft(value);
        setEditing(true);
      }}
      onChange={(e) => setDraft(e.target.value.replace(/\n/g, ''))}
      onBlur={(e) => editing && commit(e.currentTarget.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          commit(e.currentTarget.value);
          onEnter?.();
        } else if (e.key === 'Escape') {
          e.preventDefault();
          setEditing(false);
          e.currentTarget.blur();
        }
      }}
      className={cn(
        'block w-full resize-none overflow-hidden bg-transparent p-0 text-2xl font-semibold tracking-[-0.01em] text-fg-primary',
        'placeholder:text-fg-muted focus-visible:outline-none',
        className
      )} />);


}
