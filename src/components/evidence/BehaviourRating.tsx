import React from 'react';
import { cn } from '../../utils/cn';
import type { BehaviourBand } from '../../types/system';

export const behaviourBands: {id: BehaviourBand;label: string;short: string;}[] = [
{ id: 'consistently-demonstrated', label: 'Consistently demonstrated', short: 'Consistent' },
{ id: 'demonstrated', label: 'Demonstrated', short: 'Demonstrated' },
{ id: 'partially-demonstrated', label: 'Partially demonstrated', short: 'Partial' },
{ id: 'not-observed', label: 'Not observed', short: 'Not observed' }];


export interface BehaviourRatingProps {
  name: string;
  value: BehaviourBand | null;
  onChange?: (band: BehaviourBand) => void;
  evidenceCounts?: Partial<Record<BehaviourBand, number>>;
  readOnly?: boolean;
  className?: string;
}

/** Four named bands with the count of supporting moments beside each.
 *  A candidate rating is never a number, star, percentage, or gauge. Derived
 *  levels that are not ratings (how much a role needs) use `LevelMeter`. */
export function BehaviourRating({
  name,
  value,
  onChange,
  evidenceCounts,
  readOnly,
  className
}: BehaviourRatingProps) {
  if (readOnly) {
    const band = behaviourBands.find((b) => b.id === value);
    return (
      <div className={cn('flex flex-col gap-1', className)}>
        <div className="flex items-center gap-1" aria-hidden="true">
          {behaviourBands.map((b) =>
          <span
            key={b.id}
            className={cn(
              'h-1.5 w-8 rounded-[1px] border',
              b.id === value ? 'border-fg-primary bg-fg-primary' : 'border-line bg-transparent'
            )} />

          )}
        </div>
        <span className="text-13 font-medium text-fg-primary">{band?.label ?? 'Not rated'}</span>
      </div>);

  }

  return (
    <fieldset className={cn('min-w-0', className)}>
      <legend className="sr-only">{name}</legend>
      <div className="flex flex-col gap-1">
        {behaviourBands.map((b) => {
          const id = `${name}-${b.id}`;
          const selected = value === b.id;
          const count = evidenceCounts?.[b.id];
          return (
            <label
              key={b.id}
              htmlFor={id}
              className={cn(
                'flex cursor-pointer items-center justify-between gap-3 rounded-sm border px-2.5 py-1.5 transition-colors duration-100 ease-enter',
                selected ?
                'border-[1.5px] border-accent-border bg-accent-bg' :
                'border-line hover:bg-surface-hover'
              )}>
              
              <span className="flex items-center gap-2">
                <input
                  id={id}
                  type="radio"
                  name={name}
                  checked={selected}
                  onChange={() => onChange?.(b.id)}
                  className="h-3.5 w-3.5 shrink-0 appearance-none rounded-full border border-line bg-[var(--input-bg)] checked:border-[4px] checked:border-action" />
                
                <span className="text-13 text-fg-primary">{b.label}</span>
              </span>
              {typeof count === 'number' &&
              <span className="shrink-0 text-2xs text-fg-muted tnum">
                  {count} {count === 1 ? 'moment' : 'moments'}
                </span>
              }
            </label>);

        })}
      </div>
    </fieldset>);

}