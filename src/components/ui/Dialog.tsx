import React, { useCallback, useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { XIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { IconButton } from './IconButton';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  /** Critical overlays raise the scrim, remove click-outside dismissal, and
   *  refuse Escape — the reader must make an explicit choice. */
  critical?: boolean;
  /** Holds the reader while work finishes (saving, submitting): no Escape, no
   *  click outside, no close control, and none of the danger border or the
   *  footer note that `critical` adds. Nothing is wrong, so nothing is red.
   *  Issue #8. */
  locked?: boolean;
  width?: 'sm' | 'md' | 'lg';
}

const widths = { sm: 'max-w-md', md: 'max-w-xl', lg: 'max-w-3xl' } as const;

const FOCUSABLE = [
'a[href]',
'button:not([disabled])',
'input:not([disabled]):not([type="hidden"])',
'select:not([disabled])',
'textarea:not([disabled])',
'[tabindex]:not([tabindex="-1"])'].
join(',');

/** Returns the app root, i.e. everything that should become inert while a
 *  dialog is open. Portalled dialog content lives outside it by design. */
function getAppRoot(): HTMLElement | null {
  return document.getElementById('root');
}

export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  critical,
  locked,
  width = 'sm'
}: DialogProps) {
  const holds = critical || locked;
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const uid = useId();
  const titleId = `${uid}-title`;
  const descId = `${uid}-desc`;

  // Queried on demand rather than cached on open, so a dialog whose contents
  // change (a revealed field, a disabled button) still traps focus correctly.
  const focusables = useCallback(() => {
    const panel = panelRef.current;
    if (!panel) return [] as HTMLElement[];
    return Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
      (el) => el.offsetParent !== null || el === document.activeElement
    );
  }, []);

  /* Scroll lock with scrollbar-width compensation. Without the padding the
     page shifts sideways as the scrollbar disappears, which reads as a glitch. */
  useEffect(() => {
    if (!open) return;
    const { body, documentElement } = document;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const gap = window.innerWidth - documentElement.clientWidth;
    body.style.overflow = 'hidden';
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
    };
  }, [open]);

  /* Background inertness. `inert` removes the subtree from the tab order and
     the accessibility tree; aria-hidden is set alongside it for older engines. */
  useEffect(() => {
    if (!open) return;
    const root = getAppRoot();
    if (!root) return;
    root.setAttribute('inert', '');
    root.setAttribute('aria-hidden', 'true');
    return () => {
      root.removeAttribute('inert');
      root.removeAttribute('aria-hidden');
    };
  }, [open]);

  /* Focus management: remember the trigger, move focus in, restore on close. */
  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const target = focusables()[0] ?? panelRef.current;
    // Deferred a frame so the portal content is in the document first.
    const raf = requestAnimationFrame(() => target?.focus());
    return () => {
      cancelAnimationFrame(raf);
      previouslyFocused.current?.focus?.();
    };
  }, [open, focusables]);

  /* Keyboard contract: Escape closes (unless critical or locked), Tab cycles. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (!holds) {
          e.preventDefault();
          onClose();
        }
        return;
      }
      if (e.key !== 'Tab') return;
      const items = focusables();
      if (items.length === 0) {
        e.preventDefault();
        panelRef.current?.focus();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || !panelRef.current?.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey, true);
    return () => document.removeEventListener('keydown', onKey, true);
  }, [open, holds, onClose, focusables]);

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" data-ledger-overlay="">
      <div
        className="absolute inset-0 transition-opacity duration-180 ease-enter"
        style={{ background: 'var(--overlay-scrim)' }}
        onClick={holds ? undefined : onClose}
        aria-hidden="true" />
      
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        tabIndex={-1}
        className={cn(
          'relative flex w-full flex-col overflow-hidden rounded-xl border bg-surface-raised shadow-dialog',
          'transition-[opacity,transform] duration-180 ease-enter',
          critical ? 'border-danger-border' : 'border-line',
          widths[width]
        )}>
        
        <header className="flex items-start justify-between gap-4 border-b border-line-subtle px-5 py-3.5">
          <div className="min-w-0">
            <h2 id={titleId} className="text-sm font-semibold text-fg-primary">
              {title}
            </h2>
            {description &&
            <p id={descId} className="mt-1 max-w-measure text-13 text-fg-secondary">
                {description}
              </p>
            }
          </div>
          {!holds &&
          <IconButton label="Close dialog" size="sm" icon={<XIcon className="h-4 w-4" />} onClick={onClose} />
          }
        </header>

        {children && <div className="scroll-panel max-h-[60vh] overflow-y-auto px-5 py-4">{children}</div>}

        {footer &&
        <footer className="flex flex-wrap items-center justify-end gap-2 border-t border-line-subtle bg-surface-subtle px-5 py-3">
            {critical &&
          <p className="mr-auto text-2xs text-fg-muted">
                Choose an option to continue. This dialog cannot be dismissed with Escape.
              </p>
          }
            {footer}
          </footer>
        }
      </div>
    </div>,
    document.body
  );
}