import React, { useId } from 'react';
import { AlertCircleIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface FieldProps {
  /** Optional. When omitted, a stable per-instance id is generated. */
  id?: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  optionalLabel?: boolean;
  children: React.ReactNode;
  className?: string;
}

/** Label + hint + validation shell shared by every input.
 *  Errors are always icon + text, never colour alone. */
export function Field({
  id: providedId,
  label,
  hint,
  error,
  required,
  optionalLabel,
  children,
  className
}: FieldProps) {
  const generated = useId();
  const id = providedId ?? generated;
  return (
    <div className={cn('flex min-w-0 flex-col gap-1.5', className)}>
      <label htmlFor={id} className="flex items-baseline gap-1.5 text-xs font-medium text-fg-secondary">
        {label}
        {required &&
        <span className="text-2xs font-normal text-fg-muted">(required)</span>
        }
        {optionalLabel && !required &&
        <span className="text-2xs font-normal text-fg-muted">(optional)</span>
        }
      </label>
      {children}
      {hint && !error &&
      <p id={`${id}-hint`} className="text-2xs text-fg-muted">
          {hint}
        </p>
      }
      {error &&
      <p id={`${id}-error`} className="flex items-start gap-1.5 text-2xs text-danger-fg">
          <AlertCircleIcon className="mt-px h-3 w-3 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </p>
      }
    </div>);

}

export const controlBase =
'w-full rounded-sm border bg-[var(--input-bg)] text-13 text-fg-primary placeholder:text-fg-muted ' +
'transition-[border-color,background-color] duration-100 ease-enter ' +
'disabled:cursor-not-allowed disabled:bg-surface-subtle disabled:text-fg-disabled ' +
'read-only:bg-surface-subtle';

export function controlBorder(error?: boolean): string {
  return error ? 'border-danger-solid' : 'border-line hover:border-line-strong';
}