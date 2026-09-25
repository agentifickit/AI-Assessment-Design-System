import React from 'react';
import { ChevronUpIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

export type StatusTone = 'neutral' | 'warning' | 'danger';

export interface StatusSegment {
  id: string;
  /** Rendered in caps by the `status` style; write it as a sentence fragment.
   *  With `lead`, this is the value that follows it. */
  label: string;
  /** A muted lead word ("Connection", "Progress", "Elapsed"); the label
   *  follows in the darker ink, so the value is what the eye lands on. DS-33. */
  lead?: string;
  /** A 12px glyph before the text: a check for saved, a clock for elapsed, a
   *  6px dot for the connection. Decorative; the words carry the state. DS-33. */
  glyph?: React.ReactNode;
  tone?: StatusTone;
  /** Announced on change. Connection and save state are live; the candidate name is not. */
  live?: boolean;
  /** Long values (a unit title) give way first and truncate; the others keep
   *  their width. Leave it off everywhere and every segment may truncate. */
  shrink?: boolean;
}

export interface StatusBarProps {
  segments: StatusSegment[];
  /** Segments at the right: the unit, the clock. */
  trailingSegments?: StatusSegment[];
  /** Right-aligned slot, e.g. the timer. */
  trailing?: React.ReactNode;
  /** A control at the far left, before the segments: the session menu, a
   *  Popover whose trigger is a StatusBarButton. DS-33. */
  menu?: React.ReactNode;
  /** Hairlines between segments, each segment padded 12px. DS-33. */
  divided?: boolean;
  /** Names the bar for assistive technology, e.g. "Session status". */
  label?: string;
  className?: string;
}

const toneClasses: Record<StatusTone, string> = {
  neutral: 'text-fg-muted',
  warning: 'text-warning-fg',
  danger: 'text-danger-fg'
};

/** The candidate shell's 32px bottom bar. Segments are instrumentation, so they
 *  use the `status` type style (10/16 mono, caps, tracked) and never carry a
 *  decision. DS-12, approved 2026-09-22. The timer segment is a slot: what it
 *  shows is a PRD decision, not a design-system one. DS-33 (workspace reviews,
 *  2026-09-25 and 26): glyphs, dividers, a lead word and value, segments at
 *  the right, and a menu at the far left that holds what the candidate reads
 *  once, so the bar keeps only what changes. */
export function StatusBar({
  segments,
  trailingSegments = [],
  trailing,
  menu,
  divided = false,
  label,
  className
}: StatusBarProps) {
  // A side that holds a shrinking segment gives way; the other keeps its width.
  const shrinkAnywhere = [...segments, ...trailingSegments].some((s) => s.shrink);
  const sideClass = (items: StatusSegment[]) => !shrinkAnywhere || items.some((s) => s.shrink) ? 'min-w-0' : 'shrink-0';

  const renderList = (items: StatusSegment[], listClassName?: string, ruleFirst = false) => {
    const anyShrink = items.some((s) => s.shrink);
    return (
      <ul className={cn('flex min-w-0 items-center', !divided && 'gap-4', listClassName)}>
        {items.map((s, i) => {
          const tone = s.tone ?? 'neutral';
          const truncates = !anyShrink || s.shrink;
          return (
            <li
              key={s.id}
              role={s.live ? 'status' : undefined}
              aria-live={s.live ? 'polite' : undefined}
              title={s.lead ? `${s.lead} ${s.label}` : undefined}
              className={cn(
                'flex items-center gap-1.5 whitespace-nowrap font-mono text-10 font-medium uppercase tracking-[0.08em]',
                truncates ? 'min-w-0' : 'shrink-0',
                divided && 'px-3',
                divided && (i > 0 || ruleFirst) && 'border-l border-line',
                tone === 'neutral' && s.lead ? 'text-fg-secondary' : toneClasses[tone]
              )}>

              {s.glyph}
              {s.lead && <span className={cn('shrink-0', tone === 'neutral' && 'text-fg-muted')}>{s.lead}</span>}
              <span className={cn('tnum', truncates && 'truncate')}>{s.label}</span>
            </li>);

        })}
      </ul>);

  };

  return (
    <div
      role={label ? 'group' : undefined}
      aria-label={label}
      className={cn(
        'flex h-8 shrink-0 items-center justify-between gap-4 border-t border-line bg-surface-subtle',
        !divided && !menu && 'px-3',
        divided && 'gap-2',
        className
      )}>

      <div className={cn('flex items-center', sideClass(segments))}>
        {menu}
        {renderList(segments, !divided && menu ? 'pl-1' : undefined, !!menu && divided)}
      </div>
      {(trailingSegments.length > 0 || trailing) &&
      <div
        className={cn(
          'flex items-center',
          trailingSegments.length > 0 ? sideClass(trailingSegments) : 'shrink-0',
          !divided && !!menu && 'pr-3'
        )}>
          {renderList(trailingSegments, 'justify-end')}
          {trailing &&
        <div className={cn('shrink-0 font-mono text-10 font-medium uppercase tracking-[0.08em] text-fg-muted tnum', divided && 'px-3')}>
              {trailing}
            </div>
        }
        </div>
      }
    </div>);

}

export type StatusPresence = 'stable' | 'lost' | 'connecting';

export interface StatusBarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** One or two letters in the 16px mark, e.g. "PS". */
  initials: string;
  /** The connection, as a 6px dot on the mark. The session details say it in words. */
  presence?: StatusPresence;
  /** Whether the popover it controls is open, for the pressed look. */
  open?: boolean;
  children: React.ReactNode;
}

const presenceClasses: Record<StatusPresence, string> = {
  stable: 'bg-success-solid',
  lost: 'bg-warning-solid',
  connecting: 'bg-fg-disabled'
};

/** The status bar's first segment as a control: the candidate's initials and
 *  name, a chevron that opens upward. Pass it as a Popover trigger and spread
 *  the trigger props onto it. The mark is a circle, as every person is (DS-19).
 *  DS-33. */
export function StatusBarButton({ initials, presence, open, children, className, ...props }: StatusBarButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        'flex h-8 min-w-0 items-center gap-1.5 px-3 font-mono text-10 font-medium uppercase tracking-[0.08em] text-fg-secondary',
        'transition-colors duration-100 ease-enter hover:bg-surface-hover hover:text-fg-primary focus-visible:-outline-offset-2',
        open && 'bg-surface-hover text-fg-primary',
        className
      )}
      {...props}>

      <span aria-hidden="true" className="relative inline-flex shrink-0">
        <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-line bg-surface font-sans text-9 font-semibold leading-none tracking-normal text-fg-secondary">
          {initials}
        </span>
        {presence &&
        <span className={cn('absolute -bottom-0.5 -right-0.5 h-1.5 w-1.5 rounded-full ring-1 ring-surface-subtle', presenceClasses[presence])} />
        }
      </span>
      <span className="max-w-40 truncate">{children}</span>
      <ChevronUpIcon className="h-3 w-3 shrink-0 text-fg-muted" aria-hidden="true" />
    </button>);

}
