import React from 'react';
import { PanelLeftCloseIcon, PanelLeftOpenIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { IconButton } from '../ui/IconButton';

export type SidebarMode = 'docked' | 'hidden' | 'peek';

export interface SidebarProps {
  /** Accessible name for the navigation landmark. */
  label: string;
  mode: SidebarMode;
  onModeChange: (mode: SidebarMode) => void;
  /** Workspace row at the top: name, avatar, switcher. */
  header?: React.ReactNode;
  children: React.ReactNode;
  /** Pinned to the bottom, outside the scroll container: settings, submit. */
  footer?: React.ReactNode;
  className?: string;
}

/** The candidate shell's 240px sidebar. Docked it is a column in the flow;
 *  hidden it leaves a 12px hot edge on the left that peeks the same panel as a
 *  floating overlay on hover or focus, so nothing is ever more than one gesture
 *  away and the shell never remounts its children. Replaces the 48px icon rail
 *  for the candidate. DS-14, approved 2026-09-22. */
export function Sidebar({ label, mode, onModeChange, header, children, footer, className }: SidebarProps) {
  const panel =
  <nav
    aria-label={label}
    className={cn(
      'flex w-60 min-h-0 flex-col bg-surface-subtle',
      mode === 'docked' && 'shrink-0 border-r border-line',
      mode === 'peek' && 'absolute bottom-3 left-3 top-3 z-30 rounded-md border border-line shadow-dialog',
      className
    )}>
    
      <div className="flex h-12 shrink-0 items-center justify-between gap-2 border-b border-line-subtle px-3">
        <div className="min-w-0 flex-1">{header}</div>
        <IconButton
        label={mode === 'docked' ? 'Hide sidebar' : 'Dock sidebar'}
        size="sm"
        icon={mode === 'docked' ? <PanelLeftCloseIcon className="h-3.5 w-3.5" /> : <PanelLeftOpenIcon className="h-3.5 w-3.5" />}
        onClick={() => onModeChange(mode === 'docked' ? 'hidden' : 'docked')} />
      
      </div>
      <div className="scroll-panel min-h-0 flex-1 overflow-y-auto py-2">{children}</div>
      {footer && <div className="shrink-0 border-t border-line-subtle p-2">{footer}</div>}
    </nav>;


  if (mode === 'docked') return panel;

  return (
    <div
      className="absolute inset-y-0 left-0 z-30"
      onMouseLeave={() => mode === 'peek' && onModeChange('hidden')}>
      
      <button
        type="button"
        aria-label="Show sidebar"
        aria-expanded={mode === 'peek'}
        onMouseEnter={() => onModeChange('peek')}
        onFocus={() => onModeChange('peek')}
        onClick={() => onModeChange('docked')}
        className="absolute inset-y-0 left-0 w-3 cursor-pointer" />
      
      {mode === 'peek' && panel}
    </div>);

}
