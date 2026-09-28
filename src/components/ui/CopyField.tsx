import React, { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CheckIcon, CopyIcon } from 'lucide-react';
import { Button } from './Button';
import { Field } from './Field';
import { Toast } from './Toast';

export interface CopyFieldProps {
  label: string;
  /** The text to show and copy: a link, a code, an identifier. */
  value: string;
  id?: string;
  hint?: string;
  /** The button's label. Say what is copied ("Copy link"). */
  copyLabel?: string;
  /** Announced politely when the copy works. */
  copiedMessage?: string;
  /** The danger toast's title when the browser refuses the copy. */
  failedTitle?: string;
  /** The toast's second line: the value is selected, so say how to copy it by hand. */
  failedDescription?: string;
  className?: string;
}

/** Copies text to the clipboard. Resolves false when the browser refuses
 *  (no permission, an insecure origin), so the field can say so. */
async function copyText(text: string): Promise<boolean> {
  try {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return false;
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/** A value the reader copies rather than edits: a read-only mono field on
 *  `surface-subtle`, a secondary Copy button beside it, both 32px. When the
 *  copy works the button's glyph turns to a check for two seconds and a polite
 *  announcement says so; nothing else moves. When the browser refuses, a
 *  danger `Toast` says what happened and the value is selected in its field
 *  for a manual copy. Focusing the field selects the whole value. PLU-097
 *  DS-24, approved 2026-09-27, issue #18. */
export function CopyField({
  label,
  value,
  id: providedId,
  hint,
  copyLabel = 'Copy',
  copiedMessage = 'Copied to the clipboard',
  failedTitle = 'This browser did not allow the copy',
  failedDescription = 'The text is selected in its field. Copy it with Ctrl+C, or Cmd+C on a Mac.',
  className
}: CopyFieldProps) {
  const generated = useId();
  const id = providedId ?? generated;
  const field = useRef<HTMLInputElement>(null);
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');

  useEffect(() => {
    if (state !== 'copied') return;
    const timer = window.setTimeout(() => setState('idle'), 2000);
    return () => window.clearTimeout(timer);
  }, [state]);

  const copy = async () => {
    if (await copyText(value)) {
      setState('copied');
      return;
    }
    setState('failed');
    field.current?.focus();
    field.current?.select();
  };

  return (
    <Field id={id} label={label} hint={hint} className={className}>
      <div className="flex items-center gap-2">
        <input
          ref={field}
          id={id}
          readOnly
          value={value}
          aria-describedby={hint ? `${id}-hint` : undefined}
          onFocus={(e) => e.currentTarget.select()}
          className="h-8 min-w-0 flex-1 truncate rounded-sm border border-line bg-surface-subtle px-2.5 font-mono text-xs text-fg-primary" />

        <Button
          variant="secondary"
          className="shrink-0"
          onClick={() => void copy()}
          iconLeft={
          state === 'copied' ?
          <CheckIcon className="h-3.5 w-3.5" aria-hidden="true" /> :
          <CopyIcon className="h-3.5 w-3.5" aria-hidden="true" />
          }>

          {copyLabel}
        </Button>
      </div>
      <span role="status" aria-live="polite" className="sr-only">
        {state === 'copied' ? copiedMessage : ''}
      </span>
      {state === 'failed' && typeof document !== 'undefined' &&
      createPortal(
        <div className="fixed bottom-6 right-6 z-[60] w-[360px] max-w-[calc(100vw-48px)]">
            <Toast tone="danger" title={failedTitle} description={failedDescription} onDismiss={() => setState('idle')} />
          </div>,
        document.body
      )}
    </Field>);

}
