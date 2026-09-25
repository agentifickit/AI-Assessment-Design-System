import { useEffect, useRef, useState } from 'react';
import { cn } from '../../utils/cn';

export interface InlineNameInputProps {
  /** The name as it stands; Escape restores it. */
  initial: string;
  /** Accessible name, e.g. "Tab name" or "Rename Q3 note". */
  label: string;
  /** Called once, with the trimmed value (Enter, blur) or the initial one (Escape). */
  onDone: (value: string) => void;
  className?: string;
}

/** A name edited where it is shown: a tab, a sidebar row. It takes focus with
 *  the text selected, grows with the name, and commits exactly once: Enter or
 *  leaving the field keeps the name, Escape keeps the old one. Keys stop here,
 *  so the strip's arrows and F2 do not fire while typing. DS-21. */
export function InlineNameInput({ initial, label, onDone, className }: InlineNameInputProps) {
  const [value, setValue] = useState(initial);
  const ref = useRef<HTMLInputElement>(null);
  // The blur that follows an unmount must not commit a second time.
  const done = useRef(false);

  const finish = (next: string) => {
    if (done.current) return;
    done.current = true;
    onDone(next.trim() || initial);
  };

  useEffect(() => {
    ref.current?.focus();
    ref.current?.select();
  }, []);

  return (
    <input
      ref={ref}
      aria-label={label}
      value={value}
      size={Math.max(8, Math.min(28, value.length + 1))}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => finish(value)}
      onKeyDown={(e) => {
        e.stopPropagation();
        if (e.key === 'Enter') finish(value);
        if (e.key === 'Escape') finish(initial);
      }}
      className={cn(
        'h-6 min-w-0 rounded-sm border border-line-strong bg-surface px-1 text-13 font-medium text-fg-primary',
        'focus-visible:outline-offset-0',
        className
      )} />);


}
