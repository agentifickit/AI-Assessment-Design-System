import React from 'react';
import { cn } from '../../utils/cn';

export interface LevelMeterBand {
  id: string;
  label: string;
}

export interface LevelMeterProps {
  /** Ordered from the lowest band to the highest, e.g. Low, Medium, High. */
  bands: LevelMeterBand[];
  /** Id of the current band. */
  value: string;
  /** What the meter measures, e.g. "AI fluency for this role". Read by assistive technology with the band. */
  label: string;
  className?: string;
}

/** A horizontal three-stop gradient (green-400, amber-400, orange-500) with a marker at the
 *  band's position and the band labels beneath, the current one emphasised. For derived
 *  levels such as how much AI fluency a role needs: the gradient reads as "how much", never
 *  as good to bad, and the band word is always rendered so colour is never the only cue.
 *  Never for a candidate's behaviour rating — that is `BehaviourRating`, which stays a set
 *  of named bands and never a gauge. */
export function LevelMeter({ bands, value, label, className }: LevelMeterProps) {
  const index = Math.max(0, bands.findIndex((b) => b.id === value));
  const current = bands[index];
  // The marker sits at the centre of the band's share of the bar.
  const position = `${(index + 0.5) / bands.length * 100}%`;
  return (
    <div
      role="img"
      aria-label={`${label}: ${current?.label ?? 'Not set'}`}
      className={cn('min-w-0', className)}>
      
      <div className="relative py-1">
        <div
          className="h-2.5 w-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, var(--green-400), var(--amber-400), var(--orange-500))'
          }} />
        
        <span
          className="absolute top-1/2 h-[18px] w-[18px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-fg-primary bg-surface"
          style={{ left: position }} />
        
      </div>
      <ol
        className="mt-1.5 grid"
        style={{ gridTemplateColumns: `repeat(${bands.length}, minmax(0, 1fr))` }}>
        
        {bands.map((b, i) =>
        <li
          key={b.id}
          className={cn(
            'text-center text-xs',
            i === index ? 'font-semibold text-fg-primary' : 'text-fg-muted'
          )}>
          
            {b.label}
          </li>
        )}
      </ol>
    </div>);

}
