import React, { useState } from 'react';
import { PanelLeftCloseIcon, PanelLeftOpenIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { IconButton } from '../ui/IconButton';
import { InlineNameInput } from '../ui/InlineNameInput';
import { PanelSeparator } from './PanelSeparator';

export type SidebarMode = 'docked' | 'hidden' | 'peek';

export interface SidebarProps {
  /** Accessible name for the navigation landmark. */
  label: string;
  mode: SidebarMode;
  onModeChange: (mode: SidebarMode) => void;
  /** Workspace row at the top: name, avatar, switcher, or the search field. */
  header?: React.ReactNode;
  children: React.ReactNode;
  /** Pinned to the bottom, outside the scroll container: settings, submit. */
  footer?: React.ReactNode;
  /** Draws the hide and dock control in the header. Turn it off when the
   *  shell's top bar owns that control, as the candidate shell's does. DS-23. */
  dockControl?: boolean;
  /** Docked width in px. */
  width?: number;
  /** With it, the docked sidebar's right edge is a PanelSeparator: drag it
   *  between `minWidth` and `maxWidth`, arrows move it 16px, Home and End go
   *  to the ends, Enter hides the sidebar. DS-23. */
  onWidthChange?: (width: number) => void;
  minWidth?: number;
  maxWidth?: number;
  className?: string;
}

/** The candidate shell's sidebar, 240px by default. Docked it is a column in
 *  the flow; hidden it leaves a 12px hot edge on the left that peeks the same
 *  panel as a floating overlay on hover or focus, so nothing is ever more than
 *  one gesture away. Replaces the 48px icon rail for the candidate. DS-14,
 *  approved 2026-09-22. DS-23 (workspace reviews, 2026-09-25 and 26): the
 *  dock control is optional, the width can be dragged, and the panel stays
 *  mounted while hidden, so whatever it holds (a file list that feeds search)
 *  keeps its state; only its visibility changes. */
export function Sidebar({
  label,
  mode,
  onModeChange,
  header,
  children,
  footer,
  dockControl = true,
  width = 240,
  onWidthChange,
  minWidth = 200,
  maxWidth = 400,
  className
}: SidebarProps) {
  const docked = mode === 'docked';
  const resizable = docked && !!onWidthChange;

  const panel =
  <nav
    aria-label={label}
    hidden={mode === 'hidden'}
    style={{ width }}
    className={cn(
      // The class as well as the attribute: a display utility outranks [hidden].
      mode === 'hidden' ? 'hidden' : 'flex',
      'min-h-0 flex-col bg-surface-subtle',
      docked && 'shrink-0',
      docked && !resizable && 'border-r border-line',
      !docked && 'absolute bottom-3 left-3 top-3 z-30 rounded-md border border-line shadow-dialog',
      className
    )}>

      {(header || dockControl) &&
    <div className="flex h-12 shrink-0 items-center justify-between gap-2 border-b border-line-subtle px-3">
          <div className="min-w-0 flex-1">{header}</div>
          {dockControl &&
      <IconButton
        label={docked ? 'Hide sidebar' : 'Dock sidebar'}
        size="sm"
        icon={docked ? <PanelLeftCloseIcon className="h-3.5 w-3.5" /> : <PanelLeftOpenIcon className="h-3.5 w-3.5" />}
        onClick={() => onModeChange(docked ? 'hidden' : 'docked')} />

      }
        </div>
    }
      <div className="scroll-panel min-h-0 flex-1 overflow-y-auto py-2">{children}</div>
      {footer && <div className="shrink-0 border-t border-line-subtle p-2">{footer}</div>}
    </nav>;


  // One tree in every mode, so docking and hiding never remount what the panel holds.
  return (
    <div
      className={docked ? 'contents' : 'absolute inset-y-0 left-0 z-30'}
      onMouseLeave={() => mode === 'peek' && onModeChange('hidden')}>

      {!docked &&
      <button
        type="button"
        aria-label="Show sidebar"
        aria-expanded={mode === 'peek'}
        onMouseEnter={() => onModeChange('peek')}
        onFocus={() => onModeChange('peek')}
        onClick={() => onModeChange('docked')}
        className="absolute inset-y-0 left-0 w-3 cursor-pointer" />

      }
      {panel}
      {resizable &&
      // The 9px grab area straddles the edge; only its 1px line takes room, as the border did.
      <div className="relative z-10 -mx-1 flex">
          <PanelSeparator
          label={`${label} width`}
          value={width}
          min={minWidth}
          max={maxWidth}
          onChange={onWidthChange}
          onCollapse={() => onModeChange('hidden')} />

        </div>
      }
    </div>);

}

export interface SidebarSectionProps {
  label: string;
  /** A quiet control on the header row, e.g. a new-page menu or "New chat". */
  action?: React.ReactNode;
  /** SidebarItem rows, then an optional SidebarSeeAll. */
  children: React.ReactNode;
  className?: string;
}

/** One sidebar group: a quiet 11px heading and its rows. Every section header
 *  uses the same type step, whatever it holds. DS-24. */
export function SidebarSection({ label, action, children, className }: SidebarSectionProps) {
  return (
    <div className={cn('px-2 pb-2', className)}>
      <div className="flex h-7 items-center justify-between pl-2 pr-0.5 pt-1">
        <h3 className="text-2xs font-medium text-fg-muted">{label}</h3>
        {action}
      </div>
      <ul className="flex flex-col gap-0.5">{children}</ul>
    </div>);

}

export interface SidebarItemProps {
  label: string;
  /** A 14px glyph; it takes the muted ink. */
  icon?: React.ReactNode;
  onSelect: () => void;
  active?: boolean;
  /** Right-aligned secondary text: "Unit 1" on work carried from an earlier
   *  unit, "Not started". Words, not counts. */
  meta?: string;
  unread?: boolean;
  /** Double-click renames the row in place. */
  onRename?: (label: string) => void;
}

/** A 28px sidebar row. DS-24: trailing meta sits at the right in the muted
 *  ink, an unread item carries a 6px dot after it, and a renameable row
 *  edits in place on double-click. */
export function SidebarItem({ label, icon, onSelect, active, meta, unread, onRename }: SidebarItemProps) {
  const [renaming, setRenaming] = useState(false);

  if (renaming && onRename) {
    return (
      <li className="flex h-7 items-center gap-2 px-2">
        {icon && <span className="inline-flex shrink-0 text-fg-muted" aria-hidden="true">{icon}</span>}
        <InlineNameInput
          label={`Rename ${label}`}
          initial={label}
          className="flex-1 font-normal"
          onDone={(name) => {
            setRenaming(false);
            if (name !== label) onRename(name);
          }} />

      </li>);

  }

  return (
    <li>
      <button
        type="button"
        onClick={onSelect}
        onDoubleClick={onRename ? () => setRenaming(true) : undefined}
        aria-current={active ? 'page' : undefined}
        className={cn(
          'flex h-7 w-full items-center gap-2 rounded-sm px-2 text-13 transition-colors duration-100 ease-enter',
          active ? 'bg-surface-active text-fg-primary' : 'text-fg-secondary hover:bg-surface-hover hover:text-fg-primary'
        )}>

        {icon && <span className="inline-flex shrink-0 text-fg-muted" aria-hidden="true">{icon}</span>}
        <span className="min-w-0 flex-1 truncate text-left">{label}</span>
        {meta && <span className="shrink-0 text-2xs text-fg-muted">{meta}</span>}
        {unread &&
        <>
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-info-solid" aria-hidden="true" />
            <span className="sr-only">, unread</span>
          </>
        }
      </button>
    </li>);

}

/** The quiet last row of a capped section, indented to the row labels. It
 *  says "See all" and nothing more: the count lives where the list does. */
export function SidebarSeeAll({ label = 'See all', onSelect }: {label?: string;onSelect: () => void;}) {
  return (
    <li>
      <button
        type="button"
        onClick={onSelect}
        className="flex h-7 w-full items-center rounded-sm pl-[30px] pr-2 text-13 text-fg-muted transition-colors duration-100 ease-enter hover:bg-surface-hover hover:text-fg-primary">

        {label}
      </button>
    </li>);

}
