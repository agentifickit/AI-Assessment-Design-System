import React from 'react';
import { cn } from '../../utils/cn';

export interface EvaluationLayerStackProps {
  /** Layer 1 — what happened, verbatim. */
  sourceEvent?: React.ReactNode;
  /** Layer 2 — the relevant observed behaviour. */
  evidence?: React.ReactNode;
  /** Layer 3 — what the behaviour may indicate. AI-authored. */
  interpretation?: React.ReactNode;
  /** Layer 4 — the accountable human conclusion. */
  decision?: React.ReactNode;
  /** Layer 5 — what was not observed or cannot be concluded. */
  limitation?: React.ReactNode;
  className?: string;
}

const layers = [
{ key: 'sourceEvent', n: 1, label: 'Source event', missing: 'No source event linked to this evaluation.' },
{ key: 'evidence', n: 2, label: 'Evidence', missing: 'No evidence excerpt selected.' },
{
  key: 'interpretation',
  n: 3,
  label: 'Interpretation',
  missing: 'No draft interpretation. A reviewer can write one directly.'
},
{
  key: 'decision',
  n: 4,
  label: 'Reviewer decision',
  missing: 'Human review required. No reviewer has accepted this conclusion yet.'
},
{ key: 'limitation', n: 5, label: 'Limitation', missing: 'No limitations recorded for this evaluation.' }] as
const;

/** The five-layer evidence model, structurally enforced.
 *
 *  Order is fixed and cannot be changed by a caller, and an omitted layer
 *  renders an explicit placeholder rather than disappearing — so a reader can
 *  always tell the difference between "there is no reviewer decision" and
 *  "the reviewer decision is off screen". */
export function EvaluationLayerStack(props: EvaluationLayerStackProps) {
  const { className } = props;

  return (
    <ol className={cn('flex flex-col', className)}>
      {layers.map((layer, i) => {
        const content = props[layer.key];
        return (
          <li key={layer.key} className={cn('grid grid-cols-[auto_1fr] gap-x-3', i > 0 && 'pt-3')}>
            {/* Numbered rail — the layer number is part of the grammar, not decoration. */}
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  'inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-xs border text-2xs font-semibold tnum',
                  content ?
                  'border-fg-primary bg-fg-primary text-fg-inverse' :
                  'border-dashed border-line-strong text-fg-muted'
                )}
                aria-hidden="true">
                
                {layer.n}
              </span>
              {i < layers.length - 1 && <span aria-hidden="true" className="mt-1 w-px flex-1 bg-line-subtle" />}
            </div>

            <div className="min-w-0 pb-1">
              <p className="mb-1.5 text-2xs font-semibold uppercase tracking-wide text-fg-muted">
                Layer {layer.n} · {layer.label}
              </p>
              {content ??
              <p className="rounded-md border border-dashed border-line-strong px-3 py-2 text-13 leading-6 text-fg-secondary">
                  {layer.missing}
                </p>
              }
            </div>
          </li>);

      })}
    </ol>);

}