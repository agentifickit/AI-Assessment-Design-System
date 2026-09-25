import React from 'react';
import { FileTextIcon, ImageIcon, Link2Icon, MailIcon, StickyNoteIcon, Table2Icon } from 'lucide-react';
import { cn } from '../../utils/cn';

export type FileKind = 'doc' | 'sheet' | 'pdf' | 'image' | 'email' | 'link' | 'note';

const EXTENSION = /\.(md|markdown|pdf|csv|tsv|xlsx|xls|docx?|txt|png|jpe?g|gif|webp|svg)$/i;

const icons: Record<Exclude<FileKind, 'pdf'>, React.ComponentType<{className?: string;}>> = {
  doc: FileTextIcon,
  sheet: Table2Icon,
  image: ImageIcon,
  email: MailIcon,
  link: Link2Icon,
  note: StickyNoteIcon
};

function kindOf(name: string): FileKind {
  const n = name.trim().toLowerCase();
  if (/\.(csv|tsv|xlsx|xls)$/.test(n)) return 'sheet';
  if (n.endsWith('.pdf')) return 'pdf';
  if (/\.(png|jpe?g|gif|webp|svg)$/.test(n)) return 'image';
  return 'doc';
}

export interface FileGlyphProps {
  /** The file's name; its kind is read from the extension. */
  name?: string;
  /** Or the kind itself, for things that are not files: a note, a link, mail. */
  kind?: FileKind;
  /** Size and ink; the glyph takes the current colour. 14px by default. */
  className?: string;
}

/** A file's kind at 14px, in the ink of the row it sits in. Kinds are told
 *  apart by shape, never by colour. A PDF is the one exception to a line
 *  glyph: it shows a small bordered "PDF" tag, because a page glyph reads as
 *  the candidate's own document. The tag is type drawn as a glyph, the one
 *  place type goes under the 9px chrome floor (DS-20); it is hidden from
 *  assistive technology, and FileName says the kind in words. DS-29, from the
 *  workspace review of 2026-09-26. */
export function FileGlyph({ name = '', kind, className }: FileGlyphProps) {
  const k = kind ?? kindOf(name);
  if (k === 'pdf') {
    return (
      <span
        aria-hidden="true"
        data-file-glyph="pdf"
        className={cn('inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center', className)}>
        
        <span className="-mx-0.5 rounded-xs border border-current px-px font-sans text-[7px] font-bold leading-[9px] tracking-[-0.01em]">
          PDF
        </span>
      </span>);

  }
  const Icon = icons[k];
  return <Icon aria-hidden="true" className={cn('h-3.5 w-3.5 shrink-0', className)} />;
}

export interface FileNameProps {
  /** The stored name, extension and all. It stays the key for lookups. */
  name: string;
  className?: string;
}

/** A file's name as it is shown: without its extension, since the glyph
 *  beside it already says the kind. Screen readers still hear it ("Retention
 *  by cohort, PDF"), and the full name is the hover title. DS-29. */
export function FileName({ name, className }: FileNameProps) {
  const trimmed = name.trim();
  const match = EXTENSION.exec(trimmed);
  const shown = match ? trimmed.slice(0, match.index).trim() : trimmed;
  return (
    <span className={cn('min-w-0 truncate', className)} title={name}>
      {shown || name}
      {match && shown && <span className="sr-only">, {match[1].toUpperCase()}</span>}
    </span>);

}
