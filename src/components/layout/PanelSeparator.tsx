import React, { useCallback, useRef } from 'react';
import { cn } from '../../utils/cn';

export interface PanelSeparatorProps {
  /** Names what is being resized, e.g. "Task brief width". */
  label: string;
  value: number;
  min: number;
  max: number;
  /** Called with the next width, already clamped to min and max, from a drag
   *  or the keyboard. With it the separator owns the whole contract: arrows
   *  move the line by `step`, Home and End go to min and max, Enter calls
   *  `onCollapse`. DS-36. */
  onChange?: (value: number) => void;
  /** Which side of the line the resized panel is on. 'previous' (a sidebar on
   *  the left) grows as the line moves right; 'next' (a copilot on the right)
   *  grows as it moves left. */
  resizes?: 'previous' | 'next';
  /** Keyboard step in px. */
  step?: number;
  /** Enter on the separator collapses the panel it resizes. */
  onCollapse?: () => void;
  /** Runs first; call preventDefault to take a key over. Without `onChange`
   *  the caller handles every key here, as before DS-36. */
  onKeyDown?: (e: React.KeyboardEvent) => void;
  /** Called with a pixel delta as the pointer moves. */
  onDrag?: (deltaPx: number) => void;
  className?: string;
}

/** A focusable, keyboard-operable separator. The visible line is 1px; the hit
 *  area is widened to 9px so it can be grabbed without precision aiming.
 *  Live dragging is intentionally unanimated — a transition while following
 *  the pointer feels like lag. With `onChange`, a drag is measured from where
 *  it started, so the line stays under the pointer after pushing past min or
 *  max. */
export function PanelSeparator({
  label,
  value,
  min,
  max,
  onChange,
  resizes = 'previous',
  step = 16,
  onCollapse,
  onKeyDown,
  onDrag,
  className
}: PanelSeparatorProps) {
  const lastX = useRef<number | null>(null);
  const start = useRef<{x: number;value: number;} | null>(null);
  const dir = resizes === 'next' ? -1 : 1;
  const clamp = useCallback((v: number) => Math.min(max, Math.max(min, Math.round(v))), [min, max]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      lastX.current = e.clientX;
      start.current = { x: e.clientX, value };
    },
    [value]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (lastX.current === null) return;
      const delta = e.clientX - lastX.current;
      if (delta === 0) return;
      lastX.current = e.clientX;
      onDrag?.(delta);
      if (onChange && start.current) onChange(clamp(start.current.value + dir * (e.clientX - start.current.x)));
    },
    [onDrag, onChange, clamp, dir]
  );

  const onPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    lastX.current = null;
    start.current = null;
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    onKeyDown?.(e);
    if (e.defaultPrevented || !onChange) return;
    let next: number | null = null;
    // The arrows move the line, so which one grows the panel depends on its side.
    if (e.key === 'ArrowRight') next = value + dir * step;else
    if (e.key === 'ArrowLeft') next = value - dir * step;else
    if (e.key === 'Home') next = min;else
    if (e.key === 'End') next = max;else
    if (e.key === 'Enter' && onCollapse) {
      e.preventDefault();
      onCollapse();
      return;
    }
    if (next === null) return;
    e.preventDefault();
    onChange(clamp(next));
  };

  return (
    <div
      role="separator"
      tabIndex={0}
      aria-label={label}
      aria-orientation="vertical"
      aria-valuenow={Math.round(value)}
      aria-valuemin={min}
      aria-valuemax={max}
      onKeyDown={handleKeyDown}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      className={cn(
        'group relative flex w-[9px] shrink-0 cursor-col-resize touch-none items-center justify-center',
        'focus-visible:outline-none',
        className
      )}>

      <span
        aria-hidden="true"
        className={cn(
          'h-full w-px bg-line transition-colors duration-100 ease-enter',
          'group-hover:bg-brand group-focus-visible:w-0.5 group-focus-visible:bg-brand'
        )} />

    </div>);

}
