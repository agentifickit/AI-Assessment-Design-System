import React, { useEffect, useRef, useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface SplitButtonAction {
  label: string;
  description?: string;
  onSelect: () => void;
  destructive?: boolean;
}

export interface SplitButtonProps {
  primaryLabel: string;
  onPrimary: () => void;
  actions: SplitButtonAction[];
  menuLabel?: string;
  disabled?: boolean;
  className?: string;
}

export function SplitButton({
  primaryLabel,
  onPrimary,
  actions,
  menuLabel = 'More actions',
  disabled,
  className
}: SplitButtonProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className={cn('relative inline-flex', className)}>
      <button
        type="button"
        onClick={onPrimary}
        disabled={disabled}
        className={cn(
          'inline-flex h-8 items-center rounded-l-sm border border-action bg-action px-3 text-13 font-medium text-action-fg',
          'transition-colors duration-100 ease-enter hover:bg-action-hover disabled:opacity-50'
        )}>
        
        {primaryLabel}
      </button>
      <button
        type="button"
        aria-label={menuLabel}
        aria-haspopup="menu"
        aria-expanded={open}
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'inline-flex h-8 w-7 items-center justify-center rounded-r-sm border border-l-0 border-action bg-action text-action-fg',
          'transition-colors duration-100 ease-enter hover:bg-action-hover disabled:opacity-50'
        )}>
        
        <ChevronDownIcon className="h-3.5 w-3.5" aria-hidden="true" />
      </button>

      {open &&
      <div
        role="menu"
        className="absolute right-0 top-full z-40 mt-1 w-64 rounded-lg border border-line bg-surface-raised p-1 shadow-popover">
        
          {actions.map((a) =>
        <button
          key={a.label}
          type="button"
          role="menuitem"
          onClick={() => {
            a.onSelect();
            setOpen(false);
          }}
          className={cn(
            'block w-full rounded-xs px-2 py-1.5 text-left transition-colors duration-100 ease-enter hover:bg-surface-hover',
            a.destructive ? 'text-danger-fg' : 'text-fg-primary'
          )}>
          
              <span className="block text-13 font-medium">{a.label}</span>
              {a.description &&
          <span className="mt-0.5 block text-2xs text-fg-muted">{a.description}</span>
          }
            </button>
        )}
        </div>
      }
    </div>);

}