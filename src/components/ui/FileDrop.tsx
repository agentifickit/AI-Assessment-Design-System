import React, { useId, useRef, useState } from 'react';
import { UploadIcon, XIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { FileGlyph } from './FileGlyph';
import { IconButton } from './IconButton';

export interface FileDropProps {
  /** Receives the first file chosen or dropped. Choosing never advances on its
   *  own: the host shows the file as a `FileRow` and waits for its action. */
  onFile: (file: File) => void;
  /** Pass the enclosing `Field`'s id so its label names the file input. */
  id?: string;
  /** What the input takes, as the `accept` attribute (".csv,text/csv"). */
  accept?: string;
  /** The sentence before the link, ending where the link reads on. */
  prompt?: string;
  /** The link that opens the file picker. */
  chooseLabel?: string;
  /** One line under the prompt: kind and limits ("CSV, up to 200 rows"). */
  hint?: string;
  disabled?: boolean;
  className?: string;
}

/** A place to drop one file, or choose it. A `surface-subtle` panel with a
 *  `border-default` hairline (never dashed: a dashed border is Ledger's mark
 *  for an absence), a 20px upload glyph, the prompt with "choose a file" in
 *  `link-fg`, and the hint below. The drag-over state firms the border.
 *  The file input itself is visually hidden and out of the tab order; the
 *  link is the keyboard route, and a label pointed at `id` still names the
 *  input for assistive technology. Put it inside a `Field`. PLU-097 DS-22,
 *  approved 2026-09-27, issue #18. */
export function FileDrop({
  onFile,
  id,
  accept,
  prompt = 'Drop a file here, or',
  chooseLabel = 'choose a file',
  hint,
  disabled,
  className
}: FileDropProps) {
  const generated = useId();
  const inputId = id ?? generated;
  const hintId = `${inputId}-drop-hint`;
  const input = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);

  const take = (files: FileList | null) => {
    const file = files?.[0];
    if (file) onFile(file);
  };

  return (
    <div
      onDragOver={(e) => {
        if (disabled) return;
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={(e) => {
        // Moving onto a child fires dragleave on the panel; only leaving the panel counts.
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOver(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        if (!disabled) take(e.dataTransfer.files);
      }}
      data-over={over || undefined}
      className={cn(
        'flex flex-col items-center justify-center gap-2 rounded-md border bg-surface-subtle px-6 py-8 text-center',
        'transition-[border-color] duration-100 ease-enter',
        over ? 'border-line-strong' : 'border-line',
        disabled && 'opacity-50',
        className
      )}>

      <UploadIcon className="h-5 w-5 text-fg-secondary" aria-hidden="true" />
      <p className="text-sm text-fg-secondary">
        {prompt}{' '}
        <button
          type="button"
          disabled={disabled}
          onClick={() => input.current?.click()}
          className="rounded-xs text-link hover:text-link-hover hover:underline disabled:cursor-not-allowed disabled:no-underline">

          {chooseLabel}
        </button>
      </p>
      {hint &&
      <p id={hintId} className="text-2xs text-fg-muted">
          {hint}
        </p>
      }
      <input
        ref={input}
        id={inputId}
        type="file"
        accept={accept}
        disabled={disabled}
        aria-describedby={hint ? hintId : undefined}
        className="sr-only"
        tabIndex={-1}
        onChange={(e) => {
          take(e.target.files);
          // Cleared so choosing the same file again after Remove still fires.
          e.target.value = '';
        }} />

    </div>);

}

export interface FileRowProps {
  name: string;
  /** Size or row count, in figures ("4 KB", "20 rows"). */
  meta?: string;
  onRemove?: () => void;
  /** The Remove control's accessible name; say which file ("Remove candidates.csv"). */
  removeLabel?: string;
  disabled?: boolean;
  className?: string;
}

/** The chosen file as a row: its kind glyph, the name, the meta, and a Remove
 *  `IconButton` at the right. Disable Remove while the file is being read. */
export function FileRow({ name, meta, onRemove, removeLabel, disabled, className }: FileRowProps) {
  return (
    <div className={cn('flex items-center gap-2.5 rounded-md border border-line bg-surface px-3 py-2.5', className)}>
      <FileGlyph name={name} className="h-4 w-4 shrink-0 text-fg-muted" />
      <span className="min-w-0 truncate text-sm font-medium text-fg-primary">{name}</span>
      {meta && <span className="shrink-0 text-2xs text-fg-muted tnum">{meta}</span>}
      {onRemove &&
      <IconButton
        label={removeLabel ?? `Remove ${name}`}
        size="sm"
        className="ml-auto"
        icon={<XIcon className="h-4 w-4" />}
        onClick={onRemove}
        disabled={disabled} />
      }
    </div>);

}
