import React from 'react';
import { cn } from '../../utils/cn';

export type ConnectionState = 'stable' | 'unstable' | 'offline';

export interface ConnectionStatusProps {
  state: ConnectionState;
  className?: string;
}

const meta: Record<ConnectionState, {label: string;shape: string;cls: string;}> = {
  stable: { label: 'Connection stable', shape: 'rounded-full', cls: 'bg-success-solid' },
  unstable: { label: 'Connection unstable', shape: 'rounded-[1px] rotate-45', cls: 'bg-warning-solid' },
  offline: { label: 'Offline', shape: 'rounded-[1px]', cls: 'bg-danger-solid' }
};

/** Shape and label both change with state — the dot colour is a reinforcement, not the signal. */
export function ConnectionStatus({ state, className }: ConnectionStatusProps) {
  const m = meta[state];
  return (
    <span
      role="status"
      aria-live="polite"
      className={cn('inline-flex items-center gap-1.5 text-2xs text-fg-muted', className)}>
      
      <span className={cn('h-1.5 w-1.5 shrink-0', m.shape, m.cls)} aria-hidden="true" />
      {m.label}
    </span>);

}