import React, { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { cn } from '../../utils/cn';

export interface PopoverTriggerProps {
  'aria-haspopup': 'dialog' | 'menu';
  'aria-expanded': boolean;
  'aria-controls': string;
  onClick: () => void;
  disabled?: boolean;
}

export interface PopoverProps {
  /** Renders the control that opens the panel. Spread `props` onto a button.
   *  Leave it out and pass `at` for a menu opened at a point (a right click). */
  trigger?: (api: {open: boolean;props: PopoverTriggerProps;}) => React.ReactNode;
  /** A viewport point for a context menu. The panel is fixed there and kept on screen. */
  at?: {x: number;y: number;};
  /** Accessible name of the panel, e.g. "Session details". */
  label: string;
  /** 'dialog' is a disclosure that reads something out; 'menu' is a list of
   *  commands with arrow-key movement. Use `Menu` rather than setting this. */
  role?: 'dialog' | 'menu';
  children: React.ReactNode;
  /** Controlled open state. Leave both out and the popover keeps its own. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** 'top' opens upward, for a trigger at the foot of the screen. */
  side?: 'top' | 'bottom';
  align?: 'start' | 'end';
  disabled?: boolean;
  /** On the wrapper around trigger and panel. */
  className?: string;
  /** On the panel, e.g. a width. Menus default to 224px, disclosures to 288px. */
  panelClassName?: string;
}

const ITEM = '[role="menuitem"]:not([disabled]),[role="menuitemradio"]:not([disabled])';

function menuItems(panel: HTMLElement | null): HTMLElement[] {
  return Array.from(panel?.querySelectorAll<HTMLElement>(ITEM) ?? []);
}

/** An anchored surface on the popover elevation: a disclosure that reads out
 *  a small set of facts (the session details in the status bar) or, as `Menu`,
 *  a list of commands. Non-modal: nothing behind it goes inert. A click
 *  outside and Escape close it; Escape returns focus to the trigger. Focus
 *  moves in on open, to the first item of a menu or to the panel of a
 *  disclosure, so a screen reader lands on what opened. DS-27, from the
 *  workspace review round 2 (2026-09-26), where the product had composed it
 *  twice (the copilot's switchers and the status bar's session menu). */
export function Popover({
  trigger,
  at,
  label,
  role = 'dialog',
  children,
  open: controlledOpen,
  onOpenChange,
  side = 'bottom',
  align = 'start',
  disabled,
  className,
  panelClassName
}: PopoverProps) {
  const [innerOpen, setInnerOpen] = useState(false);
  const open = controlledOpen ?? innerOpen;
  const uid = useId();
  const panelId = `${uid}-panel`;
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);

  const setOpen = useCallback(
    (next: boolean) => {
      if (controlledOpen === undefined) setInnerOpen(next);
      onOpenChange?.(next);
    },
    [controlledOpen, onOpenChange]
  );

  // Outside pointer and Escape close it; a point-anchored menu also closes on resize.
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      e.preventDefault();
      setOpen(false);
    };
    const onResize = () => setOpen(false);
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    if (at) window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open, at, setOpen]);

  // Focus in on open; back to where it came from on close, unless the reader
  // has already moved it somewhere else.
  useEffect(() => {
    if (!open) return;
    const root = rootRef.current;
    returnTo.current = document.activeElement as HTMLElement | null;
    const raf = requestAnimationFrame(() => {
      const first = role === 'menu' ? menuItems(panelRef.current)[0] : undefined;
      (first ?? panelRef.current)?.focus();
    });
    return () => {
      cancelAnimationFrame(raf);
      // The panel has unmounted; focus inside it has fallen to the body.
      const active = document.activeElement;
      if (!active || active === document.body) {
        const trigger = root?.querySelector<HTMLElement>(`[aria-controls="${panelId}"]`);
        (trigger ?? returnTo.current)?.focus?.();
      }
    };
  }, [open, role, panelId]);

  // A menu opened at a point stays inside the viewport.
  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!open || !at || !panel) return;
    const r = panel.getBoundingClientRect();
    const x = Math.max(8, Math.min(at.x, window.innerWidth - r.width - 8));
    const y = Math.max(8, Math.min(at.y, window.innerHeight - r.height - 8));
    panel.style.left = `${x}px`;
    panel.style.top = `${y}px`;
  }, [open, at]);

  const onPanelKeyDown = (e: React.KeyboardEvent) => {
    if (role !== 'menu') return;
    const list = menuItems(panelRef.current);
    if (list.length === 0) return;
    const index = list.indexOf(document.activeElement as HTMLElement);
    let next: HTMLElement | undefined;
    if (e.key === 'ArrowDown') next = list[(index + 1) % list.length];else
    if (e.key === 'ArrowUp') next = list[(index - 1 + list.length) % list.length];else
    if (e.key === 'Home') next = list[0];else
    if (e.key === 'End') next = list[list.length - 1];else
    if (e.key === 'Tab') {
      // A menu is one stop: Tab leaves it, from the trigger.
      e.preventDefault();
      setOpen(false);
      return;
    }
    if (next) {
      e.preventDefault();
      next.focus();
    }
  };

  const panel = open &&
  <div
    ref={panelRef}
    id={panelId}
    role={role}
    aria-label={label}
    tabIndex={-1}
    onKeyDown={onPanelKeyDown}
    style={at ? { left: at.x, top: at.y } : undefined}
    className={cn(
      'z-50 rounded-lg border border-line bg-surface-raised shadow-popover',
      role === 'menu' ? 'w-56 p-1' : 'w-72 py-2',
      at ?
      'fixed' :
      cn('absolute', side === 'top' ? 'bottom-full mb-1.5' : 'top-full mt-1', align === 'end' ? 'right-0' : 'left-0'),
      panelClassName
    )}>

      {children}
    </div>;


  return (
    <div ref={rootRef} className={cn(at ? 'contents' : 'relative inline-flex', className)}>
      {trigger?.({
        open,
        props: {
          'aria-haspopup': role,
          'aria-expanded': open,
          'aria-controls': panelId,
          onClick: () => !disabled && setOpen(!open),
          disabled
        }
      })}
      {panel}
    </div>);

}
