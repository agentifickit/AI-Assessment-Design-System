import React, { useCallback, useRef } from 'react';
import { cn } from '../../utils/cn';

export interface PanelSeparatorProps {
  /** Names what is being resized, e.g. "Task brief width". */
  label: string;
  value: number;
  min: number;
  max: number;
  onKeyDown: (e: React.KeyboardEvent) => void;
  /** Called with a pixel delta as the pointer moves. */
  onDrag: (deltaPx: number) => void;
}

/** A focusable, keyboard-operable separator. The visible line is 1px; the hit
 *  area is widened to 9px so it can be grabbed without precision aiming.
 *  Live dragging is intentionally unanimated — a transition while following
 *  the pointer feels like lag. */
export function PanelSeparator({ label, value, min, max, onKeyDown, onDrag }: PanelSeparatorProps) {
  const lastX = useRef<number | null>(null);

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      lastX.current = e.clientX;
    },
    []
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (lastX.current === null) return;
      const delta = e.clientX - lastX.current;
      if (delta === 0) return;
      lastX.current = e.clientX;
      onDrag(delta);
    },
    [onDrag]
  );

  const onPointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    lastX.current = null;
  }, []);

  return (
    <div
      role="separator"
      tabIndex={0}
      aria-label={label}
      aria-orientation="vertical"
      aria-valuenow={Math.round(value)}
      aria-valuemin={min}
      aria-valuemax={max}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      className={cn(
        'group relative flex w-[9px] shrink-0 cursor-col-resize touch-none items-center justify-center',
        'focus-visible:outline-none'
      )}>
      
      <span
        aria-hidden="true"
        className={cn(
          'h-full w-px bg-line transition-colors duration-100 ease-enter',
          'group-hover:bg-brand group-focus-visible:w-0.5 group-focus-visible:bg-brand'
        )} />
      
    </div>);

}