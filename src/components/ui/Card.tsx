import React from 'react';
import { cn } from '../../utils/cn';

export interface CardProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  /** Removes body padding so tables and lists can bleed to the border. */
  flush?: boolean;
  className?: string;
  bodyClassName?: string;
  as?: 'div' | 'section' | 'article';
}

/** Elevation level 1 — border and background only, no shadow.
 *  Shadows in this system begin at popover level. */
export function Card({
  title,
  description,
  actions,
  footer,
  children,
  flush,
  className,
  bodyClassName,
  as: Tag = 'section'
}: CardProps) {
  return (
    <Tag
      className={cn(
        'flex min-w-0 flex-col overflow-hidden rounded-md border border-line bg-surface',
        className
      )}>
      
      {(title || actions) &&
      <header className="flex items-start justify-between gap-3 border-b border-line-subtle px-4 py-3">
          <div className="min-w-0">
            {title && <h3 className="text-13 font-semibold text-fg-primary">{title}</h3>}
            {description && <p className="mt-0.5 text-xs text-fg-muted">{description}</p>}
          </div>
          {actions && <div className="flex shrink-0 items-center gap-1.5">{actions}</div>}
        </header>
      }
      {children !== undefined &&
      <div className={cn('min-w-0 flex-1', !flush && 'p-4', bodyClassName)}>{children}</div>
      }
      {footer &&
      <footer className="mt-auto border-t border-line-subtle bg-surface-subtle px-4 py-2.5">
          {footer}
        </footer>
      }
    </Tag>);

}