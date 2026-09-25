import React, { useEffect, useRef, useState } from 'react';
import { PencilIcon, PinIcon, PinOffIcon, PlusIcon, XIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { IconButton } from './IconButton';
import { InlineNameInput } from './InlineNameInput';
import { Menu, MenuItem } from './Menu';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
  /** Browser variant: pinned tabs sit first and show an unpin control where
   *  the close would be; they cannot be closed until unpinned. */
  pinned?: boolean;
  /** Browser variant: the name can be edited in place. Pages the candidate
   *  made are renameable; materials, mail and the brief are not. */
  renameable?: boolean;
}

/** Browser-variant behaviour. Each is opt-in: leave a handler out and its
 *  control is not drawn, so the DS-15 strip without them is unchanged. */
export interface BrowserTabsOptions {
  /** Draws a close control on every tab. The last open tab cannot be closed. */
  onClose?: (id: string) => void;
  /** Pin and unpin, from the context menu and the pinned tab's own control. */
  onPinChange?: (id: string, pinned: boolean) => void;
  /** Rename in place: a click on the active tab's name, a double-click, F2
   *  or the context menu opens the field; Enter keeps, Escape leaves. */
  onRename?: (id: string, label: string) => void;
  /** Controlled rename, e.g. a page that was just created opens with its
   *  name selected. Leave both out and the strip keeps its own. */
  renamingId?: string | null;
  onRenamingChange?: (id: string | null) => void;
  /** The new-tab control, placed right after the last tab, not at the far edge. */
  onNewTab?: () => void;
  newTabLabel?: string;
}

export interface TabsProps extends BrowserTabsOptions {
  items: TabItem[];
  value: string;
  onChange: (id: string) => void;
  label: string;
  /** 'browser' is the candidate shell's top-bar strip: the active tab is white with
   *  a three-side border and no bottom border so it merges into the page; inactive
   *  tabs share edges on the sunken strip. DS-15, approved 2026-09-22; per-tab
   *  close, pinning, rename and the context menu are DS-29, overflow is DS-30. */
  variant?: 'line' | 'segmented' | 'browser';
  className?: string;
}

export function Tabs({ items, value, onChange, label, variant = 'line', className, ...browser }: TabsProps) {
  const onKeyDown = (e: React.KeyboardEvent) => {
    const idx = items.findIndex((i) => i.id === value);
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      onChange(items[(idx + 1) % items.length].id);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      onChange(items[(idx - 1 + items.length) % items.length].id);
    }
  };

  if (variant === 'browser') {
    return <BrowserTabs items={items} value={value} onChange={onChange} label={label} className={className} {...browser} />;
  }

  if (variant === 'segmented') {
    return (
      <div
        role="tablist"
        aria-label={label}
        onKeyDown={onKeyDown}
        className={cn('inline-flex items-center gap-0.5 rounded-sm border border-line bg-surface-subtle p-0.5', className)}>
        
        {items.map((t) =>
        <button
          key={t.id}
          role="tab"
          type="button"
          aria-selected={t.id === value}
          tabIndex={t.id === value ? 0 : -1}
          onClick={() => onChange(t.id)}
          className={cn(
            'inline-flex h-7 items-center gap-1.5 rounded-xs px-3 text-xs font-medium transition-[background-color,color] duration-100 ease-enter',
            t.id === value ?
            'bg-surface text-fg-primary shadow-sticky' :
            'text-fg-muted hover:text-fg-primary'
          )}>
          
            {t.icon}
            {t.label}
          </button>
        )}
      </div>);

  }

  return (
    <div role="tablist" aria-label={label} onKeyDown={onKeyDown} className={cn('flex items-end gap-4 border-b border-line', className)}>
      {items.map((t) => {
        const active = t.id === value;
        return (
          <button
            key={t.id}
            role="tab"
            type="button"
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(t.id)}
            className={cn(
              'relative -mb-px inline-flex items-center gap-1.5 border-b-2 px-0.5 pb-2 pt-1 text-13 font-medium transition-[color,border-color] duration-100 ease-enter',
              active ?
              'border-brand text-fg-primary' :
              'border-transparent text-fg-muted hover:border-line-strong hover:text-fg-primary'
            )}>
            
            {t.icon}
            {t.label}
            {typeof t.count === 'number' &&
            <span className="rounded-xs border border-line bg-surface-subtle px-1 text-2xs text-fg-muted tnum">
                {t.count}
              </span>
            }
          </button>);

      })}
    </div>);

}

type BrowserTabsProps = BrowserTabsOptions & Pick<TabsProps, 'items' | 'value' | 'onChange' | 'label' | 'className'>;

function tabBox(list: HTMLElement | null, id: string): HTMLElement | undefined {
  return Array.from(list?.querySelectorAll<HTMLElement>('[data-tab-id]') ?? []).find((n) => n.dataset.tabId === id);
}

/** The browser variant (DS-15), with the controls the candidate shell found it
 *  needed (DS-29): a close on every tab, shown on hover, on focus and on the
 *  active tab; pinned tabs first, with an unpin control in the close's place;
 *  rename in place; a context menu with Pin, Rename and Close; the new-tab
 *  control right after the last tab. Overflow (DS-30): tabs shrink before the
 *  strip scrolls, as a browser's do, from 224px down to 112px, which still
 *  shows a few letters. Past that the strip scrolls sideways with no
 *  scrollbar, the wheel scrolls it too, a fade marks each clipped edge, and
 *  the active tab is kept in view. An inactive tab's close floats over its
 *  end on hover, so the name keeps the room. From the workspace reviews of
 *  2026-09-25 and 2026-09-26. */
function BrowserTabs({
  items,
  value,
  onChange,
  label,
  className,
  onClose,
  onPinChange,
  onRename,
  renamingId: controlledRenaming,
  onRenamingChange,
  onNewTab,
  newTabLabel = 'New tab'
}: BrowserTabsProps) {
  const [innerRenaming, setInnerRenaming] = useState<string | null>(null);
  const [menu, setMenu] = useState<{id: string;x: number;y: number;} | null>(null);
  const [clipped, setClipped] = useState({ start: false, end: false });
  const listRef = useRef<HTMLDivElement>(null);

  const renamingId = controlledRenaming === undefined ? innerRenaming : controlledRenaming;
  const setRenaming = (id: string | null) => {
    if (controlledRenaming === undefined) setInnerRenaming(id);
    onRenamingChange?.(id);
  };
  const ordered = [...items.filter((t) => t.pinned), ...items.filter((t) => !t.pinned)];
  const closable = !!onClose && items.length > 1;
  const canRename = (t: TabItem) => !!onRename && !!t.renameable;
  const hasMenu = (t: TabItem) => !!onPinChange || canRename(t) || closable && !t.pinned;
  const focusActive = () =>
  requestAnimationFrame(() =>
  listRef.current?.querySelector<HTMLElement>('[role="tab"][aria-selected="true"]')?.focus()
  );

  // Which edges hide tabs, for the fades.
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const read = () =>
    setClipped({ start: el.scrollLeft > 1, end: el.scrollLeft + el.clientWidth < el.scrollWidth - 1 });
    read();
    el.addEventListener('scroll', read, { passive: true });
    const ro = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(read);
    ro?.observe(el);
    return () => {
      el.removeEventListener('scroll', read);
      ro?.disconnect();
    };
  }, [items.length]);

  // The wheel scrolls the strip sideways. A native, non-passive listener, so
  // the page behind does not scroll as well.
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (el.scrollWidth <= el.clientWidth || Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  // The active tab is kept in view, however it was opened, clear of the fades
  // so its close stays usable. The strip is scrolled directly so nothing
  // around it moves; the browser clamps at either end.
  useEffect(() => {
    const list = listRef.current;
    const box = tabBox(list, value);
    if (!list || !box) return;
    const clear = 32;
    const start = box.offsetLeft - clear;
    const end = box.offsetLeft + box.offsetWidth + clear;
    if (start < list.scrollLeft) list.scrollLeft = start;else
    if (end > list.scrollLeft + list.clientWidth) list.scrollLeft = end - list.clientWidth;
  }, [value, items.length]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (renamingId || ordered.length === 0) return;
    const idx = ordered.findIndex((t) => t.id === value);
    const active = ordered[idx];
    let next: TabItem | undefined;
    if (e.key === 'ArrowRight') next = ordered[(idx + 1) % ordered.length];else
    if (e.key === 'ArrowLeft') next = ordered[(idx - 1 + ordered.length) % ordered.length];else
    if (e.key === 'Home') next = ordered[0];else
    if (e.key === 'End') next = ordered[ordered.length - 1];else
    if (e.key === 'F2' && active && canRename(active)) {
      e.preventDefault();
      setRenaming(active.id);
    } else if (e.key === 'Delete' && active && closable && !active.pinned) {
      e.preventDefault();
      onClose?.(active.id);
      focusActive();
    }
    if (next) {
      e.preventDefault();
      onChange(next.id);
      focusActive();
    }
  };

  const menuTab = menu ? items.find((t) => t.id === menu.id) : undefined;

  return (
    <div
      className={cn(
        'flex h-10 w-full min-w-0 items-end bg-surface-sunken shadow-[inset_0_-1px_0_var(--border-default)]',
        className
      )}>
      
      <div className="relative flex min-w-0 items-end">
        <div
          ref={listRef}
          role="tablist"
          aria-label={label}
          onKeyDown={onKeyDown}
          className="relative flex min-w-0 items-end overflow-x-auto overflow-y-hidden pl-2 pt-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          
          {ordered.map((t, i) => {
            const active = t.id === value;
            const renaming = renamingId === t.id;
            const rename = canRename(t);
            const pinControl = !!t.pinned && !!onPinChange;
            const inlineControl = pinControl || closable && active && !t.pinned;
            return (
              <div
                key={t.id}
                data-tab-id={t.id}
                onContextMenu={(e) => {
                  if (!hasMenu(t)) return;
                  e.preventDefault();
                  // From the keyboard (Shift+F10) there is no pointer: anchor under the tab.
                  const r = e.currentTarget.getBoundingClientRect();
                  const fromKeys = e.clientX === 0 && e.clientY === 0;
                  setMenu({ id: t.id, x: fromKeys ? r.left : e.clientX, y: fromKeys ? r.bottom : e.clientY });
                }}
                className={cn(
                  'group relative flex h-8 min-w-[112px] max-w-[224px] shrink items-center rounded-t-sm border border-b-0 border-line transition-[background-color,color] duration-100 ease-enter',
                  i > 0 && '-ml-px',
                  active ?
                  'z-10 bg-surface text-fg-primary' :
                  'bg-surface-active text-fg-muted shadow-[inset_0_-1px_0_var(--border-default)] hover:bg-surface-hover hover:text-fg-primary'
                )}>
                
                {renaming ?
                <span className="flex min-w-0 items-center gap-1.5 pl-3 pr-2">
                    {t.icon}
                    <InlineNameInput
                    label="Tab name"
                    initial={t.label}
                    onDone={(name) => {
                      setRenaming(null);
                      if (name !== t.label) onRename?.(t.id, name);
                      focusActive();
                    }} />
                  
                  </span> :

                <button
                  type="button"
                  role="tab"
                  aria-selected={active}
                  tabIndex={active ? 0 : -1}
                  title={rename && active ? `${t.label}. Click to rename` : t.label}
                  onClick={() => active && rename ? setRenaming(t.id) : onChange(t.id)}
                  onDoubleClick={() => rename && setRenaming(t.id)}
                  className={cn(
                    'flex h-full min-w-0 flex-1 items-center gap-1.5 rounded-t-sm pl-3 text-13 focus-visible:-outline-offset-2',
                    !inlineControl && 'pr-3',
                    active && 'font-medium',
                    active && rename && 'cursor-text'
                  )}>
                  
                    {t.icon}
                    <span className="truncate">{t.label}</span>
                    {typeof t.count === 'number' &&
                  <span className="shrink-0 rounded-xs border border-line bg-surface px-1 text-2xs text-fg-muted tnum">{t.count}</span>
                  }
                  </button>
                }
                {!renaming && pinControl &&
                <button
                  type="button"
                  aria-label={`Unpin ${t.label}`}
                  title="Unpin tab"
                  tabIndex={active ? 0 : -1}
                  onClick={() => onPinChange?.(t.id, false)}
                  className="mx-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-xs text-fg-muted transition-colors duration-100 ease-enter hover:bg-surface-hover hover:text-fg-primary focus-visible:-outline-offset-2">
                  
                    <PinIcon className="h-3 w-3" aria-hidden="true" />
                  </button>
                }
                {!renaming && !pinControl && closable && !t.pinned &&
                <button
                  type="button"
                  aria-label={`Close ${t.label}`}
                  title="Close tab"
                  tabIndex={active ? 0 : -1}
                  onClick={() => {
                    onClose?.(t.id);
                    focusActive();
                  }}
                  className={cn(
                    'inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-xs text-fg-muted transition-[opacity,background-color,color] duration-100 ease-enter hover:text-fg-primary focus-visible:-outline-offset-2 focus-visible:opacity-100',
                    active ?
                    'mx-1 hover:bg-surface-hover' :
                    'absolute right-1 bg-surface-hover opacity-0 group-hover:opacity-100'
                  )}>
                  
                    <XIcon className="h-3 w-3" aria-hidden="true" />
                  </button>
                }
              </div>);

          })}
        </div>
        {clipped.start &&
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 top-1.5 z-20 w-6"
          style={{ background: 'linear-gradient(to right, var(--surface-sunken), transparent)' }} />

        }
        {clipped.end &&
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-0 top-1.5 z-20 w-8"
          style={{ background: 'linear-gradient(to left, var(--surface-sunken), transparent)' }} />

        }
      </div>
      {onNewTab &&
      <div className="flex h-10 shrink-0 items-center pl-1 pr-2">
          <IconButton label={newTabLabel} size="sm" icon={<PlusIcon className="h-3.5 w-3.5" />} onClick={onNewTab} />
        </div>
      }

      {menu && menuTab &&
      <Menu open at={menu} onOpenChange={(open) => !open && setMenu(null)} label={`${menuTab.label} tab`} panelClassName="w-44">
          {onPinChange &&
        <MenuItem
          icon={menuTab.pinned ? <PinOffIcon className="h-3.5 w-3.5" /> : <PinIcon className="h-3.5 w-3.5" />}
          onSelect={() => {
            setMenu(null);
            onPinChange(menuTab.id, !menuTab.pinned);
          }}>
          
              {menuTab.pinned ? 'Unpin tab' : 'Pin tab'}
            </MenuItem>
        }
          {canRename(menuTab) &&
        <MenuItem
          icon={<PencilIcon className="h-3.5 w-3.5" />}
          onSelect={() => {
            setMenu(null);
            onChange(menuTab.id);
            setRenaming(menuTab.id);
          }}>
          
              Rename
            </MenuItem>
        }
          {closable && !menuTab.pinned &&
        <MenuItem
          icon={<XIcon className="h-3.5 w-3.5" />}
          onSelect={() => {
            setMenu(null);
            onClose?.(menuTab.id);
          }}>
          
              Close tab
            </MenuItem>
        }
        </Menu>
      }
    </div>);

}
