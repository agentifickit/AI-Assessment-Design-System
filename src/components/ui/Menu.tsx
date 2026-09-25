import React from 'react';
import { CheckIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Popover, type PopoverProps } from './Popover';

export type MenuProps = Omit<PopoverProps, 'role'>;

/** A menu button's list of commands, or a context menu when opened `at` a
 *  point. Follows the WAI-ARIA menu pattern: the first item takes focus on
 *  open, arrows, Home and End move, Escape and Tab close. Items close the menu
 *  themselves by calling the caller's handler; the menu does not guess.
 *  DS-27. */
export function Menu(props: MenuProps) {
  return <Popover {...props} role="menu" />;
}

export interface MenuItemProps {
  children: React.ReactNode;
  onSelect: () => void;
  icon?: React.ReactNode;
  /** Right-aligned hint: a shortcut or a short qualifier. */
  trailing?: React.ReactNode;
  /** The current choice in a switcher (mode, model, chat). Marked with a
   *  check as well as the fill, so the fill is never the only cue. */
  selected?: boolean;
  disabled?: boolean;
  destructive?: boolean;
  className?: string;
}

export function MenuItem({
  children,
  onSelect,
  icon,
  trailing,
  selected,
  disabled,
  destructive,
  className
}: MenuItemProps) {
  const radio = typeof selected === 'boolean';
  return (
    <button
      type="button"
      role={radio ? 'menuitemradio' : 'menuitem'}
      aria-checked={radio ? selected : undefined}
      tabIndex={-1}
      disabled={disabled}
      onClick={onSelect}
      className={cn(
        'flex w-full items-start gap-2 rounded-xs px-2 py-1.5 text-left text-13 transition-colors duration-100 ease-enter',
        'focus-visible:bg-surface-hover focus-visible:-outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        destructive ? 'text-danger-fg hover:bg-danger-bg' : selected ?
        'bg-surface-active text-fg-primary' :
        'text-fg-secondary hover:bg-surface-hover hover:text-fg-primary',
        className
      )}>

      {icon &&
      <span className="mt-0.5 shrink-0 text-fg-muted" aria-hidden="true">
          {icon}
        </span>
      }
      <span className="min-w-0 flex-1">{children}</span>
      {trailing && <span className="mt-px shrink-0 text-2xs text-fg-muted">{trailing}</span>}
      {selected && <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-fg-secondary" aria-hidden="true" />}
    </button>);

}

/** A hairline between groups of items. */
export function MenuSeparator() {
  return <div role="separator" className="-mx-1 my-1 h-px bg-line-subtle" />;
}

/** A quiet group heading inside a menu or a disclosure, e.g. "Shortcuts". */
export function MenuLabel({ children, className }: {children: React.ReactNode;className?: string;}) {
  return (
    <p role="presentation" className={cn('px-2 pb-1 pt-1.5 text-2xs font-medium text-fg-muted', className)}>
      {children}
    </p>);

}
