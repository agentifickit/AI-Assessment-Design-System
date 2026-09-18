import React from 'react';
import { PanelLeftCloseIcon, PanelRightCloseIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { IconButton } from '../ui/IconButton';

export interface PanelRegionProps {
  /** Becomes the region's accessible name. Every panel is a labelled landmark. */
  label: string;
  /** Rendered in the panel header. Defaults to the label. */
  heading?: React.ReactNode;
  headerAside?: React.ReactNode;
  children: React.ReactNode;
  /** Pinned to the bottom of the panel, outside the scroll container. */
  footer?: React.ReactNode;
  onCollapse?: () => void;
  collapseSide?: 'left' | 'right';
  /** The panel owns exactly one scroll container. Set false when a child
   *  manages its own (the conversation thread pins its composer instead). */
  scroll?: boolean;
  className?: string;
}

/** One panel of the workspace. min-h-0 is load-bearing: without it a flex
 *  child refuses to shrink and the panel's scroll container never engages. */
export function PanelRegion({
  label,
  heading,
  headerAside,
  children,
  footer,
  onCollapse,
  collapseSide = 'left',
  scroll = true,
  className
}: PanelRegionProps) {
  const CollapseIcon = collapseSide === 'left' ? PanelLeftCloseIcon : PanelRightCloseIcon;

  return (
    <section
      aria-label={label}
      className={cn('flex min-h-0 min-w-0 flex-col border border-line bg-surface', className)}>
      
      <header className="flex h-9 shrink-0 items-center justify-between gap-2 border-b border-line-subtle bg-surface-subtle px-3">
        <h2 className="truncate text-2xs font-semibold uppercase tracking-wide text-fg-muted">
          {heading ?? label}
        </h2>
        <div className="flex shrink-0 items-center gap-1">
          {headerAside}
          {onCollapse &&
          <IconButton
            label={`Collapse ${label.toLowerCase()}`}
            size="sm"
            icon={<CollapseIcon className="h-3.5 w-3.5" />}
            onClick={onCollapse} />

          }
        </div>
      </header>

      <div className={cn('min-h-0 flex-1', scroll ? 'scroll-panel overflow-y-auto' : 'flex flex-col')}>
        {children}
      </div>

      {footer && <div className="shrink-0 border-t border-line-subtle">{footer}</div>}
    </section>);

}