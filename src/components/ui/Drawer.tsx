import React, { useEffect, useId } from 'react';
import { createPortal } from 'react-dom';
import { PinIcon, PinOffIcon, XIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { IconButton } from './IconButton';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  /** Small caps eyebrow above the title, e.g. the source ("Brief", "Inbox"). */
  eyebrow?: string;
  children: React.ReactNode;
  /** Pinned, the drawer stops floating and renders as a 400px column in the
   *  flow where the caller places it; the scrim and the portal go away. */
  pinned?: boolean;
  onPinChange?: (pinned: boolean) => void;
  footer?: React.ReactNode;
  className?: string;
}

/** Reference content (the brief, the inbox) opens over the page as a 480px
 *  drawer from the right and can pin as a 400px column. The page stays the
 *  work surface; the drawer never becomes a third permanent pane. DS-16,
 *  approved 2026-09-22, amends D-2 of PRD-08. Escape closes an unpinned
 *  drawer; a pinned column is closed with its own control. */
export function Drawer({ open, onClose, title, eyebrow, children, pinned = false, onPinChange, footer, className }: DrawerProps) {
  const uid = useId();
  const titleId = `${uid}-title`;

  useEffect(() => {
    if (!open || pinned) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, pinned, onClose]);

  if (!open) return null;

  const panel =
  <section
    role={pinned ? undefined : 'dialog'}
    aria-modal={pinned ? undefined : true}
    aria-labelledby={titleId}
    className={cn(
      'flex min-h-0 flex-col bg-surface',
      pinned ? 'w-[400px] shrink-0 border-l border-line' : 'relative h-full w-[480px] max-w-[90%] border-l border-line shadow-dialog',
      className
    )}>
    
      <header className="flex h-12 shrink-0 items-center justify-between gap-2 border-b border-line-subtle px-4">
        <div className="min-w-0">
          {eyebrow && <p className="text-2xs font-semibold uppercase tracking-wide text-fg-muted">{eyebrow}</p>}
          <h2 id={titleId} className="truncate text-13 font-semibold text-fg-primary">{title}</h2>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          {onPinChange &&
        <IconButton
          label={pinned ? 'Unpin panel' : 'Pin panel'}
          size="sm"
          active={pinned}
          icon={pinned ? <PinOffIcon className="h-3.5 w-3.5" /> : <PinIcon className="h-3.5 w-3.5" />}
          onClick={() => onPinChange(!pinned)} />

        }
          <IconButton label={`Close ${title}`} size="sm" icon={<XIcon className="h-3.5 w-3.5" />} onClick={onClose} />
        </div>
      </header>
      <div className="scroll-panel min-h-0 flex-1 overflow-y-auto">{children}</div>
      {footer && <div className="shrink-0 border-t border-line-subtle">{footer}</div>}
    </section>;


  if (pinned) return panel;
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 z-40 flex justify-end" data-ledger-overlay="">
      <div className="absolute inset-0" style={{ background: 'var(--overlay-scrim)' }} onClick={onClose} aria-hidden="true" />
      {panel}
    </div>,
    document.body
  );
}
